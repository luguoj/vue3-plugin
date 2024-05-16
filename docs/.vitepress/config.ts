import {defineConfig} from 'vitepress'
import {componentPreview, containerPreview} from "@vitepress-demo-preview/plugin";
import {resolve} from "path";


// https://vitepress.dev/reference/site-config
export default defineConfig({
    markdown: {
        config(md) {
            md.use(containerPreview as any)
            md.use(componentPreview as any)
        }
    },
    vite: {
        resolve: {
            alias: {
                "@psr-framework/vue3-plugin": resolve(__dirname, "../../src")
            }
        }
    },
    title: "PSR Vue3 Plugin",
    description: "PSR Vue3 插件",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: '指南', link: '/guide/'},
            {text: '参考', link: '/reference/'}
        ],

        sidebar: {
            '/guide/': [
                {text: 'Markdown Examples', link: '/guide/markdown-examples'},
                {text: 'Runtime API Examples', link: '/guide/api-examples'}
            ],
            '/reference/': [
                {
                    text:'公用模块',
                    items:[
                        {
                            text: '指令',
                            items: [
                                {text: 'vPsrMutationObserver', link: '/reference/common/directives/vPsrMutationObserver'},
                                {text: 'vPsrResizeObserver', link: '/reference/common/directives/vPsrResizeObserver'},
                            ]
                        },
                        {
                            text: '服务',
                            items: [
                                {text: 'usePsrColorScheme', link: '/reference/common/services/usePsrColorScheme'},
                            ]
                        }
                    ]
                }
            ],
        },

        socialLinks: [
            {icon: 'github', link: 'https://github.com/vuejs/vitepress'}
        ]
    }
})
