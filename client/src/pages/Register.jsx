import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user');
  const [companyName, setCompanyName] = useState('Amazon INC');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(companyName);
      const response = await axios.post('/register', {
        username,
        password,
        userType,
        companyName,
      });
      console.log(response);
      window.location.href = '/login';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-3xl mb-4 text-center font-bold">Register</h2>
        <div className="mb-4">
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <select
            id="userType"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="mb-4">
          <select
            type="text"
            id="companyName"
            placeholder="Company Name"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            defaultValue={"Amazon INC"}
            >
            <option value="Amazon INC">Amazon INC</option>
            <option value="Flipkart INC">Flipkart INC</option>
            <option value="Alibaba INC">Alibaba INC</option>
          </select>
          
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Register
        </button>
        <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
