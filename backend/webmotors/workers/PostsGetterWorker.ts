import { parentPort, workerData } from 'node:worker_threads';
import { register } from 'ts-node';
import { PostsGetterService } from '../modules/PostsGetterService.webmotors';

// we need this so that we can use typescript with thread workers
register()

async function main () {
  console.log('WEBMOTORS - PostsGetterWorker');
  const { query } = workerData

  const postsGetter = new PostsGetterService()

  // parentPort?.postMessage({ totalOfLinks: allLinks.length, links: allLinks })

  const res = await postsGetter.start(query)

  console.log({ res });


  parentPort?.postMessage(res)

}

main()