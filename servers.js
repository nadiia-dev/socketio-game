import { Server } from "socket.io";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

export const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + "/public"));
const expressServer = app.listen(9000);

export const io = new Server(expressServer);
