import {createPrintAreaIFrame, printPrintAreaIFrame, writePrintAreaDocument} from "./PrintAreaUtils";
import {PrintEventListenerOptions, PrintOptions} from "./types";

/**
 * 直接打印
 */
export function directPrint(
    element: HTMLElement,
    options?: PrintOptions & PrintEventListenerOptions
) {
    return new Promise<void>(resolve => {
        const {
            standard,
            printTitle,
            beforePrintDialogOpen,
            onPrintDialogOpen,
            onPrintDialogClosed
        } = options || {}
        // 构造打印区域IFrame
        const printAreaIFrame = createPrintAreaIFrame()
        // 直接打印
        // 将打印区域IFrame添加到当前文档中
        element.parentElement!.appendChild(printAreaIFrame);
        // 监听IFrame加载完成事件，调用打印
        printAreaIFrame.addEventListener('load', () => {
            printPrintAreaIFrame(
                printAreaIFrame,
                {
                    beforePrintDialogOpen,
                    onPrintDialogOpen,
                    onPrintDialogClosed: () => {
                        onPrintDialogClosed && onPrintDialogClosed()
                        // 打印完毕删除打印区域IFrame
                        printAreaIFrame.remove()
                        resolve()
                    }
                }
            );
        })
        writePrintAreaDocument(printAreaIFrame, element, standard, printTitle)
    })
}