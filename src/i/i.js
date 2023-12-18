import WebSocket from 'websocket'
import { EventEmitter } from 'events'

const getEventName = data => {
  return `${data.ccsid}-${data.cccid}`
}

export class I extends EventEmitter {
  constructor(props) {
    super(props)
    this.setMaxListeners(0)

    this.props = props

    this.connection = null

    this.wsclient = new WebSocket.client()
    this.wsclient.on('connect', connection => {
      connection.on('message', message => this.handleWsMessage(message))
      this.connection = connection
    })

    this.messageQueue = new EventEmitter()
    this.messageQueue.setMaxListeners(0)

    this.wsclient.connect('ws://localhost:27777')
  }

  handleWsMessage(message) {
    const msg = JSON.parse(message.utf8Data)
    const eventName = getEventName(msg)

    this.messageQueue.emit(eventName, msg)
    this.emit('message', msg)
  }

  async send(data) {
    const eventName = getEventName(data)

    return new Promise((resolve, reject) => {
      if (this.connection === null) {
        return reject('No connection')
      }

      this.connection.send(JSON.stringify(data))

      this.messageQueue.once(getEventName(data), msg => {
        resolve(msg)
      })
    })
  }
}
