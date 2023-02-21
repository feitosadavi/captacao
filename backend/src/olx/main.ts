
import EventEmitter from 'node:events';
import { LogMessageType } from '../domain/logger.protocols';
import { runWorkerSync } from '../helpers/runWorkerSync';

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
      onMessage: ({ type, content }) => {
        const msg: LogMessageType = {
          target,
          type,
          content
        }
        eventManager.emit(`log`, msg)
      },
    })
  })


  function run (query: string): void {
    eventManager.emit('log', {
      type: 'stack',
      target,
      content: {
        type: 'info',
        description: 'Coletando Dados',
      }
    } as LogMessageType)

    runWorkerSync({
      name: 'PostsGetterWorker',
      target,
      data: { query },
      eventManager,
      onMessage: ({ totalOfLinks, links }) => {
        const msg: LogMessageType = {
          type: 'progress',
          target,
          content: {
            current: 0,
            total: totalOfLinks
          }
        }
        eventManager.emit('log', msg)
        eventManager.emit('post_links', links)
      },
    })
  }


  return { run }
}