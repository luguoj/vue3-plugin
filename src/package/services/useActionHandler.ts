import {ElMessageBox} from "element-plus";
import {PsrLogger, PsrLoggerTypes} from "@package/messenger";

function resolvePromise<T>(callback: () => T | Promise<T>): Promise<T> {
    try {
        const result = callback()
        if (result instanceof Promise) {
            return result
        } else {
            return Promise.resolve(result)
        }
    } catch (err) {
        return Promise.reject(err)
    }
}

const ERROR_INVALID = "invalid"
const ERROR_CANCELED = "canceled"
const INNER_ERRORS = [ERROR_INVALID, ERROR_CANCELED]

type ActionHandler<P, R> = (params: P) => Promise<R | void>
type ActionHandlerOptions<P, R> = {
    /**
     * 操作名称，默认值 '操作'
     */
    actionName?: string
    /**
     * 静默执行标识，默认值 false。如果配置为 true，则在执行成功后不会显示成功提示
     */
    silent?: boolean
    /**
     * 校验，抛出异常或返回false则不会执行操作
     * @param options
     */
    validate?: (options: {
        params: P,
        logger: PsrLoggerTypes.LogService<any>
    }) => boolean | void | Promise<boolean | void>
    /**
     * 开始事件回调
     * @param options
     */
    start?: (options: { params: P, logger: PsrLoggerTypes.LogService<any> }) => void
    /**
     * 成功事件回调
     * @param options
     */
    success?: (options: { params: P, result: R, logger: PsrLoggerTypes.LogService<any> }) => void
    /**
     * 失败事件回调
     * @param options
     */
    failure?: (options: { params: P, error: any, logger: PsrLoggerTypes.LogService<any> }) => void
    /**
     * 完成事件回调
     * @param options
     */
    complete?: (options: { params: P, result?: R, error?: any, logger: PsrLoggerTypes.LogService<any> }) => void
    /**
     * 执行确认标识，默认值 false。如果配置为 true，则在执行前会先提示用户是否继续执行操作
     */
    confirmation?: boolean
    /**
     * 确认提示信息，默认值 '是否继续?'。
     */
    confirmationMessage?: string | ((params: P) => string)
    /**
     * 确认时，用户点击取消按钮的回调
     * @param params
     */
    cancel?: (params: P) => void
}

/**
 * 操作处理器
 * @param action
 * @param options
 */
export function useActionHandler<P = void, R = void>(
    action: (params: P) => R | Promise<R>,
    options?: ActionHandlerOptions<P, R>
): ActionHandler<P, R> {
    // 日志器
    const logger = PsrLogger.useLog()
    const {
        actionName,
        silent,
        validate,
        start,
        success,
        failure,
        complete,
        confirmation,
        confirmationMessage,
        cancel
    } = {
        actionName: '操作',
        confirmationMessage: '是否继续?',
        ...options
    }
    // 操作处理器
    return (params: P) => {
        let preprocessPromise: Promise<void> = Promise.resolve()
        // 如果存在校验
        if (validate) {
            preprocessPromise = preprocessPromise.then(
                () => resolvePromise<boolean | void>(
                    () => validate({params, logger})
                ).then(
                    result => {
                        if (result === false) {
                            logger.error('校验失败', {feedback: true})
                            return Promise.reject(ERROR_INVALID)
                        }
                    },
                    err => {
                        logger.error('校验失败', {feedback: true, data: err})
                        return Promise.reject(ERROR_INVALID)
                    }
                )
            )
        }
        // 如果存在确认
        if (confirmation) {
            const message = typeof confirmationMessage === 'function'
                ? confirmationMessage(params)
                : confirmationMessage
            preprocessPromise = preprocessPromise.then(
                () => ElMessageBox.confirm(
                    message,
                    `确认${actionName}`,
                    {
                        dangerouslyUseHTMLString: true,
                        confirmButtonText: '确认',
                        cancelButtonText: '取消',
                    }
                ).catch(
                    err => {
                        if (err === 'cancel') {
                            logger.info(`${actionName}已撤销`, {feedback: true, data: err})
                            if (cancel) {
                                cancel(params)
                            }
                            return Promise.reject(ERROR_CANCELED)
                        }
                        return Promise.reject(err)
                    }
                ).then()
            )
        }
        // 如果存在开始事件回调
        if (start) {
            preprocessPromise = preprocessPromise.then(
                () => resolvePromise(
                    () => start({params, logger})
                )
            )
        }
        // 执行操作
        let actionPromise: Promise<R> = preprocessPromise.then(
            () => resolvePromise<R>(() => action(params)).then(
                result => {
                    logger.success(`${actionName}成功`, {feedback: !silent})
                    return result;
                },
                err => {
                    logger.error(`${actionName}失败`, {feedback: true, data: err})
                    return Promise.reject(err)
                }
            )
        )
        // 处理完成事件回调
        if (complete) {
            actionPromise = actionPromise.then(
                result => resolvePromise(
                    () => {
                        complete({params, result, logger})
                        return result
                    }
                ),
                err => {
                    return resolvePromise(
                        () => {
                            if (INNER_ERRORS.indexOf(err) === -1) {
                                // 非内部错误导致的失败才调用完成事件回调
                                complete({params, error: err, logger})
                            }
                            return Promise.reject(err)
                        }
                    )
                }
            )
        }
        // 处理成功事件回调
        if (success) {
            actionPromise = actionPromise.then(
                result => resolvePromise(
                    () => {
                        success({params, result, logger})
                        return result
                    }
                )
            )
        }
        // 处理失败事件回调
        return actionPromise.catch(
            err => {
                if (failure) {
                    failure({params, error: err, logger})
                }
            }
        )
    }
}