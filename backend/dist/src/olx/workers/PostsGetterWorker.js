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
const node_worker_threads_1 = require("node:worker_threads");
const ts_node_1 = require("ts-node");
const context_1 = require("../../config/context");
const PostsGetter_1 = require("../modules/PostsGetter");
// we need this so that we can use typescript with thread workers
(0, ts_node_1.register)();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('PostsGetterWorker');
        const { query } = node_worker_threads_1.workerData;
        const postsGetterPage = (yield (0, context_1.initBrowser)());
        const postsGetter = new PostsGetter_1.PostsGetter(postsGetterPage);
        const allLinks = [];
        let totalOfLinks = 0;
        node_worker_threads_1.parentPort === null || node_worker_threads_1.parentPort === void 0 ? void 0 : node_worker_threads_1.parentPort.postMessage({ totalOfLinks: allLinks.length, links: allLinks });
        yield postsGetter.start(query, (count, links) => {
            totalOfLinks = count;
            allLinks.push(...links);
        });
        node_worker_threads_1.parentPort === null || node_worker_threads_1.parentPort === void 0 ? void 0 : node_worker_threads_1.parentPort.postMessage({ totalOfLinks: allLinks.length, links: allLinks });
    });
}
main();
