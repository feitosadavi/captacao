"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runWorkerSync = void 0;
const worker_threads_1 = require("worker_threads");
const path_1 = __importDefault(require("path"));
const runWorkerSync = ({ name, target, data, onMessage, onExit }) => {
    new Promise((res, rej) => {
        console.log(process.env.NODE_ENV);
        const termination = process.env.NODE_ENV === 'production' ? 'js' : 'js';
        const worker = new worker_threads_1.Worker(path_1.default.resolve(__dirname, `../${target}/workers/${name}.${termination}`), {
            workerData: Object.assign(Object.assign({}, data), { target })
        });
        worker.on('message', (msg) => onMessage ? onMessage(msg) : null);
        worker.on('error', (err) => console.error(err));
        worker.on("exit", (code) => {
            if (onExit)
                onExit();
            if (code === 3)
                console.log(`${target}-${name} Forced Stop`);
            else if (code !== 0)
                console.error(new Error(`Worker stopped with exit code ${code}`));
        });
        res('ok');
    });
};
exports.runWorkerSync = runWorkerSync;
