import express from "express";
import "dotenv/config";
import path from "path";
import url from "url";
import http from "http";
import { Server } from "socket.io";
import { connectionDB } from "./config/dbConnection.js";

const connection = await connectionDB();

connection.on('error', (erro) => {
    console.error('connection error', erro)
});

connection.once('open', () => {
    console.log("Database connection succeed");
});

const app = express();
const caminhoAtual = url.fileURLToPath(import.meta.url);
const diretorioPublico = path.join(caminhoAtual, "../..", "public");
const port = process.env.PORT || 8080;

app.use(
    express.static(diretorioPublico),
    express.json()
);

const servidorHttp = http.createServer(app);

servidorHttp.listen(port, () => {
    console.log(`Listenning servidor at port ${port}.`);
});

const io = new Server(servidorHttp);

export default io;