import {createIFrameEl, getIFrameDoc} from "./IFrameUtils.ts";
import {Standards, writePrintAreaDocument} from "./PrintAreaDomUtils.ts";

/**
 * 打印区域配置选项
 */
export type PrintAreaSettingOptions = Partial<PrintAreaSettings> & ({
    // 要打印的元素
    element: HTMLElement
    url?: never
} | {
    element?: never
    // 要打印的页面url地址
    url: string | Promise<string>
})
/**
 * 打印区域配置
 */
type PrintAreaSettings = {
    // 文档标准
    standard: Standards
    // 是否预览
    preview: boolean
    // 打开预览前回调
    previewBeforeOpenCallback?: () => void
    // 打开预览时回调
    previewOpenCallback?: () => void
    // 打开打印对话框前回调
    beforeOpenCallback?: () => void
    // 打开打印对话框时回调
    openCallback?: () => void
    // 关闭打印对话框时回调
    closeCallback?: () => void
    // TODO
    extraHead?: string
    // TODO
    extraCss?: string
    // 预览弹窗标题
    popTitle?: string
    // 预览窗口的z-index
    zIndex: number
    // 预览窗口的标题
    previewTitle: string
    // 打印预览的标题
    previewPrintBtnLabel: string
} & ({
    // 要打印的元素
    element: HTMLElement
    url?: never
} | {
    element?: never
    // url打印地址
    url: string | Promise<string>
})
/**
 * 预览窗口容器ID
 */
const ELEMENT_ID_PREVIEW_BOX = 'psr-vue3-printer-preview'
const ELEMENT_ID_PRINT_AREA_IFRAME = 'psr-vue3-printer-iframe'

export class PrintArea {
    previewBody: any = null
    close: any = null
    previewBodyUtilPrintBtn: any = null
    selectArray: any = []
    /**
     * 打印区域ID计数器 TODO 可删除
     */
    counter: any = 0
    /**
     * 配置
     */
    settings: PrintAreaSettings

    constructor(options: PrintAreaSettingOptions) {
        this.settings = {
            ...options,
            standard: options.standard || 'html5',
            zIndex: options.zIndex || 20002,
            preview: !!options.preview,
            previewTitle: options.previewTitle || '打印预览',
            previewPrintBtnLabel: options.previewPrintBtnLabel || '打印',
        }
        this.init();
    }

    init() {
        this.counter++;
        if (this.settings.url) {
            // 如果是打印URL地址
            if (typeof this.settings.url === 'string') {
                // 获取URL
                const url = this.settings.url
                this.printUrl(url)
            } else {
                // 异步获取url
                this.settings.url.then(url => {
                    this.printUrl(url)
                })
            }
        } else {
            // 如果不是打印URL地址
            this.printEl()
        }
    }

    /**
     * 打印URL地址
     * @param url
     */
    printUrl(url: string) {
        let PrintAreaWindow = this.buildPrintAreaIFrame(url);
        if (this.settings.preview) {
            // 打开预览弹窗
            this.previewIframeLoad()
        } else {
            // 直接打印
            this.print(PrintAreaWindow);
        }
    }

    /**
     * 打印元素
     */
    printEl() {
        let PrintAreaWindow = this.buildPrintAreaIFrame();
        const document = getIFrameDoc(PrintAreaWindow)
        if (!document) {
            throw new Error('Cannot find document.');
        }
        writePrintAreaDocument({
            targetDocument: document,
            sourceElement: this.settings.element!,
            standard: this.settings.standard,
            popTitle: this.settings.popTitle
        })
        // 如果不是打印URL地址
        if (this.settings.preview) {
            // 打开预览弹窗
            this.previewIframeLoad()
        } else {
            // 直接打印
            this.print(PrintAreaWindow);
        }
    }

    /**
     * 添加事件回调
     * @param element
     * @param type
     * @param callback
     */
    addEvent(element: any, type: string, callback: (this: Element, ev: Event) => any) {
        if (element.addEventListener) {
            element.addEventListener(type, callback, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, callback);
        } else {
            element['on' + type] = callback;
        }
    }

    /**
     * 加载预览窗口
     */
    previewIframeLoad() {
        let box = document.getElementById(ELEMENT_ID_PREVIEW_BOX)
        let iframe = box?.querySelector('iframe')
        if (box && iframe) {
            this.settings.previewBeforeOpenCallback && this.settings.previewBeforeOpenCallback()
            this.addEvent(iframe, 'load', () => {
                this.previewBoxShow()
                this.settings.previewOpenCallback && this.settings.previewOpenCallback()
            })
            this.addEvent(box.querySelector('.previewBodyUtilPrintBtn'), 'click', () => {
                this.settings.beforeOpenCallback && this.settings.beforeOpenCallback()
                this.settings.openCallback && this.settings.openCallback();
                iframe.contentWindow!.print();
                this.settings.closeCallback && this.settings.closeCallback()
            })
        }
    }

    print(printAreaWindowIframe: HTMLIFrameElement) {
        let iframe = document.getElementById(ELEMENT_ID_PRINT_AREA_IFRAME) as HTMLIFrameElement || printAreaWindowIframe;
        let iframeWin = iframe.contentWindow!;
        var _loaded = () => {
            iframeWin.focus();
            this.settings.openCallback && this.settings.openCallback();
            iframeWin.print();
            iframe.remove() // 删除iframe元素
            this.settings.closeCallback && this.settings.closeCallback()
        }
        this.settings.beforeOpenCallback && this.settings.beforeOpenCallback()
        this.addEvent(iframe, 'load', function () {
            _loaded()
        })

    }

