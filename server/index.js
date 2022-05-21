const cors = require("cors")
const express = require("express")
const pg = require("pg")
const bodyParser = require("body-parser")
const compression = require("compression")

const app = express()
app.use(cors())
app.use(compression())
app.use(express.json())
app.use(bodyParser.json())

const PORT = 5000

app.get("/", (req, res) => {
    res.send("got it!")
})

app.listen(PORT, () => {
    console.log(`Dotted all the Is and crossed all the Ts. Open on Port ${PORT}.`)
})