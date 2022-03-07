const {Pool} = require("pg");

const db = new Pool({
    user : 'postgres',
    password: 'root',
    host: 'localhost',
    port: 5432,
    database: 'carvajal'
})

module.exports = db;