    previewBoxShow() {
        let box = document.getElementById(ELEMENT_ID_PREVIEW_BOX)
        if (box) {
            document.querySelector('html')!.setAttribute('style', 'overflow: hidden')
            box.style.display = 'block'
        }
    }

    previewBoxHide() {
        let box = document.getElementById(ELEMENT_ID_PREVIEW_BOX)
        if (box) {
            document.querySelector('html')!.setAttribute('style', 'overflow: visible;')
            const iframe = box.querySelector('iframe')
            iframe && iframe.remove()
            box.style.display = 'none'
        }
    }

    previewBox() {

        let box = document.getElementById(ELEMENT_ID_PREVIEW_BOX)
        let previewBodyClass = 'previewBody'
        if (box) {
            const iframe = box.querySelector('iframe')
            iframe && iframe.remove()
            return {
                close: box.querySelector('.previewClose'),
                previewBody: box.querySelector(`.${previewBodyClass}`)
            }
        }
        let previewContent = document.createElement('div');
        previewContent.setAttribute('id', ELEMENT_ID_PREVIEW_BOX)
        previewContent.setAttribute('style', 'position: fixed;top: 0px;left: 0px;width: 100%;height: 100%;background: white;display:none')
        previewContent.style.zIndex = this.settings.zIndex + ''
        // 打印预览弹窗的header
        let previewHeader = document.createElement('div');
        previewHeader.setAttribute('class', "previewHeader")
        previewHeader.setAttribute('style', "padding: 5px 20px;")
        previewHeader.innerHTML = this.settings.previewTitle || "打印预览"
        previewContent.appendChild(previewHeader)
        // close关闭按钮
        this.close = document.createElement('div');
        let close = this.close
        close.setAttribute('class', "previewClose")
        close.setAttribute('style', "position: absolute;top: 5px;right: 20px;width: 25px;height: 20px;cursor: pointer;")
        let closeBefore = document.createElement('div');
        let closeAfter = document.createElement('div');
        closeBefore.setAttribute('class', "closeBefore")
        closeBefore.setAttribute('style', "position: absolute;width: 3px;height: 100%;background: #040404;transform: rotate(45deg); top: 0px;left: 50%;")
        closeAfter.setAttribute('class', "closeAfter")
        closeAfter.setAttribute('style', "position: absolute;width: 3px;height: 100%;background: #040404;transform: rotate(-45deg); top: 0px;left: 50%;")
        close.appendChild(closeBefore)
        close.appendChild(closeAfter)
        previewHeader.appendChild(close)

        // 打印预览弹窗的body
        this.previewBody = document.createElement('div');
        let previewBody = this.previewBody
        previewBody.setAttribute('class', previewBodyClass)
        previewBody.setAttribute('style', "display: flex;flex-direction: column; height: 100%;")
        previewContent.appendChild(previewBody)
        // 打印预览弹窗的body的工具栏
        let previewBodyUtil = document.createElement('div');
        previewBodyUtil.setAttribute('class', "previewBodyUtil")
        previewBodyUtil.setAttribute('style', "height: 32px;background: #474747;position: relative;")
        previewBody.appendChild(previewBodyUtil)
        // 打印的按钮
        this.previewBodyUtilPrintBtn = document.createElement('div');
        let previewBodyUtilPrintBtn = this.previewBodyUtilPrintBtn
        previewBodyUtilPrintBtn.setAttribute('class', 'previewBodyUtilPrintBtn')
        previewBodyUtilPrintBtn.innerHTML = this.settings.previewPrintBtnLabel
        previewBodyUtilPrintBtn.setAttribute('style', 'position: absolute;padding: 2px 10px;margin-top: 3px;left: 24px;font-size: 14px;color: white;cursor: pointer;background-color: rgba(0,0,0,.12);background-image: linear-gradient(hsla(0,0%,100%,.05),hsla(0,0%,100%,0));background-clip: padding-box;border: 1px solid rgba(0,0,0,.35);border-color: rgba(0,0,0,.32) rgba(0,0,0,.38) rgba(0,0,0,.42);box-shadow: inset 0 1px 0 hsla(0,0%,100%,.05), inset 0 0 1px hsla(0,0%,100%,.15), 0 1px 0 hsla(0,0%,100%,.05);')
        previewBodyUtil.appendChild(previewBodyUtilPrintBtn)

        // 添加整个预览到body
        document.body.appendChild(previewContent);

        return {
            close: this.close,
            previewBody: this.previewBody
        }
    }

    /**
     * 构造打印区域IFRAME
     * @param url URL打印地址
     */
    buildPrintAreaIFrame(url?: string) {
        // 局部打印 用当前的时间做iframe的url
        url = !url ? `${new Date().getTime()}` : url
        let iframe = createIFrameEl(ELEMENT_ID_PRINT_AREA_IFRAME, url)
        try {
            // 直接打印 不预览
            if (!this.settings.preview) {
                document.body.appendChild(iframe);
            } else {
                iframe.setAttribute('style', 'border: 0px;flex: 1;')
                // 预览打印
                let previewBox = this.previewBox()
                let previewBody = previewBox.previewBody
                let close = previewBox.close
                // 添加iframe到预览弹窗
                previewBody.appendChild(iframe);
                this.addEvent(close, 'click', () => {
                    this.previewBoxHide()
                })
            }
        } catch (e) {
            throw new Error(e + '. iframes may not be supported in this browser.');
        }
        if (!getIFrameDoc(iframe)) {
            throw new Error('Cannot find document.');
        }
        return iframe;
    }
}