const express = require("express")

app = express()
PORT = 8080

app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server is successfully created and is Running on Port = " + PORT)
    } else {
        console.log("Error Occurred, server can't start")
    }
})