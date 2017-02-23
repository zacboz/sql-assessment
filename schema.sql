CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(30),
  lastname VARCHAR(50),
  email VARCHAR(100)
);


INSERT INTO Users
(firstname, lastname, email)
VALUES ('John', 'Smith', 'John@Smith.com');

INSERT INTO Users
(firstname, lastname, email)
VALUES ('Dave', 'Davis', 'Dave@Davis.com');

INSERT INTO Users
(firstname, lastname, email)
VALUES ('Jane', 'Janis', 'Jane@Janis.com');

CREATE TABLE Vehicles (
  id SERIAL PRIMARY KEY,
  make VARCHAR(30),
  model VARCHAR(50),
  year INT,
  ownerId INT references Users
);

INSERT INTO Vehicles
(make, model, year, ownerId)
VALUES ('Toyota', 'Camry', '1991', 1);

INSERT INTO Vehicles
(make, model, year, ownerId)
VALUES ('Honda', 'Civic', '1995', 1);

INSERT INTO Vehicles
(make, model, year, ownerId)
VALUES ('Ford', 'Focus', '2005', 1);

INSERT INTO Vehicles
(make, model, year, ownerId)
VALUES ('Toyota', 'Taurus', '2003', 2);

INSERT INTO Vehicles
(make, model, year, ownerId)
VALUES ('VW', 'Bug', '2010', 2);

INSERT INTO Vehicles
(make, model, year, ownerId)
VALUES ('Mini', 'Coup', '2013', 3);
