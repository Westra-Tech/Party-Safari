------------------------------
HOW TO ADD A NEW API ENDPOINT
------------------------------

1.) does it need a new controller? (It will need a new controller if it is accessing a new resource like a  new database/server)
    - if yes, create a new controller in the controllers folder and name it something like resourceName.controller.js
    - if no, write the new endpoint as a function in the appropriate controller and move on to step 2
2.) Add the new endpoint to the router in the routes folder
    - if it is a new controller, add a new file to the routes folder and name it something like resourceName.routes.js
    - if it is not a new controller, add the new endpoint to the router file for that controller
3.) DOCUMENT YOU NEW ENDPOINT IN THE API FILE
    - add a new section to the API file and document the new endpoint and what it does/uri
    - if it is a new controller, add a new section to the API file and document the new controller