import { parentPort, workerData } from 'node:worker_threads';
import { register } from 'ts-node';
import { initBrowser } from '../../config/context';
import { PostsGetter } from '../modules/PostsGetter';

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