import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {  LockIcon, MailIcon } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('https://tic-payeasy-trial-server.onrender.com/api/auth/login', formData);
            
            // Store tokens in localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('refreshToken', response.data.refreshToken);

            // Redirect to dashboard
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4 py-12">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
          <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-neutral-900">
                  Welcome Back
              </h2>
              <p className="mt-2 text-center text-sm text-neutral-600">
                  Sign in to continue to your dashboard
              </p>
          </div>
          <form 
              className="mt-8 space-y-6 bg-white shadow-modern p-8 rounded-xl"
              onSubmit={handleSubmit}
          >
              {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm">
                      {error}
                  </div>
              )}
              <div className="rounded-md shadow-sm space-y-4">
                  <div>
                      <label htmlFor="email" className="sr-only">Email address</label>
                      <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <MailIcon className="h-5 w-5 text-neutral-400" />
                          </div>
                          <input
                              id="email"
                              name="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border border-neutral-300 placeholder-neutral-500 text-neutral-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                              placeholder="Email address"
                          />
                      </div>
                  </div>
                  <div>
                      <label htmlFor="password" className="sr-only">Password</label>
                      <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <LockIcon className="h-5 w-5 text-neutral-400" />
                          </div>
                          <input
                              id="password"
                              name="password"
                              type="password"
                              required
                              value={formData.password}
                              onChange={handleChange}
                              className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border border-neutral-300 placeholder-neutral-500 text-neutral-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                              placeholder="Password"
                          />
                      </div>
                  </div>
              </div>

              <div className="flex items-center justify-between">
                  <div className="flex items-center">
                      <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-900">
                          Remember me
                      </label>
                  </div>

                  <div className="text-sm">
                      <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                          Forgot password?
                      </a>
                  </div>
              </div>

              <div>
                  <button
                      type="submit"
                      disabled={isLoading}
                      className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white 
                          ${isLoading 
                              ? 'bg-primary-400 cursor-not-allowed' 
                              : 'bg-primary-600 hover:bg-primary-700'
                          }`}
                  >
                      {isLoading ? 'Signing In...' : 'Sign In'}
                  </button>
              </div>

              <div className="text-center">
                  <p className="mt-2 text-sm text-neutral-600">
                      Don't have an account?{' '}
                      <Link 
                          to="/signup" 
                          className="font-medium text-primary-600 hover:text-primary-500"
                      >
                          Sign up
                      </Link>
                  </p>
              </div>
          </form>
      </div>
  </div>
);
};

export default Login;