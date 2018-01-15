
const db = require('level')('./db')
const fs = require('fs')
const path = require('path')
const urlencode = require('urlencode')

let extant = 0
let nonexistent = 0
db.createKeyStream()
  .on('data', async (name) => {
    const dataFile = path.join(__dirname, '../sourceranks/data', urlencode(name) + '.json')
    if (fs.existsSync(dataFile)) {
      await saveRank(name, dataFile)
      console.log(dataFile, 'exists')
      extant++
    } else {
      nonexistent++
      console.log(dataFile, 'DOES NOT EXIST')
    }
  })
  .on('end', () => {
    console.log('done', extant, nonexistent)
  })

async function saveRank (name, dataFile) {
  db.put(name, JSON.stringify(require(dataFile), null, 2))
}