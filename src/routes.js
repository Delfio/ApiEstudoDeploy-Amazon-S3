import { Router } from "express";

import multer from "multer";
const routes = new Router();

import multerConfig from "./config/multer";

routes.get("/", (req, res) => {
  return res.json({ ok: true });
});

routes.post("/post", multer(multerConfig).single("file"), (req, res) => {
  console.log(req.file);
  return res.json({ ok: true });
});

module.exports = routes;
