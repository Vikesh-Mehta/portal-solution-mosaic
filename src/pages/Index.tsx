import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, VideoIcon, PillIcon, Map, HeartPulse, Brain } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FeatureCard from '@/components/ui/FeatureCard';
import BoothLocator from '@/components/ui/BoothLocator';

const Index = () => {
  const [showLocator, setShowLocator] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const boothImage = '/lovable-uploads/345f8e88-29cc-4be2-be10-b8698b4e06e2.png';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      title: 'Health Checkup',
      description: 'Monitor vital signs like blood pressure, sugar levels, SpO2, and ECG with advanced AI analysis.',
      icon: <Activity size={24} className="text-medical-600" />,
      path: '/health-checkup'
    },
    {
      title: 'Virtual Doctor',
      description: 'Connect with AI-powered virtual doctors for personalized consultations in your regional language.',
      icon: <VideoIcon size={24} className="text-medical-600" />,
      path: '/virtual-consultation'
    },
    {
      title: 'Medicine Advisor',
      description: 'Receive automatic medicine recommendations for common ailments with dosage guidance.',
      icon: <PillIcon size={24} className="text-medical-600" />,
      path: '/medicine-advisor'
    },
    {
      title: 'Find a Booth',
      description: 'Locate the nearest Smart Health Booth in your area for immediate healthcare access.',
      icon: <Map size={24} className="text-medical-600" />,
      onClick: () => setShowLocator(true)
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-background to-accent/30">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <div className={`flex-1 max-w-2xl transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-sm font-medium mb-6">
                  <span className="h-2 w-2 rounded-full bg-healing-500 mr-2"></span>
                  <span>Rural Healthcare Innovation</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                  Smart Health Booths for <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-600 to-healing-600">
                    Rural Communities
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                  AI-integrated self-service healthcare available 24/7, bringing medical assistance closer to rural areas without requiring a full hospital.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/dashboard"
                    className="inline-flex items-center justify-center rounded-lg bg-medical-600 px-5 py-3 text-base font-medium text-white hover:bg-medical-700 focus:outline-none focus:ring-2 focus:ring-medical-600 focus:ring-offset-2 transition-colors"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    to="/health-checkup"
                    className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-3 text-base font-medium hover:bg-muted focus:outline-none focus:ring-2 focus:ring-medical-600 focus:ring-offset-2 transition-colors"
                  >
                    Try Health Checkup
                  </Link>
                </div>
              </div>
              <div className={`flex-1 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="relative">
                  <div className="absolute -top-10 -left-10 w-24 h-24 bg-medical-400/10 rounded-full filter blur-xl animate-pulse"></div>
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-healing-400/10 rounded-full filter blur-xl animate-pulse delay-700"></div>
                  <div className="relative bg-gradient-to-br from-medical-50 to-transparent border border-border rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src={boothImage} 
                      alt="Smart Health Booth" 
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-semibold mb-2">Smart Telehealth Booth</h3>
                      <p className="text-sm text-foreground/80">AI-integrated self-service healthcare for rural communities</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Key Features</h2>
              <p className="text-muted-foreground">
                Our Smart Health Booths provide comprehensive healthcare solutions for rural communities,
                addressing the challenges of limited healthcare access.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={feature.title}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  index={index}
                  onClick={feature.onClick || (feature.path ? () => window.location.href = feature.path : undefined)}
                />
              ))}
            </div>

            {/* Booth Locator Modal */}
            {showLocator && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm animate-fade-in">
                <div className="w-full max-w-2xl bg-card rounded-xl shadow-lg animate-fade-up overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <h3 className="text-lg font-semibold">Find a Smart Health Booth</h3>
                    <button 
                      onClick={() => setShowLocator(false)}
                      className="p-1 rounded-md hover:bg-muted transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <BoothLocator />
                  </div>
                  <div className="p-4 bg-muted/30 border-t border-border flex justify-end">
                    <button 
                      onClick={() => setShowLocator(false)}
                      className="px-4 py-2 bg-background border border-border rounded-md hover:bg-muted transition-colors text-sm font-medium"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground">
                Our Smart Health Booths provide a simple, four-step process to connect rural communities 
                with quality healthcare services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'Walk-in Access',
                  description: 'Villagers enter the Smart Health Booth at any time, eliminating long-distance travel and reducing waiting times.',
                  icon: <Map size={40} className="text-medical-600" />,
                  number: '01'
                },
                {
                  title: 'AI-Powered Health Checkups',
                  description: 'Built-in sensors monitor vital signs such as blood pressure, blood sugar, oxygen levels, and ECG.',
                  icon: <HeartPulse size={40} className="text-medical-600" />,
                  number: '02'
                },
                {
                  title: 'Holographic AI Doctor',
                  description: 'An AI-powered virtual doctor interacts via voice and text, providing guidance in regional languages.',
                  icon: <Brain size={40} className="text-medical-600" />,
                  number: '03'
                },
                {
                  title: 'Automated Medicine & Assistance',
                  description: 'The system dispenses basic medicines for common ailments and connects to remote doctors when needed.',
                  icon: <PillIcon size={40} className="text-medical-600" />,
                  number: '04'
                }
              ].map((step, index) => (
                <div key={step.number} className="relative group">
                  <div className="absolute -top-6 -left-6 text-6xl font-bold text-muted-foreground/10 transition-all duration-300 group-hover:text-medical-600/10">
                    {step.number}
                  </div>
                  <div className="relative z-10 bg-card rounded-xl p-6 border border-border h-full transition-all duration-300 group-hover:shadow-md">
                    <div className="p-3 bg-muted inline-block rounded-lg mb-4">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                    {index < 3 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 transform translate-x-1/2 -translate-y-1/2 z-20">
                        <ArrowRight className="text-medical-600" size={20} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="relative overflow-hidden bg-gradient-to-br from-medical-600 to-healing-600 rounded-2xl p-8 md:p-12">
              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white/10 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-white/10 rounded-full filter blur-3xl"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Ready to experience the future of rural healthcare?
                  </h2>
                  <p className="text-white/80 text-lg">
                    Try our Smart Health Booth technology today and see how it can transform healthcare access in your community.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/dashboard"
                    className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-base font-medium text-medical-600 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-medical-600 transition-colors"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    to="/health-checkup"
                    className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/10 px-5 py-3 text-base font-medium text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-medical-600 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
