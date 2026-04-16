import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Music, Users, Calendar, Play, Search, Briefcase, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

const MainNavbar = ({ className }: { className?: string }) => {
  const location = useLocation();
  const navigate = useNavigate();
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
    const q = searchValue.trim();
    const enc = encodeURIComponent(q);

    if (location.pathname.includes("/clubs")) {
      navigate(`/clubs?search=${enc}`);
    } else if (location.pathname.includes("/dance")) {
      navigate(`/dance?search=${enc}`);
    } else if (location.pathname.includes("/events")) {
      navigate(`/events?search=${enc}`);
    } else if (location.pathname.includes("/news")) {
      navigate(`/news?search=${enc}`);
    } else {
      navigate(`/clubs?search=${enc}`);
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
          <form onSubmit={handleSearch} className="relative flex items-center" role="search">
            <label htmlFor="main-nav-search" className="sr-only">
              Search this section
            </label>
            <Input
              id="main-nav-search"
              type="search"
              enterKeyHint="search"
              placeholder="Search clubs, dance, events…"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-48 min-h-10 pl-8 h-10 bg-white border-0 focus-visible:ring-2 focus-visible:ring-[#008751] text-black"
            />
            <Search className="pointer-events-none absolute left-2 h-4 w-4 text-black" aria-hidden />
          </form>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/dance" aria-current={location.pathname.startsWith("/dance") ? "page" : undefined}>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-black/10 text-black hover:text-black",
                      location.pathname.startsWith("/dance") &&
                        "bg-black/10 text-black"
                    )}
                  >
                    <Play className="mr-2 h-4 w-4" aria-hidden />
                    Dance
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/events" aria-current={location.pathname.startsWith("/events") ? "page" : undefined}>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-black/10 text-black hover:text-black",
                      location.pathname.startsWith("/events") &&
                        "bg-black/10 text-black"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" aria-hidden />
                    Events
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/clubs" aria-current={location.pathname.startsWith("/clubs") ? "page" : undefined}>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-black/10 text-black hover:text-black",
                      location.pathname.startsWith("/clubs") &&
                        "bg-black/10 text-black"
                    )}
                  >
                    <Users className="mr-2 h-4 w-4" aria-hidden />
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
                  <ul className="grid w-[200px] gap-2 p-2 z-50 bg-white shadow-lg border border-gray-200">
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
              
              <NavigationMenuItem>
                <Link to="/news" aria-current={location.pathname.startsWith("/news") ? "page" : undefined}>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-black/10 text-black hover:text-black",
                      location.pathname.startsWith("/news") &&
                        "bg-black/10 text-black"
                    )}
                  >
                    <Newspaper className="mr-2 h-4 w-4" aria-hidden />
                    News
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/careers" aria-current={location.pathname.startsWith("/careers") ? "page" : undefined}>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-black/10 text-black hover:text-black",
                      location.pathname.startsWith("/careers") &&
                        "bg-black/10 text-black"
                    )}
                  >
                    <Briefcase className="mr-2 h-4 w-4" aria-hidden />
                    Careers
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="md:hidden flex items-center">
          <form onSubmit={handleSearch} className="relative mr-2" role="search">
            <label htmlFor="main-nav-search-mobile" className="sr-only">
              Search
            </label>
            <Input
              id="main-nav-search-mobile"
              type="search"
              enterKeyHint="search"
              placeholder="Search…"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-28 min-h-10 pl-7 h-10 text-xs bg-white/90 border-0 focus-visible:ring-2 focus-visible:ring-[#008751]"
            />
            <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-black" aria-hidden />
          </form>
          
          <Link
            to="/dance"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-black/10"
          >
            Dance
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
