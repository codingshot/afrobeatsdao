
import React from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Join = () => {
  return (
    <div className="min-h-screen bg-[#FEF7CD]">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-heading text-black mb-4">
                Join the Community
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Ready to be part of the Afrobeats movement? Fill out the form below to get started.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <iframe 
                src="https://potlock.notion.site/ebd/206c1f4ba97e8009a2dbefd5a7718324" 
                width="100%" 
                height="600" 
                frameBorder="0" 
                allowFullScreen 
                className="w-full"
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Join;
