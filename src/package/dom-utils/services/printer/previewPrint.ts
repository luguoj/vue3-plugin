import {PreviewOptions, PrintEventListenerOptions, PrintOptions} from "./types";
import {createPrintAreaIFrame, printPrintAreaIFrame, writePrintAreaDocument} from "./PrintAreaUtils";

export function previewPrint(
    element: HTMLElement,
    options?: PrintOptions & PrintEventListenerOptions & PreviewOptions
) {
    return new Promise<void>(resolve => {
        const {
            standard,
            printTitle,
        } = options || {}
        // 构造打印区域IFrame
        const printAreaIFrame = createPrintAreaIFrame()
        // 预览打印
        // 构造预览弹窗
        previewBox(
            printAreaIFrame,
            {
                ...options,
                onPreviewClosed: () => {
                    options?.onPreviewClosed && options.onPreviewClosed()
                    resolve()
                },
                onPrint: () => {
                    printPrintAreaIFrame(
                        printAreaIFrame,
                        options || {}
                    );
                }
            }
        )
        writePrintAreaDocument(printAreaIFrame, element, standard, printTitle)
    })
}

/**
 * 构造预览弹窗
 */
function previewBox(
    printAreaIFrame: HTMLIFrameElement,
    {
        beforePreviewOpen,
        onPreviewOpen,
        onPreviewClosed,
        previewZIndex,
        previewTitle,
        previewPrintBtnLabel,
        onPrint
    }: PreviewOptions & {
        onPrint: () => void
    }
) {
    const previewBox = document.createElement('div');
    previewBox.setAttribute('style', 'position: fixed;top: 0px;left: 0px;width: 100%;height: 100%;background: white;display:none')
    previewBox.style.zIndex = (previewZIndex || 20002) + ''
    // 打印预览弹窗的header
    const previewHeader = document.createElement('div');
    previewHeader.setAttribute('class', "previewHeader")
    previewHeader.setAttribute('style', "padding: 0.5em 1em;")
    previewHeader.innerHTML = previewTitle || "打印预览"
    previewBox.appendChild(previewHeader)
    // close关闭按钮
    const closeBtn = document.createElement('div');
    closeBtn.setAttribute('class', "previewClose")
    closeBtn.setAttribute('style', "position: absolute;top: 0.5em;right: 1em;width: 1.5em;height: 1.5em;cursor: pointer;")
    let closeBefore = document.createElement('div');
    let closeAfter = document.createElement('div');
    closeBefore.setAttribute('class', "closeBefore")
    closeBefore.setAttribute('style', "position: absolute;width: 3px;height: 100%;background: #040404;transform: rotate(45deg); top: 0px;left: 50%;")
    closeAfter.setAttribute('class', "closeAfter")
    closeAfter.setAttribute('style', "position: absolute;width: 3px;height: 100%;background: #040404;transform: rotate(-45deg); top: 0px;left: 50%;")
    closeBtn.appendChild(closeBefore)
    closeBtn.appendChild(closeAfter)
    previewHeader.appendChild(closeBtn)
    closeBtn.addEventListener('click', () => {
        previewBox.remove()
        onPreviewClosed && onPreviewClosed()
    })
    // 打印预览弹窗的body
    const previewBody = document.createElement('div');
    previewBody.setAttribute('class', 'previewBody')
    previewBody.setAttribute('style', "display: flex;flex-direction: column; height: 100%;")
    previewBox.appendChild(previewBody)
    // 打印预览弹窗的body的工具栏
    let previewBodyUtil = document.createElement('div');
    previewBodyUtil.setAttribute('class', "previewBodyUtil")
    previewBodyUtil.setAttribute('style', "background: #474747;position: relative;padding: 0.1em 1em;")
    previewBody.appendChild(previewBodyUtil)
    // 打印的按钮
    const printBtn = document.createElement('div');
    printBtn.setAttribute('class', 'previewBodyUtilPrintBtn')
    printBtn.innerHTML = previewPrintBtnLabel || '打印'
    printBtn.setAttribute('style', 'padding: 0.1em 1em;font-size: 14px;color: white;cursor: pointer;background-color: rgba(0,0,0,.12);background-image: linear-gradient(hsla(0,0%,100%,.05),hsla(0,0%,100%,0));background-clip: padding-box;border: 1px solid rgba(0,0,0,.35);border-color: rgba(0,0,0,.32) rgba(0,0,0,.38) rgba(0,0,0,.42);box-shadow: inset 0 1px 0 hsla(0,0%,100%,.05), inset 0 0 1px hsla(0,0%,100%,.15), 0 1px 0 hsla(0,0%,100%,.05);')
    previewBodyUtil.appendChild(printBtn)
    printBtn.addEventListener('click', onPrint)
    // 将打印区域IFrame添加到预览弹窗
    printAreaIFrame.setAttribute('style', 'border: 0;flex: 1;pointer-events: none;')
    previewBody.appendChild(printAreaIFrame);

    // 添加整个预览到body
    document.body.appendChild(previewBox);

    beforePreviewOpen && beforePreviewOpen()
    printAreaIFrame.addEventListener('load', () => {
        document.querySelector('html')!.setAttribute('style', 'overflow: hidden')
        previewBox.style.display = 'block'
        onPreviewOpen && onPreviewOpen()
    })
    return {
        previewBody,
        printBtn
    }
}