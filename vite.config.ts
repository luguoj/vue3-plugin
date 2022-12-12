import {resolve} from 'path'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [vue(), dts({
        exclude: ["example/**/*", "package/**/*"],
        compilerOptions: {
            maxNodeModuleJsDepth: 1
        }
    })],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'PsrPrimeVueExtension',
            fileName: 'index'
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: [
                "@psr-framework/typescript-utils",
                "primeicons",
                "primevue",
                "vue"
            ],
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
        }
    },
})
