import { parentPort, workerData } from 'node:worker_threads';
import { register } from 'ts-node';

// we need this so that we can use typescript with thread workers
register()

async function main () {
  const { query } = workerData

  console.log('WEBMOTORS - PostsGetterWorker');

  console.log({ query });


  const postsGetter = new PostsGetterService()

  // // parentPort?.postMessage({ totalOfLinks: allLinks.length, links: allLinks })

  const res = await postsGetter.start(query)

  console.log({ res });


  parentPort?.postMessage({ totalOfLinks: 0, links: [''] })

}

const WEBMOTORS_API_BASE_PATH = 'https://www.webmotors.com.br/api/search/car?url='
const WEBMOTORS_SITE_BASE_PATH = 'https://www.webmotors.com.br/comprar'
const HEADERS = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/110.0',
  }
}

type SpecificationDescription = {
  Value: string
}

type Specification = {
  Make: SpecificationDescription
  Model: SpecificationDescription
  Version: SpecificationDescription
  YearFabrication: string
  NumberPorts: number
}

type SearchResult = {
  UniqueId: number
  Specification: Specification
}

type Result = {
  SearchResults: SearchResult[]
  Count: number
}

type PostUrl = {
  url: string
  id: number
}

type Res = {
  totalOfLinks: number,
  links: PostUrl[]
}

// import puppeteer from 'puppeteer-extra'

// // add stealth plugin and use defaults (all evasion techniques)
// import StealthPlugin from 'puppeteer-extra-plugin-stealth'
// import { executablePath } from 'puppeteer';
// puppeteer.use(StealthPlugin())

export class PostsGetterService {

  async start (queryUrl: string): Promise<any> {
    // puppeteer.launch({ headless: true, executablePath: executablePath() }).then(async browser => {
    //   console.log('Running tests..')
    //   const page = await browser.newPage()
    //   const URL = `${WEBMOTORS_API_BASE_PATH}${queryUrl}`
    //   const response = await page.goto(URL)
    //   const res = await response?.text()
    //   console.log({ res });

      // await page.setRequestInterception(true);

      // page.on('request', interceptedRequest => {
      //   const data = {
      //     method: 'POST',
      //     postData: JSON.stringify() 
      //   }

      //   interceptedRequest.continue(data)
      // })

      // await page.goto('https://bot.sannysoft.com')
      // await page.waitForTimeout(5000)
      // await page.screenshot({ path: 'testresult.png', fullPage: true })
      // await browser.close()
      // console.log(`All done, check the screenshot. ✨`)
    // })

    // try {
    //   const links: PostUrl[] = []

    //   const URL = `${WEBMOTORS_API_BASE_PATH}${queryUrl}`
    //   console.log(URL + '?showCount=true')
    //   const { Count, SearchResults } = (await axios.get(`${URL}&showCount=true`, HEADERS)).data as Result

    //   const newLinks = SearchResults.map(result => this.buildPostUrl(result))
    //   links.push(...newLinks)

    //   const numberOfRequests = this.countNumberOfRequests(Count, SearchResults.length)

    //   console.log({ numberOfRequests });

    //   for (let i = 1; i < numberOfRequests; i++) {
    //     const { SearchResults } = (await axios.get(`${URL}&actualPage${i + 1}`, HEADERS)).data as Result
    //     const newLinks = SearchResults.map(result => this.buildPostUrl(result))
    //     links.push(...newLinks)
    //   }

    //   return { totalOfLinks: Count, links }
    // } catch (error) {
    //   console.log('WEBMOTORS - TEVE UM ERRO NO START DO POSTS GETTER WORKER');
    //   throw error
    // }
  }

  buildPostUrl ({ UniqueId, Specification: { Version, Make, Model, NumberPorts, YearFabrication } }: SearchResult): PostUrl {
    const sanitizedVersion = Version.Value.toLowerCase().replaceAll(' ', '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    const sanitizedMake = Make.Value.toLowerCase().replaceAll(' ', '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    const sanitizedModel = Model.Value.toLowerCase().replaceAll(' ', '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    // return `${WEBMOTORS_SITE_BASE_PATH}/${sanitizedMake}/${sanitizedModel}/${sanitizedVersion}/${NumberPorts}/${YearFabrication}/${UniqueId}`
    return { url: `${WEBMOTORS_SITE_BASE_PATH}/${sanitizedMake}/${sanitizedModel}/${sanitizedVersion}/${NumberPorts}/${YearFabrication}/${UniqueId}`, id: UniqueId }
  }

  countNumberOfRequests (totalOfPosts: number, itensPerRequest: number): number {
    return Math.ceil(totalOfPosts / itensPerRequest)
  }
}

main()