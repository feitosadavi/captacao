import { Page } from '@playwright/test'
import { initBrowser } from '@/backend/config/context'

async function main () {
  const messengerPage = (await initBrowser({ viewport: { height: 600 } }))

  const messenger = new Messenger(messengerPage)
  self.addEventListener('message', (msg) => {
    messenger.sendMessage(msg.data, true)
  })
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
    // await delay(1200)
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