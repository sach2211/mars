const db = require('memory-cache');

function verifyPassword(email, password) {
  return new Promise( (resolve, reject) => {
    if (email === 'sachin' && password === 'mars') {
      resolve('OK');
    } else {
      resolve('NOT OK');
    }
  });
}

function persistTokenForUser(email, token) {
  console.log('Trying to persist - ', token, email);
  db.put(token, email, 15 * 60 * 1000);
  console.log(db.keys());
}

function verifyToken(token) {
  return db.get(token);
}

module.exports = {
  verifyPassword,
  persistTokenForUser,
  verifyToken
}