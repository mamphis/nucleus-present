import express, { Application } from "express";
import { createServer, Server as HttpServer } from "http";
import { Server as SocketIoServer, Socket } from 'socket.io';

import editRouter from './routes/edit';
import themeRouter from './routes/theme';
import presentRouter from './routes/present';

export class Server {
    private app: Application;
    private server: HttpServer;
    readonly io: SocketIoServer;

    constructor(private port: number) {
        this.app = express();
        this.server = createServer(this.app);
        this.io = new SocketIoServer(this.server);

        this.app.use(express.json());
        this.app.set('view engine', 'ejs');

        this.app.use('/node_modules/monaco-editor/min/vs', express.static('node_modules/monaco-editor/min/vs'));
        this.app.use('/style', express.static('node_modules/katex/dist'))
        this.app.use('/style/code.css', express.static('node_modules/highlight.js/styles/tokyo-night-dark.css'));
        //    this.app.use('/style/code.css', (req, res, next) => {
        //     res.sendFile('tokio-night-dark.css', { root: './node_modules/highlight.js/styles' });
        // });

        this.app.use('/theme', themeRouter);
        this.app.use('/edit', editRouter);
        this.app.use('/present', presentRouter);
        this.app.use((req, res, next) => {
            return res.redirect('/edit');
        });

        this.configure();
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`);
        });
    }

    private configure() {
        const presentations: {
            [presentation: string]: {
                presenter?: Socket,
                watcher: Socket[],
            }
        } = {};
        this.io.on("connection", (socket: Socket) => {
            console.log('socket connected: ', socket.id);
            socket.on('watch presentation', (presentation: string) => {
                console.log('watch presentation ' + presentation, socket.id, presentations[presentation]?.presenter?.id);
                socket.join(presentation);

                if (!(presentation in presentations)) {
                    presentations[presentation] = {
                        watcher: [],
                    };
                }

                presentations[presentation].watcher.push(socket);
                if (presentations[presentation].presenter) {
                    presentations[presentation].presenter?.emit('get configuration', socket.id);
                    presentations[presentation].presenter?.emit('update watchers', presentations[presentation].watcher.length);
                }
            });

            socket.on('present', (presentation: string) => {
                console.log('present ' + presentation, socket.id);
                if (presentations[presentation]?.presenter) {
                    socket.emit('error', 'This presentation already has an presenter.');
                    return;
                }

                socket.join(presentation);
                socket.to(presentation).emit('presentation started');

                if (!(presentation in presentations)) {
                    presentations[presentation] = {
                        watcher: [],
                    };
                }

                presentations[presentation].presenter = socket;
                presentations[presentation].presenter?.emit('update watchers', presentations[presentation].watcher.length);
            });

            socket.on('initialize presentation', (presentation: string, peerId: string, config: any) => {
                console.log('initialize presentation ' + presentation, socket.id, peerId, config);
                if (!presentations[presentation]?.presenter) {
                    socket.emit('error', 'This presentation already has an presenter.');
                    return;
                }

                socket.to(peerId).emit('initialize presentation', config);
            });

            socket.on('set slide', (presentation: string, slide: number) => {
                console.log('setting slide', socket.id, presentation, slide);
                if (presentations[presentation]?.presenter?.id !== socket.id) {
                    socket.emit('error', 'You are not the presenter of this presentation.');
                    return;
                }

                socket.to(presentation).emit('set slide', slide);
            });

            socket.on('disconnecting', () => {
                console.log("socket disconnecting", socket.id);

                socket.rooms.forEach(room => {
                    console.log("leaving rooms", room);
                    if (!presentations[room]) {
                        return;
                    }

                    presentations[room].watcher = presentations[room].watcher.filter(w => w.id !== socket.id);
                    presentations[room].presenter?.emit('update watchers', presentations[room].watcher.length);

                    if (presentations[room]?.presenter?.id === socket.id) {
                        presentations[room].presenter = undefined;
                    }
                });
            });
        });
    }
}