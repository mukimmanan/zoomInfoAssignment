const express = require("express")

app = express()
PORT = 8080

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