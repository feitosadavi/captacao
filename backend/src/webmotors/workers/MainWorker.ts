// import { createBot } from 'olx/main';
import { register } from 'ts-node';
import { parentPort, workerData } from 'worker_threads';
import { createBot } from '../../olx/main';

register()

async function main () {
  console.log('WEBMOTORS - MainWorker');

  const { query, target } = workerData
  console.log({ query, target });

  const olxBot = createBot((logMsg: any) => {
    parentPort?.postMessage(logMsg)
  },
    { target }
  )

  olxBot.run(query)
}

main()