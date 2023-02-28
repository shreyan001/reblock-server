const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const Routes = require('./Routes');

require('dotenv').config();


const app = express();
app.use(express.static('public'))
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/', Routes);
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});

const port = process.env.PORT || 3200;
app.listen(port, () => {
 
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});