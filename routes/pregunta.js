var express = require('express');
var dbMW = require('./../db/databaseMiddleWare');
var router = express.Router();

router.get('/', function (req, res, next) {
  dbMW.ejecutaQuery(dbMW.query.pregunta, function (err, row) {
    console.log(row);
    res.json(row);
  });
})
router.post('/', function (req, res) {
    dbMW.insertarPreguntaQuery(req.body, function(err, row){
    if (err) {
      return res.send(500, err);
    }
    res.json(row[0]);
  });
});
module.exports = router;