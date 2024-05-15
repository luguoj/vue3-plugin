import {Directive} from "vue";

type TargetType = HTMLElement & {
    _PsrMutationObserver?: MutationObserver
}
type Handler = (mutations: MutationRecord[]) => void
type BindingType = {
    options?: MutationObserverInit
    handler: Handler
} | Handler
export const vPsrMutationObserver: Directive<TargetType, BindingType> = {
    mounted(el, binding) {
        const observer = new MutationObserver(mutations => {
            if (binding.value instanceof Function) {
                binding.value(mutations)
            } else if (binding.value.handler instanceof Function) {
                binding.value.handler(mutations)
            }
        })
        el._PsrMutationObserver = observer
        if (binding.value instanceof Function) {
            observer.observe(el)
        } else {
            observer.observe(el, binding.value.options)
        }
    },
    unmounted(el) {
        el._PsrMutationObserver?.disconnect()
    }
}