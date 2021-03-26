const pool = require('../settings/db');

let admin = async (req, res) =>{
    const articulos = await pool.query(`CALL ListArticulos`);
    const numArticulos = await pool.query('CALL CoutArticulos');
    const numMensajes = await pool.query(`CALL CoutMensajes`);
    const ultArticulos = await pool.query(`CALL UltArticulos`);
    const listMensajes = await pool.query(`CALL ListMensajes`);

    let Articulos = articulos[0];
    let NumArticulos = numArticulos[0];
    let NumMensajes = numMensajes[0];
    let UltArticulos = ultArticulos[0];
    let ListMensajes = listMensajes[0];
    // console.log(Articulos)
    res.render('admin/admin', { Articulos, NumArticulos, NumMensajes, UltArticulos, ListMensajes});
}
let addarticulo = async (req, res)=>{
    const { title, descript} = req.body;
    let users_id = req.user.id;
    await pool.query(`CALL ProAddArticulo('${title}','${descript}',${users_id})`);
    // Alt + 96
    // const newArticulo = {
    //     title,
    //     descript,
    //     users_id
    // }
    // await pool.query('INSERT INTO articulos set ?',[newArticulo]);
    res.redirect('/support/dashboard');
}

let editArticulo = async(req, res) =>{
    const {id} = req.params;
    let Id = parseInt(id);
    const articulo = await pool.query(`CALL EditArticulo('${id}')`);
    let Articulos = articulo[0];
    res.render('admin/editArticulo', { Articulos});
}

let editArticulos = async (req, res) =>{
    const {id} = req.params;
    const {title, descript} = req.body;
    const newArticulo = {
        title,
        descript
    }
    await pool.query('UPDATE articulos set ? WHERE id = ?', [newArticulo, id]);
    res.redirect('/support/dashboard');
}

let deleteArticulo = async(req, res) =>{
    const {id} = req.params;
    let Id = parseInt(id);
    await pool.query(`CALL DeleteArticulo('${Id}')`);
    res.redirect('/support/dashboard');
}

let deleteMensaje = async(req, res) =>{
    const {id} = req.params;
    let Id = parseInt(id);
    await pool.query(`CALL DeleteMensaje('${Id}')`);
    res.redirect('/support/dashboard');
}

module.exports = {
    admin,
    addarticulo,
    editArticulo,
    editArticulos,
    deleteArticulo,
    deleteMensaje
}

