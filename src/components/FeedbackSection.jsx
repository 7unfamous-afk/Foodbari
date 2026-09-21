import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { feedbackData } from '../data/feedback';
import FeedbackCard from './FeedbackCard';

export default function FeedbackSection() {
  return (
    <section class="bg-[#FFFDF9] py-16 sm:py-20 border-b border-amber-100/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Row */}
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span class="text-xs font-extrabold uppercase tracking-wider text-[#FF6500] mb-1 block">
              WHAT OUR CUSTOMERS SAY
            </span>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Real Feedback from Real Food Lovers
            </h2>
          </div>

          <Link
            to="/feedback"
            class="mt-4 sm:mt-0 text-sm font-semibold text-[#FF6500] hover:text-[#e05800] flex items-center space-x-1 transition-colors group self-start sm:self-auto"
          >
            <span>View More Feedback</span>
            <ArrowRight size={16} class="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Feedback Grid */}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          {feedbackData.map((item) => (
            <FeedbackCard key={item.id} feedback={item} />
          ))}
        </div>

      </div>
    </section>
  );
}
