UPDATE Vehicles
SET ownerId = $2
WHERE Vehicles.id = $1;
