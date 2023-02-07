async function main () {
  console.log('BotStatusCheckerWorker')
  // self.addEventListener('message', (event) => {
  //   const workerData = event.data
  //   postMessage('mensagme muito doida')
  //   console.log(workerData);

  // })
  setInterval(async () => {
    try {
      await fetch('http://localhost:5000/ping')
      postMessage(true)
    } catch (error) {
      postMessage(false)
    }
  }, 500)
  self.addEventListener('message', (event) => {
    console.log(event.data);
    
  })
  // setInterval(() => {
    // while (true) {
    //   try {
    //     const res = fetch('http://localhost:1200/ping')
    //     parentPort?.postMessage(true)    
    //   } catch (error) {
    //     parentPort?.postMessage(false)
    //   }
    // }
  // }, 300)
}

main()