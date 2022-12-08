import {reactive} from "vue";


export class PsrCreateUpdateFormDialogContext<E> {
    idProperty: keyof E
    defaultData: () => E
    createHandler: (data: E) => Promise<E>
    updateHandler: (data: E) => Promise<E>
    data: E
    visible = false

    show(row?: E) {
        this.visible = true
        this.data = row || this.defaultData()
    }

    constructor(
        idProperty: keyof E,
        defaultData: () => E,
        createHandler: (data: E) => Promise<E>,
        updateHandler: (data: E) => Promise<E>
    ) {
        this.idProperty = idProperty
        this.defaultData = defaultData
        this.createHandler = createHandler
        this.updateHandler = updateHandler
        this.data = defaultData()
    }

    static create<E>(options: {
        idProperty?: keyof E,
        defaultData: () => E,
        createHandler: (data: E) => Promise<E>,
        updateHandler: (data: E) => Promise<E>
    }) {
        return reactive(new PsrCreateUpdateFormDialogContext<E>(
            options.idProperty || 'id' as keyof E,
            options.defaultData,
            options.createHandler,
            options.updateHandler
        ))
    }
}