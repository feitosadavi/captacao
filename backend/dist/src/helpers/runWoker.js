"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runWorker = void 0;
const worker_threads_1 = require("worker_threads");
const path_1 = __importDefault(require("path"));
const runWorker = async ({ name, target, data }) => {
    return new Promise((resolve, rejects) => {
        const worker = new worker_threads_1.Worker(path_1.default.resolve(__dirname, `../${target}/workers/${name}.ts`), {
            workerData: data
        });
        worker.on('message', resolve);
        // worker.on('message', (msg) => onMessage ? onMessage(msg) : null)
        worker.on('error', rejects);
        worker.on("exit", (code) => {
            if (code !== 0)
                console.error(new Error(`Worker stopped with exit code ${code}`));
        });
        // eventManager.on(`${target}-worker_event`, (msg: unknown) => {
        //   switch (msg) {
        //     case 'stop':
        //       worker?.postMessage('stop')
        //       break;
        //     default:
        //       break;
        //   }
        // })
    });
};
exports.runWorker = runWorker;
