const express = require("express")
const bodyParse = require("body-parser")
const moongoose = require("mongoose")
const { default: mongoose } = require("mongoose")

const authRoutes = require("./routes/auth")

app = express()
PORT = 8080

// Adding JSON Body Parser
app.use(bodyParse.json())

// Adding a test route
app.get("/test", (req, res, next) => {
    return res.json({
        message: "Your server is working fine"
    })
})

app.use("/auth", authRoutes)

mongoose.connect("mongodb://localhost:27017/assignmentDB").then(_ => {
    app.listen(PORT, (error) => {
        if (!error) {
            console.log("Server is successfully created and is Running on Port = " + PORT)
        } else {
            console.log("Error Occurred, server can't start")
        }
    })
}).catch(error => console.log(error))