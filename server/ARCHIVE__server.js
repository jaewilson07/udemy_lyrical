const path = require('path');

const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const models = require('./models');
const schema = require('./schema/schema');

//setup MongoDB connection
require('dotenv').config();
const USER_NAME = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_DATABASE;
const MONGO_URI = `mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.abbnl.gcp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.log('Error connecting to MongoLab:', error));
db.once('open', () => console.log('Connected to MongoLab instance.'));

const app = express();
app.use(bodyParser.json());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
