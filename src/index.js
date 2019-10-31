import "dotenv/config"; // variaveis ambiente

import express from "express";
import morgan from "morgan";

import "./database";

const app = express();

//Database Stup

//

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(require("./routes"));

app.listen(3333);
