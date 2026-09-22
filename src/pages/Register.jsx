import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Phone, Mail, Lock, Eye, EyeOff, ArrowRight, UtensilsCrossed, ShieldCheck, Truck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const { login, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    updateUserProfile({ name: name || 'Unfamous', phone });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] relative flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-hidden font-sans">
      
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-200/40 rounded-full blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="w-full max-w-6xl bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-orange-100/60 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[660px]">
        
        <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between relative bg-gradient-to-b from-orange-50/60 to-orange-100/30">
          <div className="relative z-10">
            <Link to="/" className="inline-block mb-6">
              <img
                src="/logo.png"
                alt="FoodBari Logo"
                className="h-14 sm:h-16 w-auto object-contain"
              />
            </Link>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Good Food <br />
              <span className="text-[#FF6500]">Brings People Together</span>
            </h1>

            <p className="mt-4 text-slate-600 text-sm sm:text-base max-w-md font-medium">
              Join FoodBari and enjoy delicious food from your favorite local restaurants.
            </p>
          </div>

          <div className="relative z-10 my-6 rounded-2xl overflow-hidden shadow-lg border-2 border-white/80 group">
            <img
              src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1000&q=80"
              alt="Delicious Nepali Momos & Noodles"
              className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 grid grid-cols-3 gap-3 pt-2">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-orange-100 text-[#FF6500] flex items-center justify-center shrink-0 mt-0.5">
                <UtensilsCrossed size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Wide Variety</h4>
                <p className="text-[10px] text-slate-500 leading-tight">Multiple cuisines</p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-orange-100 text-[#FF6500] flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Secure & Safe</h4>
                <p className="text-[10px] text-slate-500 leading-tight">Data protected</p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-orange-100 text-[#FF6500] flex items-center justify-center shrink-0 mt-0.5">
                <Truck size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Fast Delivery</h4>
                <p className="text-[10px] text-slate-500 leading-tight">Hot & fresh</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 p-8 sm:p-10 lg:p-12 flex flex-col justify-center bg-white relative">
          <div className="max-w-md w-full mx-auto space-y-5">
            <div className="text-center space-y-1">
              <img
                src="/logo.png"
                alt="FoodBari"
                className="h-10 w-auto object-contain mx-auto mb-1"
              />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Create Your Account
              </h2>
              <p className="text-xs text-slate-500 font-normal">
                Join FoodBari and start ordering your favorite food.
              </p>
            </div>

            <form className="space-y-3.5 pt-1" onSubmit={handleRegisterSubmit}>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF6500] focus:bg-white transition-all"
                />
              </div>

              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400">
                  <Phone size={18} />
                </div>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF6500] focus:bg-white transition-all"
                />
              </div>

              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF6500] focus:bg-white transition-all"
                />
              </div>

              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF6500] focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="flex items-center space-x-2 text-xs font-medium pt-1">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 text-[#FF6500] border-gray-300 rounded focus:ring-[#FF6500] accent-[#FF6500]"
                />
                <span className="text-slate-600">
                  I agree to the{' '}
                  <a href="#terms" className="text-[#FF6500] font-semibold hover:underline">
                    Terms & Conditions
                  </a>
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF6500] hover:bg-[#e05800] text-white font-bold py-3 rounded-xl text-sm transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 transform active:scale-[0.99] mt-2 cursor-pointer"
              >
                <span>Create Account</span>
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <span className="relative bg-white px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                OR
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                login('googleuser@example.com', 'googlepass');
                navigate('/dashboard');
              }}
              className="w-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold py-2.5 rounded-xl text-xs sm:text-sm transition-all duration-200 flex items-center justify-center space-x-3 shadow-sm cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            <p className="text-center text-xs sm:text-sm text-slate-500 pt-1 font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-[#FF6500] font-bold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
