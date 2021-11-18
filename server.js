const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()


const students = ["Justin"]


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get("api/students", (req, res) => {
    res.status(200).send(s)
})

const port = process.env.PORT || 4545

app.listen(port, () => {
    console.log(`Summoning is on port: ${port}`)
})