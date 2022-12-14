const express = require("express")
const folderController = require("../controllers/folder")

const router = express.Router()

router.post("/createFolder", folderController.createFolder)
router.post("/deleteFolder", folderController.deleteFolder)
router.post("/listFiles", folderController.listFiles)

module.exports = router