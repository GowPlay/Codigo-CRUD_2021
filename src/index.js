const express = require('express');
const morgan = require('morgan');
const hbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');

const flash = require('connect-flash');
const bodyParser = require('body-parser');

const { database } = require('./settings/keys');
const MySQLStore = require('express-mysql-session')(session);
const path = require('path');
const app = express();
require('./controllers/passport');
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', hbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layout'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
// middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json(({extended: true})));
// session
app.use(session({
    secret: 'cursocrudmysqlynodejs',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
    app.locals.user = req.user;
    next();
})

// rutas app
app.use(require('./routes/app'));
app.use('/support',require('./routes/admin'));
app.use('/req',require('./routes/authentication'));

app.use(express.static(path.join(__dirname, 'public')));
app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port'))
});

