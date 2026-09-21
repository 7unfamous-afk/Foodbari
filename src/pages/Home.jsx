import React from 'react';
import Hero from '../components/Hero';
import FeatureSection from '../components/FeatureSection';
import RestaurantSection from '../components/RestaurantSection';
import FeedbackSection from '../components/FeedbackSection';
import CTASection from '../components/CTASection';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeatureSection />
      <RestaurantSection />
      <FeedbackSection />
      <CTASection />
    </main>
  );
}
