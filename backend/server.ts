import { Server } from 'socket.io'
import cors from 'cors'
import express from 'express'
import http from 'http'

import { runWorkerSync } from './helpers/runWorkerSync';

const app = express();

const httpServer = http.createServer(app)

export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:1420"
  }
})

let isBusy = false

io.on('connection', (socket) => {
  socket.on('search', async (query) => {
    console.log({ query });

    try {
      isBusy = true
      runWorkerSync({
        target: 'olx',
        name: 'MainWorker',
        data: { query },
        onMessage (logMsg) { socket.emit('log', logMsg) },
        onExit () { isBusy = false }
      })
    } catch (error) {
      console.error(error);

    }
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

app.get('/is-busy', (req, res) => {
  res.json({
    isBusy,
  });
});

app.get('/is-not-busy', (req, res) => {
  isBusy = false
  console.log({ isBusy });

});

httpServer.listen(5000, () => {
  console.log(`Server listening on ${5000}`);
});
