import MarkdownIt from "markdown-it";
import { slideExtension } from "./md-extension/slideextension";
import hljs from 'highlight.js';

export class MarkdownRenderer {
    static renderer: MarkdownRenderer;
    static get it(): MarkdownRenderer {
        this.renderer = this.renderer ?? new MarkdownRenderer()

        return this.renderer;
    }

    private md: MarkdownIt;

    private constructor() {
        this.md = new MarkdownIt({
            highlight: (str: string, lang: string) => {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return '<pre class="hljs"><code>' +
                            hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                            '</code></pre>';
                    } catch (__) { }
                }

                return '<pre class="hljs"><code>' + this.md.utils.escapeHtml(str) + '</code></pre>';
            }
        });
        this.md.use(slideExtension);
        this.md.use(require('markdown-it-texmath'), {
            engine: require('katex'),
            delimiters: 'dollars',
        });
    }

    render(text: string) {
        return this.md.render(text);
    }
}