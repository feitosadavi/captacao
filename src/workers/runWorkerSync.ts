interface IRunWorkerInput {
  name: string
  data?: unknown
  onMessage?: (msg: any) => Promise<void> | void
  onExit?: () => Promise<void> | void
}

export const runWorkerSync = async ({ name, data, onMessage }: IRunWorkerInput): Promise<any> => {
  try {    
    const worker = new Worker(`./${name}.ts`)
    // worker.on('message', (msg) => onMessage ? onMessage(msg) : null)
    worker.postMessage(data)

    worker.addEventListener('message', (event) => {
      onMessage && onMessage(event.data)
    })
  
    // worker.on('error', (err) => console.error(err))
    // worker.on("exit", (code) => {
    //   // if (code === 3) console.log(`${target}-${name} Forced Stop`);
    //   if (code !== 0) console.error(new Error(`Worker stopped with exit code ${code}`))
    // })
  } catch (error) {
    console.error(error);
    
  }

  // eventManager?.on('stop', () => {
  //   worker.emit('exit', 3)
  //   worker.postMessage('stop')
  //   // throw new Error(`${name}-${target} Forced stop`)
  // })

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