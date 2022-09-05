import {resolve} from 'path'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), dts()],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/components/index.ts'),
            name: 'PsrAMap',
            fileName: 'vue3-plugin-amap'
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: ['vue'],
            output: {
                globals: {
                    // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                    vue: 'Vue'
                }
            }
        }
    }
})
