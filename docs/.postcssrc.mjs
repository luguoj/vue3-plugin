import {postcssIsolateStyles} from 'vitepress'

export default {
    plugins: [
        postcssIsolateStyles({
            includeFiles: [
                /vitepress\/dist\/client\/theme-default\/styles\/vp-doc\.css/,
                /vitepress\/dist\/client\/theme-default\/styles\/base\.css/,
            ] // defaults to /base\.css/
        })
    ]
}