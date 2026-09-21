import React from 'react';
import FeedbackSection from '../components/FeedbackSection';

export default function Feedback() {
  return (
    <div class="bg-slate-50 min-h-screen py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <span class="text-xs font-extrabold uppercase tracking-wider text-[#FF6500] mb-1 block">CUSTOMER FEEDBACK</span>
          <h1 class="text-3xl font-extrabold text-slate-900 mb-2">What Our Community Says</h1>
          <p class="text-slate-500 text-sm">Read authentic feedback and reviews from food lovers using FoodBari.</p>
        </div>
      </div>
      <FeedbackSection />
    </div>
  );
}
