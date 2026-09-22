import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] relative flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-hidden font-sans">
      
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-200/40 rounded-full blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      {/* Main Card */}
      <div className="w-full max-w-6xl bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-orange-100/60 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        
        {/* Left Side: Brand Showcase */}
        <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between relative bg-gradient-to-b from-orange-50/60 to-orange-100/30">
          <div className="relative z-10">
            <Link to="/" className="inline-block mb-8">
              <img
                src="/logo.png"
                alt="FoodBari Logo"
                className="h-14 sm:h-16 w-auto object-contain"
              />
            </Link>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Good Food. <br />
              <span className="text-[#FF6500]">Good Mood.</span>
            </h1>

            <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-sm font-medium">
              Order your favorite food from your favorite restaurants.
            </p>
          </div>

          <div className="relative z-10 mt-8 rounded-2xl overflow-hidden shadow-lg border-2 border-white/80 group">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80"
              alt="Nepali Food Feast"
              className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white relative">
          <div className="max-w-md w-full mx-auto space-y-6">
            
            <div className="text-center space-y-2">
              <img
                src="/logo.png"
                alt="FoodBari"
                className="h-12 w-auto object-contain mx-auto mb-2"
              />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Welcome Back!
              </h2>
              <p className="text-sm text-slate-500 font-normal">
                Login to continue ordering your favorite food.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4 pt-2" onSubmit={handleLoginSubmit}>
              
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Phone Number or Email
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-slate-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your phone number or email"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF6500] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-slate-400">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF6500] focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-medium pt-1">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-[#FF6500] border-gray-300 rounded focus:ring-[#FF6500] accent-[#FF6500]"
                  />
                  <span className="text-slate-600">Remember me</span>
                </label>
                <a href="#forgot" className="text-[#FF6500] hover:underline font-semibold">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF6500] hover:bg-[#e05800] text-white font-bold py-3.5 rounded-xl text-base transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 transform active:scale-[0.99] mt-2 cursor-pointer"
              >
                <span>Login</span>
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <span className="relative bg-white px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                OR
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                login('googleuser@example.com', 'googlepass');
                navigate('/dashboard');
              }}
              className="w-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-xl text-sm transition-all duration-200 flex items-center justify-center space-x-3 shadow-sm cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            <p className="text-center text-xs sm:text-sm text-slate-500 pt-2 font-medium">
              Don’t have an account?{' '}
              <Link to="/register" className="text-[#FF6500] font-bold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
