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
                'echarts',
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
                {text: 'Markdown Examples', link: '/guide/markdown-examples'},
                {text: 'Runtime API Examples', link: '/guide/api-examples'}
            ],
            '/reference/': [
                {
                    text: 'DOM工具',
                    collapsed: false,
                    items: [
                        {
                            text: '指令',
                            items: [
                                {
                                    text: 'vPsrMutationObserver',
                                    link: '/reference/dom-utils/directives/vPsrMutationObserver'
                                },
                                {
                                    text: 'vPsrResizeObserver',
                                    link: '/reference/dom-utils/directives/vPsrResizeObserver'
                                },
                            ]
                        },
                        {
                            text: '服务',
                            items: [
                                {
                                    text: 'usePsrColorScheme',
                                    link: '/reference/dom-utils/services/usePsrColorScheme'
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
                },
                {
                    text: 'Prime Vue扩展',
                    collapsed: false,
                    items: [
                        {
                            text: '安装',
                            link: '/reference/prime-vue/setup/'
                        },
                        {
                            text: '组件',
                            items: [
                                {
                                    text: '过滤数据表',
                                    link: '/reference/prime-vue/components/filter-data-table/'
                                },
                                {
                                    text: '过滤分页数据表',
                                    link: '/reference/prime-vue/components/filter-paging-data-table/'
                                },
                                {
                                    text: '过滤树形表',
                                    link: '/reference/prime-vue/components/filter-tree-table/'
                                }
                            ]
                        }
                    ]
                },
                {
                    text: '高德地图',
                    collapsed: false,
                    items: [
                        {
                            text: '安装',
                            link: '/reference/amap/components/setup/'
                        },
                        {
                            text: '组件',
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
                        },
                    ]
                },
                {
                    text: 'Apache Echarts',
                    collapsed: false,
                    items: [
                        {
                            text: '图表渲染',
                            link: '/reference/echarts/'
                        }
                    ]
                },
                {
                    text: '组件',
                    collapsed: false,
                    items: [
                        {
                            text: 'Markdown',
                            link: '/reference/markdown/'
                        },
                        {
                            text: '引导线',
                            link: '/reference/leader-line/'
                        },
                        {
                            text: '拖拽缩放',
                            link: '/reference/drag-resize/'
                        },
                        {
                            text: '天气',
                            link: '/reference/weather/'
                        }
                    ]
                },
                {
                    text: '全局消息',
                    collapsed: false,
                    items: [
                        {
                            text: '全局日志',
                            link: '/reference/messenger/logger/'
                        }
                    ]
                },
                {
                    text: 'pinia持久化',
                    collapsed: false,
                    items: [{
                        text: '安装',
                        link: '/reference/pinia-persist/'
                    }]
                },
            ],
        },

        socialLinks: [
            {icon: 'github', link: 'https://github.com/vuejs/vitepress'}
        ]
    }
})
