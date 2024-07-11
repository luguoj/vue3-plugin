/**
 * html模式
 */
export type Standards =
    'strict' // 严格模式
    | 'loose' // 宽松模式
    | 'html5' // html5

export function writePrintAreaDocument(
    options: {
        targetDocument: Document,
        sourceElement: HTMLElement
        standard?: Standards
        popTitle?: string
    }
) {
    const {targetDocument, sourceElement, standard, popTitle} = options
    const docType = buildDocType(standard)
    const head = buildHead(popTitle);
    const body = buildBody(sourceElement)
    const content = `${docType}<html>${head}${body}</html>`
    targetDocument.open();
    targetDocument.write(content);
    targetDocument.close();
}

function buildDocType(standard?: Standards) {
    if (!standard || standard === "html5") {
        return '<!DOCTYPE html>';
    }
    const transitional = standard === "loose" ? ' Transitional' : '';
    const dtd = standard === "loose" ? 'loose' : 'strict';
    return `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01${transitional}//EN" "http://www.w3.org/TR/html4/${dtd}.dtd">`;
}

function buildHead(popTitle?: string) {
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
    return `<head><title>${popTitle}</title>${links}<style type="text/css">${style}</style></head>`;
}

function buildBody(element: HTMLElement) {
    let htm = buildHtmlToPrint(element);
    return `<body>${htm}</body>`;
}

/**
 * 元素样式类名 - canvas图片
 */
const EL_CLASS_CANVAS_IMG = 'psr-printer-canvas-img';

/**
 * canvas 转为图片
 */
function convertCanvasToImg(element: HTMLElement) {
    let canvasList = element.querySelectorAll('canvas');
    for (let i = 0; i < canvasList.length; i++) {
        if (!canvasList[i].style.display) {
            let _parent = canvasList[i].parentNode!
            // 将canvas内容转换为base64图片url
            let _canvasUrl = canvasList[i].toDataURL('image/png')
            let _img = new Image()
            // 添加canvas的样式
            _img.className = `${EL_CLASS_CANVAS_IMG} ${canvasList[i].className}`
            _img.setAttribute('style', canvasList[i].getAttribute('style') || '')
            // 隐藏图片元素
            _img.style.display = 'none'
            // 设置图片元素src
            _img.src = _canvasUrl
            _parent.appendChild(_img)
        }
    }
}

/**
 * 删除所有canvas转换的图片元素
 */
function removeCanvasImg(element: HTMLElement) {
    try {
        let canvasList = element.querySelectorAll(`.${EL_CLASS_CANVAS_IMG}`)
        for (let i = 0; i < canvasList.length; i++) {
            canvasList[i].remove()
        }
    } catch (e) {
        console.log(e);
    }
}

/**
 * 构建要打印的HTML
 */
function buildHtmlToPrint(element: HTMLElement) {
    convertCanvasToImg(element);
    let copy = element.cloneNode(true) as HTMLElement;
    removeCanvasImg(element);
    let copiedInputs = copy.querySelectorAll('input,select,textarea');
    let canvasImgList = copy.querySelectorAll(`.${EL_CLASS_CANVAS_IMG},canvas`);
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
            for (let b = 0; b < element.querySelectorAll('select').length; b++) {
                let select = element.querySelectorAll('select')[b]; // 获取原始层每一个select
                !select.getAttribute('newbs') && select.setAttribute('newbs', b + '') // 添加标识
                if (select.getAttribute('newbs') == selectCount + '') {
                    let opSelectedIndex = element.querySelectorAll('select')[selectCount].selectedIndex;
                    item.options[opSelectedIndex].setAttribute('selected', true);

                }
            }
            // 处理textarea
        } else {
            copiedInput.innerHTML = item.value;
            copiedInput.setAttribute('html', item.value);
        }
    }
    return copy.outerHTML;
}