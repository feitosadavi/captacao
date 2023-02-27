"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsGetter = void 0;
const node_worker_threads_1 = require("node:worker_threads");
const ts_node_1 = require("ts-node");
const context_1 = require("../../config/context");
// we need this so that we can use typescript with thread workers
(0, ts_node_1.register)();
async function main() {
    console.log('PostsGetterWorker');
    const { query } = node_worker_threads_1.workerData;
    const postsGetterPage = (await (0, context_1.initBrowser)());
    const postsGetter = new PostsGetter(postsGetterPage);
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
class Sanitizor {
    // text comes on the follow format: resultado 1 - 50 de 1000 resultados
    extractTotalOfPagesNumbers(text) {
        const elements = text.split("de");
        const itensPerPage = Number(elements[0].replace('1 - ', '').trim());
        const totalOfLinks = Number(elements[1].replace(/\D/g, ''));
        const numberOfPages = Math.ceil(totalOfLinks / itensPerPage);
        return { totalOfLinks, numberOfPages };
    }
}
class PostsGetter {
    constructor(page) {
        this.page = page;
        this.sanitizor = new Sanitizor();
    }
    async start(query, cb) {
        const BASE_PATH = 'https://df.olx.com.br/autos-e-pecas/carros-vans-e-utilitarios';
        try {
            await this.page.goto(query, { waitUntil: 'domcontentloaded' });
            const { totalOfLinks, numberOfPages } = await this.getNumberOfPages();
            for (let i = 0; i < numberOfPages + 1; i++) {
                await this.page.goto(`${query}&o=${i}`, { waitUntil: 'domcontentloaded' });
                const posts = await this.getOnePagePosts();
                cb(totalOfLinks, posts);
            }
            await this.page.close();
        }
        catch (error) {
            console.log(error);
        }
    }
    async getNumberOfPages() {
        const resultadosText = await (this.page.getByText('resultados')).textContent();
        if (!resultadosText)
            throw new Error('Elemento resultados não encontrado');
        return this.sanitizor.extractTotalOfPagesNumbers(resultadosText);
    }
    async getOnePagePosts() {
        const postsLink = await this.page.evaluate(() => Array.from(document.querySelectorAll('.sc-12rk7z2-0.bjnzhV > a'), a => a.getAttribute('href')));
        return postsLink;
    }
}
exports.PostsGetter = PostsGetter;
