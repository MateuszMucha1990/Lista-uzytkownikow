const express = require('express');
const path = require('path');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const {sessionKeySecret} = require('./config');

//init database
require('./db/mongoose')

//middleware sesji
app.use(session({
    secret: sessionKeySecret,   //dodatkowe zabezpieczenie zapisane w konfigu-losowy klucz
    saveUninitialized: true,  //to ma poprostu tak byc
    cookie:{maxAge:1000*60*60*24*2},  //jak dlugo sesja ma życ. czas podany w milisekundach-2dni
    resave: false  //to ma poprostu tak byc
}));

//view engine
app.set('view engine', 'ejs');
app.set('views' , path.join(__dirname + '/../views'));
//set layouts
app.use(expressLayouts);
app.set('layout', './layouts/main');
// public folder
app.use(express.static('public'))


//body parser //dla application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.json());

//middleware
app.use('/', require('./middlewares/view-verables.js'));
app.use('/', require('./middlewares/osoba-middleware.js'));
app.use('/admin', require('./middlewares/is-auth-middleware')) //middleware dla linkow zaczynajacych sie od Admin

//mount routes
app.use('/api',require('./routes/api.js'))
app.use(require('./routes/web.js'))

module.exports = app;