const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "bg121902",
    host: "localhost",
    database: "yacharts",
    port: 5432
})

module.exports = pool