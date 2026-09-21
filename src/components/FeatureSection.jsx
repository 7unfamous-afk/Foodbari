import React from 'react';
import { UtensilsCrossed, ShieldCheck, Zap, Headphones } from 'lucide-react';

export default function FeatureSection() {
  const features = [
    {
      icon: <UtensilsCrossed size={24} class="text-[#FF6500]" />,
      bgColor: 'bg-orange-50',
      title: 'Wide Selection',
      description: 'Explore a variety of restaurants and cuisines.'
    },
    {
      icon: <ShieldCheck size={24} class="text-emerald-500" />,
      bgColor: 'bg-emerald-50',
      title: 'Safe & Secure',
      description: 'Your data and payments are always protected.'
    },
    {
      icon: <Zap size={24} class="text-indigo-500" />,
      bgColor: 'bg-indigo-50',
      title: 'Fast & Easy',
      description: 'Order in just a few clicks and get it delivered.'
    },
    {
      icon: <Headphones size={24} class="text-sky-500" />,
      bgColor: 'bg-sky-50',
      title: '24/7 Support',
      description: "We're here to help, anytime you need us."
    }
  ];

  return (
    <section class="bg-white py-14 sm:py-16 border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} class="flex flex-col items-center text-center group p-2">
              <div class={`w-14 h-14 rounded-full ${feature.bgColor} flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 class="text-lg font-bold text-slate-800 mb-1">
                {feature.title}
              </h3>
              <p class="text-sm text-slate-500 max-w-xs leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
