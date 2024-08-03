// const express = require('express')

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();

app.use(express.json()); //allow  us to accept json data in a req.body
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`server start at http://localhost:${PORT}`);
});
