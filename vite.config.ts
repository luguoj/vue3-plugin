import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from "path";
import dts from 'vite-plugin-dts'
import {libInjectCss} from 'vite-plugin-lib-inject-css';
import vueJsxPlugin from "@vitejs/plugin-vue-jsx";
import {visualizer} from "rollup-plugin-visualizer";

export default defineConfig({
    plugins: [
        vue(),
        vueJsxPlugin(),
        libInjectCss(),
        dts({
            exclude: ["src/example", "docs", "vite.config.ts"],
        }),
        visualizer({
            open: false,
            gzipSize: true,
            brotliSize: true,
            filename: "rollup-stats.html"
        })
    ],
    build: {
        cssCodeSplit: true,
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'PsrPlugin',
            fileName: 'index'
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: [
                '@antv/algorithm',
                '@antv/layout',
                '@antv/g-base',
                '@antv/g-canvas',
                '@antv/g-webgpu-engine',
                '@antv/g-svg',
                '@antv/g6',
                '@antv/util',
                '@antv/g6-pc',
                '@antv/g6-element',
                '@antv/g6-core',
                '@antv/g6-plugin',
                '@element-plus/icons-vue',
                '@joint/core',
                '@pansy/amap-types',
                "@psr-framework/typescript-utils",
                '@types/three',
                '@types/three162',
                'echarts',
                'element-plus',
                'lodash',
                'moment',
                'three',
                'three162',
                "pinia",
                "primeicons",
                "primevue",
                "primevue/datatable",
                "primevue/treetable",
                "primevue/api",
                "primevue/config",
                "primeflex",
                'vue',
            ],
            output: {
                chunkFileNames: "chunks/[name].[hash].js",
                assetFileNames: "assets/[name].[hash].[ext]",
                globals: {
                    // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                    vue: 'Vue'
                }
            }
        }
    }
})