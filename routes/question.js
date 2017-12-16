var express = require('express');
var router = express.Router();

const QuestionsController = require("../controller/QuestionsController.js");

router.get("/", QuestionsController.Index)
router.get("/new", QuestionsController.New)
router.post("/", QuestionsController.Create)

module.exports = router;
