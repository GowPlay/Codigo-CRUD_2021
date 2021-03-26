const pool = require('../settings/db');

let signup = async (req, res) => {
    const user = await pool.query('SELECT * FROM users');
    res.render('auth/signup', { user});
};
let signin = (req, res) => {
    res.render('auth/signin');
}
module.exports = {
    signup,
    signin
}