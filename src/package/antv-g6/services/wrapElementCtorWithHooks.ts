import {ElementHooks, ExtensionCategory} from "@antv/g6";
import type {ExtensionRegistry} from "@antv/g6/lib/registry/types";

export type  ElementHooksBuilder = () => ElementHooks

export function wrapElementCtorWithHooks<T extends ExtensionCategory.NODE | ExtensionCategory.EDGE | ExtensionCategory.COMBO>(
    Ctor: ExtensionRegistry[T][string],
    elHooksBuilders: ElementHooksBuilder[]
) {
    class ElementCtor extends Ctor implements ElementHooks {
        _elHooks: ElementHooks[] = elHooksBuilders.map(builder => builder())

        onCreate() {
            super.onCreate?.()
            this._elHooks.forEach(hooks => {
                hooks.onCreate?.apply(this)
            })
        }

        onDestroy() {
            super.onDestroy?.()
            this._elHooks.forEach(hooks => {
                hooks.onDestroy?.apply(this)
            })
        }

        onUpdate() {
            super.onUpdate?.()
            this._elHooks.forEach(hooks => {
                hooks.onUpdate?.apply(this)
            })
        }
    }
    return ElementCtor
}