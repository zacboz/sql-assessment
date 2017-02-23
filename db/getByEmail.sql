select *
from Users
  join Vehicles on Users.id = Vehicles.ownerId
where Users.email = $1;
