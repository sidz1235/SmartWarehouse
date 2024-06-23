import React, { useState,useContext } from 'react';
import { UserContext } from '../UserContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post('/login', {
        username,
        password
      });
      console.log(data);
      const dat = {username: username, password: password, userType: data.data.userData.userType, companyName: data.data.userData.companyName};
      
      setUser(dat);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {user ?
      
        <Navigate to="/profile"/>
      
    :
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-3xl mb-4 text-center font-bold">Login</h2>
        <div className="mb-4">
          <input
            type="text"
            id="username"
            placeholder='Username'
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            id="password"
            placeholder='Password'
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
        <p className="text-center mt-4">
          Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
        </p>
      </form>
    </div>}
  </div>
  );
}

export default Login;
