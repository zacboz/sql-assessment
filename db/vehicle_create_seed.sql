DROP TABLE IF EXISTS vehicles;
CREATE TABLE vehicles (id serial primary key, make varchar(20), model varchar(20), year integer, ownerId integer);

INSERT INTO vehicles (make, model, year, ownerId)
VALUES ('Toyota', 'Camry', 1991, 1),
('Honda', 'Civic', 1995, 1),
('Ford', 'Focus', 2005, 1),
('Ford', 'Taurus', 2003, 2),
('VW', 'Bug', 2010, 2),
('Mini', 'Coup', 2013, 3);
