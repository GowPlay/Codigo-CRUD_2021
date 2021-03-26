const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const helpers = require('./helpers');

const pool = require('../settings/db');


passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, username, password, done) =>{
    // console.log(username + password)
    const resp = await pool.query('SELECT * FROM users WHERE username =?',[username]);
    if (resp.length > 0) {
        const user = resp[0];
        const validPass = await helpers.matchPassword(password, user.password);
        if (validPass) {
            done(null, user);
        } else {
            done(null, false );
        }
    } else {
        return done(null, false);
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, username, password, done) => {
    // console.log('Hola desde este lado');
    const { nombre, apellido, Documento} = req.body;
    let documento = parseInt(Documento);
    let newUser = {
        username,
        password,
        nombre,
        apellido,
        documento
    };
    console.log(password);
    newUser.password = await helpers.encryptPassword(password);
    console.log(password);
    const result = await pool.query('INSERT INTO users SET ?', newUser);
    newUser.id = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser(async (id, done) =>{
    const resp = await pool.query('SELECT * FROM users WHERE id =?',[id]);
    done(null, resp[0]);
});