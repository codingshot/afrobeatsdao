
import React from 'react';
import { Helmet } from 'react-helmet';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const ArtistJoin = () => {
  return (
    <>
      <Helmet>
        <title>Get Signed - Afrobeats DAO | Artist Record Label</title>
        <meta name="description" content="Join the biggest Afrobeats Artists aligned record label in the world. Get signed with Afrobeats DAO - More opportunities, don't get 360'd." />
        <meta name="keywords" content="afrobeats record label, get signed, artist opportunities, music label, afrobeats dao, artist signup" />
        <meta property="og:title" content="Get Signed - Afrobeats DAO | Artist Record Label" />
        <meta property="og:description" content="Join the biggest Afrobeats Artists aligned record label in the world. Get signed with Afrobeats DAO - More opportunities, don't get 360'd." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://afrobeatsdao.org/artist-join" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Get Signed - Afrobeats DAO | Artist Record Label" />
        <meta name="twitter:description" content="Join the biggest Afrobeats Artists aligned record label in the world. Get signed with Afrobeats DAO - More opportunities, don't get 360'd." />
        <link rel="canonical" href="https://afrobeatsdao.org/artist-join" />
      </Helmet>
      
      <div className="min-h-screen bg-[#FEF7CD]">
        <Header />
        
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-heading text-black mb-4">
                  Get Signed with Afrobeats DAO
                </h1>
                <p className="text-lg text-gray-700 mb-8">
                  Join the biggest Afrobeats Artists aligned record label in the world. More opportunities, don't get 360'd.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <iframe 
                  src="https://potlock.notion.site/ebd/230c1f4ba97e80c591efee2ce8d12433" 
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
    </>
  );
};

export default ArtistJoin;
