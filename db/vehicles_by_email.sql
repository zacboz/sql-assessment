SELECT * FROM vehicles
JOIN users ON users.id = vehicles.ownerId
WHERE users.email = $1
