import MarkdownIt from "markdown-it";
import { slideExtension } from "./md-extension/slideextension";

export class MarkdownRenderer {
    static renderer: MarkdownRenderer;
    static get it(): MarkdownRenderer {
        this.renderer = this.renderer ?? new MarkdownRenderer()

        return this.renderer;
    }

    private md: MarkdownIt;

    private constructor() {
        this.md = new MarkdownIt();
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