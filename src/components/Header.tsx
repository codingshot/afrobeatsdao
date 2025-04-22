
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Always show navbar on dance page
    if (location.pathname.startsWith('/dance')) {
      setIsVisible(true);
      return;
    }

    // Original scroll-based logic for other pages
    const handleScroll = () => {
      const heroSection = document.querySelector('section');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsVisible(heroBottom <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <header className={`fixed top-0 w-full z-50 bg-[#FFD600] shadow-md font-heading transition-all duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-center">
        <a href="#" className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/d20e3d94-ab2d-45a0-b2dd-9bb50e32753d.png" 
            alt="Afrobeats Logo" 
            className="h-12 w-auto"
          />
        </a>
      </div>
    </header>
  );
}
