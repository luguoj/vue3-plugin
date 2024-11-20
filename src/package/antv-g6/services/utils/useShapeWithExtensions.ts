import {ElementHooks, ExtensionCategory, register} from "@antv/g6";
import type {ExtensionRegistry} from "@antv/g6/lib/registry/types";
import type {Loosen} from "@antv/g6/lib/types";

export function registerElementWithHooks<T extends ExtensionCategory.NODE | ExtensionCategory.EDGE | ExtensionCategory.COMBO>(
    category: Loosen<T>,
    type: string,
    Ctor: ExtensionRegistry[T][string],
    elHooks: () => ElementHooks[],
    override = false,
) {
    class NewCtor extends Ctor implements ElementHooks {
        _elHooks: ElementHooks[] = elHooks()

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

    register(category, type, NewCtor as any, override)
}