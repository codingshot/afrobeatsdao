export interface Song {
  title: string;
  youtube: string;
}

export interface Artist {
  id: string;
  name: string;
  website: string | null;
  image: string;
  instagram?: string | null;
  twitter?: string | null;
  spotify?: string | null;
  youtube?: string | null;
  soundcloud?: string | null;
  tiktok?: string | null;
  facebook?: string | null;
  linkedin?: string | null;
  top_songs: Song[];
}

export const ARTISTS: Artist[] = [
  {
    id: "burna-boy",
    name: "Burna Boy",
    website: "http://www.onaspaceship.com",
    image: "/images/artists/burnaboy.jpg",
    instagram: "https://www.instagram.com/burnaboygram/",
    twitter: "https://x.com/burnaboy",
    spotify: null,
    youtube: null,
    soundcloud: null,
    tiktok: null,
    facebook: null,
    linkedin: null,
    top_songs: [
      {
        title: "Last Last",
        youtube: "https://www.youtube.com/watch?v=421w1j87fEM"
      },
      {
        title: "City Boys",
        youtube: "https://www.youtube.com/watch?v=hLDQ88vAhIs"
      },
      {
        title: "Ye",
        youtube: "https://www.youtube.com/watch?v=lPe09eE6Xio"
      },
      {
        title: "Sittin' On Top Of The World",
        youtube: "https://www.youtube.com/watch?v=QzP6YlS9Q6E"
      }
    ]
  },
  {
    id: "asake",
    name: "Asake",
    website: null,
    image: "https://guardian.ng/wp-content/uploads/2023/06/Asake-1.jpg",
    top_songs: [
      {
        title: "Sungba",
        youtube: "https://www.youtube.com/watch?v=5OeR5XBEahU"
      },
      {
        title: "Peace Be Unto You (PBUY)",
        youtube: "https://www.youtube.com/watch?v=K2vW3J1Q2wQ"
      }
    ]
  },
  {
    id: "focalistic",
    name: "Focalistic",
    website: null,
    image: "https://i1.sndcdn.com/artworks-6t7w5fM9y5vK-0-t500x500.jpg",
    top_songs: [
      {
        title: "Ke Star",
        youtube: "https://www.youtube.com/watch?v=Q3h9gIDeB9A"
      },
      {
        title: "Champion Sound (with Davido)",
        youtube: "https://www.youtube.com/watch?v=1VtQ7r1eC9A"
      }
    ]
  },
  {
    id: "davido",
    name: "Davido",
    website: "https://www.iamdavido.com",
    image: "https://notcommon.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fnotcommon%2Fimage%2Fupload%2Fv1703779727%2Fprofiles%2Fdavido.jpg&w=384&q=75",
    top_songs: [
      {
        title: "Fall",
        youtube: "https://www.youtube.com/watch?v=84RxK4N1wfE"
      },
      {
        title: "Unavailable",
        youtube: "https://www.youtube.com/watch?v=J8wB3Y4h5Qk"
      }
    ]
  },
  {
    id: "wizkid",
    name: "Wizkid",
    website: null,
    image: "https://media.gettyimages.com/id/1687572456/photo/ayodeji-ibrahim-balogun-aka-wizkid-is-seen-at-gucci-ancora-during-milan-fashion-week-on.jpg?s=612x612&w=0&k=20&c=Q3ZQv9F2V7y2Q6K1Tn3i8pK8iZb5l7Q5Yy9K7K7h9qg1U=",
    top_songs: [
      {
        title: "Essence (feat. Tems)",
        youtube: "https://www.youtube.com/watch?v=Q7QiLceJSLQ"
      },
      {
        title: "Ojuelegba",
        youtube: "https://www.youtube.com/watch?v=Q7QiLceJSLQ"
      }
    ]
  },
  {
    id: "j-hus",
    name: "J Hus",
    website: null,
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/J_Hus_%28cropped%29.jpg",
    top_songs: [
      {
        title: "Did You See",
        youtube: "https://www.youtube.com/watch?v=6r8pZL0H3zI"
      },
      {
        title: "Spirit",
        youtube: "https://www.youtube.com/watch?v=6r8pZL0H3zI"
      }
    ]
  },
  {
    id: "nsg",
    name: "NSG",
    website: null,
    image: "https://i1.sndcdn.com/artworks-000487292324-2v4k0e-t500x500.jpg",
    top_songs: [
      {
        title: "Options (feat. Tion Wayne)",
        youtube: "https://www.youtube.com/watch?v=Q7QiLceJSLQ"
      },
      {
        title: "OT Bop",
        youtube: "https://www.youtube.com/watch?v=Q7QiLceJSLQ"
      }
    ]
  },
  {
    id: "yxng-bane",
    name: "Yxng Bane",
    website: null,
    image: "https://i1.sndcdn.com/artworks-000271593962-1d6w3g-t500x500.jpg",
    top_songs: [
      {
        title: "Rihanna",
        youtube: "https://www.youtube.com/watch?v=Q7QiLceJSLQ"
      },
      {
        title: "Fine Wine",
        youtube: "https://www.youtube.com/watch?v=Q7QiLceJSLQ"
      }
    ]
  },
  {
    id: "b-young",
    name: "B Young",
    website: null,
    image: "https://i1.sndcdn.com/artworks-000353889944-1w3wq0-t500x500.jpg",
    top_songs: [
      {
        title: "Jumanji",
        youtube: "https://www.youtube.com/watch?v=Q7QiLceJSLQ"
      },
      {
        title: "079ME",
        youtube: "https://www.youtube.com/watch?v=Q7QiLceJSLQ"
      }
    ]
  },
  {
    id: "ziezie",
    name: "ZieZie",
    website: null,
    image: "https://i1.sndcdn.com/artworks-000401934743-7x4w5g-t500x500.jpg",
    top_songs: [
      {
        title: "Fine Girl",
        youtube: "https://www.youtube.com/watch?v=Q7QiLceJSLQ"
      },
      {
        title: "Sensei",
        youtube: "https://www.youtube.com/watch?v=Q7QiLceJSLQ"
      }
    ]
  },
  {
    id: "young-t-bugsey",
    name: "Young T & Bugsey",
    website: null,
    image: "https://i1.sndcdn.com/artworks-000653139149-6o5k7w-t500x500.jpg",
    top_songs: [
      {
        title: "Don't Rush (feat. Headie One)",
        youtube: "https://www.youtube.com/watch?v=Q7QiLceJSLQ"
      },
      {
        title: "Strike a Pose",
        youtube: "https://www.youtube.com/watch?v=Q7QiLceJSLQ"
      }
    ]
  },
  {
    id: "not3s",
    name: "Not3s",
    website: null,
    image: "https://i1.sndcdn.com/artworks-000274448081-2nq8e8-t500x500.jpg",
    top_songs: [
      {
        title: "My Lover",
        youtube: "https://www.youtube.com/watch?v=Q7QiLceJSLQ"
      },
      {
        title: "Addison Lee",
        youtube: "https://www.youtube.com/watch?v=Q7QiLceJSLQ"
      }
    ]
  },
  {
    id: "darkoo",
    name: "Darkoo",
    website: null,
    image: "https://i1.sndcdn.com/artworks-000626253203-8k1g2w-t500x500.jpg",
    top_songs: [
      {
        title: "Gangsta",
        youtube: "https://www.youtube.com/watch?v=Q7QiLceJSLQ"
      },
      {
        title: "Juicy (feat. Hardy Caprio)",
        youtube: "https://www.youtube.com/watch?v=Q7QiLceJSLQ"
      }
    ]
  },
  {
    id: "kojo-funds",
    name: "Kojo Funds",
    website: null,
    image: "https://i1.sndcdn.com/artworks-000239836211-4j3k2q-t500x500.jpg",
    top_songs: [
      {
        title: "Dun Talkin",
        youtube: "https://www.youtube.com/watch?v=Q7QiLceJSLQ"
      },
      {
        title: "Check",
        youtube: "https://www.youtube.com/watch?v=Q7QiLceJSLQ"
      }
    ]
  },
  {
    id: "ayo-maff",
    name: "Ayo Maff",
    website: null,
    image: "https://static.turntablecharts.com/images/artists/ayo-maff.jpg",
    top_songs: [
      {
        title: "Dealer (feat. Fireboy DML)",
        youtube: "https://www.youtube.com/watch?v=Q7QiLceJSLQ"
      },
      {
        title: "Are You There?",
        youtube: "https://www.youtube.com/watch?v=Q7QiLceJSLQ"
      }
    ]
  },
  {
    id: "qing-madi",
    name: "Qing Madi",
    website: null,
    image: "https://static.turntablecharts.com/images/artists/qing-madi.jpg",
    top_songs: [
      {
        title: "See Finish",
        youtube: "https://www.youtube.com/watch?v=Q7QiLceJSLQ"
      },
      {
        title: "Ole (feat. BNXN)",
        youtube: "https://www.youtube.com/watch?v=Q7QiLceJSLQ"
      }
    ]
  },
  {
    id: "llona",
    name: "Llona",
    website: null,
    image: "https://static.turntablecharts.com/images/artists/llona.jpg",
    top_songs: [
      {
        title: "HBP",
        youtube: "https://www.youtube.com/watch?v=Q7QiLceJSLQ"
      },
      {
        title: "HBP (Remix) feat. Bella Shmurda",
        youtube: "https://www.youtube.com/watch?v=Q7QiLceJSLQ"
      }
    ]
  },
  {
    id: "bnxn",
    name: "BNXN (fka Buju)",
    website: "https://www.instagram.com/toyourears",
    image: "https://pbs.twimg.com/profile_images/1705191361895102464/9n3v1rVw_400x400.jpg",
    top_songs: [
      {
        title: "Finesse (with Pheelz)",
        youtube: "https://www.youtube.com/watch?v=J-2pQnKtmKQ"
      },
      {
        title: "Gwagwalada (feat. Kizz Daniel & Seyi Vibez)",
        youtube: "https://www.youtube.com/watch?v=QpKfS7z3Z5o"
      }
    ]
  },
  {
    id: "seyi-vibez",
    name: "Seyi Vibez",
    website: "https://www.instagram.com/seyi_vibez",
    image: "https://pbs.twimg.com/profile_images/1720457235248576512/4Q5v5Qxk_400x400.jpg",
    top_songs: [
      {
        title: "Chance (Na Ham)",
        youtube: "https://www.youtube.com/watch?v=8wFQ5r4p8x0"
      },
      {
        title: "Hat-trick",
        youtube: "https://www.youtube.com/watch?v=7F4Qw8v8-1k"
      }
    ]
  }
];
