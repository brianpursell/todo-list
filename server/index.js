require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV;
const knexfile = require('../knexfile')[environment];
const db = require('knex')(knexfile);

let app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.send('Welcome');
});

app.get('/todos', function(req, res) {
  db('todos')
    .where('deleted', null)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log('retrieving todos error: ' + err);
    });
});

app.post('/new-todo', function(req, res) {
  db('todos')
    .insert(req.body)
    .then(data => {
      res.end('saved');
    })
    .catch(err => {
      console.log('saving error: ' + err);
    });
});

app.post('/edit-todo', function(req, res) {
  let status = !parseInt(req.body.is_complete);
  db('todos')
    .where('id', req.body.id)
    .update('is_complete', status)
    .then(data => {
      res.end('saved');
    })
    .catch(err => {
      console.log('editing error: ' + err);
    });
  res.end();
});

app.post('/delete-todo', function(req, res) {
  let date = new Date();
  db('todos')
    .where('id', req.body.id)
    .update('deleted', date)
    .then(data => {
      res.end();
    })
    .catch(err => {
      console.log('deleting error:' + err);
    });
  res.end();
});

let port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('listening on port ' + port + '!');
});
