<script setup lang="ts">
import MarkdownIt from "markdown-it";
import markdownItIns from "markdown-it-ins"
import markdownItMark from "markdown-it-mark"
import markdownItSub from "markdown-it-sub"
import markdownItSup from "markdown-it-sup"
import markdownItFootnote from "markdown-it-footnote"
import markdownItDeflist from "markdown-it-deflist"
import {full as markdownItEmoji} from "markdown-it-emoji"
import hljs from 'highlight.js'
import {usePsrColorScheme} from "@psr-framework/vue3-plugin-utils";
import {computed} from "vue";

const props = withDefaults(defineProps<{
  content: string
}>(), {
  content: ''
})

const highlight = (str: string, lang: string): string => {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return `<pre><code class="hljs">${hljs.highlight(str, {
        language: lang,
        ignoreIllegals: true
      }).value}</code></pre>`
    } catch (e) {
    }
  }
  return `<pre><code class="hljs">${md.utils.escapeHtml(str)}</code></pre>`
}

const md: MarkdownIt = MarkdownIt({
  typographer: true,
  highlight,
})
md.use(markdownItIns)
md.use(markdownItMark)
md.use(markdownItSub)
md.use(markdownItSup)
md.use(markdownItFootnote)
md.use(markdownItDeflist)
md.use(markdownItEmoji)

function useElClassRendererRules(md: MarkdownIt, elName: string, elClass: string) {
  md.renderer.rules[elName + "_open"] = function () {
    return `<${elName} class="${elClass}">\n`
  }
}

useElClassRendererRules(md, 'table', 'table table-striped')
useElClassRendererRules(md, 'blockquote', 'blockquote')
const colorScheme = usePsrColorScheme()

const html = computed(() => {
  return `
    <div class="psr-markdown-wrapper">
      <div style="height: 100%;" class="psr-markdown" data-bs-theme="${colorScheme.value}">
          <div class="text-body bg-body">
              ${md.render(props.content)}
          </div>
      </div>
    </div>
    `
})
</script>

<template>
  <div v-html="html"/>
</template>

<style scoped lang="scss">
:deep(.psr-markdown-wrapper) {
  @import "bootstrap";
  @import "highlight.js/scss/default.scss";

  color: var(--bs-color);

  [data-bs-theme=dark] {
    @import "highlight.js/scss/dark.scss";
  }

  pre {
    padding: 0.75em;
    margin: 0 0 0.75em;
    color: var(--bs-secondary-color);
    background-color: var(--bs-secondary-bg);
    border: 1px solid var(--bs-secondary-border-subtle);
    border-radius: 4px;
  }

  img {
    max-width: 100%;
  }
}
</style>