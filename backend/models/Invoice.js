import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  price: Number,
  total: Number,
});

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: String,
  customerName: String,
  items: [itemSchema],
  subtotal: Number,
  cgst: Number,
  sgst: Number,
  total: Number,
  date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.model("Invoice", invoiceSchema);