import express, { Express, Request, Response } from "express";
import path from "path";

const app: Express = express();
const port = 5001;
const bodyParser = require("body-parser");

// make sure the right sortingRouting.* is required
const env = process.env.NODE_ENV; // 'development' oder 'production'
// console.log("environmental variable " + env);
const sortingRouting = require(env === "development"
  ? "./SortSensei/sortingRouting.ts"
  : "./SortSensei/sortingRouting.js");
const mailRouting = require("./Mail/mailRouting");

// make express deliver static frontend pages
if (env === "production") {
  // console.log("produciton is true");
  app.use("/projects/audojo", express.static(path.join(__dirname, "..", "..", "frontend", "dist")));
  app.use("/projects/audojo", express.static(path.join(__dirname, "..", "..", "frontend", "public")));

  app.get("/projects/audojo/*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "..", "..", "frontend", "dist", "index.html")); //our main page frontend/index.html is loaded
  });
}

app.use(bodyParser.json());
app.use("/api/sorting", sortingRouting);
app.use("/api/mail", mailRouting);

app.listen(port, () => {
  // console.log(`Server is running on port ${port}`);
});
