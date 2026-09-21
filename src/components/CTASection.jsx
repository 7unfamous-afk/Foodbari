import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section class="py-12 sm:py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative bg-gradient-to-r from-[#FF6500] to-[#ff7b1c] rounded-3xl p-8 sm:p-12 lg:p-14 text-white shadow-xl overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Subtle decorative background icons */}
          <div class="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
            <svg width="240" height="240" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.46 3.9 3.45 4.35L6 22h2l.55-8.65C10.54 12.9 12 11.12 12 9V2h-1v7zm8-7h-2v20h2V2z"/>
            </svg>
          </div>

          <div class="max-w-2xl relative z-10 text-center lg:text-left">
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-3">
              Good Food Brings People Together
            </h2>
            <p class="text-sm sm:text-base text-white/90 font-normal leading-relaxed">
              Join thousands of happy customers and enjoy the best food from your favorite restaurants.
            </p>
          </div>

          <div class="relative z-10 shrink-0">
            <Link
              to="/register"
              class="bg-white hover:bg-slate-50 text-[#FF6500] font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 transform active:scale-95 text-sm sm:text-base"
            >
              <span>Register Now</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
