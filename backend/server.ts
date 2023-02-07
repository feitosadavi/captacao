import { Server } from 'socket.io'
import cors from 'cors'
import express from 'express'
import http from 'http'

import { runWorkerSync } from './helpers/runWorkerSync';
import EventEmitter from 'events';

const app = express();

const httpServer = http.createServer(app)

export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:1420"
  }
})

// class Logger implements ILogger {
//   constructor(private readonly socket: Socket) { }

//   async emit (channel: string, message?: LogMessageType | ProgressMessageType): Promise<void> {
//     this.socket.emit(channel, message)
//   }
//   async on (channel: string, cb: any): Promise<void> {
//     this.socket.on(channel, cb)
//   }
// }

const eventManager = new EventEmitter()

io.on('connection', (socket) => {
  // const logger = new Logger(socket)
  // const masterOfBots = createBot({
  //   eventManager: logger,
  //   target: 'olx'
  // })
  // const olxBot = createBot(async (logMsg) => {
  //   socket.emit('log', logMsg)
  // },
  //   { target: 'olx' }
  // )
  socket.on('search', async (search) => {
    // olxBot.run(search)
    console.log({ search });

    try {
      runWorkerSync({
        target: 'olx',
        name: 'MainWorker',
        data: { query: search, eventManager },
        onMessage: async (logMsg) => { socket.emit('log', logMsg) },
        eventManager
      })
    } catch (error) {
      console.error(error);

    }
  })


  socket.on('stop_io', () => {
    eventManager.emit('stop')
  })
})

app.use(cors());

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

app.get('/ping', (req, res) => {
  res.json({
    message: 'pong',
  });
});

httpServer.listen(5000, () => {
  console.log(`Server listening on ${5000}`);
});
