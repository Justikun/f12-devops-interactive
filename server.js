const express = require('express')
const path = require('path')
const cors = require('cors')

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
const { finished } = require('stream')
var rollbar = new Rollbar({
  accessToken: '314d28bc361d4b9eb9cf8203b619b4e7',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')



const app = express()


const students = ["Justin"]


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
    rollbar.info("HTML file server successfully")
})

app.get("api/students", (req, res) => {
    res.status(200).send(s)
    rollbar.info("Someone got the list of students on page load")
})

app.post("api/students", (req, res) => {
    let {name} = req.body
    name = name.trim()

    const index = students.findIndex((studentName) => studentName === name)
    
    if (index === -1 && name) {
        students.push(name)
        rollbar.log("Student added successfully", {author: "Justin", type: "Manual entry"})
        res.status(200).send(students)
    } else if (name === "") {
        rollbar.error("No name given")
        res.status(400).send("Must provide a name")
    } else {
        rollbar.error("Students already exist") 
        res.status(400).send("That student already exists")
    }
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4545

app.listen(port, () => {
    console.log(`Summoning is on port: ${port}`)
})