const pool = require("./connection")

const getAllUsers = async (req, res) => {
    try {
        const profiles = await pool.query(`select * from public."user"`)
        res.send(profiles.rows)
    }
    catch (error) {
        console.error(error.message)
    }
};

const getChartsOfUser = async (req, res) => {
    try {
        const allCharts = await pool.query(`select * from public."user" inner join public."chart" on "user".user_id="chart".user_idf where "user".user_id=$1`,
            [req.params.userid])
        
        res.status(200).send(allCharts.rows)
    } catch (error) {
        console.error(error.message)
        res.status(400).send("didnt work")
    }
};

const registerUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password_ } = req.body
        
        const existingUsers = await pool.query(`select * from public."user" where email=$1`,
            [email])
        
        if (existingUsers.rows.length > 0) {
            res.status(400).send("Email already in use!")
            return
        }

        // encrypt password

        const newUser = await pool.query(`insert into public."user" (first_name, last_name, email, password_) values ($1, $2, $3, $4) returning *`,
            [first_name, last_name, email, password_])
        
        res.status(200).send("User created!")
    } catch (error) {
        console.error(error.message)
    }
}

const createChart = async (req, res) => {
    try {
        const { chart_name, chart_desc } = req.body
        const newChart = await pool.query(`insert into public."chart" (user_idf, chart_name, chart_desc) values ($1, $2, $3)`,
            [req.params.userid, chart_name, chart_desc])
        
        res.status(200).send(`New chart '${chart_name}' created!`)
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Chart was not created")
    }
}

module.exports = {getAllUsers, getChartsOfUser, registerUser, createChart}