const sqlite3 = require('sqlite3').verbose();

const env = process.env.NODE_ENV || 'development';

// Open the database

let db = new sqlite3.Database(`./db/iceBreakers.sqlite`, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(`Error connecting to the database`);
  }else {
    console.log(`Connected to the Database`);
  }
});

module.exports = db;
