
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL } from '../config';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // CHANGE URL FOR PRODUCTION
      const res = await axios.post(`${API_URL}/auth/login`, { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
      toast.success('Login Successful');
    } catch (err) {
      toast.error('Invalid Credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="flex justify-center mb-6">
           <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold">D</div>
        </div>
        <h2 className="mb-2 text-center text-2xl font-bold text-gray-800">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-5 mt-8">
          <input 
            type="text" 
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:ring-green-500 outline-none"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
          <input 
            type="password" 
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:ring-green-500 outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full rounded-xl bg-green-500 py-3 text-white font-semibold hover:bg-green-600 transition shadow-lg shadow-green-100 flex justify-center items-center disabled:bg-green-300"
          >
            {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;