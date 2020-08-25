# back-end

- setting up project

- current endpoints

{api/register} method: post requires username and password
{api/login} method: post reqiures username and password

{api/cannabis} method: get requires auth
{api/cannabis/save} method: post requires auth 
                            required body{name, flavors, effects, type, description, rating}
{api/cannabis/:id}  method: delete requires auth               