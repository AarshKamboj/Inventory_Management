import DashboardLayout from "../components/layout/DashboardLayout";
import { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { generatePDF } from "../utils/generatePDF"; // ✅ ONLY THIS

const Billing = () => {
  const { products, updateStock } = useContext(StoreContext);

  const [cart, setCart] = useState([]);

  // ➕ ADD TO CART
  const addToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // 🔢 UPDATE QTY
  const updateQty = (id, qty) => {
    if (qty < 1) return;

    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, qty } : item
      )
    );
  };

  // ❌ REMOVE ITEM
  const removeItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  // 💰 CALCULATIONS
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const gst = subtotal * 0.18;
  const cgst = gst / 2;
  const sgst = gst / 2;
  const total = subtotal + gst;

  // 🧾 CHECKOUT
  const handleCheckout = async () => {
    try {
      // 🧾 FORMAT ITEMS
      const formattedItems = cart.map((item) => ({
        name: item.name,
        qty: item.qty,
        price: item.price,
        total: item.qty * item.price,
      }));

      // 📦 SEND DATA
      const invoiceData = {
        customerName: customer.name || "Walk-in Customer",
        customerPhone: customer.phone || "-",
        items: formattedItems,
        subtotal,
        cgst,
        sgst,
        total,
      };

      const res = await axios.post(
        "http://localhost:5000/api/invoice",
        invoiceData
      );

      const savedInvoice = res.data;

      // 📉 UPDATE STOCK
      cart.forEach((item) => {
        updateStock(item._id, item.qty);
      });

      // 📄 GENERATE PDF (ONLY CALL HERE)
      generatePDF(savedInvoice);

      alert("Invoice Generated: " + savedInvoice.invoiceNumber);

      setCart([]);

    } catch (err) {
      console.error(err);
      alert("Error generating invoice");
    }
  };
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
  });

  return (
    <DashboardLayout>
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* PRODUCTS */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4">Products</h2>

          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {products.map((p) => (
              <div
                key={p._id}
                className="flex justify-between items-center border p-3 rounded-xl"
              >
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-gray-500">
                    ₹{p.price} | Stock: {p.stock}
                  </p>
                </div>

                <button
                  onClick={() => addToCart(p)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow mb-4">
          <h2 className="text-lg font-semibold mb-3">Customer Details</h2>

          <input
            type="text"
            placeholder="Customer Name"
            value={customer.name}
            onChange={(e) =>
              setCustomer({ ...customer, name: e.target.value })
            }
            className="w-full p-2 border rounded mb-2"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={customer.phone}
            onChange={(e) =>
              setCustomer({ ...customer, phone: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>

        {/* CART */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4">Invoice</h2>

          {cart.length === 0 ? (
            <p className="text-gray-500">No items added</p>
          ) : (
            <>
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center border p-3 rounded-xl"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm">₹{item.price}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) =>
                          updateQty(item._id, Number(e.target.value))
                        }
                        className="w-16 p-1 border rounded"
                      />

                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-red-500"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* SUMMARY */}
              <div className="mt-4 border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>CGST (9%)</span>
                  <span>₹{cgst.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>SGST (9%)</span>
                  <span>₹{sgst.toFixed(2)}</span>
                </div>

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl"
              >
                Generate Invoice
              </button>
            </>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Billing;