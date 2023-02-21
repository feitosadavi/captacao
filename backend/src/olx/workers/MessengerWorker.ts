import { register } from 'ts-node';

import { parentPort, workerData } from 'node:worker_threads';
import { Page } from '@playwright/test';
import { initBrowser } from '../../config/context';
import { StackMessageType } from '../../domain/logger.protocols';

register()
// import { createMessenger } from '../modules/Messenger';

// we need this so that we can use typescript with thread workers

async function delay (ms: number): Promise<any> {
  return new Promise(resolve => setTimeout(resolve, ms))
}


async function main () {
  console.log('MESSENGERWORKER');

  const { links } = workerData

  const messengerPage = (await initBrowser({ viewport: { height: 600 } }))
  const messenger = new Messenger(messengerPage)
  for (const [index, link] of links.entries()) {
    try {
      await messenger.sendMessage(link, index === 0)

      const msgContent: StackMessageType = {
        type: 'info',
        label: 'olx',
        description: link
      }

      parentPort?.postMessage({ type: 'stack', content: msgContent })
    } catch (error) {
      console.error(error);
    } finally {
      parentPort?.postMessage({ type: 'progress', content: { current: index + 1 } })
    }
  }
  await messengerPage.close()

  // await messenger.sendMessage(links[0])
  // parentPort?.postMessage('finish')
  parentPort?.postMessage({ type: 'status', content: 'finished' })

}

main()

class Messenger {
  msg: string = 'lorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenlorenloren'

  constructor(private readonly page?: Page) { }

  async sendMessage (postUrl: string, clickChatBtn?: boolean) {

    await this.page?.goto(postUrl, { waitUntil: 'domcontentloaded' })

    if (clickChatBtn) {
      await this.clickCookiesBtn()
    } else {
      await this.clickChatBtn()

      const hasSentPreviousMessages = await this.hasSentPreviousMessages()

      if (!hasSentPreviousMessages) {
        await this.typeMessage()
        const element = await this.page?.$('[aria-label="Enviar mensagem"]')

        // await element?.click()
        console.log('MENSAGEM ENVIADA!');
      }
    }
  }

  async clickCookiesBtn () {
    await delay(1200)
    const cookie = await this.page?.$('#cookie-notice-ok-button')
    console.log({ cookie: cookie && 'tem cookie' });

    await cookie?.click()
  }

  private async clickChatBtn () {
    this.page?.waitForSelector('[data-element="button_reply-chat"]')
    const chatBtn = this.page?.locator('[data-element="button_reply-chat"]')

    // const chatBtn = await this.page?.$('.ad__sc-1wfs6j-0.jdKaWZ') as unknown as any[]
    console.log({ chatBtn: chatBtn && 'tem chatBtn' });

    // console.log({ chatBtn });


    await chatBtn?.click()
    await chatBtn?.click()
    // if (chatBtn === null || chatBtn === undefined) console.log('Erro ao clicar no botão do chat')
  }

  private async hasSentPreviousMessages () {
    try {
      await this.page?.waitForSelector(`[type="Alone"]`, { timeout: 3000 })
      const previousMsg = await this.page?.$('[type="alone"]');
      return previousMsg !== null
    } catch (error) {
      console.log('não achei mensagens anteriores');
      // if (error instanceof TimeoutError) {
      // se não tiver mensagens anteriores, retorna false
      return false
      // }
    }
  }

  private async typeMessage () {
    try {
      await this.page?.waitForSelector('textarea')
      await this.page?.type('textarea', this.msg)
    } catch (error) {
      console.log(error);
    }
  }
}
