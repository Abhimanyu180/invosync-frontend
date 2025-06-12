import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PiGreaterThan } from "react-icons/pi";
import Navbar from "../components/Navbar";
import { BASE_URL } from "../Utils/urlConfig";

const CreateClient = () => {
  const [clientData, setClientData] = useState({
    name: "",
    address1: "",
    cin: "",
    gstin: "",
    address2: "",
    email: "",
    postalCode: "",
    state: "",
    cc: "",
    city: "",
    country: "",
    phoneNumber: "",
    fixedDiscount: "",
  });

  const resetForm = () => {
    setClientData({
      name: "",
      address1: "",
      cin: "",
      gstin: "",
      address2: "",
      email: "",
      postalCode: "",
      state: "",
      cc: "",
      city: "",
      country: "",
      phoneNumber: "",
      fixedDiscount: "",
    });
  };
  const handleChange = (e) => {
    setClientData({
      ...clientData,
      [e.target.name]: e.target.value,
    });
  };

  const createClient = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    try {
      const response = await axios.post(
        `${BASE_URL}/api/addClient`,
        clientData,
        {
          headers:{
            Authorization: `${token}`,
          }
        }
      );
      console.log("response:", response);
      alert(`${response.data.message}`);
      //reset form
      resetForm();
    } catch (error) {
      console.log("failed to create new client");
      alert("Failed to create new client");
      return;
    }
  };

  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="bg-black min-h-screen">
        <div className="flex flex-row items-center pl-5 pt-5 gap-2 text-white">
          <p
            className="text-3xl cursor-pointer"
            onClick={() => navigate("/company/dashboard")}
          >
            Home
          </p>
          <p className="text-2xl pt-2">
            <PiGreaterThan />
          </p>
          <p className="text-3xl">Client</p>
        </div>
        <div className="pl-10 pt-10">
          <p className="text-white text-3xl font-bold">New Client</p>
        </div>
        <div className="bg-neutral-700 ml-10 mr-50 mt-7 rounded-2xl ">
          <form
            className="grid grid-cols-4 gap-4 mr-10"
            onSubmit={createClient}
          >
            <div className="pl-2 col-span-4">
              <label className="text-white pl-3">Name*</label>
              <input
                type="text"
                name="name"
                value={clientData.name}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border-2 border-neutral-500 text-white outline-none"
              />
            </div>
            <div className="pl-2 col-span-2">
              <label className="text-white pl-3">Address line*</label>
              <input
                type="text"
                name="address1"
                value={clientData.address1}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border-2 border-neutral-500 text-white outline-none"
              />
            </div>
            <div className="pl-2">
              <label className="text-white pl-3">CIN*</label>
              <input
                type="text"
                name="cin"
                value={clientData.cin}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border-2 border-neutral-500 text-white outline-none"
              />
            </div>
            <div className="pl-2">
              <label className="text-white pl-3">GSTIN*</label>
              <input
                type="text"
                name="gstin"
                value={clientData.gstin}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border-2 border-neutral-500 text-white outline-none"
              />
            </div>
            <div className="pl-2 col-span-2">
              <label className="text-white pl-3">Address line 2</label>
              <input
                type="text"
                name="address2"
                value={clientData.address2}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border-2 border-neutral-500 text-white outline-none"
              />
            </div>
            <div className="pl-2 col-span-2">
              <label className="text-white pl-3">Email*</label>
              <input
                type="text"
                name="email"
                value={clientData.email}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border-2 border-neutral-500 text-white outline-none"
              />
            </div>
            <div className="pl-2">
              <label className="text-white pl-3">Postal code*</label>
              <input
                type="text"
                name="postalCode"
                value={clientData.postalCode}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border-2 border-neutral-500 text-white outline-none"
              />
            </div>
            <div className="pl-2">
              <label className="text-white pl-3">State*</label>
              <input
                type="text"
                name="state"
                value={clientData.state}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border-2 border-neutral-500 text-white outline-none"
              />
            </div>
            <div className="pl-2 col-span-2">
              <label className="text-white pl-3">Cc*</label>
              <input
                type="text"
                name="cc"
                value={clientData.cc}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border-2 border-neutral-500 text-white outline-none"
              />
            </div>
            <div className="pl-2">
              <label className="text-white pl-3">City*</label>
              <input
                type="text"
                name="city"
                value={clientData.city}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border-2 border-neutral-500 text-white outline-none"
              />
            </div>
            <div className="pl-2">
              <label className="text-white pl-3">Country*</label>
              <input
                type="text"
                name="country"
                value={clientData.country}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border-2 border-neutral-500 text-white outline-none"
              />
            </div>
            <div className="pl-2">
              <label className="text-white pl-3">Phone Number*</label>
              <input
                type="text"
                name="phoneNumber"
                value={clientData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border-2 border-neutral-500 text-white outline-none"
              />
            </div>
            <div className="pl-2">
              <label className="text-white pl-3">Fixed discount*</label>
              <input
                type="text"
                name="fixedDiscount"
                value={clientData.fixedDiscount}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border-2 border-neutral-500 text-white outline-none"
              />
            </div>
            <div className="col-span-full mt-6 flex justify-end gap-4">
              <button
                type="button"
                className="px-6 py-2 border border-gray-400 rounded-md text-white cursor-pointer"
                onClick={() =>
                  setClientData({
                    name: "",
                    address1: "",
                    cin: "",
                    gstin: "",
                    address2: "",
                    email: "",
                    postalCode: "",
                    state: "",
                    cc: "",
                    city: "",
                    country: "",
                    phoneNumber: "",
                    fixedDiscount: "",
                  })
                }
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateClient;
