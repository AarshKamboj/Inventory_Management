import Product from "../models/Product.js";

// GET all products
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// ADD product
export const addProduct = async (req, res) => {
  const { name, price, stock } = req.body;

  const product = new Product({ name, price, stock });
  const saved = await product.save();

  res.json(saved);
};

// UPDATE product
export const updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

// DELETE product
export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};