import {defineConfig} from 'vitepress'
import {componentPreview, containerPreview} from "@vitepress-demo-preview/plugin";
import {resolve} from "path";
import {rollupExternal} from "../../rollup-external";
import {resolvePaths} from "../../resolve-paths";

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
                ...resolvePaths,
                "@psr-framework/vue3-plugin": resolve(__dirname, "../../src/package")
            }
        },
        ssr: {
            noExternal: rollupExternal
        }
    },
    title: "PSR Vue3 Plugin",
    description: "PSR Vue3 插件",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
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
                    collapsed: true,
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
                    text: '组件',
                    collapsed: true,
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
                        },
                        {
                            text: 'Joint',
                            link: '/reference/joint/'
                        }
                    ]
                },
                {
                    text: '全局消息',
                    collapsed: true,
                    items: [
                        {
                            text: '全局日志',
                            link: '/reference/messenger/logger/'
                        }
                    ]
                },
                {
                    text: 'pinia持久化',
                    collapsed: true,
                    items: [{
                        text: '安装',
                        link: '/reference/pinia-persist/'
                    }]
                },
                {
                    text: 'ElementPlus扩展',
                    collapsed: true,
                    items: [
                        {
                            text: '安装',
                            link: '/reference/element-plus/setup/'
                        },
                        {
                            text: '组件',
                            items: [
                                {
                                    text: '布局',
                                    link: '/reference/element-plus/components/layout/'
                                },
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
                    collapsed: true,
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
                    collapsed: true,
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
                    text: 'AntV-G6',
                    collapsed: true,
                    items: [
                        {
                            text: '安装',
                            link: '/reference/antv-g6/setup/'
                        },
                        {
                            text: '图形扩展',
                            link: '/reference/antv-g6/shape-extension/',
                            items: [
                                {
                                    text: '内置边扩展类型',
                                    link: '/reference/antv-g6/shape-extension/build-in-edge-extensions/'
                                },
                                {
                                    text: '内置节点扩展类型',
                                    link: '/reference/antv-g6/shape-extension/build-in-node-extensions/'
                                },
                            ]
                        }
                    ]
                },
                {
                    text: 'Apache Echarts',
                    collapsed: true,
                    items: [
                        {
                            text: '图表渲染',
                            link: '/reference/echarts/'
                        }
                    ]
                },
            ],
        },

        socialLinks: [
            {
                icon: {
                    svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve"><script xmlns=""/><image id="image0" width="32" height="32" x="0" y="0" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAIGNIUk0AAHomAACAhAAA+gAAAIDo AAB1MAAA6mAAADqYAAAXcJy6UTwAAAEyUExURfxVMfx0V/2lkv3Et/7Rx/7Ow/25qvySe/xePPyD af7b0/////729f2unPxbOPxaN/2+sP7+/v7i3PxlRfxdO/7Xzv7n4v2wn/3Asv7t6v28rvxWM/3O xP7r5/yIb/xXNP2ZhP718/7Pxf2kkP7h2/xkQ/xvUf7r5vyOdvxmRf749/708fxpSvxfPfxwUv2y ov2diP7y7/7v7PxZNvx/ZP21pfyHbf2/sfxnR/7OxP79/f7Syf77+/3Lv/22pvx5XP2rmvxhQP77 +vxjQvxsTfyJcfxWMv7WzvxhP/yAZf708vxmRv7z8P2bhvxiQPxYNf3Dtv729PyEav76+v7o4/7Z 0f7Uy/7g2v759/7v6/x+Y/2woP7z8f7u6v2qmf2qmP3Ctv7Mwf27rf2hjfx6XvxXM5v88O4AAAAB YktHRAsf18TAAAAAB3RJTUUH6AYUAB4WRm2MqQAAAQBJREFUOMtjYBh0gJGJmYWVjZ0DhzQnFzcE 8PDyYZHmFxDkhgMhYQx5EVGQhJiAuIQkiCGFLi8tAxSVlQMx5RUUubmV0BUoA+VVVKEcNXVBDTR5 TS1ubm0dOFdXD90AfaABBnj8L2/IzW1kjEeBCdAAU3whyARUYIZPgTlQgQU+BZbc3FbS+BRYc3Pb 4JNnsAVaIYJPgR1QgT0+BexABQ74FDg6cXMbOiMJuLi6oaoQABrh7gHnenpxi6Mq8PYBxbavH4jt bxJgxc0diGZJUDAomQiGhIaFR4DTVAi6MzwjuZGBURSGQz2iY+DSsXG62PzCHxSfoGSdmJScksow mAAAr2Ab+wezZ1oAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjQtMDYtMjBUMDA6MzA6MjErMDA6MDBk bQTuAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDI0LTA2LTIwVDAwOjMwOjIxKzAwOjAwFTC8UgAAACh0 RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyNC0wNi0yMFQwMDozMDoyMiswMDowMHPNhxAAAAAASUVORK5C YII="/></svg>'
                },
                link: 'https://zhoudingding.blog.csdn.net/'
            }
        ]
    }
})
