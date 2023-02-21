import { Worker } from 'worker_threads'

import path from 'path'
import EventEmitter from 'events'

interface IRunWorkerInput {
  name: string
  target: string
  data: unknown
  eventManager?: EventEmitter
  onExit?: () => Promise<void> | void
}

export const runWorker = async ({ name, target, data }: IRunWorkerInput): Promise<any> => {
  return new Promise((resolve, rejects) => {

    const worker = new Worker(path.resolve(__dirname, `../${target}/workers/${name}.ts`), {
      workerData: data
    })

    worker.on('message', resolve)
    // worker.on('message', (msg) => onMessage ? onMessage(msg) : null)

    worker.on('error', rejects)
    worker.on("exit", (code) => {
      if (code !== 0) console.error(new Error(`Worker stopped with exit code ${code}`))
    })

    // eventManager.on(`${target}-worker_event`, (msg: unknown) => {
    //   switch (msg) {
    //     case 'stop':
    //       worker?.postMessage('stop')
    //       break;

    //     default:
    //       break;
    //   }
    // })
  })

}