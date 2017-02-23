UPDATE Vehicles
SET ownerId = null
WHERE Vehicles.id = $1;
