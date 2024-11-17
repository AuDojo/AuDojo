/*
//import dotenv from 'dotenv';
import express, { Express, Request, Response } from "express";

const app: Express = express();

const PORT = process.env.PORT || 5001;

app.get("/", (req: Request, res: Response) => {
  // root route http://localhost:5001
  res.send("Hello World!");
});

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
*/

import express, { Express, Request, Response } from "express";
import path from "path";

const app: Express = express();
const port = 5001;
const bodyParser = require("body-parser");
const sortingRouting = require("./sortingRouting");

// make express deliver static frontend pages
app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'public')));
app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'dist')));

app.use(bodyParser.json());
app.use("/api/sorting", sortingRouting);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname,".." ,".." , "frontend","dist", "index.html")); //our main page frontend/index.html is loaded
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
