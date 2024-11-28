import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, User } from 'lucide-react';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Get token from localStorage
                const token = localStorage.getItem('token');
                
                // If no token, redirect to login
                if (!token) {
                    navigate('/login');
                    return;
                }

                // Fetch user profile
                const response = await axios.get('https://tic-payeasy-trial-server.onrender.com/api/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setUser(response.data.user);
            } catch (err) {
                // Handle token expiration or other errors
                setError(err.response?.data?.message || 'Failed to fetch user profile');
                
                // Clear tokens and redirect to login
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                navigate('/login');
            }
        };

        fetchUserProfile();
    }, [navigate]);

    const handleLogout = () => {
        // Clear tokens
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        
        // Redirect to login
        navigate('/login');
    };

    if (error) {
        return (
            <div className="max-w-md mx-auto mt-10 p-6 bg-red-100 rounded-lg">
                <p className="text-red-700">{error}</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl ring-1 ring-gray-200 overflow-hidden">
          {/* Header with gradient and profile icon */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 flex items-center space-x-4">
            <div className="bg-white/20 rounded-full p-3">
              <User className="text-white w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{user.name}</h2>
              <p className="text-white/80 text-sm">{user.email}</p>
            </div>
          </div>
  
          {/* User Details Section */}
          <div className="p-6 space-y-4">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-700">Account Information</h3>
                <Settings className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">User ID</span>
                  <span className="font-medium text-gray-800">{user.id}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Email</span>
                  <span className="font-medium text-gray-800">{user.email}</span>
                </div>
              </div>
            </div>
  
            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                className="bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition flex items-center justify-center space-x-2"
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
              <button 
                onClick={handleLogout}
                className="bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition flex items-center justify-center space-x-2"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Dashboard;