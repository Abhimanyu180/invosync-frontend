import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle, FaHeadphones } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { PiUserSquareBold, PiDiamondsFourDuotone } from "react-icons/pi";
import { BsExclamationLg } from "react-icons/bs";

const Navbar = () => {
  const [companyName, setCompanyName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const menuRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decoded = parseJWT(token);
      if (decoded) {
        setCompanyName(decoded.name || "");
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

  // ✅ Close both menu and profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickOutsideMenu = menuRef.current && !menuRef.current.contains(event.target);
      const isClickOutsideProfile = profileRef.current && !profileRef.current.contains(event.target);

      if (isClickOutsideMenu && isClickOutsideProfile) {
        setMenuOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const createInvoice = () => navigate("/invoice");

  return (
    <div className="relative">
      {/* Top Navbar */}
      <div className="bg-green-600 h-16 flex items-center justify-between px-6 relative">
        <div ref={menuRef}>
          <GiHamburgerMenu
            className="text-white text-2xl cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>

        <div className="relative" ref={profileRef}>
          <FaUserCircle
            className="text-white text-2xl cursor-pointer"
            onClick={() => setProfileOpen(!profileOpen)}
          />

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-neutral-600 rounded-lg shadow-lg z-50">
              <div className="flex flex-col p-3 space-y-2 text-sm text-white">
                <p className="p-2 rounded font-bold text-xl cursor-default">
                  {companyName}
                </p>
                <p
                  onClick={() => navigate('/setting')}
                  className="p-2 rounded cursor-pointer hover:bg-neutral-500"
                >
                  Personal Settings
                </p>
                <p
                  onClick={() => {
                    sessionStorage.removeItem("token");
                    navigate('/login');
                  }}
                  className="p-2 rounded cursor-pointer hover:bg-neutral-500"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Menu */}
      {menuOpen && (
        <div className="absolute top-20 left-6 z-40" ref={menuRef}>
          <div className="bg-white shadow-lg rounded-xl w-80">
            <div className="bg-black flex flex-col items-start text-white text-base space-y-5 rounded p-4">
              <p onClick={createInvoice} className="flex items-center gap-x-2 cursor-pointer">
                <GoPlus />
                New Invoice
              </p>
              <p onClick={() => navigate("/invoices")} className="flex items-center gap-x-2 cursor-pointer">
                <LiaFileInvoiceSolid />
                Invoices
              </p>
              <p className="flex items-center gap-x-2 cursor-pointer" onClick={() => navigate("/clients")}>
                <PiUserSquareBold />
                Clients
              </p>
              <p onClick={() => navigate("/products")} className="flex items-center gap-x-2 cursor-pointer">
                <PiDiamondsFourDuotone />
                Products
              </p>
              <p className="flex items-center gap-x-2 cursor-pointer">
                <BsExclamationLg />
                Help Center
              </p>
              <p className="flex items-center gap-x-2 cursor-pointer">
                <FaHeadphones />
                Contact Support
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
