import WebSocket from 'websocket'
import { EventEmitter } from 'events'

export class I extends EventEmitter {
  constructor(props) {
    super(props)
    this.setMaxListeners(0)

    this.props = props

    this.connection = null

    this.wsclient = new WebSocket.client()
    this.wsclient.on('connect', connection => {
      connection.on('message', this.handleWsMessage)
      this.connection = connection
    })

    this.messageQueue = new EventEmitter()
    this.messageQueue.setMaxListeners(0)

    this.wsclient.connect('ws://localhost:27777')
  }

  handleWsMessage(message) {
    const msg = JSON.parse(message.utf8Data)
    console.log('(I) Received Message:', msg)
  }

  async send(data) {
    if (this.connection === null) {
      return Promise.reject('No connection')
    }

    this.connection.send(JSON.stringify(data))
  }
}
