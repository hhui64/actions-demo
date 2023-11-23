const dayjs = require('dayjs')

console.log(dayjs().format())

module.exports = {
  test: () => {
    return dayjs().format()
  }
}
