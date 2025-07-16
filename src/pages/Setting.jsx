import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineSecurityScan } from "react-icons/ai";
import { IoNotificationsCircleSharp, IoBusiness } from "react-icons/io5";
import { MdLanguage } from "react-icons/md";
import Navbar from "../components/Navbar";

//component imports
import PersonalInfo from "../components/settings/PersonalInfo";
import Security from "../components/settings/Security";
import MyBusiness from "../components/settings/MyBusiness";
import Notification from "../components/settings/Notification";
import Language from "../components/settings/Language";

const settingsOptions = [
  { key: "personal", label: "Personal info", icon: FaUserCircle },
  { key: "security", label: "Security settings", icon: AiOutlineSecurityScan },
  { key: "notifications", label: "Notifications", icon: IoNotificationsCircleSharp },
  { key: "business", label: "My businesses", icon: IoBusiness },
  { key: "language", label: "Language", icon: MdLanguage },
];

const Setting = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = React.useState("personal");

  const renderComponent = () =>{
    switch (selected) {
      case "personal":
        return <PersonalInfo />
      case "security":
        return <Security />
      case "notifications":
        return <Notification />
      case "business":
        return <MyBusiness />
      case "language":
        return <Language />
      default:
        break;
    }
  }
  return (
    <div className="bg-black min-h-screen w-full text-white">
      <Navbar />
      <div className="flex flex-row">
        {/* Sidebar */}
        <aside className="w-64 p-5">
          <h2
            className="text-white text-sm cursor-pointer mb-3"
            onClick={() => navigate("/company/dashboard")}
          >
            Home
          </h2>
          <h1 className="text-white font-bold text-3xl mb-6">
            Personal settings
          </h1>
          <div className="space-y-3">
            {settingsOptions.map(({ key, label, icon: Icon }) => (
              <div
                key={key}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
                  selected === key ? "bg-neutral-600" : "bg-neutral-800"
                } hover:bg-neutral-600 transition-colors`}
                onClick={() => setSelected(key)}
              >
                <Icon className="text-xl" />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Right Panel */}
        <main className="flex-1 p-5">{renderComponent()}</main>
      </div>
    </div>
  );
};

export default Setting;
