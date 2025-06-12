import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineSecurityScan } from "react-icons/ai";
import { IoNotificationsCircleSharp, IoBusiness } from "react-icons/io5";
import { MdLanguage, MdEdit } from "react-icons/md";
import axios from "axios";
import Navbar from "../components/Navbar";
import { BASE_URL } from "../Utils/urlConfig";

const PersonalSetting = () => {
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

  function parseJWT(token) {
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
    } catch (e) {
      return null;
    }
  }

  const toggleEdit = () => {
    setEdit(true);
  };

  const handleCancel = () => {
    setEdit(false);
    setEditedCompanyName(companyName);
    setEditedEmail(email);
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

  return (
    <div>
      <Navbar />
      <div className="bg-black w-full h-screen flex flex-row gap-15">
        {/* Sidebar */}
        <div className="ml-5 pt-3">
          <h2
            className="text-white cursor-pointer"
            onClick={() => navigate("/company/dashboard")}
          >
            Home
          </h2>
          <h1 className="text-white font-bold text-3xl pt-3">
            Personal settings
          </h1>
          <div className="pt-5 w-50 space-y-2">
            {[
              ["Personal setting", FaUserCircle],
              ["security setting", AiOutlineSecurityScan],
              ["Notification", IoNotificationsCircleSharp],
              ["My businesses", IoBusiness],
              ["Language", MdLanguage],
            ].map(([label, Icon], idx) => (
              <div
                key={idx}
                className="bg-neutral-700 w-full h-10 rounded-2xl text-white flex flex-row gap-2 items-center"
              >
                <p className="pl-2 text-2xl">
                  <Icon />
                </p>
                <p>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-neutral-700 h-fit w-3/4 mt-5 rounded-2xl p-5">
          <div className="flex flex-row items-center justify-between">
            <p className="text-white text-2xl font-bold">
              {edit ? "Edit Details" : companyName}
            </p>
            {!edit && (
              <button
                onClick={toggleEdit}
                className="cursor-pointer flex items-center gap-2 bg-neutral-500 hover:bg-neutral-400 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-300"
              >
                <MdEdit className="text-lg" />
                <span>Edit</span>
              </button>
            )}
          </div>

          {!edit ? (
            <div className="flex flex-col w-1/2 ml-2 mt-8">
              <div className="flex flex-row justify-between text-white">
                <p>Email</p>
                <p>{email}</p>
              </div>
              <div className="flex flex-row justify-between mt-2 text-white">
                <p>Account created</p>
                <p>{createdAt}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-1/2 ml-2 mt-8 text-white space-y-4">
              <div>
                <label className="block">Company Name:</label>
                <input
                  type="text"
                  value={editedCompanyName}
                  onChange={(e) => setEditedCompanyName(e.target.value)}
                  className="w-full p-2 rounded-md bg-neutral-600 text-white border border-gray-400"
                />
              </div>
              <div>
                <label className="block">Email:</label>
                <input
                  type="email"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  className="w-full p-2 rounded-md bg-neutral-600 text-white border border-gray-400"
                />
              </div>
              <div className="flex gap-4 mt-3">
                <button
                  onClick={handleCancel}
                  className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalSetting;
