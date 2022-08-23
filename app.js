const express = require("express")
const bodyParse = require("body-parser")

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

app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server is successfully created and is Running on Port = " + PORT)
    } else {
        console.log("Error Occurred, server can't start")
    }
})