"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_worker_threads_1 = require("node:worker_threads");
const ts_node_1 = require("ts-node");
const context_1 = require("../../config/context");
const PostsGetter_1 = require("../modules/PostsGetter");
// we need this so that we can use typescript with thread workers
(0, ts_node_1.register)();
async function main() {
    console.log('PostsGetterWorker');
    const { query } = node_worker_threads_1.workerData;
    const postsGetterPage = (await (0, context_1.initBrowser)());
    const postsGetter = new PostsGetter_1.PostsGetter(postsGetterPage);
    const allLinks = [];
    let totalOfLinks = 0;
    node_worker_threads_1.parentPort?.postMessage({ totalOfLinks: allLinks.length, links: allLinks });
    await postsGetter.start(query, (count, links) => {
        totalOfLinks = count;
        allLinks.push(...links);
    });
    node_worker_threads_1.parentPort?.postMessage({ totalOfLinks: allLinks.length, links: allLinks });
}
main();
