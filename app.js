const express = require("express")
const bodyParse = require("body-parser")
const { default: mongoose } = require("mongoose")
const User = require("./models/user")

const authRoutes = require("./routes/auth")
const folderRoutes = require("./routes/folder")
const fileRoutes = require("./routes/file")

const Folder = require("./models/folder")
const File = require("./models/files")

const jwt = require('jsonwebtoken');

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

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Authorization", "Content-Type")
    next()
})

// Setting the user in req object if Authorization header set
app.use(async (req, res, next) => {
    let jwtSecretKey = "hello"
    if (req.headers.authorization) {
        const verified = jwt.verify(req.headers.authorization, jwtSecretKey);
        const userId = verified.id
    if (userId) {
        await User.findById(userId).then(user => {
            req.user = user
            req.isAuthenticated = true
        }).catch(_ => {
            req.isAuthenticated = false
        })
    }
    }
    next()
})

authenticatedGuard = (req, res, next) => {
    if (!req.isAuthenticated) {
        return res.json({
            message: "User not Authenticated"
        })
    }
    next()
}

app.use("/auth", authRoutes)
app.use("/folder", authenticatedGuard, folderRoutes)
app.use("/file", authenticatedGuard, fileRoutes)


// Adding a test auth route
app.get("/auth-test", authenticatedGuard, (req, res, next) => {
    return res.json({
        message: "Your server is working fine",
        userid: req.user.id
    })
})

// home route
app.get("/", authenticatedGuard, async (req, res, next) => {
    files = await File.find({
        userid: req.user,
        folderid: null
    })

    output = {
        files: files
    }

    folders = await Folder.find({
        user: req.user
    })

    folders = folders.map(async (folder) => {
        files_ = await File.find({
            user: req.user,
            folderid: folder.folderid
        })

        tempt = {...folder._doc, files_}
        return tempt
    })

    Promise.all(folders).then(result => {
        output.folders = result
        return res.json({
            message: "Your server is working fine",
            userdata: output
        })
    })
})

mongoose.connect("mongodb://mongo/assignmentDB").then(_ => {
    app.listen(PORT, (error) => {
        if (!error) {
            console.log("Server is successfully created and is Running on Port = " + PORT)
        } else {
            console.log("Error Occurred, server can't start")
        }
    })
}).catch(error => console.log(error))