------------------------------------------------------------------------
-- TODO: IMPLEMENTAR
------------------------------------------------------------------------
BEGIN TRANSACTION;
PRAGMA foreign_keys = OFF;

CREATE TABLE tblUsuario(
	intId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	txtNombre TEXT NOT NULL UNIQUE
--	intRol INTEGER NOT NULL DEFAULT 1 REFERENCES rol(intId),
--	txtPassword TEXT NOT NULL
);
INSERT INTO tblUsuario(intId, txtNombre) VALUES (1, 'root');

CREATE TABLE tblConfiguracion(
	intId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	txtKey TEXT NOT NULL UNIQUE,
	txtValue TEXT NOT NULL,
	txtDescripcion TEXT NOY NULL,
	txtCreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	txtCreatedBy INTEGER NOT NULL DEFAULT 1 REFERENCES tblUsuario(intId)
);
INSERT INTO tblConfiguracion(txtKey,txtValue,txtDescripcion)values('ver','0.0.2','Version de la base de datos');

CREATE TABLE tblOlimpiada(
	intId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	txtNombre TEXT NOT NULL UNIQUE,
	txtCreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	txtCreatedBy INTEGER NOT NULL DEFAULT 1 REFERENCES tblUsuario(intId)
);

CREATE TABLE tblCategoria(
	intId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	txtNombre TEXT NOT NULL UNIQUE,
	txtCreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	txtCreatedBy INTEGER NOT NULL DEFAULT 1 REFERENCES tblUsuario(intId)
);

-- https://www.sqlite.org/intern-v-extern-blob.html
-- CREATE TABLE tblMediaFile(
-- 	intId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
-- 	pathRelativo BOOLEAN NOT NULL DEFAULT 1,
-- 	web BOOLEAN NOT NULL DEFAULT 0,
-- 	path NVARCHAR NOT NULL UNIQUE,
--	txtCreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
--	txtCreatedBy INTEGER NOT NULL DEFAULT 1 REFERENCES tblUsuario(intId)
-- 	);
-- https://www.sqlite.org/intern-v-extern-blob.html
-- CREATE TABLE tblMediaBLOB(
-- 	intId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
-- 	data BLOB NOT NULL,
--	txtCreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
--	txtCreatedBy INTEGER NOT NULL DEFAULT 1 REFERENCES tblUsuario(intId)
-- );

CREATE TABLE tblCuestionario( 
	intId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	intIdCategoria INTEGER NOT NULL,
	intIdOlimpiada INTEGER NOT NULL,

	txtPregunta TEXT NULL,
	txtVideo NVARCHAR NULL,
	txtEcuaciones NVARCHAR NULL,
	txtOtros NVARCHAR NULL,

	txtCorrecta TEXT NOT NULL,
	txtRespuesta1 TEXT NOT NULL,
	txtRespuesta2 TEXT NOT NULL,
	txtRespuesta3 TEXT NOT NULL,

	txtCreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	txtCreatedBy INTEGER NOT NULL DEFAULT 1 REFERENCES tblUsuario(intId),
--	CHECK ((txtPregunta is not null) or (txtVideo is not null) or (txtEcuaciones is not null) or (txtOtros is not null) ),
	FOREIGN KEY(intIdCategoria) REFERENCES tblCategoria(intId)
	FOREIGN KEY(intIdOlimpiada) REFERENCES tblOlimpiada(intId)
);


CREATE TABLE tblRespuestaErronea(
	intId INTEGER NOT NULL PRIMARY KEY,
	txtCreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	txtCreatedBy INTEGER NOT NULL DEFAULT 1 REFERENCES tblUsuario(intId),
	FOREIGN KEY(intId) REFERENCES tblCuestionario(intId)
);

CREATE VIEW IF NOT EXISTS viewCuestionario AS
SELECT tblCuestionario.intId as intId,
  tblCuestionario.txtCorrecta as txtCorrecta,
  tblCuestionario.txtEcuaciones as txtEcuaciones,
  tblCuestionario.txtOtros as txtOtros,
  tblCuestionario.txtPregunta as txtPregunta,
  tblCuestionario.txtVideo as txtVideo,
  tblCuestionario.txtRespuesta1 as txtRespuesta1,
  tblCuestionario.txtRespuesta2 as txtRespuesta2,
  tblCuestionario.txtRespuesta3 as txtRespuesta3
FROM
  tblCuestionario;

PRAGMA foreign_keys = ON;
COMMIT;