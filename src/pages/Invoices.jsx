import DashboardLayout from "../components/layout/DashboardLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { generatePDF } from "../utils/generatePDF";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/invoice");
      setInvoices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return isNaN(d.getTime()) ? "N/A" : d.toLocaleDateString();
  };

  // ✅ OPEN MODAL
  const viewInvoice = (inv) => {
    setSelectedInvoice(inv);
  };

  // ✅ DOWNLOAD
  const downloadInvoice = (inv) => {
    generatePDF(inv);
  };

  // ✅ PRINT
  const printInvoice = () => {
    window.print();
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Invoice History</h1>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Invoice No</th>
                <th className="p-3">Date</th>
                <th className="p-3">Total</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {invoices.map((inv) => (
                <tr key={inv._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{inv.invoiceNumber}</td>
                  <td className="p-3">{formatDate(inv.createdAt)}</td>
                  <td className="p-3">₹{inv.total.toFixed(2)}</td>

                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => viewInvoice(inv)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      View
                    </button>

                    <button
                      onClick={() => downloadInvoice(inv)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 🔥 MODAL PREVIEW */}
        {selectedInvoice && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white w-[700px] max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-xl">

              {/* HEADER */}
              <h2 className="text-xl font-bold mb-2 text-center">
                TAX INVOICE
              </h2>

              <div className="flex justify-between text-sm mb-4">
                <div>
                  <p><b>Invoice No:</b> {selectedInvoice.invoiceNumber}</p>
                  <p><b>Date:</b> {formatDate(selectedInvoice.createdAt)}</p>
                </div>

                <div className="text-right">
                  <p className="font-bold">BizSaathi Pvt Ltd</p>
                  <p>GSTIN: 22ABCDE1234F1Z5</p>
                </div>
              </div>

              {/* CUSTOMER */}
              <div className="mb-4">
                <p><b>Customer:</b> {selectedInvoice.customerName}</p>
                <p><b>Phone:</b> {selectedInvoice.customerPhone}</p>
              </div>

              {/* ITEMS */}
              <table className="w-full border mb-4">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-2">Item</th>
                    <th className="p-2">Qty</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {selectedInvoice.items.map((item, i) => (
                    <tr key={i} className="border-t text-center">
                      <td className="p-2">{item.name}</td>
                      <td>{item.qty}</td>
                      <td>₹{item.price}</td>
                      <td>₹{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* TOTAL */}
              <div className="text-right space-y-1">
                <p>Subtotal: ₹{selectedInvoice.subtotal.toFixed(2)}</p>
                <p>CGST: ₹{selectedInvoice.cgst.toFixed(2)}</p>
                <p>SGST: ₹{selectedInvoice.sgst.toFixed(2)}</p>
                <p className="font-bold text-lg">
                  Total: ₹{selectedInvoice.total.toFixed(2)}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={printInvoice}
                  className="bg-gray-700 text-white px-4 py-2 rounded"
                >
                  Print
                </button>

                <button
                  onClick={() => downloadInvoice(selectedInvoice)}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Download
                </button>

                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Invoices;