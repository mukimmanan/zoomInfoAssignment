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
        _id: req.body.id
    }).then(result => {
        res.status(200).json({
            message: "File Deleted Successfully",
            result: result
        })
    }).catch(_ => {
        res.status(200).json({
            message: "File Deletion unsuccessful"
        })
    })
}

exports.updateFile = (req, res, next) => {
    return File.findOneAndUpdate({
        userid: req.user,
        _id: req.body.id
    }, {
        content: req.body.content
    }).then(result => {
        res.status(200).json({
            message: "File Updated Successfully",
            result: result
        })
    }).catch(_ => {
        res.status(400).json({
            message: "File not Updated"
        })
    })
}

exports.moveFile = async (req, res, next) => {
    fileId = req.body.id
    newFolderId = req.body.newFolderid

    file = await File.findOne({
        _id: fileId,
        userid: req.user
    })

    if (newFolderid) {
        newFolder = await Folder.findOne({
            _id: newFolderid,
            userid: req.user
        })
    
        if (!newFolder) {
            return res.status(200).json({
                message: "New Folder not found"
            })
        }   
    }

    if (newFolderId) {
        file.folderid = newFolderId
        await file.save()
    } else {
        file.folderid = null
        await file.save()
    }

    return res.status(200).json({
        message: "File Moved Successfully"
    })

}