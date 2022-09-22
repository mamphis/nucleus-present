import MarkdownIt, { PluginSimple } from 'markdown-it';
import { RuleBlock } from 'markdown-it/lib/parser_block';
import Renderer, { RenderRule } from 'markdown-it/lib/renderer';

export const slideExtension: PluginSimple = (md: MarkdownIt) => {
    const slideMarker = '@@@'

    function validate(params: string, markup: string) {
        return markup.trim().match(/^@@@\s*(.*)$/);
    }

    const parser: RuleBlock = (state, startLine, endLine, silent): boolean => {
        state.env.slideNo = state.env.slideNo ?? 0;

        var nextLine, marker_count, markup, params, token,
            old_parent, old_line_max,
            auto_closed = false,
            start = state.bMarks[startLine] + state.tShift[startLine],
            max = state.eMarks[startLine];

        // Check out the first character quickly,
        // this should filter out most of non-containers
        if (slideMarker.charCodeAt(0) !== state.src.charCodeAt(start)) {
            return false;
        }

        if (state.src.substring(start, start + slideMarker.length) !== slideMarker) {
            return false;
        }

        const pos = start + slideMarker.length;
        // Check out the rest of the marker string
        markup = state.src.slice(start, pos);
        params = state.src.slice(pos, max);
        if (!validate(params, markup)) { return false; }

        // Since start is found, we can report success here in validation mode
        if (silent) { return true; }

        // Search for the end of the block
        nextLine = startLine + 1;

        for (; ; nextLine++) {
            if (nextLine >= endLine) {
                // unclosed block should be autoclosed by end of document.
                // also block seems to be autoclosed by end of parent
                auto_closed = true;
                break;
            }

            start = state.bMarks[nextLine] + state.tShift[nextLine];
            max = state.eMarks[nextLine];

            if (start < max && state.sCount[nextLine] < state.blkIndent) {
                // non-empty line with negative indent should stop the list:
                // - ```
                //  test
                break;
            }

            // We dont have a new slide
            if (slideMarker.charCodeAt(0) !== state.src.charCodeAt(start)) {
                continue;
            }

            if (state.src.substring(start, start + slideMarker.length) !== slideMarker) {
                continue;
            }

            // We have a new Slide...
            nextLine--;
            // found!
            break;
        }

        old_parent = state.parentType;
        old_line_max = state.lineMax;
        state.parentType = 'root';

        // Close the containerSlide if it was opened before
        const lastToken = [...state.tokens].reverse().find(element => ['container_slide_open', 'container_slide_close'].includes(element.type));

        // this will prevent lazy continuations from ever going past our end marker
        state.lineMax = nextLine;
        token = state.push('container_slide_open', 'div', 1);
        token.markup = markup;
        token.block = true;
        token.info = params;
        token.level = ++state.env.slideNo;
        token.map = [startLine, nextLine];

        state.md.block.tokenize(state, startLine + 1, nextLine);

        token = state.push('container_slide_close', 'div', -1);
        token.markup = state.src.slice(start, pos);
        token.block = true;

        state.parentType = old_parent;
        state.lineMax = old_line_max;
        state.line = nextLine + (auto_closed ? 1 : 0);

        return true;
    };

    const render: RenderRule = (tokens, idx, _options, env, self) => {
        const token = tokens[idx];
        if (token.nesting === 1) {
            token.attrJoin('class', 'slide');
            if (token.info) {
                token.attrJoin('class', token.info.trim())
            }
            token.attrJoin('data-slide-no', token.level.toString());
        }

        return self.renderToken(tokens, idx, _options);
    }


    md.block.ruler.before('fence', 'slide', parser, {
        alt: ['paragraph', 'reference', 'blockquote', 'list']
    });

    md.renderer.rules['container_slide_open'] = render;
    md.renderer.rules['container_slide_close'] = render;
}

