import { Chance } from 'chance'
import express from 'express'
import expressWs from 'express-ws'

const port = 27777

const app = express()
const ws = expressWs(app)

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
      const randomNumber = Chance().integer({ min: 10, max: 30 })
      setTimeout(() => {
        handleWsMessage(msg, ws)
      }, randomNumber)
    })
  })
}
