const express = require('express');
const app = express.Router();

const auth = require('../controllers/c_authentication');
const { isNotLoggedIn   } = require('../controllers/auth');
const passport = require('passport');

app.get('/signup', isNotLoggedIn, auth.signup);

app.post('/signup',isNotLoggedIn, passport.authenticate('local.signup', {
        successRedirect: '/support/dashboard',
        failureRedirect: '/req/signup',
        failureFlash: true
}));

app.get('/signin', isNotLoggedIn, auth.signin);

app.post('/signin',isNotLoggedIn,(req, res, next) =>{
    passport.authenticate('local.signin', {
        successRedirect: '/support/dashboard',
        failureRedirect: '/error',
        failureFlash: true
    })(req, res, next);
});

app.get('/logout', async (req, res) => {
    req.logOut();
    res.redirect('/');
});


module.exports = app;