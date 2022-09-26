import { NextFunction, Request, Response, Router } from "express";
import { mkdir, readdir, readFile, stat, writeFile } from "fs/promises";
import { resolve } from "path";
import { MarkdownRenderer } from "../../lib/markdownrenderer";

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const files = await readdir('./data');
    return res.render('list-files', {
        files,
    });
});

router.post('/parse', (req: Request, res: Response, next: NextFunction) => {
    const html = MarkdownRenderer.it.render(req.body.data);
    return res.json({
        html
    });
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    return res.render('edit', {
        name: req.params.id,
    });
});

router.get('/:id/data', async (req: Request, res: Response, next: NextFunction) => {
    const slideDir = (await readdir('./data')).find(f => f === req.params.id);

    if (!slideDir) {
        return res.json({
            name: req.params.id,
            md: '',
            style: '',
        });
    }

    const slidesFile = resolve('./data', slideDir, 'slides');
    const styleFile = resolve('./data', slideDir, 'style');

    const md = await stat(slidesFile).then(async () => (await readFile(slidesFile, { encoding: 'utf-8' })).toString()).catch(() => '');
    const style = await stat(styleFile).then(async () => (await readFile(styleFile)).toString()).catch(() => '');

    return res.json({
        name: req.params.id,
        md,
        style,
    });
});

router.post('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await mkdir(resolve('./data', req.params.id), { recursive: true });
    if ('data' in req.body) {
        await writeFile(resolve('./data', req.params.id, 'slides'), req.body.data);
    }

    if ('style' in req.body) {
        await writeFile(resolve('./data', req.params.id, 'style'), req.body.style);
    }

    return res.end();
});

export default router;