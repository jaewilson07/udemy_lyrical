const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { graphqlHTTP } = require('express-graphql');
const models = require('./server/models');
const schema = require('./server/schema/schema');
const db = require('./server/mongo_util');

const path = require('path');
require('dotenv').config();

const app = express();
app.use(bodyParser.json(), cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = process.env.SERVER_PORT || 4000;

console.log('Listening', PORT);

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(PORT, () => {
  console.log('Listening', `${PORT}`);
});
