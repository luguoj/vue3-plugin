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
                '@psr-framework/vue3-plugin': resolve('./src'),
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
                    text: '指令',
                    items: [
                        {text: 'vPsrMutationObserver', link: '/reference/directive/vPsrMutationObserver'},
                        {text: 'vPsrResizeObserver', link: '/reference/directive/vPsrResizeObserver'},
                    ]
                },
                {
                    text: '服务',
                    items: [
                        {text: 'usePsrColorScheme', link: '/reference/service/usePsrColorScheme'},
                    ]
                }
            ],
        },

        socialLinks: [
            {icon: 'github', link: 'https://github.com/vuejs/vitepress'}
        ]
    }
})
