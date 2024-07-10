/**
 * html模式
 */
type Standards =
// 严格模式
    'strict'
    // 宽松模式
    | 'loose'
    // html5
    | 'html5'

export type PrintAreaSettingOptions = Partial<Omit<PrintAreaSettings, 'id'>> & ({
    // 要打印的元素
    element: HTMLElement
    url?: never
} | {
    element?: never
    // url打印地址
    url: string | Promise<string>
})

type PrintAreaSettings = {
    id: string
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
    previewPrintBtnLabel:string
} & ({
    // 要打印的元素
    element: HTMLElement
    url?: never
} | {
    element?: never
    // url打印地址
    url: string | Promise<string>
})

const ELEMENT_ID_PREVIEW_BOX = 'vue-pirnt-nb-previewBox'

type IFrameEl = HTMLIFrameElement & {
    doc: Document | globalThis.Document,
    document: Document | globalThis.Document
}
type PrintWindow = {
    f: IFrameEl,
    win: Window | IFrameEl,
    doc: Document | globalThis.Document
}

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
            id: '',
            standard: options.standard || 'html5',
            zIndex: options.zIndex || 20002,
            preview: !!options.preview,
            previewTitle: options.previewTitle || '打印预览',
            previewPrintBtnLabel: options.previewPrintBtnLabel || '打印',
        }
        this.init();
    }

    elsdom: any = null

    init() {
        this.counter++;
        this.settings.id = `printArea_${this.counter}`;
        let url = ''
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
            let PrintAreaWindow = this.getPrintWindow();
            this.write(PrintAreaWindow.doc);
            if (this.settings.preview) {
                // 打开预览弹窗
                this.previewIframeLoad()
            } else {
                // 直接打印
                this.print(PrintAreaWindow);
            }
        }
    }

    /**
     * 打印URL地址
     * @param url
     */
    printUrl(url: string) {
        if (this.settings.preview) {
            // 打开预览弹窗
            this.previewIframeLoad()
        } else {
            // 直接打印
            let PrintAreaWindow = this.getPrintWindow(url); // 创建iframe
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
                this.removeCanvasImg()
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

    // 删除所有canva转换的图片
    removeCanvasImg() {
        try {
            if (this.elsdom) {
                // 删除canva转变图片的dom节点
                let canvasList = this.elsdom.querySelectorAll('.canvasImg')
                for (let i = 0; i < canvasList.length; i++) {
                    canvasList[i].remove()
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    print(printAreaWindowIframe: PrintWindow) {
        let iframe = document.getElementById(this.settings.id) as IFrameEl || printAreaWindowIframe.f;
        let iframeWin = iframe.contentWindow!;
        var _loaded = () => {
            iframeWin.focus();
            this.settings.openCallback && this.settings.openCallback();
            iframeWin.print();
            iframe.remove() // 删除iframe元素
            this.settings.closeCallback && this.settings.closeCallback()
            this.removeCanvasImg()
        }
        this.settings.beforeOpenCallback && this.settings.beforeOpenCallback()
        this.addEvent(iframe, 'load', function () {
            _loaded()
        })

    }

    write(PADocument: Document | globalThis.Document) {
        PADocument.open();
        PADocument.write(`${this.docType()}<html>${this.getHead()}${this.getBody()}</html>`);
        PADocument.close();

    }

    docType() {
        if (this.settings.standard === "html5") {
            return '<!DOCTYPE html>';
        }
        var transitional = this.settings.standard === "loose" ? ' Transitional' : '';
        var dtd = this.settings.standard === "loose" ? 'loose' : 'strict';

        return `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01${transitional}//EN" "http://www.w3.org/TR/html4/${dtd}.dtd">`;
    }

    getHead() {
        let links = '';
        let style = '';
        // 复制所有link标签
        [].forEach.call(document.querySelectorAll('link'), function (item: HTMLLinkElement) {
            if (item.href.indexOf('.css') >= 0) {
                links += `<link type="text/css" rel="stylesheet" href="${item.href}" >`;
            }
        });
        // 循环获取style标签的样式
        let domStyle = document.styleSheets;
        if (domStyle && domStyle.length > 0) {
            for (let i = 0; i < domStyle.length; i++) {
                try {
                    if (domStyle[i].cssRules || domStyle[i].rules) {
                        let rules = domStyle[i].cssRules || domStyle[i].rules;
                        for (let b = 0; b < rules.length; b++) {
                            style += rules[b].cssText;
                        }
                    }
                } catch (e) {
                    console.log(domStyle[i].href, e);
                }
            }
        }
        return `<head><title>${this.settings.popTitle}</title>${links}<style type="text/css">${style}</style></head>`;
    }

    getBody() {
        if (!this.settings.element) {
            throw new Error('element is null')
        }
        this.elsdom = this.convertCanvasToImg(this.settings.element);
        let ele = this.getFormData(this.elsdom);
        let htm = ele.outerHTML;
        return '<body>' + htm + '</body>';
    }

    // 处理canva转成图片
    convertCanvasToImg(elsdom: HTMLElement) {
        let canvasList = elsdom.querySelectorAll('canvas');
        // canvas转换png图片
        for (let i = 0; i < canvasList.length; i++) {
            if (!canvasList[i].style.display) {
                let _parent = canvasList[i].parentNode!
                let _canvasUrl = canvasList[i].toDataURL('image/png')
                let _img = new Image()
                _img.className = 'canvasImg'
                _img.style.display = 'none'
                _img.src = _canvasUrl
                _parent.appendChild(_img)
            }
        }
        return elsdom
    }

    // 根据type去处理form表单
    getFormData(ele: HTMLElement) {
        let copy = ele.cloneNode(true) as HTMLElement;
        let copiedInputs = copy.querySelectorAll('input,select,textarea');
        let canvasImgList = copy.querySelectorAll('.canvasImg,canvas');
        let selectCount = -1;
        // 处理所有canvas
        for (let i = 0; i < canvasImgList.length; i++) {
            let _parent = canvasImgList[i].parentNode!
            let item = canvasImgList[i] as HTMLElement
            // 删除克隆后的canvas节点
            if (item.tagName.toLowerCase() === 'canvas') {
                _parent.removeChild(item)
            } else {
                item.style.display = 'block'
            }
        }
        // 处理所有输入框
        for (let i = 0; i < copiedInputs.length; i++) {
            let item = copiedInputs[i] as any;
            let typeInput = item.getAttribute('type');
            let copiedInput = copiedInputs[i] as any;
            // 获取select标签
            if (!typeInput) {
                typeInput = item.tagName === 'SELECT' ? 'select' : item.tagName === 'TEXTAREA' ? 'textarea' : '';
            }
            // 处理input框
            if (item.tagName === 'INPUT') {
                // 除了单选框 多选框比较特别
                if (typeInput === 'radio' || typeInput === 'checkbox') {
                    if (item.checked) {
                        copiedInput.setAttribute('checked', item.checked);
                    }

                } else {
                    copiedInput.value = item.value;
                    copiedInput.setAttribute('value', item.value);
                }
                // 处理select
            } else if (typeInput === 'select') {

                selectCount++;
                for (let b = 0; b < ele.querySelectorAll('select').length; b++) {
                    let select = ele.querySelectorAll('select')[b]; // 获取原始层每一个select
                    !select.getAttribute('newbs') && select.setAttribute('newbs', b + '') // 添加标识
                    if (select.getAttribute('newbs') == selectCount + '') {
                        let opSelectedIndex = ele.querySelectorAll('select')[selectCount].selectedIndex;
                        item.options[opSelectedIndex].setAttribute('selected', true);

                    }
                }
                // 处理textarea
            } else {
                copiedInput.innerHTML = item.value;
                copiedInput.setAttribute('html', item.value);
            }
        }

        return copy;
    }

    getPrintWindow(url?: string): PrintWindow {
        var f = this.Iframe(url);
        return {
            f: f,
            win: f.contentWindow || f,
            doc: f.doc
        };
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

    iframeBox(frameId: string, url: string): IFrameEl {
        let iframe = document.createElement('iframe') as IFrameEl;
        iframe.style.border = '0px';
        iframe.style.position = 'absolute';
        iframe.style.width = '0px';
        iframe.style.height = '0px';
        iframe.style.right = '0px';
        iframe.style.top = '0px';
        iframe.setAttribute('id', frameId);
        iframe.setAttribute('src', url);
        return iframe
    }

    /**
     * 构造IFRAME
     * @param url URL打印地址
     */
    Iframe(url?: string) {
        let frameId = this.settings.id;
        // 局部打印 用当前的时间做iframe的url
        url = !url ? `${new Date().getTime()}` : url
        let _this = this

        let iframe = this.iframeBox(frameId, url)

        // let that = this
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
                this.addEvent(close, 'click', function () {
                    _this.previewBoxHide()
                })
            }

            iframe.doc = iframe.contentDocument ? iframe.contentDocument : (iframe.contentWindow ? iframe.contentWindow.document : iframe.document);
        } catch (e) {
            throw new Error(e + '. iframes may not be supported in this browser.');
        }
        if (iframe.doc == null) {
            throw new Error('Cannot find document.');
        }

        return iframe;
    }
}