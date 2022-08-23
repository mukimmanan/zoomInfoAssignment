const User = require("../models/user")

exports.signup = (req, res, next) => {
    if (req.body.username && req.body.password && req.body.firstName && req.body.lastName) {
        newUser = new User({
            username: req.body.username,
            password: req.body.password,
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