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
const ts_node_1 = require("ts-node");
const node_worker_threads_1 = require("node:worker_threads");
const main_1 = require("../main");
(0, ts_node_1.register)();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const { query, target, message } = node_worker_threads_1.workerData;
        console.log({ query, target });
        console.log(`${target} - MainWorker`);
        const bot = (0, main_1.createBot)((logMsg) => {
            node_worker_threads_1.parentPort === null || node_worker_threads_1.parentPort === void 0 ? void 0 : node_worker_threads_1.parentPort.postMessage(logMsg);
        }, { target, message });
        bot.run(query);
    });
}
main();
