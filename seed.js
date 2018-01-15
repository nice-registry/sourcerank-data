const db = require('level')('./db')
const names = require('all-the-package-names')

for (i = 0; i < names.length; i++) {
  const name = names[i]
  console.log(i, name)
  saveName(name)
}

async function saveName (name) {
  await db.put(name, JSON.stringify({}))
}