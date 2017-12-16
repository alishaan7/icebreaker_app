const IceBreakersController = {};

const Question = require('../models/Question');
const IceBreaker = require('../models/IceBreaker');
const Response = require('../models/Response');

IceBreakersController.New = async function(req, res, next) {
  // console.log("called IceBreaker New");
  const question = await Question.Find(req.query.questionID);
  // console.log("Found Question");
  res.render('icebreakers/new', { question: question });
}

IceBreakersController.Create = async function (req, res, next) {
  const question = await Question.Find(req.query.questionID);
  // console.log(question.id);
  const icebreaker = new IceBreaker();
  //
  icebreaker.question_id = question.id;
  // console.log("log icebreaker");
  await icebreaker.save();
  // console.log(req.body.iceBreakerEmails);
  // console.log(icebreaker);

  await Response.BatchCreate(icebreaker, req.body.iceBreakerEmails);
  // console.log("batchcreated");
  res.redirect(`/icebreakers?secret=${icebreaker.secret}`)
}

IceBreakersController.Show = async function (req, res, next) {
  // console.log("Find IceBreaker by secret");
  const icebreaker = await IceBreaker.FindBySecret(req.query.secret);
  // console.log(icebreaker);
  // console.log("Find Question");
  const question = await Question.Find(icebreaker.question_id);
  // console.log(question);
  // console.log("Find Responses");
  // console.log("IceBreaker ID");
  // console.log(icebreaker.id);
  const responses = await Response.FindAllByIceBreakerID(icebreaker.id);
  // console.log(responses);
  const url = req.protocol + '://' + req.get('host') + req.originalUrl;
  // console.log(url);
  const site = req.protocol + '://' + req.get('host');
  // console.log(site);

  res.render('icebreakers/show',{
    icebreaker: icebreaker,
    question: question,
    responses: responses,
    url: url,
    site: site
  });

}

module.exports = IceBreakersController;
