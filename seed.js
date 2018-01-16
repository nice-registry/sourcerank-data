const db = require('level')('./db')
const {chain} = require('lodash')
const isNumber = require('is-number')
const names = chain(require('all-the-package-names'))
  .map(name => name.trim())
  .filter(name => !isNumber(name))
  .uniq()
  .value()

for (i = 0; i < names.length; i++) {
  const name = names[i]
  console.log(i, name)
  saveName(name)
}

async function saveName (name) {
  await db.put(name, JSON.stringify({}))
}