import { I } from './i/i.js'
import { init } from './wsserver/index.js'

init()

const i = new I()

setTimeout(async () => await t(), 200)

const t = async () => {
  try {
    const r = await i.send({
      ccsid: 1,
      cccid: 1
    })
    console.log(r)
  } catch (error) {}
}
