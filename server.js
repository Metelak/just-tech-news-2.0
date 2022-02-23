const path = require('path');
const express = require('express');
// connect/use express-session and sequelize store
const session = require('express-session');
// connecting handlebars as template engine of choice
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'dancing umbrellas',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// turn on path to public folder - stylesheets
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});


// const express = require('express');
// const session = require('express-session');
// const routes = require('./controllers/');
// const sequelize = require('./config/connection');
// const path = require('path');
// const app = express();
// const PORT = process.env.PORT || 3001;
// // connecting handlebars as template engine of choice
// const exphbs = require('express-handlebars');
// const hbs = exphbs.create({});
// // connect/use express-session and sequelize store
// // const session = require('express-session');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const sess = {
//   secret: 'dancing umbrellas',
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize
//   })
// };
// app.use(session(sess));
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // turn on path to public folder - stylesheets
// app.use(express.static(path.join(__dirname, 'public')));
// // turn on routes
// app.use(routes);
// // turn on connection to db and server
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });
