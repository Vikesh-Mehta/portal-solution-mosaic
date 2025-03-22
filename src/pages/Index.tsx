
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import CtaSection from '@/components/home/CtaSection';

const Index = () => {
  // Use the correct path to the uploaded image
  const boothImage = '/lovable-uploads/ed7ed09c-9713-4f2f-b711-d01e486e9aeb.png';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <HeroSection boothImage={boothImage} />
        <FeaturesSection />
        <HowItWorksSection />
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
