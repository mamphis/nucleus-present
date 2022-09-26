/**
 *  [colorRegistry_1.editorBackground]: '#FFFFFE',
            [colorRegistry_1.editorForeground]: '#000000',
            [colorRegistry_1.editorInactiveSelection]: '#E5EBF1',
            [editorColorRegistry_1.editorIndentGuides]: '#D3D3D3',
            [editorColorRegistry_1.editorActiveIndentGuides]: '#939393',
            [colorRegistry_1.editorSelectionHighlight]: '#ADD6FF4D'
 */

const themes: { [theme: string]: { base: string, inherit: boolean, colors: { [color: string]: string }, rules: Array<{ token: string, background?: string, foreground?: string, fontStyle?: string }> } } = {
    tokioNightStorm:
    {
        "base": "vs-dark",
        "inherit": true,
        "rules": [
            {
                "background": "002451",
                "token": ""
            },
            {
                "foreground": "7285b7",
                "token": "comment"
            },
            {
                "foreground": "ffffff",
                "token": "keyword.operator.class"
            },
            {
                "foreground": "ffffff",
                "token": "keyword.operator"
            },
            {
                "foreground": "ffffff",
                "token": "constant.other"
            },
            {
                "foreground": "ffffff",
                "token": "source.php.embedded.line"
            },
            {
                "foreground": "ff9da4",
                "token": "variable"
            },
            {
                "foreground": "ff9da4",
                "token": "support.other.variable"
            },
            {
                "foreground": "ff9da4",
                "token": "string.other.link"
            },
            {
                "foreground": "ff9da4",
                "token": "string.regexp"
            },
            {
                "foreground": "ff9da4",
                "token": "entity.name.tag"
            },
            {
                "foreground": "ff9da4",
                "token": "entity.other.attribute-name"
            },
            {
                "foreground": "ff9da4",
                "token": "meta.tag"
            },
            {
                "foreground": "ff9da4",
                "token": "declaration.tag"
            },
            {
                "foreground": "ff9da4",
                "token": "markup.deleted.git_gutter"
            },
            {
                "foreground": "ffc58f",
                "token": "constant.numeric"
            },
            {
                "foreground": "ffc58f",
                "token": "constant.language"
            },
            {
                "foreground": "ffc58f",
                "token": "support.constant"
            },
            {
                "foreground": "ffc58f",
                "token": "constant.character"
            },
            {
                "foreground": "ffc58f",
                "token": "variable.parameter"
            },
            {
                "foreground": "ffc58f",
                "token": "punctuation.section.embedded"
            },
            {
                "foreground": "ffc58f",
                "token": "keyword.other.unit"
            },
            {
                "foreground": "ffeead",
                "token": "entity.name.class"
            },
            {
                "foreground": "ffeead",
                "token": "entity.name.type.class"
            },
            {
                "foreground": "ffeead",
                "token": "support.type"
            },
            {
                "foreground": "ffeead",
                "token": "support.class"
            },
            {
                "foreground": "d1f1a9",
                "token": "string"
            },
            {
                "foreground": "d1f1a9",
                "token": "constant.other.symbol"
            },
            {
                "foreground": "d1f1a9",
                "token": "entity.other.inherited-class"
            },
            {
                "foreground": "d1f1a9",
                "token": "markup.heading"
            },
            {
                "foreground": "d1f1a9",
                "token": "markup.inserted.git_gutter"
            },
            {
                "foreground": "99ffff",
                "token": "keyword.operator"
            },
            {
                "foreground": "99ffff",
                "token": "constant.other.color"
            },
            {
                "foreground": "bbdaff",
                "token": "entity.name.function"
            },
            {
                "foreground": "bbdaff",
                "token": "meta.function-call"
            },
            {
                "foreground": "bbdaff",
                "token": "support.function"
            },
            {
                "foreground": "bbdaff",
                "token": "keyword.other.special-method"
            },
            {
                "foreground": "bbdaff",
                "token": "meta.block-level"
            },
            {
                "foreground": "bbdaff",
                "token": "markup.changed.git_gutter"
            },
            {
                "foreground": "ebbbff",
                "token": "keyword"
            },
            {
                "foreground": "ebbbff",
                "token": "storage"
            },
            {
                "foreground": "ebbbff",
                "token": "storage.type"
            },
            {
                "foreground": "ebbbff",
                "token": "entity.name.tag.css"
            },
            {
                "foreground": "ffffff",
                "background": "f99da5",
                "token": "invalid"
            },
            {
                "foreground": "ffffff",
                "background": "bbdafe",
                "token": "meta.separator"
            },
            {
                "foreground": "ffffff",
                "background": "ebbbff",
                "token": "invalid.deprecated"
            },
            {
                "foreground": "ffffff",
                "token": "markup.inserted.diff"
            },
            {
                "foreground": "ffffff",
                "token": "markup.deleted.diff"
            },
            {
                "foreground": "ffffff",
                "token": "meta.diff.header.to-file"
            },
            {
                "foreground": "ffffff",
                "token": "meta.diff.header.from-file"
            },
            {
                "foreground": "718c00",
                "token": "markup.inserted.diff"
            },
            {
                "foreground": "718c00",
                "token": "meta.diff.header.to-file"
            },
            {
                "foreground": "c82829",
                "token": "markup.deleted.diff"
            },
            {
                "foreground": "c82829",
                "token": "meta.diff.header.from-file"
            },
            {
                "foreground": "ffffff",
                "background": "4271ae",
                "token": "meta.diff.header.from-file"
            },
            {
                "foreground": "ffffff",
                "background": "4271ae",
                "token": "meta.diff.header.to-file"
            },
            {
                "foreground": "3e999f",
                "fontStyle": "italic",
                "token": "meta.diff.range"
            }
        ],
        "colors": {
            "editor.foreground": "#FFFFFF",
            "editor.background": "#002451",
            "editor.selectionBackground": "#003F8E",
            "editor.lineHighlightBackground": "#00346E",
            "editorCursor.foreground": "#FFFFFF",
            "editorWhitespace.foreground": "#404F7D"
        }
    },
    tomorrowNight: {
        "base": "vs-dark",
        "inherit": true,
        "rules": [
            {
                "background": "1D1F21",
                "token": ""
            },
            {
                "foreground": "969896",
                "token": "comment"
            },
            {
                "foreground": "ced1cf",
                "token": "keyword.operator.class"
            },
            {
                "foreground": "ced1cf",
                "token": "constant.other"
            },
            {
                "foreground": "ced1cf",
                "token": "source.php.embedded.line"
            },
            {
                "foreground": "cc6666",
                "token": "variable"
            },
            {
                "foreground": "cc6666",
                "token": "support.other.variable"
            },
            {
                "foreground": "cc6666",
                "token": "string.other.link"
            },
            {
                "foreground": "cc6666",
                "token": "string.regexp"
            },
            {
                "foreground": "cc6666",
                "token": "entity.name.tag"
            },
            {
                "foreground": "cc6666",
                "token": "entity.other.attribute-name"
            },
            {
                "foreground": "cc6666",
                "token": "meta.tag"
            },
            {
                "foreground": "cc6666",
                "token": "declaration.tag"
            },
            {
                "foreground": "cc6666",
                "token": "markup.deleted.git_gutter"
            },
            {
                "foreground": "de935f",
                "token": "constant.numeric"
            },
            {
                "foreground": "de935f",
                "token": "constant.language"
            },
            {
                "foreground": "de935f",
                "token": "support.constant"
            },
            {
                "foreground": "de935f",
                "token": "constant.character"
            },
            {
                "foreground": "de935f",
                "token": "variable.parameter"
            },
            {
                "foreground": "de935f",
                "token": "punctuation.section.embedded"
            },
            {
                "foreground": "de935f",
                "token": "keyword.other.unit"
            },
            {
                "foreground": "f0c674",
                "token": "entity.name.class"
            },
            {
                "foreground": "f0c674",
                "token": "entity.name.type.class"
            },
            {
                "foreground": "f0c674",
                "token": "support.type"
            },
            {
                "foreground": "f0c674",
                "token": "support.class"
            },
            {
                "foreground": "b5bd68",
                "token": "string"
            },
            {
                "foreground": "b5bd68",
                "token": "constant.other.symbol"
            },
            {
                "foreground": "b5bd68",
                "token": "entity.other.inherited-class"
            },
            {
                "foreground": "b5bd68",
                "token": "markup.heading"
            },
            {
                "foreground": "b5bd68",
                "token": "markup.inserted.git_gutter"
            },
            {
                "foreground": "8abeb7",
                "token": "keyword.operator"
            },
            {
                "foreground": "8abeb7",
                "token": "constant.other.color"
            },
            {
                "foreground": "81a2be",
                "token": "entity.name.function"
            },
            {
                "foreground": "81a2be",
                "token": "meta.function-call"
            },
            {
                "foreground": "81a2be",
                "token": "support.function"
            },
            {
                "foreground": "81a2be",
                "token": "keyword.other.special-method"
            },
            {
                "foreground": "81a2be",
                "token": "meta.block-level"
            },
            {
                "foreground": "81a2be",
                "token": "markup.changed.git_gutter"
            },
            {
                "foreground": "b294bb",
                "token": "keyword"
            },
            {
                "foreground": "b294bb",
                "token": "storage"
            },
            {
                "foreground": "b294bb",
                "token": "storage.type"
            },
            {
                "foreground": "b294bb",
                "token": "entity.name.tag.css"
            },
            {
                "foreground": "ced2cf",
                "background": "df5f5f",
                "token": "invalid"
            },
            {
                "foreground": "ced2cf",
                "background": "82a3bf",
                "token": "meta.separator"
            },
            {
                "foreground": "ced2cf",
                "background": "b798bf",
                "token": "invalid.deprecated"
            },
            {
                "foreground": "ffffff",
                "token": "markup.inserted.diff"
            },
            {
                "foreground": "ffffff",
                "token": "markup.deleted.diff"
            },
            {
                "foreground": "ffffff",
                "token": "meta.diff.header.to-file"
            },
            {
                "foreground": "ffffff",
                "token": "meta.diff.header.from-file"
            },
            {
                "foreground": "718c00",
                "token": "markup.inserted.diff"
            },
            {
                "foreground": "718c00",
                "token": "meta.diff.header.to-file"
            },
            {
                "foreground": "c82829",
                "token": "markup.deleted.diff"
            },
            {
                "foreground": "c82829",
                "token": "meta.diff.header.from-file"
            },
            {
                "foreground": "ffffff",
                "background": "4271ae",
                "token": "meta.diff.header.from-file"
            },
            {
                "foreground": "ffffff",
                "background": "4271ae",
                "token": "meta.diff.header.to-file"
            },
            {
                "foreground": "3e999f",
                "fontStyle": "italic",
                "token": "meta.diff.range"
            }
        ],
        "colors": {
            "editor.foreground": "#C5C8C6",
            "editor.background": "#1D1F21",
            "editor.selectionBackground": "#373B41",
            "editor.lineHighlightBackground": "#282A2E",
            "editorCursor.foreground": "#AEAFAD",
            "editorWhitespace.foreground": "#4B4E55"
        }
    }
};

import { NextFunction, Request, Response, Router } from "express";

const router = Router();

router.get('/:name', async (req: Request, res: Response, next: NextFunction) => {
    if (req.params.name in themes) {
        return res.json(themes[req.params.name as string]);
    }

    res.status(404).end();
});

export default router;

