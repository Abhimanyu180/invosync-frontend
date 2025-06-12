import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import InvoicePage from "./pages/InvoicePage";
import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
import ProductSection from "./pages/ProductSection";
import NewProduct from "./pages/NewProduct";
import PrivateRoute from "./PrivateRoute";
import PersonalSetting from "./pages/PersonalSetting";
import CreateClient from "./pages/CreateClient";
import Clients from "./pages/Clients";

function App() {

  // useEffect(() => {
  //   const handleContextMenu = (e) => {
  //     e.preventDefault();
  //   };
  //   document.addEventListener("contextmenu", handleContextMenu);

  //   // Cleanup on unmount
  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //   };
  // }, []);
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path ='/login' element={<Login />} />
          <Route path="/company/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/invoice" element={<PrivateRoute><InvoicePage /></PrivateRoute>} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/products" element={<ProductSection />} />
          <Route path="/create/products" element={<NewProduct />} />
          <Route path="/personal/setting" element={<PersonalSetting />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/create/clients" element={<CreateClient />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
