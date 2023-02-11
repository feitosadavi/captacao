import {
  ILogger, LogMessageType,
} from 'backend/domain/logger.protocols';
import { runWorkerSync } from 'backend/helpers/runWorkerSync';
import EventEmitter from 'node:events';

type RunBotInput = {
  target: 'olx' | 'webmotors',
}

export function createBot (cb: (logMessages: LogMessageType) => Promise<void> | void, { target }: RunBotInput) {
  const eventManager = new EventEmitter()

  eventManager.on('log', (logMsg: LogMessageType) => cb(logMsg))


  eventManager.on('post_links', (links: string[]) => {
    runWorkerSync({
      name: 'MessengerWorker',
      target,
      data: { links },
      eventManager,
      onMessage: (logMsg) => { eventManager.emit(`log`, logMsg) },
    })
  })


  function run (query: string): void {
    runWorkerSync({
      name: 'PostsGetterWorker',
      target,
      data: { query },
      eventManager,
      onMessage: ({ totalOfLinks, links }) => {
        eventManager.emit('log', {
          type: 'progress',
          content: {
            total: totalOfLinks
          }
        })
        eventManager.emit('post_links', links)
      },
    })
  }

  function stop () {
    eventManager.emit(`${target}-worker_event`, 'stop')
  }

  return { run, stop }
}