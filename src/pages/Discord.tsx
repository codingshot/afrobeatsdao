
import React from "react";
import { Footer } from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Facebook, Github, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

const Discord = () => {
  const socialLinks = [
    { name: "Instagram", icon: <Instagram className="h-5 w-5" />, url: "https://www.instagram.com/afrobeatsdao/" },
    { name: "Twitter", icon: <Twitter className="h-5 w-5" />, url: "https://twitter.com/AfrobeatsDAO" },
    { name: "Facebook", icon: <Facebook className="h-5 w-5" />, url: "https://facebook.com/afrobeatsdao" },
    { name: "YouTube", icon: <Youtube className="h-5 w-5" />, url: "https://youtube.com/afrobeatsdao" },
    { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, url: "https://linkedin.com/company/afrobeatsdao" },
    { name: "GitHub", icon: <Github className="h-5 w-5" />, url: "https://github.com/afrobeatsdao" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-24 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-[#FFD600]">Join Our Discord Community</h1>
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 flex justify-center">
            <iframe 
              src="https://discord.com/widget?id=1293855849151725588&theme=dark" 
              width="350" 
              height="500" 
              allowTransparency={true} 
              frameBorder="0" 
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" 
              className="rounded border border-gray-700"
              title="AfrobeatsDAO Discord Server"
            />
          </div>
          
          <div className="flex-1 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-[#FFD600]">Why Join Our Discord?</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>Connect with Afrobeats fans from around the world</li>
                <li>Learn about upcoming events and exclusive opportunities</li>
                <li>Share music recommendations with the community</li>
                <li>Get updates on new dance tutorials and performances</li>
                <li>Participate in discussions about Afrobeats culture</li>
              </ul>
            </div>
            
            <Separator className="my-8" />
            
            <div>
              <h2 className="text-2xl font-bold mb-4 text-[#FFD600]">Follow Us Elsewhere</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-md hover:bg-gray-800 transition-colors"
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Discord;
