import bodyParser from "body-parser";
import express, { Express } from "express";

const app: Express = express();
const port = process.env.PORT || 5001;
const env = process.env.NODE_ENV || "development"; // 'development' oder 'production'

// make sure the right sortingRouting.* is required
const sortingRouting = require(`./SortSensei/sortingRouting.${env === "development" ? "ts" : "js"}`);
const mailRouting = require("./Mail/mailRouting");

app.use(bodyParser.json());

// API Routes
app.use("/api/sorting", sortingRouting);
app.use("/api/mail", mailRouting);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
