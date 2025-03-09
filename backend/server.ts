import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";
import path from "path";

const app: Express = express();
const base_url = "/projects/audojo";
const port = process.env.PORT || 5001;
const env = process.env.NODE_ENV || "development"; // 'development' oder 'production'

// make sure the right sortingRouting.* is required
const sortingRouting = require(`./SortSensei/sortingRouting.${env === "development" ? "ts" : "js"}`);
const mailRouting = require("./Mail/mailRouting");

// make express deliver static frontend pages
if (env === "production") {
  const frontendPath = path.join(__dirname, "..", "..", "frontend");
  // // console.log("produciton is true");
  app.use(base_url, express.static(path.join(frontendPath, "dist")));

  app.get(`${base_url}/*`, (req: Request, res: Response) => {
    res.sendFile(path.join(frontendPath, "dist", "index.html")); //our main page frontend/index.html is loaded
  });
}

app.use(bodyParser.json());

// API Routes
app.use(`${base_url}/api/sorting`, sortingRouting);
app.use(`${base_url}/api/mail`, mailRouting);

// Start server
app.listen(port, () => {
  // // console.log(`Server is running on port ${port}`);
});
