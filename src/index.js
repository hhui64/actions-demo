import { I } from './i/i.js'
import { init } from './wsserver/index.js'

init()

const i = new I()

setTimeout(() => {
  i.send({
    ccsid: 1,
    cccid: 1
  })
} , 1000)
