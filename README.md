Prerequisites:

1. Node with npm
2. MongoDB

How to setup/run the app:

After installing the prerequisites, make sure mongo service is running: *mongod* to run the mongo server.

- api server
1. After cloning the repo, cd to trunk/api.
2. Execute *node generateData.js* to populate user data.
3. Execute *npm start* to run the api server.

- appUI
1. After cloning the repo, cd to trunk/appUI.
2. Execute *npm start* from the terminal to run UI server.
3. Navigate to http://localhost:4200/ and login using *giricgoyal@gmail.com/P@ssw0rd* combination.