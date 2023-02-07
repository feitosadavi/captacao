import path from 'path'

interface IRunWorkerInput {
  name: string
  data?: unknown
  onMessage: (msg: any) => Promise<void> | void
  onExit?: () => Promise<void> | void
}

export const runWebWorkerSync = async ({ name, data, onMessage }: IRunWorkerInput): Promise<any> => {
  try {
    const worker = new Worker(`./${name}.ts`, { type: 'module' })

    worker.postMessage(data)

    worker.addEventListener('message', ({ data }) => onMessage(data))
    worker.addEventListener('error', ({ error }) => console.error('error'))
    worker.addEventListener('exit', () => {
      console.error(new Error(`Worker stopped with exit code`))
    })

  } catch (error) {
    console.error(error);
  }

}