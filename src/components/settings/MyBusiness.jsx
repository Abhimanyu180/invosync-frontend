import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Utils/urlConfig";

const MyBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    cin: "",
    gstin: "",
    address1: "",
    address2: "",
    postalCode: "",
    city: "",
    state: "",
    country: "India",
    phoneNumber: "",
    email: "",
    website: "",
  });

  useEffect(() => {
    const fetchBusinesses = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get(`${BASE_URL}/api/getAllBusiness`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        if (response.status === 200 && Array.isArray(response.data.business)) {
          setBusinesses(response.data.business);
        } else {
          setBusinesses([]);
        }
      } catch (error) {
        console.error("Failed to fetch businesses:", error.message);
        setBusinesses([]);
      }
    };

    fetchBusinesses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddBusiness = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      name: "",
      cin: "",
      gstin: "",
      addressLine1: "",
      address2: "",
      postalCode: "",
      city: "",
      state: "",
      country: "India",
      phoneNumber: "",
      email: "",
      website: "",
    });
  };

  const handleSave = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.post(
        `${BASE_URL}/api/add-business`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Business added successfully!");
        setShowForm(false);
        setFormData({
          name: "",
          cin: "",
          gstin: "",
          address1: "",
          address2: "",
          postalCode: "",
          city: "",
          state: "",
          country: "India",
          phoneNumber: "",
          email: "",
          website: "",
        });

        // Refresh list
        setBusinesses((prev) => [...prev, response.data.business]);
      }
    } catch (error) {
      console.error("Error adding business:", error.message);
      alert("Failed to add business.");
    }
  };

  return (
    <div className="bg-neutral-700 text-white p-6 rounded-lg w-full max-w-5xl mx-auto mt-6">
      <div className="flex justify-between mb-5">
        <button
          className="bg-neutral-500 hover:bg-neutral-400 px-4 py-2 rounded-lg"
          onClick={handleAddBusiness}
        >
          Add Business
        </button>
        <button className="bg-neutral-500 hover:bg-neutral-400 px-4 py-2 rounded-lg">
          Edit active business
        </button>
      </div>

      {/* Business List */}
      <div className="bg-neutral-600 p-4 rounded-md mb-6">
        <h3 className="text-lg font-semibold mb-3">Businesses</h3>
        <ul>
          {businesses.length === 0 ? (
            <li className="text-gray-300">No businesses found.</li>
          ) : (
            businesses.map((biz, idx) => (
              <li
                key={idx}
                className="bg-neutral-700 px-4 py-3 rounded-md mb-2 flex justify-between items-center"
              >
                <div>
                  <p className="text-base font-medium">{biz.name}</p>
                  <p className="text-sm text-gray-300">{biz.email}</p>
                </div>
                {biz.isActive && (
                  <span className="text-sm text-green-400 font-medium">
                    (Current)
                  </span>
                )}
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Add Business Form */}
      {showForm && (
        <div className="bg-neutral-600 p-6 rounded-md space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name *"
              value={formData.name}
              onChange={handleInputChange}
              className="p-2 bg-neutral-700 rounded"
            />
            <input
              type="text"
              name="cin"
              placeholder="CIN"
              value={formData.cin}
              onChange={handleInputChange}
              className="p-2 bg-neutral-700 rounded"
            />
            <input
              type="text"
              name="gstin"
              placeholder="GSTIN"
              value={formData.gstin}
              onChange={handleInputChange}
              className="p-2 bg-neutral-700 rounded"
            />
            <input
              type="text"
              name="address1"
              placeholder="Address 1 *"
              value={formData.address1}
              onChange={handleInputChange}
              className="p-2 bg-neutral-700 rounded"
            />
            <input
              type="text"
              name="address2"
              placeholder="Address line 2"
              value={formData.address2}
              onChange={handleInputChange}
              className="p-2 bg-neutral-700 rounded"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal code *"
              value={formData.postalCode}
              onChange={handleInputChange}
              className="p-2 bg-neutral-700 rounded"
            />
            <input
              type="text"
              name="city"
              placeholder="City/Suburb *"
              value={formData.city}
              onChange={handleInputChange}
              className="p-2 bg-neutral-700 rounded"
            />
            <input
              type="text"
              name="state"
              placeholder="State *"
              value={formData.state}
              onChange={handleInputChange}
              className="p-2 bg-neutral-700 rounded"
            />
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="p-2 bg-neutral-700 rounded"
            >
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="p-2 bg-neutral-700 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="p-2 bg-neutral-700 rounded"
            />
            <input
              type="text"
              name="website"
              placeholder="Website"
              value={formData.website}
              onChange={handleInputChange}
              className="p-2 bg-neutral-700 rounded"
            />
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              className="bg-neutral-500 px-4 py-2 rounded-md"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="bg-green-600 px-4 py-2 rounded-md"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBusinesses;
