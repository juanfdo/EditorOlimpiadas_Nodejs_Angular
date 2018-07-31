const sqlite3 = require('sqlite3').verbose();
const util = require('util');

const dbFile = './db/database.sqlite';

const querys = {
  categoria: "SELECT tblCategoria.intID as intId, tblCategoria.txtNombre FROM tblCategoria;",
  olimpiada: "SELECT tblOlimpiada.intID as intId, tblOlimpiada.txtNombre FROM tblOlimpiada;",
  pregunta: "SELECT * FROM viewCuestionario;",
  insertaPregunta: [
    "PRAGMA foreign_keys = ON", //0
    "BEGIN TRANSACTION", //1
    "INSERT INTO tblCuestionario(txtPregunta, txtVideo, txtEcuaciones, txtOtros, txtCorrecta, intIdCategoria, intIdOlimpiada) " +
    "VALUES('%s', null, null, null, '%s', %s, %s)", //2
    "INSERT INTO tblRespuestaErronea(intID, txtRespuesta1, txtRespuesta2, txtRespuesta3) " +
    "SELECT last_insert_rowid(), '%s', '%s', '%s'", //3
    "COMMIT TRANSACTION", //4
    "SELECT last_insert_rowid() AS last_insert_rowid" //5
  ]
};

function insertarPreguntaQuery(pregunta, callBack) {
  var db = new sqlite3.Database('./db/database.sqlite', function () {
    
    db.serialize(function () {
      for (let index = 0; index < querys.insertaPregunta.length; index++) {
        var element = querys.insertaPregunta[index];
        if (index == 2) {
          element = util.format(element, pregunta.txtPregunta, pregunta.txtCorrecta, pregunta.intIdCategoria, pregunta.intIdOlimpiada);
        } else if (index == 3) {
          element = util.format(element, pregunta.txtRespuesta1, pregunta.txtRespuesta2, pregunta.txtRespuesta3);
        }

        if (index != querys.insertaPregunta.length - 1) {
          db.run(element);
        }
        else {
          db.all(element, function (err, row) {
            console.log(row);
            callBack(err, row);
          });
        }
      }
    });
  });
};

function ejecutaQuery(strQuery, callBack) {
  let db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
      callBack(err, null);
      return;
    }
    console.log('Conectado con la base de datos');
    db.all(strQuery, function (err, row) {
      db.close();
      callBack(err, row);
    });
  });
};
function ejecutaStmt(strQuery, callBack) {
  let db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
      console.error(err.message);
      callBack(err, null);
      return;
    }
    console.log('Conectado con la base de datos');
    st = db.run(strQuery);
    console.log(st);
  });
};

module.exports = {
  ejecutaQuery: ejecutaQuery,
  ejecutaStmt: ejecutaStmt,
  query: querys,
  insertarPreguntaQuery: insertarPreguntaQuery
}