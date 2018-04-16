require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { ensureLoggedIn } = require('connect-ensure-login');

passport.use(
  new Strategy((username, password, cb) => {
    db.findByUsername(username, (err, user) => {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      if (user.password != password) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  db.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

let app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', ensureLoggedIn('http://www.google.com'), (req, res) => {
  res.render('index', { user: req.user });
});

app.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('http://www.google.com');
});

app.get('/todos', (req, res) => {
  db
    .getTodos()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log('retrieving todos error: ' + err);
    });
});

app.post('/add', (req, res) => {
  db
    .addTodo(req.body)
    .then(data => {
      res.end('saved');
    })
    .catch(err => {
      console.log('saving error: ' + err);
    });
});

app.post('/edit', (req, res) => {
  db
    .editTodo(req.body)
    .then(data => {
      res.end('saved');
    })
    .catch(err => {
      console.log('editing error: ' + err);
    });
  res.end();
});

app.post('/delete', (req, res) => {
  db
    .deleteTodo(req.body.id)
    .then(data => {
      res.end();
    })
    .catch(err => {
      console.log('deleting error:' + err);
    });
  res.end();
});

app.post('/change-status', (req, res) => {
  let status = !parseInt(req.body.is_complete);
  db
    .changeTodoStatus(req.body.id, status)
    .then(data => {
      res.end('saved');
    })
    .catch(err => {
      console.log('editing error: ' + err);
    });
  res.end();
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on port ' + port + '!');
});
