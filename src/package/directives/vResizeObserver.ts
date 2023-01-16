import {Directive} from "vue";

export const vPsrResizeObserver: Directive<HTMLElement, (entry: ResizeObserverEntry) => void> = {
    mounted(el, value) {
        const resizeObserver = new ResizeObserver(entries => {
            value.value(entries[0])
        })
        resizeObserver.observe(el)
    }
}