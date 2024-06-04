import {defineConfig} from 'vitepress'
import {componentPreview, containerPreview} from "@vitepress-demo-preview/plugin";
import {resolve} from "path";


// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: "/docs/psr-vue3-plugin/",
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
        },
        ssr: {
            noExternal: [
                '@element-plus/icons-vue',
                '@pansy/amap-types',
                "@psr-framework/typescript-utils",
                '@types/three',
                '@types/three162',
                'element-plus',
                'lodash',
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
            ]
        },
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
                    text: '高德地图插件',
                    link: '/guide/amap/'
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
                        },
                        {
                            text: '组件',
                            items: [
                                {
                                    text: 'Markdown',
                                    link: '/reference/common/components/markdown'
                                }
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
                },
                {
                    text: 'Prime Vue扩展',
                    collapsed: false,
                    items: [
                        {
                            text: '组件',
                            items: [
                                {
                                    text: '过滤数据表 FilterDataTable',
                                    link: '/reference/prime-vue/components/filter-data-table/'
                                }
                            ]
                        }
                    ]
                },
                {
                    text: '高德地图组件',
                    collapsed: false,
                    items: [
                        {
                            text: '地图',
                            link: '/reference/amap/components/map/',
                        },
                        {
                            text: '信息窗体',
                            link: '/reference/amap/components/info-window/',
                        },
                        {
                            text: '点标记',
                            link: '/reference/amap/components/marker/',
                        },
                        {
                            text: '点标记聚合',
                            link: '/reference/amap/components/marker-cluster/',
                        },
                        {
                            text: '图层',
                            link: '/reference/amap/components/layer/',
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
