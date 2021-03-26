const express = require('express');
const public = require('../controllers/c_app');
const app = express.Router();

app.get('/', public.index);

app.get('/error',(req,res)=>{
    res.render('error');
});


app.post('/addMensaje', public.addMensaje);
module.exports = app;