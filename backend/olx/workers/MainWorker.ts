import { register } from 'ts-node';
import { parentPort, workerData } from 'worker_threads';
import { createBot } from '../main';

register()

async function main () {
  console.log('MAIN WORKER');

  const { query } = workerData


  const olxBot = createBot((logMsg) => {
    parentPort?.postMessage(logMsg)
  },
    { target: 'olx' }
  )

  parentPort?.on('message', (msg) => {
    if (msg === 'stop') {
      olxBot.stop()
    }
  })

  olxBot.run(query)


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