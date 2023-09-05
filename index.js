const debug = require("debug")("app:startup");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const home = require("./routes/home");
const courses = require("./routes/courses");
const authenticator = require("./middleware/authentication");
const express = require("express");
const app = express();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
//* If the NODE_ENV variable is not Set or Exported,
//* the next statement will return 'development' by Default
console.log(`App.env: ${app.get("env")}`);

//! When we set this, the Express will internally load this module.
//! So, we don't have to require it.
app.set("view engine", "pug");
app.set("views", "./views"); // default values and path (is optional)

app.use(express.json());

// This Middleware function parses incoming request with url encoded payloads
// and populates request.body like a JSON Object.
app.use(express.urlencoded({ extended: true }));
// We use this Middleware to serve the static class.
// This folder will contain project's static assets, like css, images and so on.
app.use(express.static("public"));

// Helmet helps secure Express apps by setting HTTP response headers.
app.use(helmet());

// Configuration
console.log(`Application Name: ${config.get("name")}`);
console.log(`Mail Server: ${config.get("mail.host")}`);
//* Display the password of the mail server:
//! So, this config object looks at various sources to find a value
//! for this configuration, the source could be a configuration file,
//! a json file, it can be an 'environment variable', it can also be a
//! command line argument.
console.log(`Mail Password: ${config.get("mail.password")}`);

//* Enable logging of Http Request only on the Development Machine
if (app.get("env") === "development") {
  // HTTP request logger middleware for node.js
  app.use(morgan("tiny"));
  debug("Morgan Enabled...");
}

app.use(logger);

app.use(authenticator);

app.use("/", home);
app.use("/api/courses", courses);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
