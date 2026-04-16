
import React from 'react';
import { Helmet } from 'react-helmet';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_ORIGIN, SITE_NAME, absoluteUrl, sanitizeSnippet } from '@/lib/siteSeo';

const Join = () => {
  const joinUrl = `${SITE_ORIGIN}/join`;
  const joinDesc = sanitizeSnippet(
    'Join the Afrobeats.party community: connect with artists, fans, and builders shaping African music culture worldwide.',
  );
  const joinOg = absoluteUrl('/AfrobeatsDAOMeta.png');

  return (
    <div className="min-h-screen bg-[#FEF7CD]">
      <Helmet>
        <title>{`Join the community | ${SITE_NAME}`}</title>
        <meta name="description" content={joinDesc} />
        <link rel="canonical" href={joinUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Join the community | ${SITE_NAME}`} />
        <meta property="og:description" content={joinDesc} />
        <meta property="og:url" content={joinUrl} />
        <meta property="og:image" content={joinOg} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Join the community | ${SITE_NAME}`} />
        <meta name="twitter:description" content={joinDesc} />
        <meta name="twitter:image" content={joinOg} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
      </Helmet>
      <Header />
      
      <div className="pt-20 pb-16">
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
                title="Afrobeats DAO community join form"
                name="afrobeats-join-form"
                src="https://potlock.notion.site/ebd/206c1f4ba97e8009a2dbefd5a7718324" 
                width="100%" 
                height="600" 
                frameBorder="0" 
                allowFullScreen 
                loading="lazy"
                className="min-h-[70vh] w-full"
              />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Join;
