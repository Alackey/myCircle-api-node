/**
 * Module dependencies.
 */
import * as express from "express";
import * as compression from "compression";  // compresses requests
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as errorHandler from "errorhandler";
import * as lusca from "lusca";
import * as dotenv from "dotenv";
import * as flash from "express-flash";
import * as path from "path";
import { createSchema } from "./database/cloudsql";
import expressValidator = require("express-validator");



/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: ".env" });

/**
 * init database
 */
createSchema();

/**
 * Controllers (route handlers).
 */
import * as homeController from "./controllers/home";
import * as usersController from "./controllers/users";
import * as groupsController from "./controllers/groups";

/**
 * Create Express server.
 */
const app = express();




/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

/**
 * Primary app routes.
 */
app.get("/", homeController.index);
app.post("/users", usersController.create);
app.post("/groups", groupsController.create);



/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});

module.exports = app;