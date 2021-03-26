const express = require('express');
const admin = require('../controllers/c_admin');
const app = express.Router();

const { isLoggedIn} = require('../controllers/auth');

app.get('/dashboard',isLoggedIn,  admin.admin);

app.post('/addarticulo',isLoggedIn, admin.addarticulo);

// Edit articulo
app.get('/editArticulo/:id',isLoggedIn, admin.editArticulo);
app.post('/editArticulo/:id',isLoggedIn, admin.editArticulos);

// Eliminar Articulo
app.get('/deleteArticulo/:id',isLoggedIn, admin.deleteArticulo);

// Eliminar Mensaje
app.get('/deleteMensaje/:id',isLoggedIn, admin.deleteMensaje);

module.exports = app;