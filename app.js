const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const db = require('./models/db');
const path = require('path');

/**
  Adding the controllers.
*/
let dbModel = new db();
/**
  Setting up the database and creating table.
*/
dbModel.setupDb();
app.use(bodyParser.json());
app.use(require('./controllers'));

app.use(express.static(path.join(__dirname, './frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/dist/index.html'));
});

http.listen(3000, () => {
  console.log('listening on port 3000');
});