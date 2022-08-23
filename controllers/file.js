const File = require("../models/file")

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