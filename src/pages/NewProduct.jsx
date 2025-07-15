import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiGreaterThan } from "react-icons/pi";
import { IoRadioButtonOffSharp, IoRadioButtonOnSharp } from "react-icons/io5";
import Navbar from "../components/Navbar";
import axios from "axios";
import { BASE_URL } from "../Utils/urlConfig";

const NewProduct = () => {
  const navigate = useNavigate();
  const [gstType, setGstType] = useState("including");
  const [productData, setProductData] = useState({
    productNumber: "",
    productName: "",
    unitPrice: "",
    gst: "",
    taxCode: "",
  });

  const resetForm = () =>{
    setProductData({
      productNumber: "",
      productName: "",
      unitPrice: "",
      gst: "",
      taxCode: "",
    });
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const totalPrice = parseFloat(productData.unitPrice || 0);

  const handleProductForm = async (e) => {
    e.preventDefault();
    if (
      !productData.productName ||
      !productData.unitPrice ||
      !productData.taxCode
    ) {
      alert(
        "Please fill all required fields: Product Name, Unit Price, and Tax Code."
      );
      return;
    }

    try {
      const token = sessionStorage.getItem('token');
      console.log("Token",token);
      const response = await axios.post(`${BASE_URL}/api/company/product`,
        {...productData},
        {
          headers:{
            Authorization: `${token}`,
          }
        }
      );
      console.log("Response:", response);
      alert(`${response.data.message}`);

      //reset form
      resetForm();
    } catch (error) {
      console.log(error.message);
      alert("Failed to create the new product");
      resetForm();
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-black min-h-screen p-5 text-white">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-white mb-6">
          <p
            className="text-3xl cursor-pointer"
            onClick={() => navigate("/company/dashboard")}
          >
            Home
          </p>
          <PiGreaterThan className="text-2xl pt-2 text-gray-500" />
          <p className="text-3xl">Products</p>
        </div>

        {/* Product Form */}
        <div className="bg-neutral-700 rounded-2xl p-6 max-w-[1200px]">
          <form
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            onSubmit={handleProductForm}
          >
            <div>
              <label className="block mb-1">Product No.</label>
              <input
                type="text"
                name="productNumber"
                value={productData.productNumber}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border-2 border-neutral-500 text-white bg-transparent outline-none"
              />
            </div>

            <div>
              <label className="block mb-1">Product Name*</label>
              <input
                type="text"
                name="productName"
                value={productData.productName}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border-2 border-neutral-500 text-white bg-transparent outline-none"
              />
            </div>

            <div>
              <label className="block mb-1">Unit Price (₹)*</label>
              <input
                type="number"
                name="unitPrice"
                value={productData.unitPrice}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border-2 border-neutral-500 text-white bg-transparent outline-none"
              />
            </div>

            {/* GST Radio */}
            <div className="col-span-full flex gap-6 items-center">
              <div className="flex items-center gap-2">
                {gstType === "including" ? (
                  <IoRadioButtonOnSharp
                    className="text-green-400 cursor-pointer"
                    onClick={() => setGstType("including")}
                  />
                ) : (
                  <IoRadioButtonOffSharp
                    className="text-gray-400 cursor-pointer"
                    onClick={() => setGstType("including")}
                  />
                )}
                <span onClick={() => setGstType("including")} className="cursor-pointer">
                  Including GST
                </span>
              </div>

              <div className="flex items-center gap-2">
                {gstType === "excluding" ? (
                  <IoRadioButtonOnSharp
                    className="text-green-400 cursor-pointer"
                    onClick={() => setGstType("excluding")}
                  />
                ) : (
                  <IoRadioButtonOffSharp
                    className="text-gray-400 cursor-pointer"
                    onClick={() => setGstType("excluding")}
                  />
                )}
                <span onClick={() => setGstType("excluding")} className="cursor-pointer">
                  Excluding GST
                </span>
              </div>
            </div>

            <div>
              <label className="block mb-1">GST (%)</label>
              <input
                type="number"
                name="gst"
                value={productData.gst}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border-2 border-neutral-500 text-white bg-transparent outline-none"
              />
            </div>

            <div>
              <label className="block mb-1">Tax Code *</label>
              <input
                type="text"
                name="taxCode"
                value={productData.taxCode}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border-2 border-neutral-500 text-white bg-transparent outline-none"
              />
            </div>

            {/* Total Price */}
            <div className="col-span-full flex justify-end mt-6">
              <div className="bg-neutral-600 p-4 rounded-lg w-fit text-right">
                <p className="text-xl font-semibold">Total Price:</p>
                <p className="text-xl font-bold text-green-400">
                  ₹{isNaN(totalPrice) ? "0.00" : totalPrice.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="col-span-full flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={()=> resetForm()}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;

