"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_node_1 = require("ts-node");
const node_worker_threads_1 = require("node:worker_threads");
const context_1 = require("../../config/context");
(0, ts_node_1.register)();
// import { createMessenger } from '../modules/Messenger';
// we need this so that we can use typescript with thread workers
async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function main() {
    console.log('Webmotors - MessengerWorker');
    const { links } = node_worker_threads_1.workerData;
    console.log(links);
    const messengerPage = (await (0, context_1.initBrowser)({ viewport: { height: 600 } }));
    const messenger = new Messenger(messengerPage);
    for (const [index, link] of links.entries()) {
        try {
            await messenger.sendMessage(link, index === 0);
            const msgContent = {
                type: 'info',
                label: 'webmotors',
                description: link
            };
            node_worker_threads_1.parentPort?.postMessage({ type: 'stack', content: msgContent });
        }
        catch (error) {
            console.error(error);
        }
        finally {
            node_worker_threads_1.parentPort?.postMessage({ type: 'progress', content: { current: index + 1 } });
        }
    }
}
main();
class Messenger {
    constructor(page) {
        this.page = page;
        this.msg = 'lorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenloren';
    }
    async sendMessage(postUrl, clickChatBtn) {
        await this.page?.goto(postUrl, { waitUntil: 'domcontentloaded' });
        if (clickChatBtn) {
            await this.clickCookiesBtn();
        }
        else {
            await this.clickChatBtn();
            const hasSentPreviousMessages = await this.hasSentPreviousMessages();
            if (!hasSentPreviousMessages) {
                await this.typeMessage();
                const element = await this.page?.$('[aria-label="Enviar mensagem"]');
                // await element?.click()
                console.log('MENSAGEM ENVIADA!');
            }
        }
    }
    async clickCookiesBtn() {
        await delay(1200);
        const cookie = await this.page?.$('#cookie-notice-ok-button');
        console.log({ cookie: cookie && 'tem cookie' });
        await cookie?.click();
    }
    async clickChatBtn() {
        this.page?.waitForSelector('[data-element="button_reply-chat"]');
        const chatBtn = this.page?.locator('[data-element="button_reply-chat"]');
        // const chatBtn = await this.page?.$('.ad__sc-1wfs6j-0.jdKaWZ') as unknown as any[]
        console.log({ chatBtn: chatBtn && 'tem chatBtn' });
        // console.log({ chatBtn });
        await chatBtn?.click();
        await chatBtn?.click();
        // if (chatBtn === null || chatBtn === undefined) console.log('Erro ao clicar no botão do chat')
    }
    async hasSentPreviousMessages() {
        try {
            await this.page?.waitForSelector(`[type="Alone"]`, { timeout: 3000 });
            const previousMsg = await this.page?.$('[type="alone"]');
            return previousMsg !== null;
        }
        catch (error) {
            console.log('não achei mensagens anteriores');
            // if (error instanceof TimeoutError) {
            // se não tiver mensagens anteriores, retorna false
            return false;
            // }
        }
    }
    async typeMessage() {
        try {
            await this.page?.waitForSelector('textarea');
            await this.page?.type('textarea', this.msg);
        }
        catch (error) {
            console.log(error);
        }
    }
}
