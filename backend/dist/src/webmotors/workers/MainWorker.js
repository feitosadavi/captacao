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
Object.defineProperty(exports, "__esModule", { value: true });
// import { createBot } from 'olx/main';
const ts_node_1 = require("ts-node");
const worker_threads_1 = require("worker_threads");
const main_1 = require("../../olx/main");
(0, ts_node_1.register)();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('WEBMOTORS - MainWorker');
        const { query, target } = worker_threads_1.workerData;
        console.log({ query, target });
        const olxBot = (0, main_1.createBot)((logMsg) => {
            worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage(logMsg);
        }, { target });
        olxBot.run(query);
    });
}
main();
