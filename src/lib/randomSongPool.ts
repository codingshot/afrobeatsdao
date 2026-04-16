import { ARTISTS } from "@/data/artists";
import { danceCurriculum } from "@/data/dance-curriculum";
import { getYoutubeVideoId } from "@/lib/youtubeVideoId";

/** Shape matches `Song` in GlobalAudioPlayer (youtube may be bare id after normalization). */
export type PoolSong = {
  id: string;
  youtube: string;
  title?: string;
  artist?: string;
};

export function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** All unique YouTube-backed tracks from dance curriculum + artist pages (for random queue). */
export function collectRandomPlayableSongs(): PoolSong[] {
  const seenVideoIds = new Set<string>();
  const out: PoolSong[] = [];

  const push = (song: PoolSong) => {
    const vid = getYoutubeVideoId(song.youtube).trim();
    if (!vid || vid.length < 6) return;
    if (seenVideoIds.has(vid)) return;
    seenVideoIds.add(vid);
    out.push({
      ...song,
      youtube: vid,
    });
  };

  (Object.keys(danceCurriculum) as (keyof typeof danceCurriculum)[]).forEach((genre) => {
    danceCurriculum[genre].forEach((dance) => {
      dance.songs?.forEach((s) => {
        if (!s.youtube) return;
        push({
          id: `dance-${dance.id}-${s.title}`,
          youtube: s.youtube,
          title: s.title,
          artist: s.artist,
        });
      });
    });
  });

  ARTISTS.forEach((artist) => {
    artist.top_songs?.forEach((s) => {
      if (!s.youtube) return;
      push({
        id: `artist-${artist.id}-${s.title}`,
        youtube: s.youtube,
        title: s.title,
        artist: artist.name,
      });
    });
  });

  return out;
}
