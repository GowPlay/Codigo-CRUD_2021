
CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(45) NOT NULL, 
    password VARCHAR(45) NOT NULL, 
    nombre VARCHAR(45) NOT NULL, 
    apellido VARCHAR(45) NOT NULL, 
    documento INT(45) NOT NULL 
);
ALTER TABLE users 
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

CREATE TABLE articulos (
    id INT(11) NOT NULL,
    title VARCHAR(45) NOT NULL,
    descript TEXT,
    hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    users_id INT(11),
    CONSTRAINT fk_users_id FOREIGN KEY(users_id) REFERENCES users(id)
);
ALTER TABLE articulos
    ADD PRIMARY KEY (id);
ALTER TABLE articulos
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

-- AddArticulo
DELIMITER $$
CREATE PROCEDURE ProAddArticulo
(
    in Title varchar(45),
    in Descript TEXT,
    in User_id int(11)
)
BEGIN
insert into articulos(title, descript, users_id) values (Title, Descript, User_id);
END
$$

-- List Articulos
DELIMITER $$
CREATE PROCEDURE ListArticulos()
BEGIN
select * from articulos;
END
$$

-- Cout Articulos
DELIMITER $$
CREATE PROCEDURE CoutArticulos()
BEGIN
select COUNT(id) AS total from articulos;
END
$$

-- Count Mensajes
DELIMITER $$
CREATE PROCEDURE CoutMensajes()
BEGIN
select COUNT(id) AS total from mensaje;
END
$$

DROP PROCEDURE IF EXISTS CoutMensajes;

-- List ultimos articulos
DELIMITER $$
CREATE PROCEDURE UltArticulos ()
BEGIN
select * from articulos ORDER BY id DESC LIMIT 6;
END
$$

-- mensajes
DELIMITER $$
CREATE PROCEDURE ListMensajes ()
BEGIN
select * from mensaje ORDER BY id DESC LIMIT 12; 
END
$$

-- edit articulo
DELIMITER $$
CREATE PROCEDURE EditArticulo(
    in num varchar(20)
)
BEGIN
select * from articulos where id = num;
END
$$

-- Elimar articulo
DELIMITER $$
CREATE PROCEDURE DeleteArticulo(
    in num varchar(20)
)
BEGIN
delete from articulos where id = num;
END
$$

-- Elimar Mensaje
DELIMITER $$
CREATE PROCEDURE DeleteMensaje(
    in num varchar(20)
)
BEGIN
delete from mensaje where id = num;
END
$$

-- List Users
DELIMITER $$
CREATE PROCEDURE ListUsers()
BEGIN
select * from users;
END
$$

-- Add mensaje
DELIMITER $$
CREATE PROCEDURE AddMensaje(
    in Nombre varchar(255),
    in Correo varchar(255),
    in Descripttion TEXT
)
BEGIN
insert into mensaje(nombre,correo,description) values (Nombre, Correo, Descripttion);
END
$$