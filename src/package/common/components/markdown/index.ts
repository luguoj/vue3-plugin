import {defineAsyncComponent} from "vue";

const PsrMarkdown = defineAsyncComponent(() => import("./Markdown.vue"))
export {
    PsrMarkdown
}
