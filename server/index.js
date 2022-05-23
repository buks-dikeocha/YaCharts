const cors = require("cors")
const express = require("express")
const bodyParser = require("body-parser")
const compression = require("compression")
const pool = require("./connection")

const app = express()
app.use(cors())
app.use(compression())
app.use(express.json())
app.use(bodyParser.json())

const PORT = 5000

app.get("/all", async (req, res) => {
    try {
        const profiles = await pool.query(`select * from public."user"`)
        res.send(profiles.rows)
    }
    catch (error) {
        console.error(error.message)
    }
})

app.post("/register", async (req, res) => {
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
})

app.listen(PORT, () => {
    console.log(`Dotted all the Is and crossed all the Ts. Open on Port ${PORT}.`)
})