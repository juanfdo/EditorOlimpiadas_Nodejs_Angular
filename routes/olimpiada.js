var express = require('express');
var dbMW = require('./../db/databaseMiddleWare');
var router = express.Router();

router.get('/', function (req, res, next) {
  dbMW.ejecutaQuery(dbMW.query.olimpiada, function (err, row) {
    console.log(row);
    res.send(row);
  });
})

module.exports = router;