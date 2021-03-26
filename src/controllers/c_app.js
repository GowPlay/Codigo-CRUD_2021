const pool = require('../settings/db');

let index = async(req, res) =>{
    const articulos = await pool.query(`CALL ListArticulos`);
    const Users = await pool.query(`CALL ListUsers`);
    let Articulos = articulos[0];
    let users = Users[0];

    res.render('index', {Articulos, users});
}

let addMensaje = async (req, res) =>{
    const {nombre, correo, description} = req.body;
    await pool.query(`CALL AddMensaje('${nombre}','${correo}','${description}')`);
    res.redirect('/');
}

module.exports = {
    index,
    addMensaje
}