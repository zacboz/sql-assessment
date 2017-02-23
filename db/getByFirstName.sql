select *
from Users
  join Vehicles on Users.id = Vehicles.ownerId
where Users.firstname LIKE $1;
