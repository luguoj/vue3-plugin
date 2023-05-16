import {defineCustomElement} from "vue";
import VueNodeComp from "./VueNodeComp.vue";

export const VueNodeTag = 'vue-node-comp'
customElements.define(VueNodeTag, defineCustomElement(VueNodeComp))