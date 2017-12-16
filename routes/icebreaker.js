var express = require('express');
var router = express.Router();

const IceBreakersController = require("../controller/IceBreakersController.js");

router.get("/new", IceBreakersController.New);
router.get("/", IceBreakersController.Show);
router.post("/", IceBreakersController.Create);

module.exports = router;
