const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();

const authRoute = require('./routes/auth');
const sitesRoute = require('./routes/sites');
const pagesRoute = require('./routes/pages');

const testingRoute = require('./routes/testing');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/user', authRoute);
app.use('/sites', sitesRoute);
app.use('/pages', pagesRoute);

app.use('/testing', testingRoute);

//Connect DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => 
  console.log('Connected')
);

app.listen(4000);