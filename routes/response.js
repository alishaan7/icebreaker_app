var express = require('express');
var router = express.Router();

const ResponsesController = require("../controller/ResponsesController.js");

router.get("/", ResponsesController.Show)
router.get("/edit", ResponsesController.Edit)
router.post("/", ResponsesController.Update)

module.exports = router;
