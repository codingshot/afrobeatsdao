
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Home, Users, Calendar, Music, Disc3, Menu } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useDanceProgress } from "@/hooks/use-dance-progress";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const {
    getTotalProgress
  } = useDanceProgress();
  const progress = getTotalProgress();
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/AfrobeatsDAOMeta.png";
  };

  useEffect(() => {
    if (location.pathname === '/') {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        setIsVisible(scrollPosition > 100);
      };
      window.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setIsVisible(true);
    }
  }, [location.pathname]);

  const isRouteActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const onDancePage = location.pathname.startsWith('/dance');

  return <>
    <header className={`fixed top-0 w-full z-[9999] bg-[#FFD600] shadow-md font-heading transition-all duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/lovable-uploads/d20e3d94-ab2d-45a0-b2dd-9bb50e32753d.png" alt="Afrobeats Logo" className="h-12 w-auto" onError={handleImageError} />
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/dance">
                    <NavigationMenuLink className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-black/10 text-black hover:text-black", isRouteActive("/dance") && "bg-black/10")}>
                      <Disc3 className="mr-2 h-4 w-4" />
                      Dance
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/clubs">
                    <NavigationMenuLink className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-black/10 text-black hover:text-black", isRouteActive("/clubs") && "bg-black/10")}>
                      <Users className="mr-2 h-4 w-4" />
                      Clubs
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/events">
                    <NavigationMenuLink className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-black/10 text-black hover:text-black", isRouteActive("/events") && "bg-black/10")}>
                      <Calendar className="mr-2 h-4 w-4" />
                      Events
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/music">
                    <NavigationMenuLink className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-black/10 text-black hover:text-black", isRouteActive("/music") && "bg-black/10")}>
                      <Music className="mr-2 h-4 w-4" />
                      Music
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {onDancePage && <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/90 border-black/10 text-black hover:bg-white">
                  My Progress
                  {progress.started > 0 && <span className="ml-2 bg-[#008751] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {progress.started}
                    </span>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56 bg-white text-black border-black/10 z-[9999]">
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
          </div>}

          <div className="md:hidden flex items-center space-x-2">
            {onDancePage && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-white/90 border-black/10 text-black hover:bg-white text-xs px-2">
                    Progress {progress.started > 0 && <span className="ml-1">{progress.started}</span>}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white text-black border-black/10 z-[9999] mr-2">
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
            )}
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-black">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-[#FFD600] p-0 z-[9999]">
                <nav className="flex flex-col h-full">
                  <Link to="/dance" className={cn("flex items-center px-4 py-3 text-lg font-medium hover:bg-black/20 text-black", isRouteActive("/dance") && "bg-black/20")}>
                    <Disc3 className="mr-3 h-5 w-5" />
                    Dance
                  </Link>
                  <Link to="/clubs" className={cn("flex items-center px-4 py-3 text-lg font-medium hover:bg-black/20 text-black", isRouteActive("/clubs") && "bg-black/20")}>
                    <Users className="mr-3 h-5 w-5" />
                    Clubs
                  </Link>
                  <Link to="/events" className={cn("flex items-center px-4 py-3 text-lg font-medium hover:bg-black/20 text-black", isRouteActive("/events") && "bg-black/20")}>
                    <Calendar className="mr-3 h-5 w-5" />
                    Events
                  </Link>
                  <Link to="/music" className={cn("flex items-center px-4 py-3 text-lg font-medium hover:bg-black/20 text-black", isRouteActive("/music") && "bg-black/20")}>
                    <Music className="mr-3 h-5 w-5" />
                    Music
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  </>;
}
