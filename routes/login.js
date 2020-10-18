var express = require('express');
const md5 = require('md5');
var router = express.Router();
var db = require('../database.js');

/* GET home page. */
router.post('/', function(req, res, next) {
  const body = req.body;
  console.log('login body: ', body);
  const sql = 'select id, email, name from user where email = ? and password = ?';

  db.all(sql, [body.email, md5(body.password)], (err, rows) => {
    if (err) {
      res.status(400).json({'error': err.message});
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    });
  });
});

module.exports = router;
