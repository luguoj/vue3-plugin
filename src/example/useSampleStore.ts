import {defineStore} from "pinia";

export const useSampleStore = defineStore('sample', {
    state: () => ({
        count: 0
    }),
    getters: {
        double: (state) => state.count * 2,
    },
    actions: {
        increment() {
            this.count++
        },
    },
    persist:true
})


export const useSample2Store = defineStore('sample2', {
    state: () => ({
        count: 0
    }),
    getters: {
        double: (state) => state.count * 2,
    },
    actions: {
        increment() {
            this.count++
        },
    },
    persist:true
})