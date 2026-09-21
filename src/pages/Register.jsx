import React from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div class="bg-slate-50 min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full bg-white rounded-3xl shadow-sm border border-slate-100 p-8 space-y-6">
        <div class="text-center">
          <img src="/logo.png" alt="FoodBari" class="h-12 mx-auto mb-4 object-contain" />
          <h2 class="text-2xl font-extrabold text-slate-900">Create FoodBari Account</h2>
          <p class="text-xs text-slate-500 mt-1">Join thousands of food lovers in Biratnagar</p>
        </div>
        <form class="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
            <input type="text" placeholder="e.g. Ram Sharma" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF6500] text-sm" />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number</label>
            <input type="tel" placeholder="98XXXXXXXX" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF6500] text-sm" />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Password</label>
            <input type="password" placeholder="Create password" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF6500] text-sm" />
          </div>
          <button type="button" class="w-full bg-[#FF6500] hover:bg-[#e05800] text-white font-semibold py-3 rounded-full text-sm shadow">
            Create Account
          </button>
        </form>
        <p class="text-center text-xs text-slate-500">
          Already have an account? <Link to="/login" class="text-[#FF6500] font-bold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
