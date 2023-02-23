"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_node_1 = require("ts-node");
const node_worker_threads_1 = require("node:worker_threads");
const main_1 = require("../main");
(0, ts_node_1.register)();
async function main() {
    const { query, target, message } = node_worker_threads_1.workerData;
    console.log({ query, target });
    console.log(`${target} - MainWorker`);
    const bot = (0, main_1.createBot)((logMsg) => {
        node_worker_threads_1.parentPort?.postMessage(logMsg);
    }, { target, message });
    bot.run(query);
}
main();
