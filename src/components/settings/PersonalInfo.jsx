import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Utils/urlConfig";

const PersonalInfo = () => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [edit, setEdit] = useState(false);
  const [editedCompanyName, setEditedCompanyName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decoded = parseJWT(token);
      if (decoded) {
        setCompanyName(decoded.name || "");
        setEmail(decoded.email || "");
        setEditedCompanyName(decoded.name || "");
        setEditedEmail(decoded.email || "");
        setCreatedAt(new Date(decoded.iat * 1000).toLocaleDateString());
      }
    }
  }, []);

  const parseJWT = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      return error.message;
    }
  };

  const handleSave = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Session expired. Please log in again.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/auth/edit/company/details`,
        {
          companyName: editedCompanyName,
          email: editedEmail,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Details updated successfully");
        setCompanyName(editedCompanyName);
        setEmail(editedEmail);
        setEdit(false);
      }
    } catch (error) {
      console.error("Failed to update details:", error.message);
      alert("Failed to update. Please try again.");
    }
  };

  const handleCancel = () => {
    setEdit(false);
    setEditedCompanyName(companyName);
    setEditedEmail(email);
  };

  return (
    <div className="bg-neutral-700 rounded-lg p-6 text-white w-full max-w-3xl mx-auto mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {edit ? "Edit Details" : companyName}
        </h2>
        {!edit && (
          <button
            onClick={() => setEdit(true)}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-500 hover:bg-neutral-400 rounded-lg"
          >
            <MdEdit className="text-lg cursor-pointer" />
            <span>Edit</span>
          </button>
        )}
      </div>

      {!edit ? (
        <div className="space-y-3">
          <div className="flex justify-between">
            <p>Email</p>
            <p>{email}</p>
          </div>
          <div className="flex justify-between">
            <p>Account created</p>
            <p>{createdAt}</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Company Name</label>
            <input
              type="text"
              value={editedCompanyName}
              onChange={(e) => setEditedCompanyName(e.target.value)}
              className="w-full p-2 rounded-md bg-neutral-600 text-white border border-gray-400"
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
              className="w-full p-2 rounded-md bg-neutral-600 text-white border border-gray-400"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-400 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
