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
const PostsGetterService_webmotors_1 = require("../modules/PostsGetterService.webmotors");
// we need this so that we can use typescript with thread workers
(0, ts_node_1.register)();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const { query } = node_worker_threads_1.workerData;
        console.log('WEBMOTORS - PostsGetterWorker');
        console.log({ query });
        const postsGetter = new PostsGetterService_webmotors_1.PostsGetterService();
        // // parentPort?.postMessage({ totalOfLinks: allLinks.length, links: allLinks })
        const res = yield postsGetter.start(query);
        // // console.log({ res });
        // parentPort?.postMessage(['https://www.webmotors.com.br/carros/DF/Fiat/Uno'])
    });
}
main();
