import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import Navbar from "../components/Navbar";
import {BASE_URL} from "../Utils/urlConfig"

const InvoicePage = () => {
  const [logo, setLogo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [billOpen, setBillOpen] = useState(false);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [invoiceDescription, setInvoiceDescription] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = (e) => {
    e.stopPropagation();
    setLogo(null);
    setPreviewUrl(null);
  };

  const [billData, setBillData] = useState({
    name: "",
    cin: "",
    gstin: "",
    address1: "",
    address2: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
    phoneNumber: "",
    email: "",
  });

  const [invoiceData, setInvoiceData] = useState({
    invoiceDate: "",
    dueDate: "",
    invoiceNumber: "",
  });

  const [invoiceDescriptionData, setInvoiceDescriptionData] = useState({
    description: "",
  });

  const [productData, setProductData] = useState({
    productName: "",
    unitPrice: "",
    quantity: "",
    discount: "",
    taxCode: "",
    netAmount: "0.00",
  });

  const [paymentData, setPaymentData] = useState({
    bankAccountName: "",
    bankAccountNumber: "",
    bankName: "",
    ifsc: "",
    swift: "",
  });

  const handleBillChange = (e) => {
    const { name, value } = e.target;
    setBillData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInvoiceChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fixed form handlers
  const handleBillForm = async (e) => {
    e.preventDefault();
    setBillOpen(false);
  };

  const handleInvoiceForm = async (e) => {
    e.preventDefault();
    setInvoiceOpen(false); 
  };

  const handleInvoiceDescriptionForm = async (e) => {
    e.preventDefault();
    setInvoiceDescription(false); 
  };

  const handleProductForm = async (e) => {
    e.preventDefault();
    setProductOpen(false); 
  };

  const handlePaymentForm = async (e) => {
    e.preventDefault();
    setPaymentOpen(false); 
  };

const createInvoice = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // Step 1: Validate required fields
    if (
      !billData.name ||
      !billData.address1 ||        // match backend naming
      !billData.postalCode ||
      !billData.state ||
      !billData.city ||
      !billData.country ||
      !invoiceData.invoiceDate ||
      !invoiceData.dueDate
    ) {
      alert("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    if (!productData.productName || !productData.unitPrice || !productData.quantity) {
      alert("Please add at least one product with all required fields.");
      setLoading(false);
      return;
    }

    // Step 2: Prepare FormData for invoice creation
    const formData = new FormData();
    if (logo) {
      formData.append("logo", logo);
    }

    formData.append("billTo", JSON.stringify(billData));
    formData.append("invoiceDetails", JSON.stringify(invoiceData));
    formData.append("invoiceDescription", JSON.stringify(invoiceDescriptionData));
    formData.append("products", JSON.stringify(productData));
    formData.append("paymentMethod", JSON.stringify(paymentData));

    const token = sessionStorage.getItem("token");

    // Step 3: Create the invoice
    const response = await fetch(`${BASE_URL}/api/createInvoice`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: token ? `${token}` : "",
      },
    });

    const data = await response.json();

    if (response.ok) {
      alert("Invoice created successfully!");
      console.log("Invoice response:", data);

      // Step 4: Prepare data for client creation
      const clientPayload = {
        name: billData.name,
        address1: billData.address1,
        address2: billData.address2 || "",
        cin: billData.cin || "",
        gstin: billData.gstin || "",
        email: billData.email || "",
        postalCode: billData.postalCode,
        state: billData.state,
        cc: billData.cc || "", // country code if needed
        city: billData.city,
        country: billData.country,
        phoneNumber: billData.phoneNumber || "",
        fixedDiscount: billData.fixedDiscount || 0,
      };

      // Step 5: Save client if not exists
      const clientRes = await fetch(`${BASE_URL}/api/addClient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `${token}` : "",
        },
        body: JSON.stringify(clientPayload),
      });

      const clientData = await clientRes.json();

      if (clientRes.status === 201) {
        console.log("Client added:", clientData.message);
      } else if (clientRes.status === 202) {
        console.log("Client already exists:", clientData.message);
      } else {
        console.warn("Client creation failed:", clientData.message);
      }

      // Step 6: Reset form
      resetFormData();
    } else {
      alert(data.message || "Failed to create invoice.");
      console.error("Invoice error:", data);
    }
  } catch (error) {
    console.error("Error submitting invoice:", error);
    alert("An error occurred while creating the invoice.");
  } finally {
    setLoading(false);
  }
};



  const resetFormData = () => {
    setBillData({
      name: "",
      cin: "",
      gstin: "",
      address: "",
      addressline2: "",
      postalCode: "",
      city: "",
      state: "",
      country: "",
      phoneNumber: "",
      email: "",
    });
    setInvoiceData({
      invoiceDate: "",
      dueDate: "",
      invoiceNumber: "",
    });
    setInvoiceDescriptionData({
      description: "",
    });
    
    setProductData({
      productName: "",
      unitPrice: "",
      quantity: "",
      discount: "",
      taxCode: "",
      netAmount: "0.00",
    });
    
    setPaymentData({
      bankAccountName: "",
      bankAccountNumber: "",
      bankName: "",
      ifsc: "",
      swift: "",
    });
    setLogo(null);
    setPreviewUrl(null);
  };

  return (
    <div>
      <Navbar />
      <div className="bg-black w-full min-h-screen pt-5 px-4">
        <h2 className="text-white text-3xl md:text-4xl font-bold text-center md:text-left">
          Create Invoice
        </h2>

        <div className="bg-gray-700 mt-5 rounded-2xl p-4 md:p-6 max-w-6xl w-full">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="flex flex-col gap-6 w-full md:w-1/2">
              <div className="p-4 border-2 border-dotted border-gray-300 text-white text-center relative cursor-pointer rounded-md w-full">
                {previewUrl && (
                  <button
                    className="absolute top-2 right-2 text-white hover:text-red-500 text-xl z-10"
                    onClick={removeLogo}
                  >
                    <MdClose />
                  </button>
                )}
                <span className="block mb-2">Select a logo</span>
                <input
                  type="file"
                  onChange={handleLogoChange}
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                {previewUrl && (
                  <div className="mt-2">
                    <img
                      src={previewUrl}
                      alt="Logo Preview"
                      className="mx-auto max-h-32 object-contain"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-row justify-between items-center gap-2 p-4 border-2 border-blue-300 text-white rounded-md w-full">
                <p>Bill To</p>
                <FaPen
                  className="cursor-pointer"
                  onClick={() => setBillOpen(true)}
                />
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="text-white text-2xl md:text-3xl font-bold">
                Regular Invoice
              </h2>
              <div className="bg-blue-400 flex flex-row justify-end items-center gap-2 mt-5 p-4 text-white rounded-md w-full">
                <button className="text-white flex flex-row items-center gap-4">
                  <p>Edit Invoice Details</p>
                  <FaPen
                    className="cursor-pointer"
                    onClick={() => setInvoiceOpen(true)}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="w-full mt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between border-2 border-dotted border-blue-300 text-white rounded-md p-4">
              <p>Invoice Description (optional)</p>
              <FaPen
                className="cursor-pointer"
                onClick={() => setInvoiceDescription(true)}
              />
            </div>
          </div>

          <div className=" w-full mt-6">
            <div
              className="flex flex-col sm:flex-row justify-end gap-2 border-2 border-dotted border-blue-300 text-white rounded-md p-4 h-30 cursor-pointer"
              onClick={() => setProductOpen(true)}
            >
              <p className="text-blue-700">Product</p>
              <FaPen className="text-blue-700" />
            </div>
          </div>

          <div className=" w-full mt-6">
            <div
              className="flex flex-col sm:flex-row justify-end gap-2 border-2 border-dotted border-blue-300 text-white rounded-md p-4 h-30 cursor-pointer"
              onClick={() => setPaymentOpen(true)}
            >
              <p className="text-blue-700">Payment method</p>
              <FaPen className="text-blue-700" />
            </div>
          </div>
        </div>

        {/* Bill Modal */}
        {billOpen && (
          <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-4 md:p-6 w-11/12 max-w-6xl shadow-lg overflow-y-auto max-h-[90vh]">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Bill To:</h2>
              <form className="grid grid-cols-1 md:grid-cols-4 gap-4" onSubmit={handleBillForm}>
                {[
                  "name",
                  "cin",
                  "gstin",
                  "address1",
                  "address2",
                  "postalCode",
                  "city",
                  "state",
                  "country",
                  "phoneNumber",
                  "email",
                ].map((field, index) => {
                  const label =
                    field === "phoneNumber"
                      ? "Phone number"
                      : field === "address2"
                      ? "Address Line 2"
                      : field === "postalCode"
                      ? "Postal Code*"
                      : `${field.charAt(0).toUpperCase() + field.slice(1)}${
                          [
                            "name",
                            "address1",
                            "city",
                            "state",
                            "country",
                          ].includes(field)
                            ? "*"
                            : ""
                        }`;
                  return (
                    <div
                      key={field}
                      className={
                        field === "email" || field === "phoneNumber"
                          ? "col-span-2"
                          : field === "address" || field === "address2"
                          ? "col-span-2"
                          : ""
                      }
                    >
                      <label className="block text-sm font-medium">
                        {label}
                      </label>
                      <div className="relative">
                        {field === "phoneNumber" && (
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                            <FaPhoneAlt />
                          </span>
                        )}
                        <input
                          name={field}
                          value={billData[field]}
                          onChange={handleBillChange}
                          type="text"
                          className={`w-full border ${
                            field === "phoneNumber" ? "pl-10 pr-3" : "px-3"
                          } py-2 rounded-md`}
                        />
                      </div>
                    </div>
                  );
                })}
                <div className="col-span-full mt-6 flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setBillData({
                        name: "",
                        cin: "",
                        gstin: "",
                        address: "",
                        addressline2: "",
                        postalCode: "",
                        city: "",
                        state: "",
                        country: "",
                        phoneNumber: "",
                        email: "",
                      });
                      setBillOpen(false);
                    }}
                    type="button"
                    className="px-6 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Invoice Modal */}
        {invoiceOpen && (
          <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-4 md:p-6 w-11/12 max-w-4xl shadow-lg overflow-y-auto max-h-[90vh]">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Invoice Details:
              </h2>
              <form className="grid grid-cols-1 md:grid-cols-4 gap-4" onSubmit={handleInvoiceForm}>
                <div className="col-span-2">
                  <label className="block text-sm font-medium">
                    Invoice Date*
                  </label>
                  <input
                    name="invoiceDate"
                    value={invoiceData.invoiceDate}
                    onChange={handleInvoiceChange}
                    type="date"
                    className="w-full border px-3 py-2 rounded-md"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium">Due Date*</label>
                  <input
                    name="dueDate"
                    value={invoiceData.dueDate}
                    onChange={handleInvoiceChange}
                    type="date"
                    className="w-full border px-3 py-2 rounded-md"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium">
                    Invoice Number
                  </label>
                  <input
                    name="invoiceNumber"
                    value={invoiceData.invoiceNumber}
                    onChange={handleInvoiceChange}
                    type="text"
                    className="w-full border px-3 py-2 rounded-md"
                  />
                </div>
                <div className="col-span-full mt-6 flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setInvoiceData({
                        invoiceDate: "",
                        dueDate: "",
                        invoiceNumber: "",
                      });
                      setInvoiceOpen(false);
                    }}
                    type="button"
                    className="px-6 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Invoice Description Modal */}
        {invoiceDescription && (
          <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-4 md:p-6 w-11/12 max-w-4xl shadow-lg overflow-y-auto max-h-[90vh]">
              <form
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
                onSubmit={handleInvoiceDescriptionForm}
              >
                <div className="col-span-4">
                  <label className="block text-sm font-medium">
                    Invoice Description(optional)
                  </label>
                  <input
                    name="description"
                    value={invoiceDescriptionData.description}
                    onChange={(e) =>
                      setInvoiceDescriptionData({ description: e.target.value })
                    }
                    type="text"
                    className="w-full border px-3 py-2 rounded-md"
                  />
                </div>
                <div className="col-span-full mt-6 flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setInvoiceDescriptionData({
                        description: "",
                      });
                      setInvoiceDescription(false);
                    }}
                    type="button"
                    className="px-6 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Product Modal */}
        {productOpen && (
          <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-4 md:p-6 w-11/12 max-w-6xl shadow-lg overflow-y-auto max-h-[90vh]">
              <h2>Products or Services</h2>
              <form
                className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-4"
                onSubmit={handleProductForm}
              >
                <div>
                  <label className="block text-sm font-medium">
                    Product name*
                  </label>
                  <input
                    name="productName"
                    value={productData.productName}
                    onChange={handleProductChange}
                    type="text"
                    className="w-full border px-3 py-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Unit Price*
                  </label>
                  <input
                    name="unitPrice"
                    value={productData.unitPrice}
                    onChange={handleProductChange}
                    type="number"
                    className="w-full border px-3 py-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Quantity*</label>
                  <input
                    name="quantity"
                    value={productData.quantity}
                    onChange={handleProductChange}
                    type="number"
                    className="w-full border px-3 py-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Discount</label>
                  <input
                    name="discount"
                    value={productData.discount}
                    onChange={handleProductChange}
                    type="number"
                    className="w-full border px-3 py-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">TaxCode</label>
                  <input
                    name="taxCode"
                    value={productData.taxCode}
                    onChange={handleProductChange}
                    type="number"
                    className="w-full border px-3 py-2 rounded-md"
                  />
                </div>
                <div className="ml-10">
                  <p className="text-black">Net Amount</p>
                  <p
                    className="text-black"
                    name="netAmount"
                    value={productData.netAmount}
                    onChange={handleProductChange}
                  >
                    {productData.unitPrice === " "
                      ? "0.00"
                      : productData.unitPrice}
                  </p>
                </div>

                <div className="flex flex-row items-center gap-2 col-span-3 cursor-pointer mt-5">
                  <p className="text-2xl">
                    <FaPlus />
                  </p>
                  <p className="text-2xl">Add another product or service</p>
                </div>

                <div className="col-span-full mt-6 flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setProductData({
                        productName: "",
                        unitPrice: "",
                        quantity: "",
                        discount: "",
                        taxCode: "",
                        netAmount: "0.00",
                      });
                      setProductOpen(false);
                    }}
                    type="button"
                    className="px-6 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {paymentOpen && (
          <div>
            <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
              <div className="bg-white rounded-xl p-4 md:p-6 w-11/12 max-w-6xl shadow-lg overflow-y-auto max-h-[90vh]">
                <h2>Payment method</h2>
                <form
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4"
                  onSubmit={handlePaymentForm}
                >
                  <div>
                    <label className="block text-sm font-medium">
                      Bank account name*
                    </label>
                    <input
                      type="text"
                      name="bankAccountName"
                      value={paymentData.bankAccountName}
                      onChange={handlePaymentChange}
                      className="w-full border px-3 py-2 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      Bank account number*
                    </label>
                    <input
                      type="text"
                      name="bankAccountNumber"
                      value={paymentData.bankAccountNumber}
                      onChange={handlePaymentChange}
                      className="w-full border px-3 py-2 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      Bank name
                    </label>
                    <input
                      type="text"
                      name="bankName"
                      value={paymentData.bankName}
                      onChange={handlePaymentChange}
                      className="w-full border px-3 py-2 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">IFSC</label>
                    <input
                      type="text"
                      name="ifsc"
                      value={paymentData.ifsc}
                      onChange={handlePaymentChange}
                      className="w-full border px-3 py-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">SWIFT</label>
                    <input
                      type="text"
                      name="swift"
                      value={paymentData.swift}
                      onChange={handlePaymentChange}
                      className="w-full border px-3 py-2 rounded-md"
                    />
                  </div>

                  <div className="col-span-full mt-6 flex justify-end gap-4">
                    <button
                      onClick={() => {
                        setPaymentData({
                          bankAccountName: "",
                          bankAccountNumber: "",
                          bankName: "",
                          ifsc: "",
                          swift: "",
                        });
                        setPaymentOpen(false);
                      }}
                      type="button"
                      className="px-6 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="col-span-full mt-6 flex justify-end gap-4">
          <button
            type="button"
            className="px-6 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={createInvoice}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer"
          >
            Create Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
