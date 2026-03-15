import { createContext, useState, useEffect } from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    setProducts((prev) => [...prev, product]);
  };

  const updateStock = (id, qty) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, stock: p.stock - qty } : p
      )
    );
  };

  return (
    <StoreContext.Provider value={{ products, addProduct, updateStock }}>
      {children}
    </StoreContext.Provider>
  );
};