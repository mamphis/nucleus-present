import MarkdownIt from "markdown-it";
import { slideExtension } from "./md-extension/slideextension";
import hljs from 'highlight.js';
import { parse } from "yaml";
import { commentExtension } from "./md-extension/commentextension";

type Dictionary<V> = { [key: string | number | symbol]: V };

type RenderResult = {
    headers: Dictionary<string>,
    html: string;
}

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
        this.md.use(commentExtension);
        this.md.use(require('markdown-it-texmath'), {
            engine: require('katex'),
            delimiters: 'dollars',
        });
    }

    render(text: string): RenderResult {
        let presentationText = text.trim();
        const headers: Dictionary<string> = {};
        if (presentationText.startsWith('---')) {
            // take out the first line, because we know it's a yaml header signer
            const lines = presentationText.split('\n').slice(1);
            const headerEnd = lines.indexOf('---');
            if (headerEnd > -1) {
                const yaml = parse(lines.slice(0, headerEnd).join('\n'));
                for (const key in yaml) {
                    if (Object.prototype.hasOwnProperty.call(yaml, key)) {
                        const value = yaml[key];
                        if (typeof value === 'string') {
                            headers[key] = value;
                        }
                    }
                }

                presentationText = lines.slice(headerEnd + 1).join('\n');
            }
        }

        return {
            headers,
            html: this.md.render(presentationText),
        };
    }
}