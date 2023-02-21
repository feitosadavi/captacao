import { register } from 'ts-node';
import { parentPort, workerData } from 'node:worker_threads';
import { createBot } from '../main';

register()

async function main () {
  const { query, target } = workerData
  console.log({ query, target });

  console.log(`${target} - MainWorker`);


  const bot = createBot((logMsg) => {
    parentPort?.postMessage(logMsg)
  },
    { target }
  )

  bot.run(query)
}

main()