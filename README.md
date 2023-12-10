# Project Structure

This project follows the given directory structure with various components organized into specific folders:
```
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── client.js
│   ├── components
│   │   ├── devBox.js
│   │   ├── footer.js
│   │   ├── navigation.js
│   │   ├── reviewComponent.js
│   │   └── reviewMenu.js
│   ├── css
│   │   ├── footer.css
│   │   ├── landingPage.css
│   │   ├── navigation.css
│   │   ├── reviewMenu.css
│   │   └── reviewStyle.css
│   └── html
│       ├── landingPage.html
│       ├── map.html
│       ├── reviewsTemplate.html
│       └── test.html
└── src
    ├── controllers
    │   ├── party.controller.js
    │   ├── review.controller.js
    │   ├── rsvp.controller.js
    │   └── users.controller.js
    ├── model
    │   ├── notes.txt
    │   ├── parties_co.js
    │   ├── parties_dummies.js
    │   ├── reviews_co.js
    │   ├── reviews_dummies.js
    │   ├── rsvps_co.js
    │   ├── rsvps_dummies.js
    │   ├── users_co.js
    │   └── users_dummies.js
    ├── routes
    │   ├── party.routes.js
    │   ├── review.routes.js
    │   ├── rsvp.routes.js
    │   └── users.routes.js
    ├── server.js
    └── views
        ├── landingPage.views.js
        ├── partyMapPage.views.js
        ├── partyReviewsPage.views.js
        └── staticFile.views.js
```

## Directories and Files

- `README.md`: The introductory documentation for the project, including setup instructions and other essential information.
- `package-lock.json`: Automatically generated file for any operations where npm modifies either the node_modules tree or `package.json`.
- `package.json`: Lists the packages your project depends on and provides information about the project (like its version).

### `/public`: Contains the client-facing codebase.

- `client.js`: Handles client-side API calls.
- `/components`: Modular JavaScript files for different components of the application.
- `/css`: Styling files for the client-side application.
- `/html`: HTML templates and pages for the application.

### `/src`: The server-side codebase including the MVC (Model-View-Controller) architecture.

- `/controllers`: Contains controllers that handle direct interactions with the mongodb.
- `/model`: Represents the application's data structures.
  - `xxx_co.js`: mongosh script to create the xxx collection
  - `xxx_dummies.js`: mongosh script to populate the xxx collection with example data entries
- `/routes`: Routes requests to the right controllers.
- `server.js`: The main entry point for the Node.js server.
- `/views`: Server-side templates and views.
  - `landingPage.views.js`: Serves the landing page view.
  - `partyMapPage.views.js`: WIP.
  - `partyReviewsPage.views.js`: Serves the reviews page to the user.
  - `staticFile.views.js`: Helper functions for serving static files.

## Additional Information

- Make sure you have your .env file located in `/src` and configured like so:
    ```
    MONGO_USER="your_first_name"
    MONGO_USER_PASSWORD="your_password_which_chirag_shouldve_DMed_to_you_on_discord"
    ```
- Make sure you have the necessary node dependencies. Rebuild your package with `npm ci` to be safe.