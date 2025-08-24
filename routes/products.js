const express = require("express");
const Product = require("../models/Product");
const { auth, adminOnly } = require("../middleware/auth");
const router = express.Router();

// list products
router.get("/", async (req,res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

// single product
router.get("/:id", async (req,res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
});

// admin: create product
router.post("/", auth, adminOnly, async (req,res) => {
  const { title, description, price, image, category, countInStock } = req.body;
  const product = new Product({ title, description, price, image, category, countInStock });
  await product.save();
  res.json(product);
});

// admin: update
router.put("/:id", auth, adminOnly, async (req,res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
});

// admin: delete
router.delete("/:id", auth, adminOnly, async (req,res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
