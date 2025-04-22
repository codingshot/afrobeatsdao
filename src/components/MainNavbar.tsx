
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Music, Users, Calendar, Play, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

const MainNavbar = ({ className }: { className?: string }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const onIndexPage = location.pathname === "/";

  useEffect(() => {
    if (!onIndexPage) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [onIndexPage]);

  if (onIndexPage && !isScrolled) {
    return null;
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (location.pathname.includes('/clubs')) {
      window.location.href = `/clubs?search=${encodeURIComponent(searchValue)}`;
    } else if (location.pathname.includes('/dance')) {
      window.location.href = `/dance?search=${encodeURIComponent(searchValue)}`;
    } else if (location.pathname.includes('/events')) {
      window.location.href = `/events?search=${encodeURIComponent(searchValue)}`;
    } else {
      window.location.href = `/clubs?search=${encodeURIComponent(searchValue)}`;
    }
  };

  return (
    <div
      className={cn(
        "fixed top-0 w-full z-40 bg-[#FFD600] shadow-md transition-all duration-300 py-3",
        className
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/lovable-uploads/d20e3d94-ab2d-45a0-b2dd-9bb50e32753d.png"
            alt="Afrobeats Logo"
            className="h-10 w-auto"
          />
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <Input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-48 pl-8 h-9 bg-white/90 border-0 focus-visible:ring-1 focus-visible:ring-[#008751]"
            />
            <Search className="absolute left-2 h-4 w-4 text-black" />
          </form>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/dance">
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-black/10 text-black hover:text-black",
                      location.pathname.startsWith("/dance") &&
                        "bg-black/10 text-black"
                    )}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Dance
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/events">
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-black/10 text-black hover:text-black",
                      location.pathname.startsWith("/events") &&
                        "bg-black/10 text-black"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Events
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/clubs">
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-black/10 text-black hover:text-black",
                      location.pathname.startsWith("/clubs") &&
                        "bg-black/10 text-black"
                    )}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Clubs
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium text-black">
                  <Music className="mr-2 h-4 w-4" />
                  Music
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-2 p-2 z-50 bg-white">
                    <li>
                      <Link to="/#vibe">
                        <NavigationMenuLink
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-black/10 text-black hover:text-black"
                        >
                          Vibe of the Day
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#music">
                        <NavigationMenuLink
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-black/10 text-black hover:text-black"
                        >
                          Albums
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link to="/music">
                        <NavigationMenuLink
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-black/10 text-black hover:text-black"
                        >
                          Playlists
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="md:hidden flex items-center">
          <form onSubmit={handleSearch} className="relative mr-2">
            <Input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-28 pl-7 h-8 text-xs bg-white/90 border-0"
            />
            <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-black" />
          </form>
          
          <Link to="/dance" className="px-2 py-1 text-sm font-medium text-black">
            Dance
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;

