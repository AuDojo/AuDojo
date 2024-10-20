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

import express, {Express, Request, Response} from "express";

const app: Express = express();
const port = 5001;
console.log("Heeeeeelo");

app.get("/", (req: Request, res: Response) => {
  console.log("Heeelo");
  res.send("Hello from Express!");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
