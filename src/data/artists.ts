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
    image: "/artists/burnaboy.jpg",
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
    image: "/artists/asake.jpg",
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
    image: "/artists/davido.jpg",
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
    image: "/artists/wizkid.jpg",
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
  },
  {
    id: "rema",
    name: "Rema",
    website: null,
    image: null,
    instagram: null,
    twitter: null,
    spotify: "https://open.spotify.com/artist/5yOvAmpIR7hVxiS6Ls5DPO?si=coCiyq1wTLKus5oJBclqxA",
    youtube: "https://www.youtube.com/channel/UCHGF6zfD2gwLuke95X3CKFQ",
    soundcloud: null,
    tiktok: null,
    facebook: null,
    linkedin: null,
    top_songs: [
      {
        title: "Calm Down",
        youtube: null
      },
      {
        title: "Dumebi",
        youtube: null
      }
    ]
  },
  {
    id: "ayra-starr",
    name: "Ayra Starr",
    website: null,
    image: null,
    instagram: "https://www.instagram.com/ayrastarr/",
    twitter: "https://twitter.com/ayrastarr",
    spotify: null,
    youtube: "https://www.youtube.com/watch?v=NoZi3O6-7Ig",
    soundcloud: null,
    tiktok: "https://www.tiktok.com/@ayrastarr",
    facebook: "https://www.facebook.com/starrayra",
    linkedin: null,
    top_songs: [
      {
        title: "Rush",
        youtube: null
      },
      {
        title: "All The Love",
        youtube: "https://www.youtube.com/watch?v=NoZi3O6-7Ig"
      }
    ]
  },
  {
    id: "tems",
    name: "Tems",
    website: "https://www.leadingvibe.com/",
    image: null,
    instagram: "https://www.instagram.com/temsbaby/",
    twitter: "https://twitter.com/temsbaby",
    spotify: null,
    youtube: "https://www.youtube.com/watch?v=9KtU6f_ZPjU",
    soundcloud: null,
    tiktok: "https://www.tiktok.com/@temsbaby",
    facebook: "https://www.facebook.com/temsbaby",
    linkedin: null,
    top_songs: [
      {
        title: "Free Mind",
        youtube: null
      },
      {
        title: "Not An Angel",
        youtube: "https://www.youtube.com/watch?v=9KtU6f_ZPjU"
      }
    ]
  },
  {
    id: "tiwa-savage",
    name: "Tiwa Savage",
    website: null,
    image: null,
    instagram: null,
    twitter: null,
    spotify: null,
    youtube: "https://www.youtube.com/tiwasavage",
    soundcloud: null,
    tiktok: null,
    facebook: null,
    linkedin: null,
    top_songs: [
      {
        title: "All Over",
        youtube: null
      },
      {
        title: "One Heart (Can Change The World)",
        youtube: "https://www.youtube.com/watch?v=0B8r8wU9rP4"
      }
    ]
  },
  {
    id: "omah-lay",
    name: "Omah Lay",
    website: null,
    image: null,
    instagram: "https://www.instagram.com/omah_lay/",
    twitter: "https://twitter.com/Omah_Lay",
    spotify: "https://open.spotify.com/artist/5yOvAmpIR7hVxiS6Ls5DPO?si=coCiyq1wTLKus5oJBclqxA",
    youtube: "https://www.youtube.com/watch?v=1oBATitnUsA",
    soundcloud: null,
    tiktok: "https://www.tiktok.com/@omah_lay",
    facebook: "https://www.facebook.com/OfficialOmahLay",
    linkedin: null,
    top_songs: [
      {
        title: "Holy Ghost",
        youtube: "https://www.youtube.com/watch?v=1oBATitnUsA"
      }
    ]
  },
  {
    id: "fireboy-dml",
    name: "Fireboy DML",
    website: null,
    image: null,
    instagram: null,
    twitter: null,
    spotify: null,
    youtube: "https://www.youtube.com/watch?v=J7CHVcjwpAg",
    soundcloud: null,
    tiktok: null,
    facebook: null,
    linkedin: null,
    top_songs: [
      {
        title: "YAWA",
        youtube: "https://www.youtube.com/watch?v=J7CHVcjwpAg"
      }
    ]
  },
  {
    id: "victony",
    name: "Victony",
    website: null,
    image: null,
    instagram: null,
    twitter: null,
    spotify: null,
    youtube: "https://www.youtube.com/watch?v=vp0b_fqPvkM",
    soundcloud: null,
    tiktok: null,
    facebook: null,
    linkedin: null,
    top_songs: [
      {
        title: "Stubborn (with Asake)",
        youtube: "https://www.youtube.com/watch?v=vp0b_fqPvkM"
      }
    ]
  },
  {
    id: "ruger",
    name: "Ruger",
    website: null,
    image: null,
    instagram: "https://www.instagram.com/rugerofficial/",
    twitter: "https://twitter.com/rugerofficial",
    spotify: null,
    youtube: "https://www.youtube.com/watch?v=7M2Gps9xR8g",
    soundcloud: null,
    tiktok: "https://www.tiktok.com/@rugerofficial",
    facebook: null,
    linkedin: null,
    top_songs: [
      {
        title: "Girlfriend",
        youtube: "https://www.youtube.com/watch?v=7M2Gps9xR8g"
      }
    ]
  },
  {
    id: "mr-eazi",
    name: "Mr Eazi",
    website: null,
    image: null,
    instagram: null,
    twitter: null,
    spotify: null,
    youtube: "https://www.youtube.com/watch?v=q6Mp0u5Y1wA",
    soundcloud: null,
    tiktok: null,
    facebook: null,
    linkedin: null,
    top_songs: [
      {
        title: "Legalize",
        youtube: "https://www.youtube.com/watch?v=q6Mp0u5Y1wA"
      }
    ]
  },
  {
    id: "tekno",
    name: "Tekno",
    website: null,
    image: null,
    instagram: null,
    twitter: null,
    spotify: null,
    youtube: "https://www.youtube.com/channel/UCRlrYo_vSr5OvfvrxliE3Pg",
    soundcloud: null,
    tiktok: null,
    facebook: null,
    linkedin: null,
    top_songs: [
      {
        title: "Pana",
        youtube: null
      },
      {
        title: "Duro",
        youtube: null
      }
    ]
  },
  {
    id: "cruel-santino",
    name: "Cruel Santino",
    website: "https://www.subaruboysworldwide.com",
    image: null,
    instagram: "https://www.instagram.com/cruelsantino",
    twitter: "https://twitter.com/cruelsantino",
    spotify: null,
    youtube: "https://www.youtube.com/watch?v=v4ul6zYmS_I",
    soundcloud: null,
    tiktok: "https://www.tiktok.com/@subaruwwworld",
    facebook: "https://www.facebook.com/cruelsantino",
    linkedin: null,
    top_songs: [
      {
        title: "TAPENGA",
        youtube: "https://www.youtube.com/watch?v=v4ul6zYmS_I"
      }
    ]
  },
  {
    id: "lojay",
    name: "Lojay",
    website: null,
    image: null,
    instagram: null,
    twitter: null,
    spotify: null,
    youtube: "https://www.youtube.com/watch?v=kfuQOuZyyO0",
    soundcloud: null,
    tiktok: null,
    facebook: null,
    linkedin: null,
    top_songs: [
      {
        title: "Leader",
        youtube: "https://www.youtube.com/watch?v=kfuQOuZyyO0"
      }
    ]
  },
  {
    id: "black-sherif",
    name: "Black Sherif",
    website: null,
    image: null,
    instagram: "https://www.instagram.com/blacksherif_?igsh=MWY1aXh6dXZ5ejVqcg==",
    twitter: null,
    spotify: null,
    youtube: "https://www.youtube.com/watch?v=zz_Q49_RecY",
    soundcloud: null,
    tiktok: null,
    facebook: null,
    linkedin: null,
    top_songs: [
      {
        title: "Lord I'm Amazed",
        youtube: "https://www.youtube.com/watch?v=zz_Q49_RecY"
      }
    ]
  }
];
