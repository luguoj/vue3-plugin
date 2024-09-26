import {PsrLogger, usePsrElLogSubscriber} from "@psr-framework/vue3-plugin";

export const logger = PsrLogger.create({
    // 启用调试，启用后所有消息将在控制台输出
    debugging: true,
    // 订阅消息的处理器
    subscribers: [
        ...usePsrElLogSubscriber()
    ]
})
