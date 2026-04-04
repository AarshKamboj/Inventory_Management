import DashboardLayout from "../components/layout/DashboardLayout";
import { useState, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { motion } from "framer-motion";
import { Pencil, Trash2, Plus } from "lucide-react";

const Inventory = () => {
  const { products, addProduct, deleteProduct, updateProduct } =
    useContext(StoreContext);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
  });

  // 🔍 Filter products
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ ADD / UPDATE
  const handleSubmit = () => {
    if (!form.name || !form.price || !form.stock) return;

    if (editing) {
      updateProduct(editing._id, form);
    } else {
      addProduct(form);
    }

    // Reset
    setForm({ name: "", price: "", stock: "" });
    setEditing(null);
    setShowModal(false);
  };

  // ✏️ OPEN EDIT MODAL (FIXED)
  const openEdit = (product) => {
    setEditing(product);

    // 🔥 IMPORTANT FIX
    setForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
    });

    setShowModal(true);
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Inventory</h1>

          <button
            onClick={() => {
              setEditing(null);
              setForm({ name: "", price: "", stock: "" });
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            <Plus size={16} /> Add Product
          </button>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-sm text-gray-600">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <motion.tr
                  key={p._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4 font-medium">{p.name}</td>
                  <td className="p-4">₹{p.price}</td>
                  <td className="p-4">{p.stock}</td>

                  <td className="p-4 flex gap-3">
                    <button
                      onClick={() => openEdit(p)}
                      className="text-blue-500 hover:scale-110 transition"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => deleteProduct(p._id)}
                      className="text-red-500 hover:scale-110 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 bg-black/30 flex justify-center items-center">

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white p-6 rounded-2xl w-96 shadow-xl"
            >
              <h2 className="text-lg font-semibold mb-4">
                {editing ? "Edit Product" : "Add Product"}
              </h2>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Product Name"
                  className="w-full p-2 border rounded-lg"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />

                <input
                  type="number"
                  placeholder="Price"
                  className="w-full p-2 border rounded-lg"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: e.target.value })
                  }
                />

                <input
                  type="number"
                  placeholder="Stock"
                  className="w-full p-2 border rounded-lg"
                  value={form.stock}
                  onChange={(e) =>
                    setForm({ ...form, stock: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white"
                >
                  {editing ? "Update" : "Add"}
                </button>
              </div>
            </motion.div>

          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default Inventory;