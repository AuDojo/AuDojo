"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 5001;
const bodyParser = require("body-parser");
const sortingRouting = require("./sortingRouting");
// make express deliver static frontend pages
app.use(express_1.default.static(path_1.default.join(__dirname, '..', '..', 'frontend', 'public')));
app.use(express_1.default.static(path_1.default.join(__dirname, '..', '..', 'frontend', 'dist')));
app.use(bodyParser.json());
app.use("/api/sorting", sortingRouting);
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "..", "..", "frontend", "dist", "index.html")); //our main page frontend/index.html is loaded
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
