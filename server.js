
require('dotenv').config();
const port = process.env.PORT || 3001;
const crypt = require('argon2');
const db = require('./model');
const bparse = require('body-parser');
const express = require('express');
const app = express();

app.use(bparse.urlencoded({ extended: true }));
app.use(bparse.text());
app.use(bparse.json());

// Default route to serve React index
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/view/build/index.html'));
});

// Authentication
require('./controller/authController')(app, crypt, db);

// Content
require('./controller/projectsController')(app);
require('./controller/floraInventoryController')(app);


let syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
    app.listen(port, () => console.log(`Listening on port ${port}.`));
});