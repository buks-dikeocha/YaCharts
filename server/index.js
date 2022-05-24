const cors = require("cors")
const express = require("express")
const compression = require("compression")
const bodyParser = require("body-parser")
const actions = require("./actions")

const pool = require("./connection")

const app = express()
app.use(cors())
app.use(compression())
app.use(express.json())
app.use(bodyParser.json())

const PORT = 5000

app.get("/users/all", actions.getAllUsers)

app.get("/user/:userid/chart/all", actions.getChartsOfUser)

app.post("/register", actions.registerUser)

app.post("/user/:userid/chart/new", actions.createChart)

app.listen(PORT, () => {
    console.log(`Dotted all the Is and crossed all the Ts. Open on Port ${PORT}.`)
})


//  user/{key/action}/chart/{key/action}/stat/{key/action}