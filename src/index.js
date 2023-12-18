import { I } from './i/i.js'
import { init } from './wsserver/index.js'

init()

const i = new I()

setTimeout(() => {
  i.send('Hello')
} , 1000)
