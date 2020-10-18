var express = require('express');
const md5 = require('md5');
var router = express.Router();
var db = require('../database.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var sql = 'select * from user order by name';

  db.all(sql, [], (err, rows) => {
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
  const body = req.body;
  console.log('user body: ', body);
  const sql = 'insert into user (name, email, password) values (?,?,?)';
  
  db.run(sql, [body.name, body.email, md5(body.password)], (err) => {
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
