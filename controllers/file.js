const File = require("../models/files")

exports.createFile = (req, res, next) => {
    tempFile = new File({
        userid: req.user,
        content: req.body.content,
        folderid: req.body.folderid
    })

    tempFile.save().then(result => {
        res.status(200).json({
            message: "File Created Successfully",
            id: result._id
        })
    }).catch(_ => {
        res.status(400).json({
            message: "File Not Created"
        })
    })
}

exports.deleteFile = (req, res, next) => {
    File.deleteOne({
        userid: req.user,
        _id: req.body.id,
        folderid: req.body.folderid
    }).then(_ => {
        res.status(200).json({
            message: "File Deleted Successfully"
        })
    }).catch(_ => {
        res.status(200).json({
            message: "File Deletion unsuccessful"
        })
    })
}