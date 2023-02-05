import { Worker } from 'worker_threads'

import path from 'path'
import EventEmitter from 'events'

interface IRunWorkerInput {
  name: string
  target: string
  data: unknown
  eventManager?: EventEmitter
  onMessage?: (msg: any) => Promise<void> | void
  onExit?: () => Promise<void> | void
}

export const runWorkerSync = async ({ name, target, data, onMessage, eventManager }: IRunWorkerInput): Promise<any> => {

  const worker = new Worker(path.resolve(__dirname, `../${target}/workers/${name}.ts`), {
    workerData: data
  })

  worker.on('message', (msg) => onMessage ? onMessage(msg) : null)

  worker.on('error', (err) => console.error(err))
  worker.on("exit", (code) => {
    if (code === 3) console.log(`${target}-${name} Forced Stop`);
    else if (code !== 0) console.error(new Error(`Worker stopped with exit code ${code}`))
  })

  eventManager?.on('stop', () => {
    worker.emit('exit', 3)
    worker.postMessage('stop')
    // throw new Error(`${name}-${target} Forced stop`)
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

}