import { EventsSection } from "@/components/EventsSection";
import { TeamSection } from "@/components/TeamSection";
import { MusicSection } from "@/components/MusicSection";
import { VibeOfTheDay, VIBE_VIDEOS } from "@/components/VibeOfTheDay";
import { DanceCarousel } from "@/components/DanceCarousel";
import { Footer } from "@/components/Footer";
import { ClubsSection } from "@/components/ClubsSection";
import { useGlobalAudioPlayer } from "@/components/GlobalAudioPlayer";
import { useEffect, useRef } from "react";
import { HeroSection } from "@/components/HeroSection";
import NewsTicker from "@/components/NewsTicker";
import MusicCarousel from "@/components/MusicCarousel";
import ArtistsCarousel from "@/components/ArtistsCarousel";
import { MiniGlobalMap } from "@/components/MiniGlobalMap";
import { Helmet } from "react-helmet";
import { SITE_ORIGIN, SITE_NAME, absoluteUrl, sanitizeSnippet, jsonLdGraph } from "@/lib/siteSeo";
const Index = () => {
  const { playNow, currentSong } = useGlobalAudioPlayer();
  const homeVibeBootstrapped = useRef(false);

  // Auto-play a random vibe once on the home page when nothing is queued from storage.
  useEffect(() => {
    if (homeVibeBootstrapped.current) return;
    const savedSong = localStorage.getItem("afrobeats_current_song");
    if (currentSong || savedSong) return;
    homeVibeBootstrapped.current = true;
    const randomIndex = Math.floor(Math.random() * VIBE_VIDEOS.length);
    const vibeVideoId = VIBE_VIDEOS[randomIndex];
    playNow({
      id: `vibe-${vibeVideoId}`,
      youtube: vibeVideoId,
    });
  }, [playNow, currentSong]);

  const homeDescription = sanitizeSnippet(
    "Afrobeats.party is a global home for African music and culture: artists, playlists, events, clubs, news, and dance curriculum.",
    158,
  );
  const homeOgImage = absoluteUrl("/AfrobeatsDAOMeta.png");
  const homeJsonLd = jsonLdGraph([
    {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_ORIGIN,
      description: homeDescription,
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_ORIGIN}/#organization` },
    },
    {
      "@id": `${SITE_ORIGIN}/#organization`,
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_ORIGIN,
      logo: homeOgImage,
    },
  ]);

  return (
    <div className="min-h-screen font-sans pb-[100px]">
      <Helmet>
        <title>{`${SITE_NAME} — African music, artists & culture`}</title>
        <meta name="description" content={homeDescription} />
        <link rel="canonical" href={SITE_ORIGIN} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${SITE_NAME} — African music & Afrobeats`} />
        <meta property="og:description" content={homeDescription} />
        <meta property="og:url" content={SITE_ORIGIN} />
        <meta property="og:image" content={homeOgImage} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${SITE_NAME} — African music & Afrobeats`} />
        <meta name="twitter:description" content={homeDescription} />
        <meta name="twitter:image" content={homeOgImage} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <script type="application/ld+json">{JSON.stringify(homeJsonLd)}</script>
      </Helmet>
      <HeroSection />
      <NewsTicker />
      <MusicCarousel />
      <EventsSection />
      <ClubsSection />
      <VibeOfTheDay />
      <MusicSection />
      <ArtistsCarousel />
      <DanceCarousel />
      <MiniGlobalMap />
      <TeamSection />
      <Footer />
    </div>
  );
};
export default Index;