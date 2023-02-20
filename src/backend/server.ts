import { Server } from 'socket.io'
import cors from 'cors'
import express from 'express'
import http from 'http'

import { runWorkerSync } from './helpers/runWorkerSync';
import { parseQuery } from './helpers/query-parser';

const app = express();

const httpServer = http.createServer(app)

export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:1420"
  }
})

let isBusy = false

io.on('connection', (socket) => {
  socket.on('search', async ({ query, targets }) => {

    try {
      const queries = parseQuery(query, targets)
      isBusy = true
      queries.forEach(({ target, content }) => {
        runWorkerSync({
          target,
          name: 'MainWorker',
          data: { query: content },
          onMessage (logMsg) { socket.emit('log', logMsg) },
        })
      });
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
});

httpServer.listen(5000, () => {
  console.log(`Server listening on ${5000}`);
});
