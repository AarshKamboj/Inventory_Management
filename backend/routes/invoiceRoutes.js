import express from "express";
import Invoice from "../models/Invoice.js";

const router = express.Router();

// CREATE INVOICE
router.post("/", async (req, res) => {
  try {
    const count = await Invoice.countDocuments();

    const newInvoice = new Invoice({
      ...req.body,
      invoiceNumber: `INV-${1000 + count}`,
    });

    await newInvoice.save();
    res.json(newInvoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL INVOICES
router.get("/", async (req, res) => {
  const invoices = await Invoice.find().sort({ date: -1 });
  res.json(invoices);
});

export default router;