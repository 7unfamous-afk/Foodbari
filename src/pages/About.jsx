import React from 'react';

export default function About() {
  return (
    <div class="bg-slate-50 min-h-screen py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100 space-y-6">
          <span class="text-xs font-extrabold uppercase tracking-wider text-[#FF6500]">ABOUT FOODBARI</span>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900">Good Food • Happy People</h1>
          <p class="text-slate-600 leading-relaxed">
            FoodBari is Biratnagar's premier local food delivery platform connecting food lovers with their favorite neighborhood restaurants. Our mission is to make ordering delicious meals fast, seamless, and joyful.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100 text-center">
            <div class="p-4 bg-orange-50 rounded-2xl">
              <span class="text-2xl font-bold text-[#FF6500]">50+</span>
              <p class="text-xs text-slate-600 font-semibold mt-1">Partner Restaurants</p>
            </div>
            <div class="p-4 bg-orange-50 rounded-2xl">
              <span class="text-2xl font-bold text-[#FF6500]">10,000+</span>
              <p class="text-xs text-slate-600 font-semibold mt-1">Happy Customers</p>
            </div>
            <div class="p-4 bg-orange-50 rounded-2xl">
              <span class="text-2xl font-bold text-[#FF6500]">30 Mins</span>
              <p class="text-xs text-slate-600 font-semibold mt-1">Avg Delivery Time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
