import express from 'express'
import expressWs from 'express-ws'
import WebSocket from 'websocket'

const port = 27777

const app = express()
const ws = expressWs(app)
const server = new WebSocket.server({ httpServer: app })

const handleWsMessage = (message, ws) => {
  ws.send(message)
}

export function init() {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  })

  app.ws('/', (ws, req) => {
    console.log('Connection opened')
    ws.on('message', (msg) => {
      handleWsMessage(msg, ws)
    })
  })
}
