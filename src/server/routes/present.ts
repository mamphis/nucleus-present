import { NextFunction, Request, Response, Router } from "express";
import { readdir, readFile, stat } from "fs/promises";
import { resolve } from "path";
import { MarkdownRenderer } from "../../lib/markdownrenderer";

const router = Router();

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    return res.render('view', {
        presentation: req.params.id
    });
});

router.get('/:id/present', async (req: Request, res: Response, next: NextFunction) => {
    return res.render('present', {
        presentation: req.params.id
    });
});

router.get('/:id/html', async (req: Request, res: Response, next: NextFunction) => {
    const slideDir = (await readdir('./data')).find(f => f === req.params.id);

    if (!slideDir) {
        return res.redirect('/edit/' + req.params.id);
    }

    // FIXME: prevent path traversal.
    const slidesFile = resolve('./data', slideDir, 'slides');
    const styleFile = resolve('./data', slideDir, 'style');

    const md = await stat(slidesFile).then(async () => (await readFile(slidesFile, { encoding: 'utf-8' })).toString()).catch(() => '');
    const style = await stat(styleFile).then(async () => (await readFile(styleFile)).toString()).catch(() => '');

    const html = MarkdownRenderer.it.render(md);
    return res.json({
        html,
        style,
    });
});

export default router;