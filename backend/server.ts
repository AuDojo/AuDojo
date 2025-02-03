import express, { Express, Request, Response } from "express";
import path from "path";

const app: Express = express();
const port = 5001;
const bodyParser = require("body-parser");

// make sure the right sortingRouting.* is required
const env = process.env.NODE_ENV; // 'development' oder 'production'
const sortingRouting = require(env === "development" ? "./sortingRouting.ts" : "./SortSensei/sortingRouting.js");
const mailRouting = require("./Mail/mailRouting");


// make express deliver static frontend pages
app.use(express.static(path.join(__dirname,'..' ,'..', 'frontend', 'public')));
app.use(express.static(path.join(__dirname,'..' ,'..', 'frontend', 'dist')));

app.use(bodyParser.json());
app.use("/api/sorting", sortingRouting);
app.use("/api/mail", mailRouting);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, ".." , "frontend","dist", "index.html")); //our main page frontend/index.html is loaded
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
