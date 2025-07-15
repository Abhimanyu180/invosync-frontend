import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { GoPlus } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import { BASE_URL } from "../Utils/urlConfig";

const ProductSection = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/getAllProducts`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        console.log("Products fetched:", response);
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Failed to load products");
      }
    };

    fetchProducts();
  }, [token, navigate]);

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="bg-black min-h-screen pb-10">
        <div
          onClick={() => navigate("/company/dashboard")}
          className="text-white text-2xl pt-10 pl-10 cursor-pointer"
        >
          Home
        </div>

        {/* Header */}
        <div className="flex flex-row pl-10 pt-10 items-center justify-between pr-10">
          <p className="text-white text-3xl font-bold">Products</p>
          <button
            onClick={() => navigate("/create/products")}
            className="text-white text-2xl bg-gray-600 hover:bg-gray-700 border-2 border-gray-600 rounded-2xl flex flex-row items-center gap-2 px-6 py-2 cursor-pointer transition-all duration-200"
          >
            <GoPlus />
            New Product
          </button>
        </div>

        {/* Search */}
        <div className="relative ml-8 mt-5 w-fit">
          <input
            type="text"
            placeholder="Search for a product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-lg border-2 border-neutral-500 text-white bg-transparent outline-none"
          />
          <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-xl pointer-events-none" />
        </div>

        {/* Product Table */}
        <div className="mt-10 px-10 overflow-x-auto">
          <table className="min-w-full text-white border border-neutral-700 rounded-lg overflow-hidden">
            <thead className="bg-neutral-800">
              <tr>
                <th className="py-3 px-4 text-left">Product No</th>
                <th className="py-3 px-4 text-left">Product Name</th>
                <th className="py-3 px-4 text-left">Unit Price (₹)</th>
                <th className="py-3 px-4 text-left">Times Invoiced</th>
                <th className="py-3 px-4 text-left">Total Invoiced (₹)</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="py-6 px-4 text-center text-gray-400"
                  >
                    No products found.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="border-t border-neutral-700 hover:bg-neutral-800 transition-all duration-200"
                  >
                    <td className="py-3 px-4">{product.productNumber}</td>
                    <td className="py-3 px-4">{product.productName}</td>
                    <td className="py-3 px-4">
                      ₹{product.unitPrice.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">{product.timesInvoiced || 0}</td>
                    <td className="py-3 px-4">
                      ₹
                      {(
                        (product.unitPrice || 0) *
                        (product.timesInvoiced || 0)
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
