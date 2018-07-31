var express = require('express');
var dbMW = require('./../db/databaseMiddleWare');
var router = express.Router();

router.get('/', function (req, res, next) {
  dbMW.ejecutaQuery(dbMW.query.categoria, function (err, row) {
    console.log(row);
    res.json(row);
  });
})

module.exports = router;