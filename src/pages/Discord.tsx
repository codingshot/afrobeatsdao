
import React from 'react';
import { Twitter, MessageCircle, Linkedin } from "lucide-react";
import { Footer } from '@/components/Footer';

const Discord = () => {
  return (
    <div className="min-h-screen bg-[#1e1f22] text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-heading text-center mb-8 text-[#FFD600]">Join Our Discord Community</h1>
        
        <div className="flex flex-col items-center mb-16">
          <p className="text-lg mb-8 text-center max-w-xl">
            Connect with Afrobeats enthusiasts, dancers, and music lovers in our vibrant Discord community.
          </p>
          
          <div className="bg-[#2b2d31] p-6 rounded-lg shadow-lg mb-8">
            <iframe 
              src="https://discord.com/widget?id=1293855849151725588&theme=dark" 
              width="350" 
              height="500" 
              allowTransparency={true} 
              frameBorder="0" 
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              className="mx-auto"
              title="Discord Server Widget"
            />
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-heading text-center mb-6 text-[#FFD600]">Follow Us On Social Media</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <a 
              href="https://x.com/afrobeatsdao" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center p-4 bg-[#2b2d31] rounded-lg hover:bg-[#3a3d42] transition-all"
            >
              <Twitter className="h-10 w-10 mb-2 text-[#FFD600]" />
              <span className="font-medium">Twitter</span>
              <span className="text-sm text-gray-400">@afrobeatsdao</span>
            </a>
            
            <a 
              href="https://t.me/afrobeats_party" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center p-4 bg-[#2b2d31] rounded-lg hover:bg-[#3a3d42] transition-all"
            >
              <MessageCircle className="h-10 w-10 mb-2 text-[#FFD600]" />
              <span className="font-medium">Telegram</span>
              <span className="text-sm text-gray-400">afrobeats_party</span>
            </a>
            
            <a 
              href="https://linkedin.com/company/afrobeats" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 bg-[#2b2d31] rounded-lg hover:bg-[#3a3d42] transition-all"
            >
              <Linkedin className="h-10 w-10 mb-2 text-[#FFD600]" />
              <span className="font-medium">LinkedIn</span>
              <span className="text-sm text-gray-400">afrobeats</span>
            </a>
          </div>
          
          {/* Discord link */}
          <div className="mt-6 text-center">
            <a 
              href="https://discord.gg/TNrWwSA955" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 text-[#FFD600] hover:underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3847-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
              </svg>
              <span>Join our server directly</span>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default Discord;
