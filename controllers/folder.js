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
    }).catch(error => res.status(400).json({
        message: "Folder Not Created"
    }))
}

exports.deleteFolder = (req, res, next) => {
    return Folder.findOneAndDelete({
        userid: req.user,
        _id: req.body.id
    }).then(result => {
        // Deleting all file logic
        res.status(200).json({
            message: "Folder deleted successfully"
        })
    }).catch(_ => {
        res.status(400).json({
            message: "Folder deletion was unsuccessfull"
        })
    })
}