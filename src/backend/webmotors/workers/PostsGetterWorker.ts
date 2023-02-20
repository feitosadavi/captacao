import { parentPort, workerData } from 'node:worker_threads';
import { register } from 'ts-node';
import { PostsGetterService } from '../modules/PostsGetterService.webmotors';

// we need this so that we can use typescript with thread workers
register()

async function main () {
  const { query } = workerData

  console.log('WEBMOTORS - PostsGetterWorker');

  console.log({ query });


  const postsGetter = new PostsGetterService()

  // // parentPort?.postMessage({ totalOfLinks: allLinks.length, links: allLinks })

  const res = await postsGetter.start(query)

  // // console.log({ res });


  // parentPort?.postMessage(['https://www.webmotors.com.br/carros/DF/Fiat/Uno'])

}

main()