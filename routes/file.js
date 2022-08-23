const express = require("express")
const fileController = require("../controllers/file")

const router = express.Router()

router.post("/createFile", fileController.createFile)
router.post("/deleteFile", fileController.deleteFile)
router.post("/updateFile", fileController.updateFile)

module.exports = router