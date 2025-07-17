import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { GoPlus } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const Invoices = () => {
  const [status, setStatus] = useState("Status");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [invoices, setInvoices] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await axios.get("http://localhost:8082/api/getAllInvoices", {
          headers: {
            Authorization: `${token}`,
          },
        });
        setInvoices(res.data.invoices);
      } catch (err) {
        console.error("Failed to fetch invoices:", err);
      }
    };

    fetchInvoices();
  }, []);

  useEffect(() => {
    const fetchInvoicesByDate = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const formattedDate = selectedDate.toISOString().split("T")[0];
        const res = await axios.get(`http://localhost:8082/api/getAllInvoices/date`, {
          headers: {
            Authorization: `${token}`,
          },
          params: { date: formattedDate },
        });
        setInvoices(res.data.invoices);
      } catch (err) {
        console.error("Failed to fetch invoices:", err);
      }
    };

    fetchInvoicesByDate();
  }, [selectedDate]);

  return (
    <div>
      <Navbar />
      <div className="bg-black min-h-screen pb-10">
        {/* Home Link */}
        <div
          onClick={() => navigate("/company/dashboard")}
          className="text-white text-xl pt-8 pl-6 md:pl-10 cursor-pointer"
        >
          Home
        </div>

        {/* Page Title */}
        <p className="text-white text-3xl font-bold pt-4 pl-6 md:pl-10">
          Invoices
        </p>

        {/* Top Controls: Search and Add */}
        <div className="pt-10 px-6 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="w-full md:w-1/3 h-10 px-4 rounded bg-neutral-800 text-white flex items-center gap-2 border border-neutral-700 mb-4 md:mb-0">
              <CiSearch className="text-white" />
              <input
                type="text"
                placeholder="Search invoices..."
                className="w-full bg-transparent outline-none placeholder-gray-400"
              />
            </div>

            <button
              onClick={() => navigate("/invoice")}
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 text-lg"
            >
              <GoPlus />
              New Invoice
            </button>
          </div>

          {/* Date Filter */}
          <div className="text-white mb-6">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="bg-neutral-800 text-white px-4 py-2 rounded outline-none w-full md:w-auto"
            />
          </div>

          {/* Table Header */}
          <div className="bg-neutral-900 text-white rounded-t-xl grid grid-cols-4 p-4 font-semibold border-b border-gray-700">
            <div>Invoice No.</div>
            <div>Invoice Date</div>
            <div>Client</div>
            <div>Status</div>
          </div>

          {/* Table Rows */}
          {invoices.length === 0 ? (
            <div className="text-white bg-neutral-800 rounded-b-xl px-4 py-4">
              No invoices available.
            </div>
          ) : (
            invoices.map((invoice) => (
              <div
                key={invoice._id}
                onClick={() => navigate(`/invoice/${invoice._id}`)}
                className="bg-neutral-800 text-white grid grid-cols-4 px-4 py-4 border-t border-gray-700 hover:bg-neutral-700 transition cursor-pointer"
              >
                <div>{invoice.invoiceDetails?.invoiceNumber || "N/A"}</div>
                <div>
                  {invoice.invoiceDetails?.invoiceDate
                    ? new Date(
                        invoice.invoiceDetails.invoiceDate
                      ).toLocaleDateString()
                    : "N/A"}
                </div>
                <div>{invoice.billTo?.name || "N/A"}</div>
                <div>{"Due"}</div> {/* Replace with real status if available */}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Invoices;
