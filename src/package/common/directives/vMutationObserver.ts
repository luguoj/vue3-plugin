import {Directive} from "vue";

type TargetType = HTMLElement & {
    _PsrMutationObserver?: MutationObserver
}
type Handler = (mutations: MutationRecord[]) => void
type BindingType = {
    options: MutationObserverInit
    handler: Handler
}
export const vPsrMutationObserver: Directive<TargetType, BindingType> = {
    mounted(el, binding) {
        const observer = new MutationObserver(mutations => {
            binding.value.handler(mutations)
        })
        el._PsrMutationObserver = observer
        observer.observe(el, binding.value.options)
    },
    unmounted(el) {
        el._PsrMutationObserver?.disconnect()
    }
}