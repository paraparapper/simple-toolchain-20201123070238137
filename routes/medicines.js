var express = require('express');
var router = express.Router();
var db = require('../database.js');

router.get('/', function(req, res, next) {
  const query = req.query;
  var sql = 'select * from medicine where userId = ? and date = ? order by time';

  db.all(sql, [query.userId, query.date], (err, rows) => {
    if (err) {
      res.status(400).json({"error": err.mesage});
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    });
  });
});

router.post('/', function(req, res, next) {
  console.log('post body: ', req.body);
  const body = req.body;
  const sql = 'INSERT INTO medicine (userId, date, time, timeText, type) VALUES (?,?,?,?,?)';
  
  db.run(sql, [body.userId, body.date, body.time, body.timeText, body.type], (err) => {
    if (err) {
      res.status(400).json({"error": err.message});
      return;
    }

    res.json({
      "message": "success"
    });
  });
});

module.exports = router;