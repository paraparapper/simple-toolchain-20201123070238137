var sqlite3 = require('sqlite3').verbose();
var md5 = require('md5');

const DBSOURCE = 'db.sqlite';

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name text, 
      email text UNIQUE, 
      password text, 
      CONSTRAINT email_unique UNIQUE (email)
      )`,
      (err) => {
        if (err) {
        } else {
          var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)';
          db.run(insert, ["관리자","admin",md5("admin")]);
        }
      });

      db.run(`CREATE TABLE medicine (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId integer,
        date text,
        time text,
        timeText text,
        type text
      )`,
      (err) => {
        if (err) {
        } else {
          var insert = 'INSERT INTO medicine (userId, date, time, timeText, type) VALUES (?,?,?,?,?)';
          db.run(insert, [1, '2020-10-11', '09:01', '아침', '감기약']);
        }
      });
  }
});

module.exports = db;