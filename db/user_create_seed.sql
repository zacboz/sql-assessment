DROP TABLE IF EXISTS users;
CREATE TABLE users ( id serial primary key, firstname varchar(20), lastname varchar(20), email varchar(50));

INSERT INTO users (firstname, lastname, email)
VALUES ( 'John', 'Smith', 'John@Smith.com'),
( 'Dave', 'Davis', 'Dave@Davis.com'),
( 'Jane', 'Janis', 'Jane@Janis.com');
