import {postcssIsolateStyles} from 'vitepress'

export default {
    plugins: [
        postcssIsolateStyles({
            prefix: ":not(:where(.vp-raw, .vp-raw *, .vitepress-demo-preview-preview, .vitepress-demo-preview-preview *))",
            includeFiles: [
                /vp-doc\.css/,
                /vitepress\/dist\/client\/theme-default\/styles\/base\.css/,
            ] // defaults to /base\.css/
        })
    ]
}