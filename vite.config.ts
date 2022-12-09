import {resolve} from 'path'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [vue(), dts({
        exclude: ["example/**/*.ts", "example/**/*.vue"],
    })],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'PsrElementPlusExtension',
            fileName: 'index'
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: ['vue', 'element-plus', '@element-plus/icons-vue'],
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
        }
    },
})
