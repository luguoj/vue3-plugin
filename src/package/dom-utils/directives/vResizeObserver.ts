import {Directive} from "vue";

type TargetType = HTMLElement & {
    _PsrResizeObserver?: ResizeObserver
}
type Handler = (entry: ResizeObserverEntry) => void
type BindingType = {
    options?: ResizeObserverOptions
    handler: Handler
} | Handler
export const vPsrResizeObserver: Directive<TargetType, BindingType> = {
    mounted(el, binding) {
        const observer = new ResizeObserver(entries => {
            if (binding.value instanceof Function) {
                binding.value(entries[0])
            } else if (binding.value.handler instanceof Function) {
                binding.value.handler(entries[0])
            }
        })
        el._PsrResizeObserver = observer;
        if (binding.value instanceof Function) {
            observer.observe(el)
        } else {
            observer.observe(el, binding.value.options)
        }
    },
    unmounted(el) {
        el._PsrResizeObserver?.disconnect()
    }
}