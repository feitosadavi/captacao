import { Worker } from 'worker_threads'

import path from 'path'
import EventEmitter from 'events'

interface IRunWorkerInput {
  name: string
  target: string
  data: Record<any, any>
  eventManager?: EventEmitter
  onMessage?: (msg: any) => Promise<void> | void
  onExit?: () => Promise<void> | void
}

export const runWorkerSync = ({ name, target, data, onMessage, onExit }: IRunWorkerInput): any => {

  const worker = new Worker(path.resolve(__dirname, `../${target}/workers/${name}.ts`), {
    workerData: { ...data, target }
  })

  worker.on('message', (msg) => onMessage ? onMessage(msg) : null)

  worker.on('error', (err) => console.error(err))
  worker.on("exit", (code) => {
    if (onExit) onExit()
    if (code === 3) console.log(`${target}-${name} Forced Stop`);
    else if (code !== 0) console.error(new Error(`Worker stopped with exit code ${code}`))
  })
}