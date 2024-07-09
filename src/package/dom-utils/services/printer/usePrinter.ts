import {Ref} from "vue";
import * as html2canvas from "html2canvas";
import {jsPDF} from "jspdf"

export interface PrintOptions {
    filename: string
    onProgress?: (progress: number) => void
    onComplete?: () => void
    orientation?: "p" | "portrait" | "l" | "landscape"
    unit?: "pt" | "px" | "in" | "mm" | "cm" | "ex" | "em" | "pc"
    format?: 'a4' | { width: number, height: number }
    margin?: { top: number, right: number, bottom: number, left: number }
}

const formatSize = {
    a4: {
        width: 210,
        height: 297
    }
}

export function usePsrPrinter(elRef: Ref<HTMLElement | undefined>) {
    function print(options: PrintOptions) {
        // 打印方向，默认为纵向打印
        const orientation = options.orientation || 'p'
        // 打印单位，默认为毫米
        const unit = options.unit || 'mm'
        // 打印格式，默认为A4
        const format =
            !options.format
                ? 'a4'
                : typeof options.format === 'string'
                    ? options.format
                    : [options.format.width, options.format.height]
        // 页边距
        const margin = options.margin || {top: 10, right: 10, bottom: 10, left: 10}
        // 页面大小
        const pageSize = typeof format === 'string' ? formatSize[format] : {width: format[0], height: format[1]}
        // 页面内容大小
        const contentSize =
            orientation == 'p' || orientation == 'portrait'
                ? {
                    width: pageSize.width - margin.left - margin.right,
                    height: pageSize.height - margin.top - margin.bottom
                }
                : {
                    width: pageSize.height - margin.left - margin.right,
                    height: pageSize.width - margin.top - margin.bottom
                }
        if (elRef.value) {
            html2canvas.default(elRef.value).then(function (canvas) {
                const pdf = new jsPDF({
                    orientation,
                    unit,
                    format
                });
                const ctx = canvas.getContext('2d')
                if (!ctx) {
                    throw new Error('canvas context is null')
                }
                // 按显示比例换算一页图像的高度
                const imgHeight = Math.floor(canvas.width / contentSize.width * contentSize.height)
                // 已经渲染的高度
                let renderedHeight = 0
                while (renderedHeight < canvas.height) {
                    const page = document.createElement('canvas')
                    page.width = canvas.width
                    // 页面高度为一页高度，或者最后一页的剩余内容高度
                    page.height = Math.min(imgHeight, canvas.height - renderedHeight)
                    // 截取一页图像
                    const imageData = ctx.getImageData(0, renderedHeight, page.width, page.height)
                    // 渲染一页图像
                    page.getContext('2d')!.putImageData(imageData, 0, 0);
                    // 获取一页图像的DataURL
                    const imageDataURL = page.toDataURL('image/jpeg', 1.0)
                    // 向PDF添加一页图像
                    pdf.addImage(
                        imageDataURL,
                        'JPEG',
                        margin.left,
                        margin.bottom,
                        contentSize.width,
                        Math.min(contentSize.height, contentSize.width / page.width * page.height)
                    );
                    // 计算已经渲染的高度
                    renderedHeight += imgHeight
                    if (renderedHeight < canvas.height) {
                        // 如果尚未全部渲染完毕，添加一页空页
                        pdf.addPage();
                    }
                }
                pdf.save(`${options.filename}.pdf`);
            });
        }
    }

    return {
        print
    }
}