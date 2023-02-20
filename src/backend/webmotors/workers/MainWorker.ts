// import { createBot } from 'backend/olx/main';
import { createBot } from '@/backend/olx/main';
import { register } from 'ts-node';
import { parentPort, workerData } from 'worker_threads';

register()

async function main () {
  console.log('WEBMOTORS - MainWorker');

  const { query, target } = workerData
  console.log({ query, target });

  const olxBot = createBot((logMsg) => {
    parentPort?.postMessage(logMsg)
  },
    { target }
  )

  olxBot.run(query)
}

main()