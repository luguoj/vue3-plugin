import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from "path";
import dts from 'vite-plugin-dts'
import libCss from "vite-plugin-libcss"
import vueJsxPlugin from "@vitejs/plugin-vue-jsx";
import {visualizer} from "rollup-plugin-visualizer";

export default defineConfig({
    resolve: {
        alias: {
            "@psr-framework/vue3-plugin": resolve(__dirname, "./src")
        }
    },
    plugins: [
        vue(),
        vueJsxPlugin(),
        libCss(),
        dts({
            exclude: ["src/example/**/*.vue", "src/example/**/*.ts", "docs"],
        }),
        visualizer({
            open: true,
            gzipSize: true,
            brotliSize: true,
            filename: "rollup-stats.html"
        })
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'PsrPlugin',
            fileName: 'index'
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: [
                '@element-plus/icons-vue',
                "@psr-framework/typescript-utils",
                'element-plus',
                'lodash',
                "pinia",
                'vue',
            ],
            output: {
                globals: {
                    // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                    vue: 'Vue'
                }
            }
        }
    }
})
