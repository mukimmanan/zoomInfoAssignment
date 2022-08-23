const User = require("../models/user")
const crypto = require("crypto")

exports.signup = (req, res, next) => {
    if (req.body.username && req.body.password && req.body.firstName && req.body.lastName) {
        salt = "frfkjsdncfjksdncjksnd"; 
        hash = crypto.pbkdf2Sync(req.body.password, salt,  
            1000, 64, `sha512`).toString(`hex`); 
        // password``
        newUser = new User({
            username: req.body.username,
            password: hash,
            lastName: req.body.lastName,
            firstName: req.body.firstName
        })

        return newUser.save().then(result => {
            res.status(200).json({
                message: "User Create",
                userid: result._id
            })
        }).catch(error => {
            res.status(400).json({
                message: "Error Occurred"
            })  
        })
    }

    return res.status(400).json({
        message: "Error Occurred"
    })
}

exports.signin = (req, res, next) => {
    console.log(req.body)
    if (req.body.username && req.body.password) {
        salt = "frfkjsdncfjksdncjksnd"; 
        hash = crypto.pbkdf2Sync(req.body.password, salt,  
            1000, 64, `sha512`).toString(`hex`); 

        return User.findOne({
            username: req.body.username,
            password: hash
        }).then(result => {
            if (!result) {
                res.status(400).json({
                    message: "Error Occurred 1"
                }) 
            }
            res.status(200).json({
                message: "User Found",
                id: result._id
            })
        }).catch(error => {
            console.log(error)
            res.status(400).json({
                message: "Error Occurred 1"
            })  
        })
    }

    return res.status(400).json({
        message: "Error Occurred 2"
    })
}