import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../Utils/urlConfig';

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    role: 'company', // default role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = loginData.role === 'admin' ? 'loginAdmin' : 'loginCompany';

    try {
      const response = await axios.post(`${BASE_URL}/auth/${endpoint}`, {
        email: loginData.email,
        password: loginData.password,
      });

      if (response.status === 200) {
        console.log("Response:",response);
        const token = response.data.token;
        // console.log("Token:",token);
        sessionStorage.setItem("token",token);
        alert(`${loginData.role} logged in successfully!`);
        navigate(`/${loginData.role}/dashboard`);
      }
    } catch (error) {
      alert('Login failed. Please check your credentials.');
      console.error(error.message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Role</label>
            <select
              name="role"
              value={loginData.role}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            >
              <option value="company">Company</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              required
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
              required
            />
          </div>
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200 cursor-pointer"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
