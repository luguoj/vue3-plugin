/**
 * html模式
 */
export type Standards =
    'strict' // 严格模式
    | 'loose' // 宽松模式
    | 'html5' // html5

/**
 * 打印事件监听器配置
 */
export type PrintEventListenerOptions = {
    // 打开打印对话框前回调
    beforePrintDialogOpen?: () => void
    // 打开打印对话框时回调
    onPrintDialogOpen?: () => void
    // 关闭打印对话框时回调
    onPrintDialogClosed?: () => void
}

/**
 * 打印选项
 */
export type PrintOptions = {
    // 文档标准
    standard?: Standards
    // 打印页面标题
    printTitle?: string
}

/**
 * 预览配置选项
 */
export type PreviewOptions = {
    // 打开预览前回调
    beforePreviewOpen?: () => void
    // 打开预览时回调
    onPreviewOpen?: () => void
    // 关闭预览时回调
    onPreviewClosed?: () => void
    // 预览窗口的z-index
    previewZIndex?: number
    // 预览窗口的标题
    previewTitle?: string
    // 预览窗口打印按钮的标题
    previewPrintBtnLabel?: string
}