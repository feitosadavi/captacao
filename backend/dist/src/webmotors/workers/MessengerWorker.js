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
const context_1 = require("../../config/context");
(0, ts_node_1.register)();
// import { createMessenger } from '../modules/Messenger';
// we need this so that we can use typescript with thread workers
function delay(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => setTimeout(resolve, ms));
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Webmotors - MessengerWorker');
        const { links } = node_worker_threads_1.workerData;
        console.log(links);
        const messengerPage = (yield (0, context_1.initBrowser)({ viewport: { height: 600 } }));
        const messenger = new Messenger(messengerPage);
        for (const [index, link] of links.entries()) {
            try {
                yield messenger.sendMessage(link, index === 0);
                const msgContent = {
                    type: 'info',
                    label: 'webmotors',
                    description: link
                };
                node_worker_threads_1.parentPort === null || node_worker_threads_1.parentPort === void 0 ? void 0 : node_worker_threads_1.parentPort.postMessage({ type: 'stack', content: msgContent });
            }
            catch (error) {
                console.error(error);
            }
            finally {
                node_worker_threads_1.parentPort === null || node_worker_threads_1.parentPort === void 0 ? void 0 : node_worker_threads_1.parentPort.postMessage({ type: 'progress', content: { current: index + 1 } });
            }
        }
    });
}
main();
class Messenger {
    constructor(page) {
        this.page = page;
        this.msg = 'lorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenloren';
    }
    sendMessage(postUrl, clickChatBtn) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            yield ((_a = this.page) === null || _a === void 0 ? void 0 : _a.goto(postUrl, { waitUntil: 'domcontentloaded' }));
            if (clickChatBtn) {
                yield this.clickCookiesBtn();
            }
            else {
                yield this.clickChatBtn();
                const hasSentPreviousMessages = yield this.hasSentPreviousMessages();
                if (!hasSentPreviousMessages) {
                    yield this.typeMessage();
                    const element = yield ((_b = this.page) === null || _b === void 0 ? void 0 : _b.$('[aria-label="Enviar mensagem"]'));
                    // await element?.click()
                    console.log('MENSAGEM ENVIADA!');
                }
            }
        });
    }
    clickCookiesBtn() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield delay(1200);
            const cookie = yield ((_a = this.page) === null || _a === void 0 ? void 0 : _a.$('#cookie-notice-ok-button'));
            console.log({ cookie: cookie && 'tem cookie' });
            yield (cookie === null || cookie === void 0 ? void 0 : cookie.click());
        });
    }
    clickChatBtn() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            (_a = this.page) === null || _a === void 0 ? void 0 : _a.waitForSelector('[data-element="button_reply-chat"]');
            const chatBtn = (_b = this.page) === null || _b === void 0 ? void 0 : _b.locator('[data-element="button_reply-chat"]');
            // const chatBtn = await this.page?.$('.ad__sc-1wfs6j-0.jdKaWZ') as unknown as any[]
            console.log({ chatBtn: chatBtn && 'tem chatBtn' });
            // console.log({ chatBtn });
            yield (chatBtn === null || chatBtn === void 0 ? void 0 : chatBtn.click());
            yield (chatBtn === null || chatBtn === void 0 ? void 0 : chatBtn.click());
        });
    }
    hasSentPreviousMessages() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ((_a = this.page) === null || _a === void 0 ? void 0 : _a.waitForSelector(`[type="Alone"]`, { timeout: 3000 }));
                const previousMsg = yield ((_b = this.page) === null || _b === void 0 ? void 0 : _b.$('[type="alone"]'));
                return previousMsg !== null;
            }
            catch (error) {
                console.log('não achei mensagens anteriores');
                // if (error instanceof TimeoutError) {
                // se não tiver mensagens anteriores, retorna false
                return false;
                // }
            }
        });
    }
    typeMessage() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ((_a = this.page) === null || _a === void 0 ? void 0 : _a.waitForSelector('textarea'));
                yield ((_b = this.page) === null || _b === void 0 ? void 0 : _b.type('textarea', this.msg));
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
