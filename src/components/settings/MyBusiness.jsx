import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Utils/urlConfig";

const MyBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
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
          headers: { Authorization: `${token}` },
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
    setEditIndex(null);
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
    setShowForm(true);
  };

  const handleEditBusiness = (business, index) => {
    setEditIndex(index);
    setFormData({ ...business });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditIndex(null);
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
  };

  const handleSave = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    try {
      if (editIndex !== null) {
        // UPDATE existing business
        const businessToEdit = businesses[editIndex];

        await axios.put(
          `${BASE_URL}/api/update-business/${encodeURIComponent(businessToEdit.name)}`,
          formData,
          { headers: { Authorization: `${token}` } }
        );

        const updatedBusinesses = [...businesses];
        updatedBusinesses[editIndex] = formData;
        setBusinesses(updatedBusinesses);
        alert("Business updated successfully!");
      } else {
        // ADD new business
        const response = await axios.post(`${BASE_URL}/api/add-business`, formData, {
          headers: { Authorization: `${token}` },
        });

        if (response.status === 201) {
          alert("Business added successfully!");
          setBusinesses((prev) => [...prev, formData]);
        }
      }

      setShowForm(false);
      setEditIndex(null);
    } catch (error) {
      console.error("Error saving business:", error.message);
      alert("Failed to save business.");
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
                <div className="flex gap-3 items-center">
                  {biz.isActive && (
                    <span className="text-sm text-green-400 font-medium">
                      (Current)
                    </span>
                  )}
                  <button
                    onClick={() => handleEditBusiness(biz, idx)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Add/Edit Business Form */}
      {showForm && (
        <div className="bg-neutral-600 p-6 rounded-md space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              "name",
              "cin",
              "gstin",
              "address1",
              "address2",
              "postalCode",
              "city",
              "state",
              "phoneNumber",
              "email",
              "website",
            ].map((field) => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={handleInputChange}
                className="p-2 bg-neutral-700 rounded"
              />
            ))}
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
              {editIndex !== null ? "Update" : "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBusinesses;
