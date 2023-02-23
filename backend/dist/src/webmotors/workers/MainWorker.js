"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { createBot } from 'olx/main';
const ts_node_1 = require("ts-node");
const worker_threads_1 = require("worker_threads");
const main_1 = require("../../olx/main");
(0, ts_node_1.register)();
async function main() {
    console.log('WEBMOTORS - MainWorker');
    const { query, target, message } = worker_threads_1.workerData;
    console.log({ query, target });
    const olxBot = (0, main_1.createBot)((logMsg) => {
        worker_threads_1.parentPort?.postMessage(logMsg);
    }, { target, message });
    olxBot.run(query);
}
main();
