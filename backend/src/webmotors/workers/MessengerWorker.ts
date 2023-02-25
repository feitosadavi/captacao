import { register } from 'ts-node';

import { parentPort, workerData } from 'node:worker_threads';
import { Page } from '@playwright/test';
import { initBrowser } from '../../config/context';
import { StackMessageType } from '../../domain/logger.protocols';
import axios from 'axios';
import { authOptions } from '../../olx/modules/Auth';

register()
// import { createMessenger } from '../modules/Messenger';

// we need this so that we can use typescript with thread workers

async function delay (ms: number): Promise<any> {
  return new Promise(resolve => setTimeout(resolve, ms))
}


async function main () {
  console.log('Webmotors - MessengerWorker');

  const { links, target, message } = workerData

  console.log(links)

  const messengerPage = (await initBrowser({ viewport: { height: 600, width: 1220 }, target }))
  const messenger = new Messenger(messengerPage)
  for (const [index, link] of links.entries()) {
    try {
      await messenger.sendMessage(link.id, message)

      const msgContent: StackMessageType = {
        type: 'info',
        label: 'webmotors',
        description: link.url
      }

      parentPort?.postMessage({ type: 'stack', content: msgContent })
    } catch (error) {
      console.error(error);
    } finally {
      parentPort?.postMessage({ type: 'progress', content: { current: index + 1 } })
    }
  }
  messengerPage.close()
}

main()

class Messenger {
  msg: string = ''

  constructor(private readonly page?: Page) { }

  async sendMessage (postUrl: string, message: string) {
    const { email, phone, name } = authOptions['webmotors']
    console.log({ email, phone, name });
    console.log({ postUrl });

    try {      
      const res = await this.page?.request.post('https://www.webmotors.com.br/api/detail/proposal/send', {
        data: {
          "IdAnuncio": postUrl, "TipoVeiculo": "car", "Nome": name, "Email": email, "Telefone": phone, "Mensagem": message, "TipoAnuncio": "usados", "Origem": "D", "IdGuid": "69590590-7f1b-4e41-9526-d10d0dddba46", "QueroReceberPesquisa": false, "Canal": 48, "AdobeGuid": "52049267026225338522625859926780719869"
        }
      })
      console.log(res);

    } catch (error) {
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

  private async clickChatBtn () {
    await this.page?.click('#ButtonSendProposal')
  }

  private async typeMessage () {
    const textarea = await this.page?.$("textarea[name='message']")
    console.log({ textarea });

    // textarea?.click({ clickCount: 3 })
    // textarea?.type(this.msg)
    // await thi.page?.type("textarea[name='message']", this.msg)
  }
}