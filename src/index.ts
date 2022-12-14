import { mkdir } from "fs/promises";
import { MarkdownRenderer } from "./lib/markdownrenderer";
import { Server } from "./server/server";

// Create Data Dir
async function start() {
    await mkdir('./data', { recursive: true });

    const server = new Server(3030);
    server.start();
}

start();