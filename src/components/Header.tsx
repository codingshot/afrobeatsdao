import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Users, 
  Calendar, 
  Music, 
  Disc3 
} from "lucide-react";
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
    if (location.pathname.startsWith('/dance')) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const onDancePage = location.pathname.startsWith('/dance');

  return (
    <header className={`fixed top-0 w-full z-40 bg-[#FFD600] shadow-md font-heading transition-all duration-300 ${
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

        <div className="hidden md:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/50 hover:text-accent-foreground",
                      location.pathname === "/" && "bg-accent/50 text-accent-foreground"
                    )}
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/dance">
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/50 hover:text-accent-foreground",
                      location.pathname.startsWith("/dance") && "bg-accent/50 text-accent-foreground"
                    )}
                  >
                    <Disc3 className="mr-2 h-4 w-4" />
                    Dance
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/clubs">
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/50 hover:text-accent-foreground",
                      location.pathname.startsWith("/clubs") && "bg-accent/50 text-accent-foreground"
                    )}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Clubs
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/events">
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/50 hover:text-accent-foreground",
                      location.pathname.startsWith("/events") && "bg-accent/50 text-accent-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Events
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/playlists">
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/50 hover:text-accent-foreground",
                      location.pathname.startsWith("/playlists") && "bg-accent/50 text-accent-foreground"
                    )}
                  >
                    <Music className="mr-2 h-4 w-4" />
                    Music
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

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
              <DropdownMenuContent align="end" className="w-56 bg-white text-black border-black/10">
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

        <div className="md:hidden flex items-center space-x-2">
          <Link to="/dance" className="px-2 py-1 text-sm font-medium">
            <Disc3 className="h-5 w-5" />
          </Link>
          <Link to="/clubs" className="px-2 py-1 text-sm font-medium">
            <Users className="h-5 w-5" />
          </Link>
          <Link to="/events" className="px-2 py-1 text-sm font-medium">
            <Calendar className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
