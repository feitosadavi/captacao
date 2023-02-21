async function main () {
  console.log('BotStatusCheckerWorker')

  setInterval(async () => {
    try {
      const isBusy = (await (await fetch('http://localhost:5000/is-busy')).json()).isBusy
      postMessage(isBusy ? 'busy' : 'online')
    } catch (error) {
      postMessage('offline')
    }
  }, 500)
  self.addEventListener('message', (event) => {
    console.log(event.data);
  })
}

main()