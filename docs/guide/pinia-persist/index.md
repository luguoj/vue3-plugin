# pinia 持久化插件

## 1. 创建一个持久化存储服务

<<< ./example/storage.ts

可以借助 *createDebounceStorage* 创建一个带有防抖机制的异步存储服务

<<< ./example/asyncStorage.ts

## 2. 配置pinia，应用持久化存储服务

<<< ./example/pinia.ts

## 3. 使用store

<<< ./example/useSampleStore.ts