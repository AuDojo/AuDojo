import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 5001;
const bodyParser = require("body-parser");

// make sure the right sortingRouting.* is required
const env = process.env.NODE_ENV; // 'development' oder 'production'
// const sortingRouting = require(env === "development" ? "./sortingRouting.ts" : "./sortingRouting.js");
const sortingRouting = require("./sortingRouting");

const mailRouting = require("./mailRouting");

app.use(bodyParser.json());
app.use("/api/sorting", sortingRouting);
app.use("/api/mail", mailRouting);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
