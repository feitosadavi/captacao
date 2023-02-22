"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const query_parser_1 = require("./src/helpers/query-parser");
const runWorkerSync_1 = require("./src/helpers/runWorkerSync");
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*"
    }
});
let isBusy = false;
exports.io.on('connection', (socket) => {
    socket.on('search', ({ query, targets }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const queries = (0, query_parser_1.parseQuery)(query, targets);
            isBusy = true;
            queries.forEach(({ target, content }) => {
                (0, runWorkerSync_1.runWorkerSync)({
                    target,
                    name: 'MainWorker',
                    data: { query: content },
                    onMessage(logMsg) { socket.emit('log', logMsg); },
                });
            });
        }
        catch (error) {
            console.error(error);
        }
    }));
});
app.use((0, cors_1.default)());
app.get('/api', (req, res) => {
    res.json({
        message: 'Hello world',
    });
});
app.get('/ping', (req, res) => {
    res.json({
        message: 'pong',
    });
});
app.get('/is-busy', (req, res) => {
    res.json({
        isBusy,
    });
});
app.get('/is-not-busy', (req, res) => {
    isBusy = false;
});
app.get('/stop', (req, res) => {
    process.abort();
    // isBusy = false
});
httpServer.listen(5000, () => {
    console.log(`Server listening on ${5000}`);
});