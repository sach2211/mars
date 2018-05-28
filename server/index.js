// external packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const randomToken = require('random-token');

// internal modules
const { verifyPassword, persistTokenForUser, verifyToken } = require('./cache');
const mockData = require('../mock-data.json')


app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.get('/ping', (req, res) => {
  res.send('pong');
})

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  verifyPassword(email, password)
  .then((status) => {
    if (status === 'OK') {
      const randToken = randomToken(16);
      return randToken;
    } else {
      res.status(401).send('Unauthorized');
      throw('Password Incorrect');
    }
  })
  .then((randToken) => {
    res.status(200).send({
      token : randToken
    });
    return randToken;
  })
  .then((token) => {
    persistTokenForUser(email, token);
  })
  .catch(e => {
    console.error('Promise rejects - ', e);
  })

});


app.get('/data', (req, res) => {
  const postedToken = req.headers.auth;
  const validity = verifyToken(postedToken);

  if (validity)
    res.send(mockData);
  else
    res.status(401).send('Unauthorized');
});



const PORT = process.env.PORT || 1111;

app.listen(PORT, () => {
  console.log('Listening on Port No. - ', PORT);
});



