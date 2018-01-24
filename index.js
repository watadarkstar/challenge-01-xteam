var path = require('path')
var funcs = require('./funcs')
var encodeName = funcs.encodeName
var decode = funcs.decode

var session = {
  username: process.argv[2],
  lastMessageHash: process.argv[3]
}

if (!session.username || !session.lastMessageHash) {
  console.log('Usage: node index.js <username> <hash>')
  process.exit(0)
}

// 1. load the database
var dbFile = path.join(__dirname, 'db', 'index.json')

funcs.loadDb(dbFile, function (err, db) {
  
  // 2. encode the name
  var encoded = encodeName(session.username)
  
  // 3. find the user's inbox
  var inbox = funcs.findInbox(db, encoded)
  
  // 4. find the next message
  funcs.findNextMessage(inbox, session.lastMessageHash, function(nextMessage) {
      console.log(nextMessage)
  })
})
