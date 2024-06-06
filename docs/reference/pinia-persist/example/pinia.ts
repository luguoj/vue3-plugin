import {createPinia} from "pinia";
import {createPsrPiniaPersist} from "@psr-framework/vue3-plugin";
import {asyncStorage} from "./asyncStorage.ts";

export const pinia = createPinia()
pinia.use(createPsrPiniaPersist({
    key: (storeKey) => { // 可以根据storeKey构建持久化存储记录的ID
        return `pinia-persist/${storeKey}`
    },
    beforeRestore: () => { // 从存储服务恢复状态前的回调钩子
        console.log("beforeRestore")
    },
    afterRestore: () => { // 从存储服务恢复状态后的回调钩子
        console.log("afterRestore")
    },
    storage: asyncStorage // 存储服务
}))