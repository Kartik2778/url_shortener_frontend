import React, { useContext, useState } from 'react';
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/API';
import { UserContext } from '../contextApi/UserContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {login} = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = {
      username,
      password
    };
    try {
      const response = await loginRequest(userData);
      login(response.data);
      setSuccessMsg('Login successful!');
      setErrorMsg('');
      setLoading(true);
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setSuccessMsg('');
      setErrorMsg(error.response?.data || 'Something went wrong');
    }
  };

  const loginRequest = async (userData) => {
    const response = await API.post('/api/auth/login', userData);
    return response;
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
              onSubmit={handleLogin}
              className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-xl w-full max-w-md text-white border border-white/20"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Login</h2>

              {loading ? (
                <div className="flex justify-center items-center mt-4">
                  <div className="w-8 h-8 border-4 border-white border-t-green-500 rounded-full animate-spin"></div>
                  <span className="text-white ml-2">Redirecting...</span>
                </div>
              ) : (
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
              )}

              {/* username Input */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium">user name</label>
                <div className="flex items-center border border-white/20 rounded-lg px-4 bg-white/5">
                  <PersonIcon className="text-white mr-2" />
                  <input
                    type="text"
                    placeholder="enter your name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full bg-transparent p-3 text-white placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium">Password</label>
                <div className="flex items-center border border-white/20 rounded-lg px-4 bg-white/5">
                  <Lock className="text-white mr-2" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all p-3 rounded-lg font-semibold text-white"
              >
                Log In
              </button>

              {/* Extra Links */}
              <div className="text-center mt-6 text-sm text-gray-300">
                Don't have an account? <Link to="/register" className="text-purple-300 hover:underline">Register</Link>
              </div>
            </form>
          </div>
        )
      }
    </>
  );
}

export default Login;
