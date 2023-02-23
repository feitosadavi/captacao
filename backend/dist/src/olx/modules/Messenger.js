"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessenger = void 0;
async function createMessenger() {
    console.log('Create messenger');
    // msg: string = '.'
    // constructor(private readonly page?: Page) { }
    // async sendMessage (postUrl: string) {
    //   await this.page?.goto(postUrl, { waitUntil: 'domcontentloaded' })
    //   await this.clickChatBtn()
    //   const hasSentPreviousMessages = await this.hasSentPreviousMessages()
    //   if (!hasSentPreviousMessages) {
    //     await this.typeMessage()
    //     const element = await this.page?.$('[aria-label="Enviar mensagem"]')
    //     // await element?.click()
    //     console.log('MENSAGEM ENVIADA!');
    //   }
    // }
    // async clickChatBtn () {
    //   const cookie = await this.page?.$('.cookie-notice-ok-button')
    //   console.log({ cookie });
    //   await cookie?.click()
    //   const chatBtn = this.page?.locator('[data-element="button_reply-chat"]')
    //   console.log({ chatBtn });
    //   if (!chatBtn) console.log('Erro ao clicar no botão do chat')
    //   await chatBtn?.click()
    // }
    // async hasSentPreviousMessages () {
    //   try {
    //     await this.page?.waitForSelector(`[type="Alone"]`, { timeout: 3000 })
    //     const previousMsg = await this.page?.$('[type="alone"]');
    //     console.log({ previousMsg });
    //     return previousMsg !== null
    //   } catch (error) {
    //     console.log('não achei mensagens anteriores');
    //     // if (error instanceof TimeoutError) {
    //     // se não tiver mensagens anteriores, retorna false
    //     return false
    //     // }
    //   }
    // }
    // async typeMessage () {
    //   try {
    //     await this.page?.waitForSelector('textarea')
    //     console.log('escrevendo mensagem')
    //     console.log({ MSG: this.msg });
    //     await this.page?.type('textarea', this.msg)
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
}
exports.createMessenger = createMessenger;
// export class Messenger {
// msg: string = '.'
// constructor(private readonly page?: Page) { }
// async sendMessage (postUrl: string) {
//   await this.page?.goto(postUrl, { waitUntil: 'domcontentloaded' })
//   await this.clickChatBtn()
//   const hasSentPreviousMessages = await this.hasSentPreviousMessages()
//   if (!hasSentPreviousMessages) {
//     await this.typeMessage()
//     const element = await this.page?.$('[aria-label="Enviar mensagem"]')
//     // await element?.click()
//     console.log('MENSAGEM ENVIADA!');
//   }
// }
// async clickChatBtn () {
//   const cookie = await this.page?.$('.cookie-notice-ok-button')
//   console.log({ cookie });
//   await cookie?.click()
//   const chatBtn = this.page?.locator('[data-element="button_reply-chat"]')
//   console.log({ chatBtn });
//   if (!chatBtn) console.log('Erro ao clicar no botão do chat')
//   await chatBtn?.click()
// }
// async hasSentPreviousMessages () {
//   try {
//     await this.page?.waitForSelector(`[type="Alone"]`, { timeout: 3000 })
//     const previousMsg = await this.page?.$('[type="alone"]');
//     console.log({ previousMsg });
//     return previousMsg !== null
//   } catch (error) {
//     console.log('não achei mensagens anteriores');
//     // if (error instanceof TimeoutError) {
//     // se não tiver mensagens anteriores, retorna false
//     return false
//     // }
//   }
// }
// async typeMessage () {
//   try {
//     await this.page?.waitForSelector('textarea')
//     console.log('escrevendo mensagem')
//     console.log({ MSG: this.msg });
//     await this.page?.type('textarea', this.msg)
//   } catch (error) {
//     console.log(error);
//   }
// }
// }
