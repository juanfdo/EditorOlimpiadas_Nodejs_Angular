var express = require('express');
var categorias = require('./categoria');
var router = express.Router();
var api =
  [
    { txtNombre: 'pregunta' },
    { txtNombre: 'categoria' },
    { txtNombre: 'olimpiada' }
  ];
router.get('/', function(req,res,next){
  res.send(api);
});


module.exports = router;