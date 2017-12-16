const db = require('../config/db');
const crypto = require('crypto');

class Response {

  save() {
    const self = this;
    const sql = `INSERT INTO responses (icebreaker_id, question_id, secret, email) VALUES (?, ?, ?, ?)`;
    this.secret = crypto.randomBytes(10).toString('hex');
    // console.log(this);
    return new Promise(function(resolve, reject) {
      // console.log(self);
      // console.log(self);
      db.run(sql, self.icebreaker_id, self.question_id, self.secret, self.email, function (err){
        // console.log(err);
        resolve(self);
      });
    });
  }

  updateResponseText(text) {
    const self = this;
    const sql = `UPDATE responses SET response_text = ? WHERE id = ?`;
    // console.log(text);
    self.response_text = text;
    // console.log(self.response_text);
    // console.log(self.id);
    return new Promise(function(resolve){
      db.run(sql, self.response_text, self.id, function(){
        resolve(self);
      });
    });
  }

  static BatchCreate(iceBreaker, emails) {
    // console.log("called batch create");
    // console.log(iceBreaker);
    // console.log(emails);
    emails.forEach(async function(email){
      // console.log(email);
      if (email != '') {
        const response = new Response()
        response.email = email;
        response.question_id = iceBreaker.question_id;
        response.icebreaker_id = iceBreaker.id;
        // console.log(response);
        // console.log("saving");
        await response.save();
      }
    })
  }

  static CreateTable() {
    const sql = `CREATE TABLE IF NOT EXISTS responses (id INTEGER PRIMARY KEY, icebreaker_id INTEGER, question_id INTEGER, email TEXT, secret TEXT, response_text TEXT)`;

    return new Promise(function(resolve, reject) {
      db.run(sql, function() {
        resolve("Response Table Created");
      });
    });
  }

  static FindAllByIceBreakerID(icebreaker_id) {
    // console.log("Call find all by IceBreaker ID");
    const sql = `SELECT * FROM responses WHERE icebreaker_id = ?`;

    return new Promise(function(resolve, reject) {
      db.all(sql, icebreaker_id, function (err, results) {
        // console.log(results);
        const responses = results.map(function(result){
          // console.log(result);
          const response = new Response;
          response.id = result.id;
          response.question_id = result.question_id;
          response.icebreaker_id = result.icebreaker_id;
          response.email = result.email;
          response.secret = result.secret;
          response.response_text = result.response_text;

          // console.log(response);
          return response;
        });
        console.log(responses);
        resolve(responses);
      });

    });
  }

  static FindBySecret(secret) {
    const sql = `SELECT * FROM responses WHERE secret = ?`;
    // console.log("finding by secret");
    return new Promise(function(resolve, reject) {
      db.get(sql,secret, function(err, result) {
        // console.log(result);
        const response = new Response;
        response.id = result.id;
        response.question_id = result.question_id;
        response.icebreaker_id = result.icebreaker_id;
        response.email = result.email;
        response.secret = result.secret;

        // console.log(response);
        resolve(response);
      })
    });
  }
}

module.exports = Response;
