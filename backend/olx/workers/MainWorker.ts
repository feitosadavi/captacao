import { register } from 'ts-node';
import { parentPort, workerData } from 'worker_threads';
import { createBot } from '../main';

register()

async function main () {
  console.log('MainWorker');

  const { query, target } = workerData


  const olxBot = createBot((logMsg) => {
    parentPort?.postMessage(logMsg)
  },
    { target }
  )

  olxBot.run(query)
}

main()