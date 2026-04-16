
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Users, Calendar, Music, Disc3, Menu, UserRound } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useDanceProgress } from "@/hooks/use-dance-progress";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { danceCurriculum } from "@/data/dance-curriculum";

const CURRICULUM_TOTAL =
  danceCurriculum.afrobeats.length + danceCurriculum.amapiano.length;

function ProgressMenuPanel({
  started,
  completed,
  onNavigate,
}: {
  started: number;
  completed: number;
  onNavigate?: () => void;
}) {
  const completionPct =
    CURRICULUM_TOTAL > 0
      ? Math.min(100, Math.round((completed / CURRICULUM_TOTAL) * 100))
      : 0;

  return (
    <>
      <div className="px-3 pt-3 pb-2 rounded-t-md bg-gradient-to-r from-[#008751] to-emerald-700 text-white">
        <p className="text-xs font-medium uppercase tracking-wide text-white/90">Learning</p>
        <p className="text-sm font-heading font-semibold">Your progress</p>
      </div>
      <div className="p-3 space-y-3">
        <div
          className="relative h-2 overflow-hidden rounded-full bg-black/10"
          role="progressbar"
          aria-valuenow={completionPct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-white/90 transition-all duration-500 ease-out"
            style={{ width: `${completionPct}%` }}
          />
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-lg bg-black/[0.04] px-3 py-2 border border-black/5">
            <p className="text-[11px] font-medium uppercase tracking-wide text-black/50">In progress</p>
            <p className="text-lg font-heading font-bold text-black tabular-nums">{started}</p>
          </div>
          <div className="rounded-lg bg-black/[0.04] px-3 py-2 border border-black/5">
            <p className="text-[11px] font-medium uppercase tracking-wide text-black/50">Completed</p>
            <p className="text-lg font-heading font-bold text-black tabular-nums">{completed}</p>
          </div>
        </div>
        <p className="text-xs text-black/55 leading-snug">
          {CURRICULUM_TOTAL} dances in the curriculum — keep going!
        </p>
      </div>
      <DropdownMenuSeparator className="bg-black/10" />
      <DropdownMenuItem asChild className="cursor-pointer focus:bg-[#008751]/10">
        <Link to="/dance" className="font-medium" onClick={onNavigate}>
          Browse dance curriculum
        </Link>
      </DropdownMenuItem>
    </>
  );
}

function ProfileProgressTrigger({
  startedCount,
  className,
}: {
  startedCount: number;
  className?: string;
}) {
  return (
    <DropdownMenuTrigger asChild>
      <button
        type="button"
        className={cn(
          "relative group rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFD600]",
          className
        )}
        aria-label="Open your dance progress"
      >
        <span
          className={cn(
            "absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            "bg-gradient-to-br from-[#008751]/25 to-emerald-600/20 blur-[2px] scale-110"
          )}
          aria-hidden
        />
        <Avatar className="relative h-10 w-10 border-2 border-black/20 bg-white shadow-md transition-all duration-200 group-hover:border-black/35 group-hover:shadow-lg sm:h-11 sm:w-11">
          <AvatarFallback className="bg-gradient-to-br from-[#008751] to-emerald-900 text-white">
            <UserRound className="h-[42%] w-[42%] sm:h-5 sm:w-5" strokeWidth={2} />
          </AvatarFallback>
        </Avatar>
        {startedCount > 0 && (
          <span
            className="absolute -right-0.5 -top-0.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-[#008751] px-1 text-[10px] font-bold leading-none text-white shadow-sm ring-2 ring-[#FFD600]"
            aria-hidden
          >
            {startedCount > 9 ? "9+" : startedCount}
          </span>
        )}
      </button>
    </DropdownMenuTrigger>
  );
}

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { getTotalProgress } = useDanceProgress();
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

  return <>
    <header className={`fixed top-0 w-full z-[9999] bg-[#FFD600] shadow-md font-heading transition-all duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="container mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link to="/" className="flex shrink-0 items-center space-x-2">
            <img src="/lovable-uploads/d20e3d94-ab2d-45a0-b2dd-9bb50e32753d.png" alt="Afrobeats Logo" className="h-10 w-auto sm:h-12" onError={handleImageError} />
          </Link>

          <nav className="hidden min-w-0 flex-1 justify-center md:flex">
            <NavigationMenu>
              <NavigationMenuList className="flex-wrap justify-center gap-0">
                <NavigationMenuItem>
                  <Link to="/dance">
                    <NavigationMenuLink className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md px-3 lg:px-4 py-2 text-sm font-medium transition-colors hover:bg-black/10 text-black hover:text-black", isRouteActive("/dance") && "bg-black/10")}>
                      <Disc3 className="mr-2 h-4 w-4 shrink-0" />
                      Dance
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/clubs">
                    <NavigationMenuLink className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md px-3 lg:px-4 py-2 text-sm font-medium transition-colors hover:bg-black/10 text-black hover:text-black", isRouteActive("/clubs") && "bg-black/10")}>
                      <Users className="mr-2 h-4 w-4 shrink-0" />
                      Clubs
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/events">
                    <NavigationMenuLink className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md px-3 lg:px-4 py-2 text-sm font-medium transition-colors hover:bg-black/10 text-black hover:text-black", isRouteActive("/events") && "bg-black/10")}>
                      <Calendar className="mr-2 h-4 w-4 shrink-0" />
                      Events
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/music">
                    <NavigationMenuLink className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md px-3 lg:px-4 py-2 text-sm font-medium transition-colors hover:bg-black/10 text-black hover:text-black", isRouteActive("/music") && "bg-black/10")}>
                      <Music className="mr-2 h-4 w-4 shrink-0" />
                      Music
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
            <DropdownMenu>
              <ProfileProgressTrigger startedCount={progress.started} />
              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-72 overflow-hidden rounded-xl border border-black/10 bg-white p-0 text-black shadow-xl z-[10000]"
              >
                <ProgressMenuPanel started={progress.started} completed={progress.completed} />
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-black hover:bg-black/10 h-10 w-10">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[min(100vw,320px)] border-l border-black/10 bg-[#FFD600] p-0 z-[10000]">
                  <nav className="flex flex-col">
                    <Link
                      to="/dance"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn("flex items-center px-4 py-3.5 text-base font-medium text-black hover:bg-black/10 border-b border-black/10", isRouteActive("/dance") && "bg-black/10")}
                    >
                      <Disc3 className="mr-3 h-5 w-5 shrink-0" />
                      Dance
                    </Link>
                    <Link
                      to="/clubs"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn("flex items-center px-4 py-3.5 text-base font-medium text-black hover:bg-black/10 border-b border-black/10", isRouteActive("/clubs") && "bg-black/10")}
                    >
                      <Users className="mr-3 h-5 w-5 shrink-0" />
                      Clubs
                    </Link>
                    <Link
                      to="/events"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn("flex items-center px-4 py-3.5 text-base font-medium text-black hover:bg-black/10 border-b border-black/10", isRouteActive("/events") && "bg-black/10")}
                    >
                      <Calendar className="mr-3 h-5 w-5 shrink-0" />
                      Events
                    </Link>
                    <Link
                      to="/music"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn("flex items-center px-4 py-3.5 text-base font-medium text-black hover:bg-black/10", isRouteActive("/music") && "bg-black/10")}
                    >
                      <Music className="mr-3 h-5 w-5 shrink-0" />
                      Music
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  </>;
}
