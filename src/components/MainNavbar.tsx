
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Music, Users, Calendar, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const MainNavbar = ({ className }: { className?: string }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const onIndexPage = location.pathname === "/";

  useEffect(() => {
    // Only apply scroll effect on index page
    if (!onIndexPage) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onIndexPage]);

  // Don't render if on index page and not scrolled
  if (onIndexPage && !isScrolled) {
    return null;
  }

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

        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/dance">
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/50 hover:text-accent-foreground",
                      location.pathname.startsWith("/dance") &&
                        "bg-accent/50 text-accent-foreground"
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
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/50 hover:text-accent-foreground",
                      location.pathname.startsWith("/events") &&
                        "bg-accent/50 text-accent-foreground"
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
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/50 hover:text-accent-foreground",
                      location.pathname.startsWith("/clubs") &&
                        "bg-accent/50 text-accent-foreground"
                    )}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Clubs
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium">
                  <Music className="mr-2 h-4 w-4" />
                  Music
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-2 p-2">
                    <li>
                      <Link to="/#vibe">
                        <NavigationMenuLink
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          Vibe of the Day
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link to="/#music">
                        <NavigationMenuLink
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          Albums
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link to="/playlists">
                        <NavigationMenuLink
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
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

        {/* Mobile menu - hamburger icon would go here */}
        <div className="md:hidden">
          {/* Implement mobile dropdown in future iteration */}
          <Link to="/dance" className="px-3 py-2 text-sm font-medium">
            Dance
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
