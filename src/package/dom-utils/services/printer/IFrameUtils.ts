export function createIFrameEl(frameId: string, url: string): HTMLIFrameElement {
    let iframe = document.createElement('iframe');
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

export function getIFrameDoc(iframe: HTMLIFrameElement) {
    return iframe.contentDocument || iframe.contentWindow?.document
}