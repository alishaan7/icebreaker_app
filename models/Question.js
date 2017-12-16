const db = require('../config/db');

class Question {
  constructor(content) {
    this.content = content;
  }

  save() {
    const self = this;
    const sql = `INSERT INTO questions (content) VALUES (?)`
    new Promise(function(resolve, reject) {
      // console.log("Insert the query");
      db.run(sql, self.content, function() {
        // console.log(self.content);
        resolve(self);
      });
    });
  }

  static CreateTable() {
    // console.log("Create Questions");
    const sql = `CREATE TABLE IF NOT EXISTS questions ( id INTEGER PRIMARY KEY, content TEXT)`;

    return new Promise(function(resolve, reject) {
      db.run(sql);
      resolve( "Questions Table Created");
    });
  }

  static All() {
    // console.log("Fetching All Questions");
    const sql = `SELECT * FROM questions`;
    return new Promise(function(resolve) {
      db.all(sql, function(err, results) {
        // console.log(err);
        // console.log(results);
        let questions = results.map(function(row) {
          let q = new Question();
          q.id = row.id;
          q.content = row.content;
          // console.log(q);
          return q;
        });
        // console.log(questions);
        resolve(questions);
      });
    });
    // console.log("Returned All Questions");
  }

  static Find(id) {
    // console.log("find question");
    // console.log(id);
    const sql = `SELECT * FROM questions WHERE id = ?`;
    return new Promise(function(resolve, reject) {
      db.get(sql, [id], (err, result) => {
        // console.log(err);
        // console.log(result);
        const question = new Question();
        question.id = result.id;
        question.content = result.content;
        // console.log(question);
        resolve(question);
      })
    });
  }

}

module.exports = Question;
