const express = require("express")
const folderController = require("../controllers/folder")

const router = express.Router()

router.post("/createFolder", folderController.createFolder)

module.exports = router