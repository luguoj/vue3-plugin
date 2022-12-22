import {resolve} from 'path'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import libCss from "vite-plugin-libcss"

export default defineConfig({
    plugins: [
        vue(),
        libCss(),
        dts({
            exclude: ["example/**/*.ts", "example/**/*.vue"],
        })
    ],
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
