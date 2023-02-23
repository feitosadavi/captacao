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
exports.runWorker = void 0;
const worker_threads_1 = require("worker_threads");
const path_1 = __importDefault(require("path"));
const runWorker = ({ name, target, data }) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, rejects) => {
        const worker = new worker_threads_1.Worker(path_1.default.resolve(__dirname, `../${target}/workers/${name}.js`), {
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
});
exports.runWorker = runWorker;
