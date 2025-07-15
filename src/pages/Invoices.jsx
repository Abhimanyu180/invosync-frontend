import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { IoMdArrowDropdown } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const Invoices = () => {
  const [status, setStatus] = useState("Status");
  const [showDropDown, setShowDropDown] = useState(false);
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
      const formattedDate = selectedDate.toISOString().split("T")[0]; // 'YYYY-MM-DD'
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
      <div className="bg-black min-h-screen">
        <div
          onClick={() => navigate("/company/dashboard")}
          className="text-white text-2xl pt-10 pl-10 cursor-pointer"
        >
          Home
        </div>

        {/* Header */}
        <div className="flex flex-row pl-10 pt-10 items-center justify-between pr-10">
          <p className="text-white text-3xl font-bold">Invoices</p>
          <button
            onClick={() => navigate("/invoice")}
            className="text-white text-2xl bg-gray-600 hover:bg-gray-700 border-2 border-gray-600 rounded-2xl flex flex-row items-center gap-2 px-6 py-2 cursor-pointer transition-all duration-200"
          >
            <GoPlus />
            New Invoice
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-row gap-10">
          <p className="text-white pl-10 mt-10 cursor-pointer hover:text-green-600">
            Invoices
          </p>
          <p className="text-white mt-10 cursor-pointer hover:text-green-600">
            Drafts
          </p>
        </div>

        <div className="border border-gray-500 ml-10 mr-5 mt-4"></div>

        {/* Filters */}
        <div className="flex flex-row gap-6 pl-10 pt-6 relative items-center">
          {/* Search */}
          <div className="bg-neutral-500 flex flex-row items-center gap-2 h-10 pl-3 pr-3 rounded">
            <CiSearch className="text-white" />
            <input
              type="text"
              placeholder="Search"
              className="outline-none text-white bg-transparent"
            />
          </div>

          {/* Dropdown */}
          <div className="text-white relative">
            <div
              className="flex flex-row items-center gap-2 cursor-pointer"
              onClick={() => setShowDropDown(!showDropDown)}
            >
              <p className="text-2xl">{status}</p>
              <IoMdArrowDropdown className="text-3xl" />
            </div>
            {showDropDown && (
              <div className="absolute top-10 bg-neutral-700 rounded shadow-lg z-20 w-40">
                {[
                  "Due",
                  "Credited",
                  "Credit note",
                  "Paid",
                  "Overdue",
                  "Written off",
                ].map((item) => (
                  <div
                    key={item}
                    className="px-4 py-2 hover:bg-neutral-600 cursor-pointer"
                    onClick={() => {
                      setStatus(item);
                      setShowDropDown(false);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Calendar */}
          <div className="text-white">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="bg-neutral-500 text-white px-3 py-1 rounded outline-none"
            />
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-4 text-white pl-10 pt-5 font-semibold border-b pb-2">
          <div>Invoice No.</div>
          <div>Invoice Date</div>
          <div>Client</div>
          <div>Status</div>
        </div>

        {/* Invoice Rows */}
        {invoices.length === 0 ? (
          <div className="text-white pl-10 pt-4">No invoices available.</div>
        ) : (
          invoices.map((invoice) => (
            <div
              key={invoice._id}
              className="grid grid-cols-4 text-white pl-10 pt-3 border-b pb-3"
            >
              <div>{invoice.invoiceDetails?.invoiceNumber || "N/A"}</div>
              <div>
                {invoice.invoiceDetails?.invoiceDate
                  ? new Date(invoice.invoiceDetails.invoiceDate).toLocaleDateString()
                  : "N/A"}
              </div>
              <div>{invoice.billTo?.name || "N/A"}</div>
              <div>{"Due"}</div> {/* Static for now; update when real status is available */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Invoices;
