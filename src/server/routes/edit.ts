import { NextFunction, Request, Response, Router } from "express";
import { readdir, readFile } from "fs/promises";
import { resolve } from "path";
import { MarkdownRenderer } from "../../lib/markdownrenderer";

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const files = await readdir('./data');
    return res.render('list-files', {
        files,
    });
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const file = (await readdir('./data')).find(f => f === req.params.id);
    if (!file) {
        return res.render('edit', {
            name: req.params.id,
            data: '',
        });
    }

    return res.render('edit', {
        name: req.params.id,
        data: (await readFile(resolve('./data', file))).toString(),
    });
});

router.post('/parse', (req: Request, res: Response, next: NextFunction) => {
    const html = MarkdownRenderer.it.render(req.body.data);
    return res.json({
        html
    });
});

export default router;