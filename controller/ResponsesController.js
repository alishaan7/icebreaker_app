const ResponsesController = {};
const Question = require('../models/Question');
const IceBreaker = require('../models/IceBreaker');
const Response = require('../models/Response');

ResponsesController.Show = async function(req, res, next) {

  const icebreaker = await IceBreaker.FindBySecret(req.query.secret);
  console.log(icebreaker);
  console.log(req.query.secret);
  const responses = await Response.FindAllByIceBreakerID(icebreaker.id);
  console.log(responses);
  const question = await Question.Find(icebreaker.question_id);
  console.log(question);

  res.render('responses/show', {
    icebreaker: icebreaker,
    question: question,
    responses: responses
  });
}

ResponsesController.Edit = async function(req, res, next) {
  const response = await Response.FindBySecret(req.query.secret);
  // console.log(response);
  const icebreaker = await IceBreaker.Find(response.icebreaker_id);
  // console.log(icebreaker);
  const question = await Question.Find(icebreaker.question_id);
  // console.log(question);

  res.render("responses/edit", {response, question, icebreaker})
}

ResponsesController.Update = async function(req, res, next) {
  const response = await Response.FindBySecret(req.query.secret);
  // console.log(response);
  response.updateResponseText(req.body.responseText);
  const icebreaker = await IceBreaker.Find(response.icebreaker_id);
  res.redirect(`/responses?secret=${icebreaker.secret}`)
}

module.exports = ResponsesController;
