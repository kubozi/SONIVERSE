const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const soundRoutes = require('./routes/soundRoutes');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const cors = require("cors");
const secret_config = require('./config/secret_config');

const app = express();
const PORT = process.env.PORT || 5050;

console.log("connecting to db...");
const usr = secret_config.MONGODB_USR;
const psw = secret_config.MONGODB_PASS;
const repoName = secret_config.MONGODB_REPO_NAME;
const dbURI = 'mongodb+srv://'+usr+':'+psw+'@cluster0.zziyg.mongodb.net/'+repoName+'?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) =>
{
  console.log('connected to db');
  console.log('listening to port ', PORT);
  app.listen(PORT);
})
.catch((err) => console.log(err));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

// sound routes
app.use('/', soundRoutes);