
const db = require('level')('./db')
const fs = require('fs')
const path = require('path')
const urlencode = require('urlencode')
let good = 0
let bad = 0 

db.createReadStream()
  .on('data', async ({key, value}) => {
    value = JSON.parse(value)
    if (value && Object.keys(value).length) {
      good++
    } else {
      bad++
    }
    console.log(good, bad)
  })