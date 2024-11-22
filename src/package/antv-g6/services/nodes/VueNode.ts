import {render, VNode} from "vue";
import {HTMLStyleProps as GHTMLStyleProps} from "@antv/g";
import {BaseNodeStyleProps, ExtensionCategory, HTML, HTMLStyleProps, register} from "@antv/g6";

interface VueNodeStyleProps extends BaseNodeStyleProps {
    component: VNode | (() => VNode)
}

export class VueNode extends HTML {
    protected getKeyStyle(attributes: Required<HTMLStyleProps>): GHTMLStyleProps {
        return super.getKeyStyle(attributes);
    }

    private renderVNode() {
        const {component} = this.attributes as unknown as VueNodeStyleProps
        if (component instanceof Function) {
            render(component(), this.getDomElement())
        } else {
            render(component, this.getDomElement())
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.renderVNode()
    }

    attributeChangedCallback(name: any, oldValue: any, newValue: any) {
        if (name === 'component' && oldValue !== newValue) {
            this.renderVNode()
        }
        super.attributeChangedCallback(name, oldValue, newValue);
    }

    destroy() {
        this.getDomElement().remove()
        super.destroy();
    }
}

const VueNodeType = 'psr-vue-node'

export function registerVueNode() {
    register(ExtensionCategory.NODE, VueNodeType, VueNode)
    return VueNodeType
}