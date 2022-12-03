import {shallowReactive} from "vue";
import {PsrMessengerTypes} from "../../types/PsrMessengerTypes";

export class MessageService<T extends string, M extends PsrMessengerTypes.MessageOptions<T>> {
    readonly messages = shallowReactive<PsrMessengerTypes.Message<T>[]>([])

    private readonly _subscribers: PsrMessengerTypes.Subscriber<T, M>[] = []

    clear() {
        this.messages.splice(0, this.messages.length)
    }

    subscribe(...subscribers: PsrMessengerTypes.Subscriber<T, M>[]) {
        if (subscribers) {
            for (const subscriber of subscribers) {
                this._subscribers.push(subscriber)
            }
        }
        return this
    }

    message(
        message: string,
        options: M
    ) {
        const stackStrs = (new Error()).stack?.split("\n")
        let owner: PsrMessengerTypes.MessageOwner | undefined
        if (stackStrs && stackStrs.length > 0) {
            stackStrs.splice(0, 3)
            const [, method, source] = stackStrs[0].trim().split(' ')
            owner = {
                method: source ? method : '(匿名)',
                source: source?.substring(1, source.length - 1) || method
            }
        }
        const msgObj: PsrMessengerTypes.Message<T> = {
            time: new Date(),
            message,
            data: options.data,
            owner,
            topic: options.topic
        }
        this.messages.push(msgObj)
        for (const subscriber of this._subscribers) {
            subscriber(msgObj, options)
        }
    }
}