const db = require('../config/db');
const crypto = require('crypto');

class IceBreaker {

  constructor(question_id) {
    this.question_id = question_id;
  }

  static CreateTable() {
    // console.log("Calling create table on IceBreaker");
    const sql = `CREATE TABLE IF NOT EXISTS icebreakers (id INTEGER PRIMARY KEY, question_id INTEGER, secret TEXT)`;

    return new Promise(function(resolve, reject) {
      db.run(sql, function() {
        // console.log("IceBreakers Table Created");
        resolve("IceBreakers Table Created");
      })
    });
  }

  save() {
    const self = this;
    self.secret = crypto.randomBytes(10).toString('hex');
    const sql = `INSERT INTO icebreakers (question_id, secret) VALUES (?, ?)`;

    return new Promise(function(resolve, reject) {
      // console.log("Insert the query");
    db.run(sql, [self.question_id, self.secret], function(err) {
        // console.log(this.questionID, this.secret);
        self.id = this.lastID;
        resolve(this);
      });
    });
  }

  static Find(id) {
    // console.log("find icebreaker");
    // console.log(id);
    const sql = `SELECT * FROM icebreakers WHERE id = ?`;
    return new Promise(function(resolve, reject) {
      db.get(sql, [id], (err, result) => {
        // console.log(err);
        // console.log(result);
        const icebreaker = new IceBreaker();
        icebreaker.id = result.id;
        icebreaker.question_id = result.question_id;
        icebreaker.secret = result.secret;
        // console.log(icebreaker);
        resolve(icebreaker);
      })
    });
  }

  static FindBySecret(secret) {
    // console.log("find icebreaker by secret");
    // console.log(secret);
    const sql = `SELECT * FROM icebreakers WHERE secret = ?`;
    return new Promise(function(resolve, reject) {
      db.get(sql, secret, function(err, result){
        // console.log(err);
        // console.log(result);
        const icebreaker = new IceBreaker();
        icebreaker.id = result.id;
        icebreaker.question_id = result.question_id;
        icebreaker.secret = result.secret;
        // console.log(icebreaker);
        resolve(icebreaker);
      })
    });
  }

}

module.exports = IceBreaker;
