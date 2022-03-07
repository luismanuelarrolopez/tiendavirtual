----1. ELIMINE LA BASE DE DATOS CARVAJAL
DROP DATABASE carvajal;
----2. CREE LA BASE DE DATOS CARVAJAL
create database carvajal;

---3. POR ULTIMO EJECUTE ESTE SCRIPT DE CREACION E INSERCION
CREATE TABLE usuario (
    usuario varchar(120) NOT NULL,
    nombre varchar(120) NOT NULL,
    clave varchar(120) NOT NULL,
	PRIMARY KEY (usuario)
);

create table producto(
    idProducto SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio int not null,
    stock int not null,
    descripcion VARCHAR(255) not null,
    imagen bytea
);

CREATE TABLE carrocompras (
    idCarro SERIAL PRIMARY KEY,
    idUsuarioCarro varchar(120) NOT NULL,
    idProductoCarro int NOT NULL,
    cantidad int NOT NULL,
	
	FOREIGN KEY (idUsuarioCarro) REFERENCES usuario(usuario),
	FOREIGN KEY (idProductoCarro) REFERENCES producto(idProducto)
);

INSERT INTO producto(nombre,precio,stock,descripcion) VALUES ('Arroz',3000,3,'Arroz Diana');
INSERT INTO producto(nombre,precio,stock,descripcion) VALUES ('Aceite',20000,5,'Aceite de Oliva');

INSERT INTO usuario(usuario,nombre,clave) VALUES ('Luismanuelarro','Luis','123');