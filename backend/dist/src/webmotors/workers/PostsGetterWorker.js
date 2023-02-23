"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_worker_threads_1 = require("node:worker_threads");
const ts_node_1 = require("ts-node");
const PostsGetterService_webmotors_1 = require("../modules/PostsGetterService.webmotors");
// we need this so that we can use typescript with thread workers
(0, ts_node_1.register)();
async function main() {
    const { query } = node_worker_threads_1.workerData;
    console.log('WEBMOTORS - PostsGetterWorker');
    console.log({ query });
    const postsGetter = new PostsGetterService_webmotors_1.PostsGetterService();
    // // parentPort?.postMessage({ totalOfLinks: allLinks.length, links: allLinks })
    const res = await postsGetter.start(query);
    // // console.log({ res });
    // parentPort?.postMessage(['https://www.webmotors.com.br/carros/DF/Fiat/Uno'])
}
main();
