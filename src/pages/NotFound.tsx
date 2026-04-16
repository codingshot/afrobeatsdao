import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Home, Music, Users, Calendar } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#FFD600]/40 to-white px-4 py-16">
      <Helmet>
        <title>Page not found — Afrobeats DAO</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div
        className="w-full max-w-lg rounded-2xl border border-black/10 bg-white p-8 text-center shadow-xl"
        role="status"
        aria-live="polite"
      >
        <p className="text-sm font-medium uppercase tracking-wide text-[#008751]">Error 404</p>
        <h1 className="mt-2 font-heading text-4xl font-bold text-black">Page not found</h1>
        <p className="mt-3 text-base text-black/70">
          We couldn&apos;t find <span className="font-mono text-sm break-all text-black/90">{location.pathname}</span>.
          Try one of these destinations instead.
        </p>
        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button asChild className="bg-[#008751] text-white hover:bg-[#008751]/90">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-black/20">
            <Link to="/dance">
              <Music className="mr-2 h-4 w-4" />
              Dance
            </Link>
          </Button>
        </div>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button asChild variant="ghost" className="text-black/80">
            <Link to="/clubs">
              <Users className="mr-2 h-4 w-4" />
              Clubs
            </Link>
          </Button>
          <Button asChild variant="ghost" className="text-black/80">
            <Link to="/events">
              <Calendar className="mr-2 h-4 w-4" />
              Events
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
