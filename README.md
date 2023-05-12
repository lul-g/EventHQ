# Project Structure Explanation
Here's an explanation of the folder structure for this app.

## Strucure - visualization
`look at image`

## Structure - explantion
### /EventHQ
This folder contains the main application code.

### controllers/
This folder contains the controller files for each feature of the app. Controllers handle the logic for each route and view of the app.

- authController.js: Handles authentication-related routes and views.
- publicController.js: Handles public page-related routes and views.

### models/
This folder contains the model files for each data object of the app. Models define the schema and data access methods for each object.

- user.js: Defines the schema and data access methods for the User object.

### views/
This folder contains the view files for each feature of the app. Views define how the data is displayed to the user.

- auth/: Contains the view files for authentication-related pages.
- login.ejs: The login page view.
- register.ejs: The registration page view.
- public/: Contains the view files for public pages.
- index.ejs: The index page view.
- private/: Contains the view files for private pages.
- dashboard.ejs: The dashboard page view.

### routes/
This folder contains the route files for each feature of the app. Routes define the HTTP routes and their associated controller methods.

- authRoutes.js: Defines the routes and their associated controller methods for authentication-related pages.

- publicRoutes.js: Defines the routes and their associated controller methods for public pages.
- privateRoutes.js: Defines the routes and their associated controller methods for private pages.

### utils/
This folder contains utility functions for the app. In this case, there's a database.js file for managing database connections.

- database.js: Defines the database connection and methods for the app.

### config/
This folder contains the configuration files for the app. In this case, there's a config.js file for managing app-wide configuration settings.

- config.js: Defines the configuration settings for the app. Now we dont have to copy paste key, we just ignore this config file when we push.

### node_modules/
This folder contains the installed dependencies for the app.

### package.json
This file contains the metadata for the app and the list of its dependencies.

### server.js
The main entry point of the app. This file initializes the app and starts the server.
