import { initBrowser } from 'backend/config/context';
import { parentPort, workerData } from 'node:worker_threads';
import { register } from 'ts-node';
import { PostsGetter } from '../modules/PostsGetter';

// we need this so that we can use typescript with thread workers
register()

async function main () {
  console.log('POSTS GETTER WORKER');
  const { query } = workerData

  // const messengerPage = (await initBrowser({ viewport: { width: 850 }, auth: true }))

  // const postsGetter = new PostsGetter(messengerPage)

  const postsGetterPage = (await initBrowser())

  const postsGetter = new PostsGetter(postsGetterPage)

  const allLinks: string[] = []
  let totalOfLinks = 0
  await postsGetter.start(query, (count, links) => {
    totalOfLinks = count
    allLinks.push(...links)
  })
  parentPort?.postMessage({ totalOfLinks, links: allLinks })

  // parentPort?.on('message', async (msg) => {
  //   if (msg === 'stop') await messengerPage.close()
  // })

  // const messenger = new Messenger(messengerPage)

  // for (const link of links) {
  //   await messenger.sendMessage(link)
  //   parentPort?.postMessage(link)
  // }
}

main()