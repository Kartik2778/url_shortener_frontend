import React, { useRef, useState } from 'react';
import {
  Email,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
  AdminPanelSettings,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/API.js';

const Register = () => {
  let username = useRef('');
  let email = useRef('');
  let role = useRef('');
  let pass = useRef('');
  const [showPass, setShowPass] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault();
    const userData = {
      username: username.current.value,
      email: email.current.value,
      password: pass.current.value,
      role: role.current.value
    };
    console.log(userData);

    try {
      const response = await registerRequest(userData);
      setSuccessMsg(response.data);
      setErrorMsg('');
      setLoading(true);
      setTimeout(() => {
        navigate('/login');
      }, 2500);
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      setSuccessMsg('');
      setErrorMsg(error.response?.data?.message || 'Something went wrong');
    }
  };


  const registerRequest = async (userData) => {
    const resoponse = await API.post("/api/auth/register", userData);
    return resoponse.data;
  }

  return (
    <>
      {
        loading ? (
          <div className="flex items-center justify-center h-screen bg-black">
            <div className="w-16 h-16 border-8 border-white border-t-green-500 rounded-full animate-spin"></div>
            <span className="text-white text-xl ml-4">Redirecting...</span>
          </div>
        ) : (

          <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
            <form
              onSubmit={handleRegister}
              className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-xl w-full max-w-md text-white border border-white/20"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Register</h2>

              {
                <>
                  {successMsg && (
                    <div className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md mt-4">
                      {successMsg}
                    </div>
                  )}
                  {errorMsg && (
                    <div className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md mt-4">
                      {errorMsg}
                    </div>
                  )}
                </>
              }

              {/* Username */}
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium">Username</label>
                <div className="flex items-center border border-white/20 rounded-lg px-4 bg-white/5">
                  <Person className="text-white mr-2" />
                  <input
                    type="text"
                    placeholder="Your name"
                    ref={username}
                    required
                    className="w-full bg-transparent p-3 text-white placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium">Email</label>
                <div className="flex items-center border border-white/20 rounded-lg px-4 bg-white/5">
                  <Email className="text-white mr-2" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    ref={email}
                    required
                    className="w-full bg-transparent p-3 text-white placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Role Select */}
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium">Select Role</label>
                <div className="flex items-center border border-white/20 rounded-lg px-4 bg-white/5">
                  <AdminPanelSettings className="text-white mr-2" />
                  <select
                    ref={role}
                    required
                    className="w-full bg-transparent p-3 text-white placeholder-gray-400 focus:outline-none appearance-none"
                  >
                    <option value="" disabled className="bg-black text-white">
                      -- Select Role --
                    </option>
                    <option value="USER" className="bg-black text-white">
                      User
                    </option>
                    <option value="ADMIN" className="bg-black text-white">
                      Admin
                    </option>
                  </select>
                </div>
              </div>

              {/* Password */}
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium">Password</label>
                <div className="flex items-center border border-white/20 rounded-lg px-4 bg-white/5">
                  <Lock className="text-white mr-2" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Enter password"
                    ref={pass}
                    required
                    className="w-full bg-transparent p-3 text-white placeholder-gray-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="focus:outline-none"
                  >
                    {showPass ? (
                      <VisibilityOff className="text-white" />
                    ) : (
                      <Visibility className="text-white" />
                    )}
                  </button>
                </div>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all p-3 rounded-lg font-semibold text-white"
              >
                Register
              </button>

              {/* Link to login */}
              <div className="text-center mt-6 text-sm text-gray-300">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-300 hover:underline">
                  Login
                </Link>
              </div>
            </form>
          </div>
        )
      }
    </>
  )
};

export default Register;
