import React from 'react';
import { Star } from 'lucide-react';

export default function FeedbackCard({ feedback }) {
  return (
    <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-full hover:shadow-md transition-shadow duration-300">
      <div>
        {/* User Info & Rating */}
        <div class="flex items-center space-x-3 mb-4">
          <img
            src={feedback.avatar}
            alt={feedback.name}
            class="w-11 h-11 rounded-full object-cover border border-slate-200"
          />
          <div>
            <h4 class="text-base font-bold text-slate-900 leading-tight">
              {feedback.name}
            </h4>
            <div class="flex items-center space-x-0.5 mt-1">
              {[...Array(feedback.rating)].map((_, i) => (
                <Star key={i} size={14} class="fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
        </div>

        {/* Feedback text */}
        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-4">
          "{feedback.feedback}"
        </p>
      </div>

      {/* Restaurant Tag */}
      <div class="pt-3 border-t border-slate-100 flex items-center text-xs text-slate-400">
        <span class="mr-1">—</span>
        <span class="font-medium text-slate-600">{feedback.restaurant}</span>
      </div>
    </div>
  );
}
