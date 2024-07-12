PsrPrinter

打印页面元素内容

# API

## 1. 直接打印

```ts
import {PsrPrinter} from "@psr-framework/vue3-plugin";

PsrPrinter.print(
    element, // 要打印的 HTMLElement 对象
    options  // 打印参数
)
```

### 打印参数

| 名称                    | 描述                         | 默认值   |
|-----------------------|----------------------------|-------|
| standard              | 页面文档标准（strict/loose/html5） | html5 |
| printTitle            | 打印页面标题，可显示在页眉处             |       |
| beforePrintDialogOpen | 打开打印对话框前回调                 |       |
| onPrintDialogOpen     | 打开打印对话框时回调                 |       |
| onPrintDialogClosed   | 关闭打印对话框时回调                 |       |

## 2. 预览打印

```ts
import {PsrPrinter} from "@psr-framework/vue3-plugin";

PsrPrinter.preview(
    element, // 要打印的 HTMLElement 对象
    options  // 打印参数和预览参数
)
```

### 预览参数

| 名称                   | 描述           | 默认值   |
|----------------------|--------------|-------|
| beforePreviewOpen    | 打开预览前回调      |       |
| onPreviewOpen        | 打开预览时回调      |       |
| onPreviewClosed      | 关闭预览时回调      |       |
| previewZIndex        | 预览窗口的z-index | 20002 |
| previewTitle         | 预览窗口的标题      | 打印预览  |
| previewPrintBtnLabel | 预览窗口打印按钮的标题  | 打印    |

预览打印

:::preview
demo-preview=./Printer.vue
:::