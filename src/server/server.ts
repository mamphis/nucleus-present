import express, { Application } from "express";
import editRouter from './routes/edit';
import themeRouter from './routes/theme';

export class Server {
    app: Application;
    constructor(private port: number) {
        this.app = express();

        this.app.use(express.json());
        this.app.set('view engine', 'ejs');

        this.app.use('/node_modules/monaco-editor/min/vs', express.static('node_modules/monaco-editor/min/vs'))
        this.app.use('/style', express.static('node_modules/katex/dist'))

        this.app.use('/theme', themeRouter);
        this.app.use('/edit', editRouter);
        this.app.use((req, res, next) => {
            return res.redirect('/edit');
        })
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`);
        });
    }
}