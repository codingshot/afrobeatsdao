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
        title: "On the Low",
        youtube: "https://www.youtube.com/watch?v=Ecl8Aod0Tl0"
      },
      {
        title: "Gbona",
        youtube: "https://www.youtube.com/watch?v=XzMAoQrXOMk"
      },
      {
        title: "It's Plenty",
        youtube: "https://www.youtube.com/watch?v=M6eA4K3lJ_Y"
      },
      {
        title: "Last Last",
        youtube: "https://www.youtube.com/watch?v=XzMA5ZT8S64"
      }
    ]
  },
  {
    id: "asake",
    name: "Asake",
    website: null,
    image: "/artists/asake.jpeg",
    top_songs: [
      {
        title: "Sungba",
        youtube: "https://www.youtube.com/watch?v=5A-CjKOQWvg"
      },
      {
        title: "MMS",
        youtube: "https://www.youtube.com/watch?v=iiOHqmmjdGk"
      },
      {
        title: "Peace Be Unto You (PBUY)",
        youtube: "https://www.youtube.com/watch?v=MefXQvGTYtE"
      },
      {
        title: "Amapiano",
        youtube: "https://www.youtube.com/watch?v=Ocd1dkX8pUA"
      },
      {
        title: "Sungba",
        youtube: "https://www.youtube.com/watch?v=p9F5IOVqJCQ"
      }
    ]
  },
  {
    id: "focalistic",
    name: "Focalistic",
    website: null,
    image: "/artists/focalistic.jpg",
    top_songs: [
      {
        title: "Ke Star",
        youtube: "https://www.youtube.com/watch?v=a9_da2P5JjQ"
      },
      {
        title: "Champion Sound (with Davido)",
        youtube: "https://www.youtube.com/watch?v=i-J0Fdze42M"
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
        youtube: "https://www.youtube.com/watch?v=3Iyuym-Gci0"
      },
      {
        title: "Unavailable",
        youtube: "https://www.youtube.com/watch?v=OSBan_sH_b8"
      },
      {
        title: "FEEL",
        youtube: "https://www.youtube.com/watch?v=-Xd1VSwCi2o"
      },
      {
        title: "FIA",
        youtube: "https://www.youtube.com/watch?v=YvjHNrgT_4w"
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
        youtube: "https://www.youtube.com/watch?v=jipQpjUA_o8"
      },
      {
        title: "Ojuelegba",
        youtube: "https://www.youtube.com/watch?v=Q7QiLceJSLQ"
      },
      {
        title: "KANTE",
        youtube: "https://www.youtube.com/watch?v=DMSPf7BVK4s"
      },
      {
        title: "COUGH",
        youtube: "https://www.youtube.com/watch?v=m7YxwHm21TQ"
      }
    ]
  },
  {
    id: "j-hus",
    name: "J Hus",
    website: null,
    image: "/artists/jhus.jpg",
    top_songs: [
      {
        title: "Did You See",
        youtube: "https://www.youtube.com/watch?v=3rk6_Ax0mQo"
      },
      {
        title: "Spirit",
        youtube: "https://www.youtube.com/watch?v=hBgF6JrWaO8"
      }
    ]
  },
  {
    id: "nsg",
    name: "NSG",
    website: null,
    image: "/artists/nsg.jpg",
    top_songs: [
      {
        title: "Options (feat. Tion Wayne)",
        youtube: "https://www.youtube.com/watch?v=E34REPgVpXk"
      },
      {
        title: "OT Bop",
        youtube: "https://www.youtube.com/watch?v=BkoX45IEuOk"
      }
    ]
  },
  {
    id: "yxng-bane",
    name: "Yxng Bane",
    website: null,
    image: "/artists/yxngbane.jpeg",
    top_songs: [
      {
        title: "Rihanna",
        youtube: "https://www.youtube.com/watch?v=1ruitsqQ34c"
      },
      {
        title: "Fine Wine",
        youtube: "https://www.youtube.com/watch?v=pkk9oRfhIxs"
      }
    ]
  },
  {
    id: "b-young",
    name: "B Young",
    website: null,
    image: "/artists/byoung.jpg",
    top_songs: [
      {
        title: "Jumanji",
        youtube: "https://www.youtube.com/watch?v=JFlrNP6_I28"
      },
      {
        title: "079ME",
        youtube: "https://www.youtube.com/watch?v=oQu5hOkzJDs"
      }
    ]
  },
  {
    id: "ziezie",
    name: "ZieZie",
    website: null,
    image: "/artists/ziezie.jpeg",
    top_songs: [
      {
        title: "Fine Girl",
        youtube: "https://www.youtube.com/watch?v=As1pRzoKmJ8"
      },
      {
        title: "Sensei",
        youtube: "https://www.youtube.com/watch?v=8vlC73glsWI"
      }
    ]
  },
  {
    id: "young-t-bugsey",
    name: "Young T & Bugsey",
    website: null,
    image: "/artists/youngtbugsey.jpg",
    top_songs: [
      {
        title: "Don't Rush (feat. Headie One)",
        youtube: "https://www.youtube.com/watch?v=ouCuyQI9pXc"
      },
      {
        title: "Strike a Pose",
        youtube: "https://www.youtube.com/watch?v=ng83tmoQ3yU"
      }
    ]
  },
  {
    id: "not3s",
    name: "Not3s",
    website: null,
    image: "/artists/not3s.jpg",
    top_songs: [
      {
        title: "My Lover",
        youtube: "https://www.youtube.com/watch?v=X9RnnZf6zHQ"
      },
      {
        title: "Addison Lee",
        youtube: "https://www.youtube.com/watch?v=ICPp_1SDueM"
      }
    ]
  },
  {
    id: "darkoo",
    name: "Darkoo",
    website: null,
    image: "/artists/darkoo.jpg",
    top_songs: [
      {
        title: "Gangsta",
        youtube: "https://www.youtube.com/watch?v=hRrMo8DzvW4"
      },
      {
        title: "Juicy (feat. Hardy Caprio)",
        youtube: "https://www.youtube.com/watch?v=yralWiuWWec"
      }
    ]
  },
  {
    id: "kojo-funds",
    name: "Kojo Funds",
    website: null,
    image: "/artists/kojofunds.jpg",
    top_songs: [
      {
        title: "Dun Talkin",
        youtube: "https://www.youtube.com/watch?v=CyfwmoGJzNE"
      },
      {
        title: "Check",
        youtube: "https://www.youtube.com/watch?v=ncu3eYkmTxk"
      }
    ]
  },
  {
    id: "ayo-maff",
    name: "Ayo Maff",
    website: null,
    image: "/artists/ayomaff.jpg",
    top_songs: [
      {
        title: "Dealer (feat. Fireboy DML)",
        youtube: "https://www.youtube.com/watch?v=JUWxpWD71VA"
      },
      {
        title: "Are You There?",
        youtube: "https://www.youtube.com/watch?v=Fcxh3DbGgR8"
      }
    ]
  },
  {
    id: "qing-madi",
    name: "Qing Madi",
    website: null,
    image: "/artists/qingmadi.webp",
    top_songs: [
      {
        title: "See Finish",
        youtube: "https://www.youtube.com/watch?v=UGGL375aau8"
      },
      {
        title: "Ole (feat. BNXN)",
        youtube: "https://www.youtube.com/watch?v=wBNKFH7Xj70"
      }
    ]
  },
  {
    id: "llona",
    name: "Llona",
    website: null,
    image: "/artists/llona.png",
    top_songs: [
      { 
        title: "Cant Breathe",
        youtube: "https://www.youtube.com/watch?v=f1j7vcdpg4w"
      },
      {
        title: "HBP (Remix) feat. Bella Shmurda",
        youtube: "https://www.youtube.com/watch?v=7q1oljdE_JU"
      }
    ]
  },
  {
    id: "bnxn",
    name: "BNXN (fka Buju)",
    website: "https://www.instagram.com/toyourears",
    image: "/artists/bnxn.jpeg",
    top_songs: [
      {
        title: "Finesse (with Pheelz)",
        youtube: "https://www.youtube.com/watch?v=Vcwhe0pY4Bg"
      },
      {
        title: "Gwagwalada (feat. Kizz Daniel & Seyi Vibez)",
        youtube: "https://www.youtube.com/watch?v=7fhtbd5NxW0"
      }
    ]
  },
  {
    id: "seyi-vibez",
    name: "Seyi Vibez",
    website: "https://www.instagram.com/seyi_vibez",
    image: "/artists/seyivibez.jpeg",
    top_songs: [
      {
        title: "Chance (Na Ham)",
        youtube: "https://www.youtube.com/watch?v=BfIUgmQG9c4"
      },
      {
        title: "Hat-trick",
        youtube: "https://www.youtube.com/watch?v=zmd69R6n4Sg"
      }
    ]
  },
  {
    id: "rema",
    name: "Rema",
    website: null,
    image: "/artists/rema.jpg",
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
        youtube: "https://www.youtube.com/watch?v=CQLsdm1ZYAw"
      },
      {
        title: "Dumebi",
        youtube: "https://www.youtube.com/watch?v=zUU1bIWpH5c"
      }
    ]
  },
  {
    id: "ayra-starr",
    name: "Ayra Starr",
    website: null,
    image: "/artists/ayrastarr.jpeg",
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
        youtube: "https://www.youtube.com/watch?v=crtQSTYWtqE"
      },
      {
        title: "All The Love",
        youtube: "https://www.youtube.com/watch?v=Lighfnq-1SM"
      },
      {
        title: "Rush",
        youtube: "https://www.youtube.com/watch?v=4UFiBRHtxyQ"
      },
      {
        title: "Sability",
        youtube: "https://www.youtube.com/watch?v=aJsNOBcEvck"
      }
    ]
  },
  {
    id: "tems",
    name: "Tems",
    website: "https://www.leadingvibe.com/",
    image: "/artists/tems.jpeg",
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
        youtube: "https://www.youtube.com/watch?v=e8GzTXRAJ30"
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
    image: "/artists/tiwasavage.jpg",
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
        youtube: "https://www.youtube.com/watch?v=dFBQzRNsMK0"
      },
      {
        title: "One Heart (Can Change The World)",
        youtube: "https://www.youtube.com/watch?v=k0aPh2zoeiE"
      },
      {
        title: "Who Is Your Guy?",
        youtube: "https://www.youtube.com/watch?v=loxACEBahMM"
      }
    ]
  },
  {
    id: "omah-lay",
    name: "Omah Lay",
    website: null,
    image: "/artists/omahlay.jpg",
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
        title: "Understand",
        youtube: "https://www.youtube.com/watch?v=X3Ai6osw3Mk"
      },
      {
        title: "Godly",
        youtube: "https://www.youtube.com/watch?v=DqUd72pK15Y"
      },
      {
        title: "Lo Lo",
        youtube: "https://www.youtube.com/watch?v=xYD2SQljwJo"
      },
      {
        title: "Holy Ghost",
        youtube: "https://www.youtube.com/watch?v=E3E8qQmP4t8"
      },
      {
        title: "Lo Lo",
        youtube: "https://www.youtube.com/watch?v=AQQifhyTPEs"
      }
    ]
  },
  {
    id: "fireboy-dml",
    name: "Fireboy DML",
    website: null,
    image: "/artists/fireboydml.jpg",
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
        title: "Everyday",
        youtube: "https://www.youtube.com/watch?v=77YFPhgt8P0"
      },
      {
        title: "Vibration",
        youtube: "https://www.youtube.com/watch?v=YRhBfL3GEjQ"
      },
      {
        title: "Peru",
        youtube: "https://www.youtube.com/watch?v=pekzpzNCNDQ"
      },
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
    image: "/artists/victony.webp",
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
        title: "Soweto",
        youtube: "https://www.youtube.com/watch?v=DPBRGWUgQsA"
      },
      {
        title: "Stubborn (with Asake)",
        youtube: "https://www.youtube.com/watch?v=vp0b_fqPvkM"
      },
      {
        title: "Mufasa",
        youtube: "https://www.youtube.com/watch?v=lBfGkQLBLQQ"
      }
    ]
  },
  {
    id: "ruger",
    name: "Ruger",
    website: null,
    image: "/artists/ruger.webp",
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
        title: "Asiwaju",
        youtube: "https://www.youtube.com/watch?v=MqqBH9Fa4NQ"
      },
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
    image: "/artists/mreazi.webp",
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
    image: "/artists/tekno.webp",
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
        youtube: "https://www.youtube.com/watch?v=8YhAFBOSk1U"
      },
      {
        title: "Duro",
        youtube: "https://www.youtube.com/watch?v=TlJ33-6tPTE"
      }
    ]
  },
  {
    id: "cruel-santino",
    name: "Cruel Santino",
    website: "https://www.subaruboysworldwide.com",
    image: "/artists/cruelsantino.jpg",
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
        title: "Rapid Fire",
        youtube: "https://www.youtube.com/watch?v=hMuFO9nhtfA"
      },
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
    image: "/artists/lojay.jpg",
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
        title: "Monalisa",
        youtube: "https://www.youtube.com/watch?v=to8nQNGarRw"
      },
      {
        title: "Arizona",
        youtube: "https://www.youtube.com/watch?v=p2USH3lAJ88"
      },
      {
        title: "Monalisa",
        youtube: "https://www.youtube.com/watch?v=3TR9qML2L-M"
      }
    ]
  },
  {
    id: "black-sherif",
    name: "Black Sherif",
    website: null,
    image: "/artists/blacksherif.jpeg",
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
        youtube: "http://youtube.com/watch?v=zz_Q49_RecY"
      }
    ]
  },
  
  // New artists from AfroBEATS dataset
  {
    id: "young-jonn",
    name: "Young Jonn",
    website: null,
    image: "/artists/youngjonn.webp",
    instagram: null,
    twitter: null,
    spotify: null,
    youtube: null,
    soundcloud: null,
    tiktok: null,
    facebook: null,
    linkedin: null,
    top_songs: [
      {
        title: "Tesinapot",
        youtube: "https://www.youtube.com/watch?v=hMYTBLOsApo"
      }
    ]
  },
  {
    id: "spinall",
    name: "SPINALL",
    website: null,
    image: "/artists/spinall.jpg",
    instagram: null,
    twitter: null,
    spotify: null,
    youtube: null,
    soundcloud: null,
    tiktok: null,
    facebook: null,
    linkedin: null,
    top_songs: [
      {
        title: "Elemu (feat. SPINALL)",
        youtube: "https://www.youtube.com/watch?v=hHzdNPGRN-M"
      }
    ]
  },
  {
    id: "king-promise",
    name: "King Promise",
    website: null,
    image: "/artists/kingpromise.jpg",
    instagram: null,
    twitter: null,
    spotify: null,
    youtube: null,
    soundcloud: null,
    tiktok: null,
    facebook: null,
    linkedin: null,
    top_songs: [
      {
        title: "Terminator",
        youtube: "https://www.youtube.com/watch?v=rw0fwjR3DWo"
      }
    ]
  },
  {
    id: "ckay",
    name: "CKay",
    website: null,
    image: "/artists/ckay.jpg",
    instagram: null,
    twitter: null,
    spotify: null,
    youtube: null,
    soundcloud: null,
    tiktok: null,
    facebook: null,
    linkedin: null,
    top_songs: [
      {
        title: "Love Nwantiti (ah ah ah)",
        youtube: "https://www.youtube.com/watch?v=mFb2cJf_ekM"
      }
    ]
  },
  {
    id: "skiibii",
    name: "Skiibii",
    website: null,
    image: "/artists/skiibii.jpg",
    instagram: null,
    twitter: null,
    spotify: null,
    youtube: null,
    soundcloud: null,
    tiktok: null,
    facebook: null,
    linkedin: null,
    top_songs: [
      {
        title: "Baddest Boy",
        youtube: "https://www.youtube.com/watch?v=7X0YM-a_oCY"
      }
    ]
  },
  {
    id: "dj-tunez",
    name: "DJ Tunez",
    website: null,
    image: "/artists/djtunez.webp",
    instagram: null,
    twitter: null,
    spotify: null,
    youtube: null,
    soundcloud: null,
    tiktok: null,
    facebook: null,
    linkedin: null,
    top_songs: [
      {
        title: "KANTE",
        youtube: "https://www.youtube.com/watch?v=DMSPf7BVK4s"
      }
    ]
  },
  {
    id: "tempoe",
    name: "Tempoe",
    website: null,
    image: "/artists/tempoe.jpg",
    instagram: null,
    twitter: null,
    spotify: null,
    youtube: null,
    soundcloud: null,
    tiktok: null,
    facebook: null,
    linkedin: null,
    top_songs: [
      {
        title: "Soweto",
        youtube: "https://www.youtube.com/watch?v=79XbB2XWU6Y"
      }
    ]
  },
  {
    id: "azanti",
    name: "Azanti",
    website: null,
    image: "/artists/azanti.jpg",
    instagram: null,
    twitter: null,
    spotify: null,
    youtube: null,
    soundcloud: null,
    tiktok: null,
    facebook: null,
    linkedin: null,
    top_songs: [
      {
        title: "Elemu (feat. SPINALL)",
        youtube: "https://www.youtube.com/watch?v=hHzdNPGRN-M"
      }
    ]
  },
  {
    id: "spyro",
    name: "Spyro",
    website: null,
    image: "/artists/spyro.jpg",
    instagram: null,
    twitter: null,
    spotify: null,
    youtube: null,
    soundcloud: null,
    tiktok: null,
    facebook: null,
    linkedin: null,
    top_songs: [
      {
        title: "Who Is Your Guy?",
        youtube: "https://www.youtube.com/watch?v=loxACEBahMM"
      }
    ]
  },
  {
    id: "adekunle-gold",
    name: "Adekunle Gold",
    website: null,
    image: "/artists/adekunlegold.jpg",
    instagram: null,
    twitter: null,
    spotify: null,
    youtube: null,
    soundcloud: null,
    tiktok: null,
    facebook: null,
    linkedin: null,
    top_songs: [
      {
        title: "KANTE",
        youtube: "https://www.youtube.com/watch?v=DMSPf7BVK4s"
      }
    ]
  },
  {
    id: "odeal",
    name: "Odeal",
    website: null,
    image: "/artists/odeal.jpeg",
    instagram: null,
    twitter: null,
    spotify: null,
    youtube: null,
    soundcloud: null,
    tiktok: null,
    facebook: null,
    linkedin: null,
    top_songs: [
      {
        title: "Soh-Soh",
        youtube: "https://www.youtube.com/watch?v=HsLieYE4ZTY"
      }
    ]
  },
  {
    id: "olamide",
    name: "Olamide",
    website: null,
    image: "/artists/olamide.jpg",
    instagram: null,
    twitter: null,
    spotify: null,
    youtube: null,
    soundcloud: null,
    tiktok: null,
    facebook: null,
    linkedin: null,
    top_songs: [
      {
        title: "Amapiano",
        youtube: "https://www.youtube.com/watch?v=Ocd1dkX8pUA"
      },
      {
        title: "Tesinapot",
        youtube: "https://www.youtube.com/watch?v=hMYTBLOsApo"
      }
    ]
  }
];