
import { Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#264653] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-4xl">🪘</span>
              <span className="text-2xl font-bold">Afrobeats.party</span>
            </div>
          </div>
          
          <div className="flex gap-6 items-center">
            <a 
              href="https://x.com/afrobeatsdao" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#FFD700] transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span>Twitter 🐦</span>
            </a>
            
            <a 
              href="https://discord.com/invite/55EGdbyh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-afro-gold transition-colors"
            >
              <span>Discord 🗣️</span>
            </a>
            
            <a 
              href="mailto:contact@afrobeats.party" 
              className="flex items-center gap-2 hover:text-afro-gold transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>Contact ✉️</span>
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="order-2 md:order-1 text-center md:text-left text-sm mt-4 md:mt-0">
              <p>© 2025 Afrobeats DAO 🪘. All rights reserved.</p>
            </div>
            
            <div className="order-1 md:order-2 flex flex-wrap justify-center gap-x-8 gap-y-2">
              <a href="#" className="text-sm hover:text-[#FFD700] transition-colors">
                Privacy Policy 📜
              </a>
              <a href="#" className="text-sm hover:text-[#FFD700] transition-colors">
                Terms of Service 📝
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
