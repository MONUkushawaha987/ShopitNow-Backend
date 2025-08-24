require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

const app = express();
connectDB();

app.use(
  cors({
    origin: ["https://shopitnowapp.netlify.app"],
    // origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// app.use((req, res, next) => {
//   if (!req.headers.authorization) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }
//   next();
// });
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));

// simple health
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// app.post("/api/products", async (req, res) => {
//   const product = new Product(req.body);
//   await product.save();
//   res.json(product);
// });

// // Update product
// app.put("/api/products/:id", async (req, res) => {
//   const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });
//   res.json(product);
// });

// // Delete product
// app.delete("/api/products/:id", async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ success: true });
// });

const PORT = process.env.PORT ;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
