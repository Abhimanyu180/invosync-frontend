import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { GoPlus } from "react-icons/go";
import { BASE_URL } from "../Utils/urlConfig";

const Clients = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your real API URL
    const fetchClients = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/getClients`);
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="bg-black min-h-screen text-white px-10 py-10">
        {/* Back Link */}
        <div
          onClick={() => navigate("/company/dashboard")}
          className="text-2xl cursor-pointer mb-6"
        >
          Home
        </div>

        {/* Header */}
        <div className="flex flex-row items-center justify-between mb-8">
          <p className="text-3xl font-bold">Clients</p>
          <button
            onClick={() => navigate("/create/clients")}
            className="text-2xl bg-gray-600 hover:bg-gray-700 border-2 border-gray-600 rounded-2xl flex items-center gap-2 px-6 py-2 cursor-pointer transition-all duration-200"
          >
            <GoPlus />
            New Client
          </button>
        </div>

        {/* Search Box */}
        <div className="mb-6 w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-500 bg-neutral-800 text-white placeholder-gray-400 outline-none"
          />
        </div>

        {/* Client Table */}
        <div className="w-full overflow-x-auto">
          {loading ? (
            <p className="text-gray-400">Loading clients...</p>
          ) : (
            <table className="min-w-full bg-neutral-800 rounded-lg overflow-hidden">
              <thead className="bg-neutral-700 text-left">
                <tr>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Number of Invoices</th>
                  <th className="py-3 px-4">Number of Drafts</th>
                  <th className="py-3 px-4">Times Invoiced</th>
                  <th className="py-3 px-4">Total Unpaid</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-4 px-4 text-center text-gray-400">
                      No clients found
                    </td>
                  </tr>
                ) : (
                  filteredClients.map((client, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="py-3 px-4">{client.name}</td>
                      <td className="py-3 px-4">{client.invoices}</td>
                      <td className="py-3 px-4">{client.drafts}</td>
                      <td className="py-3 px-4">{client.timesInvoiced}</td>
                      <td className="py-3 px-4">{client.totalUnpaid}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clients;
