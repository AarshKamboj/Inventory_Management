import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext();

const API = "http://localhost:5000/api/products";

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // 🔄 FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await axios.get(API);
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ➕ ADD PRODUCT
  const addProduct = async (product) => {
    try {
      await axios.post(API, product);
      fetchProducts();
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  // ❌ DELETE PRODUCT
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ✏️ UPDATE PRODUCT (FIXED ✅)
  const updateProduct = async (id, data) => {
    try {
      await axios.put(`${API}/${id}`, data);
      fetchProducts();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // 📉 UPDATE STOCK (BACKEND SAFE ✅)
  const updateStock = async (id, qty) => {
    try {
      const product = products.find((p) => p._id === id);

      if (!product) return;

      await axios.put(`${API}/${id}`, {
        ...product,
        stock: product.stock - qty,
      });

      fetchProducts();
    } catch (err) {
      console.error("Stock update error:", err);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        updateProduct,
        updateStock,
        refresh: fetchProducts,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};