import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import  {BASE_URL}  from '../Utils/urlConfig';

const Register = () => {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    companyName: '',
    companyEmail: '',
    password: '',
    companyId: '',
    companyLocation: '',
    companySite: '',
  });

   const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/auth/registerCompany`, loginData);
      console.log("Response:",response);
      if(response.status === 201){
        alert("Company registered successfully!");
        navigate('/login');
      }
    } catch (error) {
      alert('failed to register the company');
      console.log(error.message);
    }    
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Register Your Company</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={loginData.companyName}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Company Email</label>
            <input
              type="email"
              name="companyEmail"
              value={loginData.companyEmail}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Company ID</label>
            <input
              type="text"
              name="companyId"
              value={loginData.companyId}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Company Location</label>
            <input
              type="text"
              name="companyLocation"
              value={loginData.companyLocation}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Company Website</label>
            <input
              type="url"
              name="companySite"
              value={loginData.companySite}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
          </div>
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200 cursor-pointer"
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
