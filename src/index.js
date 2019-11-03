import "dotenv/config"; // variaveis ambiente

import express from "express";
import morgan from "morgan";

import "./database";
import path from "path";
import cors from "cors";

const app = express();

//Database Stup

//
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  "/file",
  express.static(path.resolve(__dirname, "..", "temp", "uploads"))
);

app.use(require("./routes"));

app.listen(process.env.PORT || 3333);
