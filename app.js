var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwtAuth = require('./lib/jwtAuthMiddleware');
const session = require('express-session');
const LoginController = require('./controllers/loginController');
const MongoStore = require('connect-mongo');

// Abreviamos rutas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tagsRouter = require('./routes/tags');

var app = express();

// conectamos a la BBDD
require('./lib/connectMongoose')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const loginController = new LoginController();
// const imageController = new ImageController();

// Setup de i18n
const i18n = require('./lib/i18nConfigure');
app.use(i18n.init);
// Prueba rápida para ver que funciona i18n
// i18n.setLocale('es');
// console.log(i18n.__('Venta'));

// Rutas de mi API
// Vinculamos la ruta con la API generada en routes
app.get('/api/anuncios', jwtAuth, require('./routes/api/anuncios'));
app.use('/api/anuncios', require('./routes/api/anuncios'));
app.post('/api/authenticate', loginController.postJWT);
// app.get('/api/money/:foto', imageController.index);
app.post('/api/anuncios', require('./routes/api/anuncios'));
// app.get('/images/anuncios', function (req, res) {
// });

// Rutas website
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tags', tagsRouter);
app.use('/change-locale', require('./routes/change-locale'));

// Setup de sesiones del Website
app.use(session({
  name: 'nodeapi-session',
  secret: 'C2=2]Apw`PbSn*7)`UfrLPELHhd%f',
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 2 // 2 dias de inactividad
  },
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_CONNECTION_STRING })
}));

// hacemos disponible la sesión en todas las vistas
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {

  // es un error de validación?
  if (err.array) {
    const errorInfo = err.array({ onlyFirstError: true })[0];
    err.message = `Not valid - ${errorInfo.param} ${errorInfo.msg}`;
    err.status = 422;
  }

  res.status(err.status || 500);

  if (isAPIRequest(req)) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

function isAPIRequest(req) {
  return req.originalUrl.indexOf('/api/') === 0;
}

module.exports = app;