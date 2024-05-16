import {defineStore} from "pinia";

export const useSampleStore = defineStore(
    'sample', // 会被用于构建持久化记录的ID
    {
        persist: true, // 启用持久化
        state: () => ({ // 状态变量都会被持久化
            count: 0
        }),
        getters: {
            double: (state) => state.count * 2,
        },
        actions: {
            increment() {
                this.count++
            },
        }
    }
)