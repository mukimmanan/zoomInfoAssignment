const Folder = require("../models/folder")

exports.createFolder = (req, res, next) => {
    tempFolder = new Folder({
        userid: req.user,
        name: req.body.name 
    })

    return tempFolder.save().then(result => {
        res.status(200).json({
            message: "Folder Successfully Created",
            id: result._id
        })
    }).catch(res.status(400).json({
        message: "Folder Not Created"
    }))
}
