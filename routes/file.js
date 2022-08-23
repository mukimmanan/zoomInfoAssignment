const express = require("express")
const fileController = require("../controllers/file")

const router = express.Router()

router.post("/createFile", fileController.createFile)

module.exports = router