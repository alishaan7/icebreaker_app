const QuestionsController = {};
const Question = require('../models/Question');

QuestionsController.Index = async function(req, res, next) {
  // console.log("Questions/Index action called");
  const questions = await Question.All();
  res.render('questions/index', {questions: questions});
}

QuestionsController.New = function (req, res) {
  res.render(`questions/new`);
}

QuestionsController.Create = async function (req, res) {
  const question = new Question(req.body.questionContent);
  await question.save();
  res.redirect('/');
}
module.exports = QuestionsController;
