
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useDanceProgress } from "@/hooks/use-dance-progress";

export function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const { getTotalProgress } = useDanceProgress();
  const progress = getTotalProgress();
  const onIndexPage = location.pathname === "/";

  useEffect(() => {
    // Always show navbar on dance page
    if (location.pathname.startsWith('/dance')) {
      setIsVisible(true);
      return;
    }

    // Don't handle scroll-based visibility for home page
    // since MainNavbar will handle it
    if (onIndexPage) {
      setIsVisible(false);
      return;
    }

    // Original scroll-based logic for other pages
    const handleScroll = () => {
      const heroSection = document.querySelector('section');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsVisible(heroBottom <= 0);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, onIndexPage]);

  const onDancePage = location.pathname.startsWith('/dance');

  // Don't render anything on home page to avoid double navbar
  if (onIndexPage) {
    return null;
  }

  return (
    <header className={`fixed top-0 w-full z-30 bg-[#FFD600] shadow-md font-heading transition-all duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/d20e3d94-ab2d-45a0-b2dd-9bb50e32753d.png" 
            alt="Afrobeats Logo" 
            className="h-12 w-auto"
          />
        </Link>

        {/* Progress indicator for dance page */}
        {onDancePage && (
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/90 border-black/10 text-black hover:bg-white">
                  My Progress
                  {progress.started > 0 && (
                    <span className="ml-2 bg-[#008751] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {progress.started}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white text-black border-black/10 z-50">
                <div className="p-2 text-sm font-medium border-b border-black/10">
                  Your Dance Progress
                </div>
                <div className="p-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Started:</span>
                    <span>{progress.started}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Completed:</span>
                    <span>{progress.completed}</span>
                  </div>
                </div>
                <DropdownMenuItem asChild>
                  <Link to="/dance" className="cursor-pointer">
                    View All Dances
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  );
}
