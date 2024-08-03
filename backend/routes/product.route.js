import express from "express";

import {
  createProducts,
  deleteProducts,
  getDetailProducts,
  getProducts,
  updateProducts,
} from "../controller/product.controller.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getDetailProducts);

router.post("/", createProducts);

router.put("/:id", updateProducts);

router.delete("/:id", deleteProducts);

export default router;
