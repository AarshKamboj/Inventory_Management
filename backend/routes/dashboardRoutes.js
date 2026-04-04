import express from "express";
import Product from "../models/Product.js";
import Invoice from "../models/Invoice.js";

const router = express.Router();

// 📊 GET DASHBOARD STATS
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    const invoices = await Invoice.find();

    // 💰 TOTAL REVENUE
    const revenue = invoices.reduce((acc, inv) => acc + inv.total, 0);

    // 📦 TOTAL SALES (TOTAL ITEMS SOLD)
    const sales = invoices.reduce(
      (acc, inv) =>
        acc +
        inv.items.reduce((sum, item) => sum + item.qty, 0),
      0
    );

    // ⚠️ LOW STOCK (<10)
    const lowStock = products.filter((p) => p.stock > 0 && p.stock < 10).length;

    // ❌ OUT OF STOCK
    const outOfStock = products.filter((p) => p.stock === 0).length;

    res.json({
      revenue,
      sales,
      lowStock,
      outOfStock,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;