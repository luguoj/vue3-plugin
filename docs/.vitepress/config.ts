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
                {
                    text: 'pinia持久化',
                    collapsed: false,
                    items: [{
                        text: '开始',
                        link: '/guide/pinia-persist/'
                    }]
                },
                {
                    text:'高德地图插件',
                    link:'/guide/amap/'
                },
                {text: 'Markdown Examples', link: '/guide/markdown-examples'},
                {text: 'Runtime API Examples', link: '/guide/api-examples'}
            ],
            '/reference/': [
                {
                    text: '公用模块',
                    collapsed: false,
                    items: [
                        {
                            text: '指令',
                            items: [
                                {
                                    text: 'vPsrMutationObserver',
                                    link: '/reference/common/directives/vPsrMutationObserver'
                                },
                                {
                                    text: 'vPsrResizeObserver',
                                    link: '/reference/common/directives/vPsrResizeObserver'
                                },
                            ]
                        },
                        {
                            text: '服务',
                            items: [
                                {
                                    text: 'usePsrColorScheme',
                                    link: '/reference/common/services/usePsrColorScheme'
                                },
                            ]
                        }
                    ]
                },
                {
                    text: 'ElementPlus扩展',
                    collapsed: false,
                    items: [
                        {
                            text: '组件',
                            items: [
                                {
                                    text: '按钮',
                                    link: '/reference/element-plus/components/buttons/'
                                },
                                {
                                    text: '容器',
                                    link: '/reference/element-plus/components/containers/'
                                },
                                {
                                    text: '对话框',
                                    link: '/reference/element-plus/components/dialogs/'
                                },
                                {
                                    text: '下拉菜单',
                                    link: '/reference/element-plus/components/dropdown/'
                                }
                            ]
                        },
                        {
                            text: '指令',
                            items: [
                                {
                                    text: 'vPsrElHScrollOnWheel',
                                    link: '/reference/element-plus/directives/vPsrElHScrollOnWheel'
                                }
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
