const db = require('level')('./db')
const fs = require('fs')
const path = require('path')
const urlencode = require('urlencode')
const {gray, yellow} = require('chalk')
const {sum} = require('lodash')

db.createKeyStream()
  .on('data', async (name) => {
    const dataFile = path.join(__dirname, '../sourceranks/data', urlencode(name) + '.json')
    let data = {}
    if (fs.existsSync(dataFile)) { 
      const scores = require(dataFile)
      data = Object.assign({}, data, {
        scores: scores,
        total: sum(Object.values(scores))
      })
      process.stdout.write(gray('x'))
    } else {
      data.notFound = true
      process.stdout.write(yellow('x'))
    }

    data.updatedAt = new Date()
    await db.put(name, JSON.stringify(data, null, 2))
  })
  .on('end', () => {
    console.log('done')
  })