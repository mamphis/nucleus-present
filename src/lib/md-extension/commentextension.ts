import MarkdownIt, { PluginSimple } from 'markdown-it';
import { RuleBlock } from 'markdown-it/lib/parser_block';
import Renderer, { RenderRule } from 'markdown-it/lib/renderer';

export const commentExtension: PluginSimple = (md: MarkdownIt) => {

    const parser: RuleBlock = (state, startLine, endLine, silent): boolean => {
        const start = state.bMarks[startLine] + state.tShift[startLine];
        const max = state.eMarks[startLine];

        if (state.src[start] !== '\'') {
            return false;
        }

        const comment = state.src.substring(start + 1, max).trim();

        // this will prevent lazy continuations from ever going past our end marker

        const token = state.push('comment_open', 'div', 1);
        token.markup = '\'';
        token.block = true;
        token.info = comment;
        token.map = [startLine, startLine];

        state.line = startLine + 1;
        return true;
    };

    const render: RenderRule = (tokens, idx, _options, env, self) => {
        const comment = tokens[idx];
        return `<div style="display: none" class="comment">${md.utils.escapeHtml(comment.info)}</div>`;
    }


    md.block.ruler.before('fence', 'comment', parser, {
        alt: ['paragraph', 'reference', 'blockquote', 'list']
    });

    md.renderer.rules['comment_open'] = render;
}

