import { parentPort, workerData } from 'node:worker_threads';
import { register } from 'ts-node';
import { initBrowser } from '../../config/context';

// we need this so that we can use typescript with thread workers
register()

async function main () {
  console.log('PostsGetterWorker');
  const { query } = workerData

  const postsGetterPage = (await initBrowser())

  const postsGetter = new PostsGetter(postsGetterPage)

  const allLinks: string[] = []
  let totalOfLinks = 0
  parentPort?.postMessage({ totalOfLinks: allLinks.length, links: allLinks })

  await postsGetter.start(query, (count, links) => {
    totalOfLinks = count
    allLinks.push(...links)
  })
  parentPort?.postMessage({ totalOfLinks: allLinks.length, links: allLinks })

}

main()

import { Page } from '@playwright/test'

class Sanitizor {
  // text comes on the follow format: resultado 1 - 50 de 1000 resultados
  extractTotalOfPagesNumbers (text: string): { totalOfLinks: number, numberOfPages: number } {
    const elements = text.split("de")

    const itensPerPage = Number(elements[0].replace('1 - ', '').trim())
    const totalOfLinks = Number(elements[1].replace(/\D/g, ''))

    const numberOfPages = Math.ceil(totalOfLinks / itensPerPage)

    return { totalOfLinks, numberOfPages }
  }
}

export class PostsGetter {
  sanitizor: Sanitizor

  constructor(private readonly page: Page) {
    this.sanitizor = new Sanitizor()
  }

  async start (query: string, cb: (totalOfLinks: number, links: string[]) => unknown): Promise<void> {
    const BASE_PATH = 'https://df.olx.com.br/autos-e-pecas/carros-vans-e-utilitarios'

    try {
      await this.page.goto(query, { waitUntil: 'domcontentloaded' })

      const { totalOfLinks, numberOfPages } = await this.getNumberOfPages()

      for (let i = 0; i < numberOfPages + 1; i++) {
        await this.page.goto(`${query}&o=${i}`, { waitUntil: 'domcontentloaded' })
        const posts = await this.getOnePagePosts()

        cb(totalOfLinks, posts)
      }

      await this.page.close()

    } catch (error) {
      console.log(error);
    }
  }

  async getNumberOfPages (): Promise<{ totalOfLinks: number, numberOfPages: number }> {
    const resultadosText = await (this.page.getByText('resultados')).textContent()
    if (!resultadosText) throw new Error('Elemento resultados não encontrado')

    return this.sanitizor.extractTotalOfPagesNumbers(resultadosText)
  }

  async getOnePagePosts (): Promise<string[]> {
    const postsLink = await this.page.evaluate(
      () => Array.from(
        document.querySelectorAll('.sc-12rk7z2-0.bjnzhV > a'),
        a => a.getAttribute('href')
      ) as string[]
    );
    return postsLink
  }
}