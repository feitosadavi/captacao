import { Server } from 'socket.io'
import cors from 'cors'
import express from 'express'
import http from 'http'
import { parseQuery } from './src/helpers/query-parser';
import { runWorkerSync } from './src/helpers/runWorkerSync';


const app = express();

const httpServer = http.createServer(app)

export const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
})

let isBusy = false

io.on('connection', (socket) => {
  socket.emit('log', {
    type: 'stack',
    target: 'olx',
    content: {
      type: 'info',
      description: 'Online',
    }
  })
  socket.on('search', async ({ query, targets, message }) => {
    console.log({ message });

    try { 
      const queries = parseQuery(query, targets)
      isBusy = true
      queries.forEach(({ target, content }) => {
        runWorkerSync({
          target,
          name: 'MainWorker',
          data: { query: content, message },
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

app.get('/save-message', (req, res) => {
  isBusy = false
});

app.get('/stop', (req, res) => {
  process.abort()
  // isBusy = false
});

httpServer.listen(5000, () => {
  console.log(`Server listening on ${5000}`);
});
