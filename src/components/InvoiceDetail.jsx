import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const InvoiceDetail = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await axios.get(`http://localhost:8082/api/invoice/${id}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setInvoice(res.data.invoice);
      } catch (err) {
        console.error("Error fetching invoice:", err);
      }
    };

    fetchInvoice();
  }, [id]);

  if (!invoice) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <p className="pt-10 pl-10">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white pb-10">
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-8 px-6 md:px-10 text-sm text-gray-400">
        Home &gt; Invoices &gt; Invoice {invoice.invoiceDetails?.invoiceNumber || id}
      </div>

      <h1 className="text-3xl font-bold px-6 md:px-10 pt-2">
        Invoice {invoice.invoiceDetails?.invoiceNumber || id} - {invoice.billTo?.name}
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 px-6 md:px-10">
        {/* Status Card */}
        <div className="bg-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between text-xl font-semibold mb-2">
            <span>{new Date(invoice.invoiceDetails?.invoiceDate).toLocaleDateString()}</span>
            <span className="bg-neutral-700 px-2 py-1 text-sm rounded">Snooze</span>
          </div>
          <div className="text-yellow-400 font-bold text-2xl mb-4">⚠️ Overdue</div>
          <div className="flex">
            <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-l w-1/2">Mark as paid</button>
            <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-r w-1/2">Cancel</button>
          </div>
        </div>

        {/* Invoice Info */}
        <div className="bg-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">Invoice {invoice.invoiceDetails?.invoiceNumber}</h2>
          <p><span className="text-gray-400">Client:</span> {invoice.billTo?.name}</p>
          <p><span className="text-gray-400">Invoice date:</span> {new Date(invoice.invoiceDetails?.invoiceDate).toLocaleDateString()}</p>
          <p><span className="text-gray-400">Amount:</span> ₹{invoice.invoiceDetails?.amount?.toFixed(2)}</p>
          <p><span className="text-gray-400">Remaining amount:</span> ₹{invoice.invoiceDetails?.remaining?.toFixed(2) || "0.00"}</p>
          <div className="flex mt-4 gap-3">
            <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">View invoice</button>
            <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded flex items-center gap-2">
              Copy invoice <span>📋</span>
            </button>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Delivery</h2>
          <p>This invoice has not been sent yet</p>
          <button className="mt-4 bg-gray-700 px-4 py-2 rounded text-gray-400 cursor-not-allowed">Send invoice</button>
        </div>
      </div>

      {/* Send Section */}
      <div className="bg-neutral-900 rounded-xl mt-10 mx-6 md:mx-10 p-6">
        <h2 className="text-xl font-semibold mb-4">Send invoice</h2>
        <p className="mb-2">Choose how to send the invoice:</p>
        <div className="flex gap-3 mb-4 flex-wrap">
          <button className="bg-green-700 text-white px-4 py-1 rounded">Email</button>
          <button className="bg-white text-black px-4 py-1 rounded">WhatsApp</button>
          <button className="bg-white text-black px-4 py-1 rounded">WhatsApp for business</button>
        </div>
        <input
          type="email"
          defaultValue={invoice.billTo?.email || ""}
          className="bg-neutral-800 text-white w-full px-4 py-2 rounded outline-none border border-neutral-700"
        />
      </div>
    </div>
  );
};

export default InvoiceDetail;
