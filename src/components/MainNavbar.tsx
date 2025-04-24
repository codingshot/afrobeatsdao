
import { useEffect, useState } from 'react';
import { Link, useMatch } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useDanceProgress } from '@/hooks/use-dance-progress';
import { useIsMobile } from '@/hooks/use-mobile';

export function MainNavbar() {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const { getTotalProgress } = useDanceProgress();
  const danceMatch = useMatch("/dance/*");
  const progressData = danceMatch ? getTotalProgress() : { total: 0, started: 0, completed: 0 };
  // Calculate percentage manually since it's not returned directly
  const progress = danceMatch ? ((progressData.completed / progressData.total) * 100) || 0 : 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/music', label: 'Music' },
    { href: '/dance', label: 'Dance' },
    { href: '/clubs', label: 'Clubs' },
    { href: '/events', label: 'Events' }
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-200 py-2',
        isScrolled ? 'bg-black/90 backdrop-blur-lg shadow-md' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/afrobeatsdaologo.png"
              alt="Afrobeats DAO"
              className="h-12 mr-2"
            />
            <span className="text-black font-heading font-bold text-xl hidden sm:block">
              Afrobeats DAO
            </span>
          </Link>

          {/* Mobile: Progress indicator and menu button */}
          <div className="flex items-center gap-4 sm:hidden">
            {danceMatch && progress > 0 && (
              <div className="flex items-center">
                <div className="bg-afro-yellow h-2 rounded-full overflow-hidden w-24">
                  <div
                    className="bg-[#008751] h-full rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="text-white text-xs ml-2">
                  {Math.round(progress)}%
                </span>
              </div>
            )}
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-black">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black text-white">
                <nav className="flex flex-col gap-4 mt-8">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="text-xl font-heading font-bold py-2 hover:text-afro-yellow transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden sm:flex items-center space-x-6">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-black hover:text-afro-yellow font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
