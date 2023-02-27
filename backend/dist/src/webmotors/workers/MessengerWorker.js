"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_node_1 = require("ts-node");
const node_worker_threads_1 = require("node:worker_threads");
const context_1 = require("../../config/context");
const Auth_1 = require("../../olx/modules/Auth");
(0, ts_node_1.register)();
// import { createMessenger } from '../modules/Messenger';
// we need this so that we can use typescript with thread workers
async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function main() {
    console.log('Webmotors - MessengerWorker');
    const { links, target, message } = node_worker_threads_1.workerData;
    console.log(links);
    const messengerPage = (await (0, context_1.initBrowser)({ viewport: { height: 600, width: 1220 }, target }));
    const messenger = new Messenger(messengerPage);
    for (const [index, link] of links.entries()) {
        try {
            await messenger.sendMessage(link.id, message);
            const msgContent = {
                type: 'info',
                label: 'webmotors',
                description: link.url
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
    messengerPage.close();
}
main();
class Messenger {
    constructor(page) {
        this.page = page;
        this.msg = '';
    }
    async sendMessage(postUrl, message) {
        const { email, phone, name } = Auth_1.authOptions['webmotors'];
        console.log({ email, phone, name });
        console.log({ postUrl });
        try {
            const res = await this.page?.request.post('https://www.webmotors.com.br/api/detail/proposal/send', {
                data: {
                    "IdAnuncio": postUrl, "TipoVeiculo": "car", "Nome": name, "Email": email, "Telefone": phone, "Mensagem": message, "TipoAnuncio": "usados", "Origem": "D", "IdGuid": "69590590-7f1b-4e41-9526-d10d0dddba46", "QueroReceberPesquisa": false, "Canal": 48, "AdobeGuid": "52049267026225338522625859926780719869"
                }
            });
            console.log(res);
        }
        catch (error) {
            console.error(error);
        }
        // await axios.post(, {
        //   body: { "IdAnuncio": 45564671, "TipoVeiculo": "car", "Nome": "Davi Feitosa", "Email": "davifeitosa.trab@gmail.com", "Telefone": "(61) 5616-5456", "Mensagem": "Olá!!!!!", "TipoAnuncio": "usados", "Origem": "D", "IdGuid": "69590590-7f1b-4e41-9526-d10d0dddba46", "QueroReceberPesquisa": false, "Canal": 48, "AdobeGuid": "52049267026225338522625859926780719869" },
        //   headers: {
        //     "Accept": "*/*",
        //     "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        //     "Content-Type": "application/json"
        //   }
        // }).then(res => {
        //   console.log(res);
        // }).catch(console.error)
    }
    // async sendMessage (postUrl: string, message: string) {
    //   this.msg = message
    //   await this.page?.goto(postUrl, { waitUntil: 'domcontentloaded' })
    //   await this.typeMessage()
    //   await this.clickChatBtn()
    // }
    async clickChatBtn() {
        await this.page?.click('#ButtonSendProposal');
    }
    async typeMessage() {
        const textarea = await this.page?.$("textarea[name='message']");
        console.log({ textarea });
        // textarea?.click({ clickCount: 3 })
        // textarea?.type(this.msg)
        // await thi.page?.type("textarea[name='message']", this.msg)
    }
}
