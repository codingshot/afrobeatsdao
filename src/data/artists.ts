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
        title: "Tested, Approved & Trusted",
        youtube: "https://youtu.be/QnaL31BTjdU?si=V0w09f6WHOvffilk"
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
        youtube: "https://www.youtube.com/watch?v=h7WfPHHXCAY"
      },
      {
        title: "It's Plenty",
        youtube: "https://www.youtube.com/watch?v=F8bZVnynDdc"
      },
      {
        title: "Jagele",
        youtube: "https://youtu.be/-UfEhUTxct0?si=wkNkTgs5T2iOEMWQ",
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
        youtube: "https://www.youtube.com/watch?v=l_-v1fNdSHs"
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
    youtube: "https://www.youtube.com/channel/UCkBV3nBa0iRdxEGc4DUS3xA",
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
        youtube: "https://www.youtube.com/watch?v=GoWGGiWDsac"
      },
      {
        title: "If",
        youtube: "https://www.youtube.com/watch?v=helEv0kGHd4"
      },
      {
        title: "FIA",
        youtube: "https://www.youtube.com/watch?v=8ORvJcpe2Oc"
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
        title: "2 Sugar (feat. Ayra Starr)",
        youtube: "https://youtu.be/o_oenl2Be-w?si=a-sJhfe7ED9gl5cV"
      },
      {
        title: "Ojuelegba",
        youtube: "https://www.youtube.com/watch?v=Q7QiLceJSLQ"
      },
      {
        title: "Bad to Me",
        youtube: "https://youtu.be/2mkhevOXVNk?si=qC1s7JYl2E1J8zu5"
      },
      {
        title: "Ginger ft Burna Boy",
        youtube: "https://www.youtube.com/watch?v=YSy2lBZ1QrA"
      },
      {
        title: "KANTE",
        youtube: "https://www.youtube.com/watch?v=3bFPDfWReN0"
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
    id: "joeboy",
    name: "Joeboy",
    website: null,
    youtube: "https://www.youtube.com/channel/UCv3EFZRGITcQwdyCE_ap0UA",
    image: "/artists/joeboy.webp",
    top_songs: [
      {
        title: "Sip (Alcohol)",
        youtube: "https://youtu.be/UEcAPvoSe_8?si=zs2_pRdEE5AfaWDg"
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
    id: "costatitch",
    name: "Costa Titch",
    website: null,
    image: "/artists/costatitch.jpg",
    top_songs: [
      {
        title: "Big Flexa",
        youtube: "https://www.youtube.com/watch?v=8g0v2SDe6MU"
      },
      {
        title: "Just Do It",
        youtube: "https://youtu.be/h2cYMEK5v-Y?si=xnOUshItL7d1PUS4"
      },
      {
        title: "Superstar ft Ma Gang",
        youtube: "https://youtu.be/YNzLp2OChBU?si=gr7xiQsvOaRIIr_H"
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
    id: "teejay",
    name: "Teejay",
    website: null,
    image: "/artists/teejay.jpg",
    top_songs: [
      { 
        title: "Drift",
        youtube: "https://www.youtube.com/watch?v=-UG2F5G1Qk0"
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
    id: "kizz-daniel",
    name: "Kizz Daniel",
    website: null,
    image: "/artists/kizzdaniel.jpg",
    top_songs: [
      {
        title: "Cough",
        youtube: "https://www.youtube.com/watch?v=4j7Fa2PCMow"
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
    id: "moliy",
    name: "MOLIY",
    website: null,
    image: "/artists/moliy.jpg",
    top_songs: [
      {
        title: "Shake it to the Max",
        youtube: "https://youtu.be/9Jf8rfvjRbQ?si=v1Ux_FcK0BHEk4Bh"
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
    id: "1da-ban",
    name: "1da Banton",
    website: null,
    youtube: "https://www.youtube.com/channel/UCDZN6-FTxmc3lmW-tNShEeQ",
    image: "/artists/1daban.jpg",
    top_songs: [
      {
        title: "No Wahala (Remix) feat. Kizz Daniel & Tiwa Savage",
        youtube: "https://youtu.be/D7wqi1HZFq8?si=XMX1dlCz-xCkqj49"
      }
    ]
  },
    {
    id: "swizz-panache",
    name: "Swizz Panache",
    website: null,
    youtube: "https://www.youtube.com/@swizzpanache",
    image: "/artists/swizzpanache.jpg",
    top_songs: [
      {
        title: "Shayi Mpempe",
        youtube: "https://www.youtube.com/watch?v=Hfxra_LxMoc"
      },
      {
        title: "Izulu",
        youtube: "https://www.youtube.com/watch?v=MsOntAbV024"
      }
    ]
  },
  {
    id: "phyno",
    name: "Phyno",
    website: null,
    youtube: "https://www.youtube.com/@officialphyno",
    instagram: "instagram.com/phynofino",
    twitter: "twitter.com/phynofino",
    image: "/artists/phyno.jpg",
    top_songs: [
      {
        title: "Do I",
        youtube: "https://www.youtube.com/watch?v=oeP_8Wm9PQQ"
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
        title: "Charm",
        youtube: "https://youtu.be/dNt1QR1ecuM?si=Zs4mVJBo9k7CYuLZ"
      },
      {
        title: "Dumebi",
        youtube: "https://www.youtube.com/watch?v=zUU1bIWpH5c"
      },
      {
        title: "Soundgasm",
        youtube: "https://www.youtube.com/watch?v=nrTkERuwdCc"
      },
      {
        title: "BENIN BOYS ft Shallipop",
        youtube: "https://www.youtube.com/watch?v=eYsldLTYyrM"
      },
      {
        title: "Ozeba",
        youtube: "https://youtu.be/LIhDklvBUyg?si=hZsmOPm4s4fq7k1p"
      },
      {
        title: "AZAMAN",
        youtube: "https://www.youtube.com/watch?v=Z2L51xr45As"
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
        title: "Commas",
        youtube: "https://www.youtube.com/watch?v=EhyzYPSHRQU&list=PL7-PoJCUqjFzfiwCE8_1N4RORb3_LPDxL&index=9"
      },
      {
        title: "All The Love",
        youtube: "https://www.youtube.com/watch?v=Lighfnq-1SM"
      },

      {
        title: "Sability",
        youtube: "https://www.youtube.com/watch?v=KYn3k8dpRJI"
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
      },
      {
        title: "Replay",
        youtube: "https://youtu.be/_dJvxxOZVX0?si=cMg4hzmRGDYQzOXx"
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
        title: "Ma Lo",
        youtube: "https://youtu.be/VdCjMGeMhaM?si=lvoNP_6m3Jmf1Pr4"
      },
      {
        title: "Who Is Your Guy?",
        youtube: "https://www.youtube.com/watch?v=OHnXY9F7m9c"
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
        title: "Bandana",
        youtube: "https://youtu.be/gCLUIzOsgGg?si=OfDjfMPBiPsM2iId"
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
        title: "Xtra Cool",
        youtube: "https://www.youtube.com/watch?v=LWWCj-EbevI"
      }
    ]
  },
  {
    id: "tyla",
    name: "Tyla",
    website: null,
    image: "/artists/tyla.jpeg",
    instagram: "https://www.instagram.com/tyla/",
    twitter: "https://x.com/tyllaaaaaaa",
    spotify: null,
    youtube: null,
    soundcloud: null,
    tiktok: null,
    facebook: null,
    linkedin: null,
    top_songs: [
      {
        title: "Truth or Dare",
        youtube: "https://youtu.be/UKpz-I9EV84?si=nivjaTyCbbXC8iI6"
      },
      {
        title: "Push 2 Start",
        youtube: "https://www.youtube.com/watch?v=uLK2r3sG4lE"
      },
      {
        title: "Water",
        youtube: "https://www.youtube.com/watch?v=XoiOOiuH8iI"
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
        title: "Sere",
        youtube: "https://www.youtube.com/watch?v=udtsQ3weRz0"
      },
      {
        title: "Nowo",
        youtube: "https://www.youtube.com/watch?v=ES8XuZBafz0"
      },
      {
        title: "One Call ft Tyla Omah Lay",
        youtube: "https://www.youtube.com/watch?v=zB4tnXnUFKs"
      },
      {
        title: "Dis Love",
        youtube: "https://www.youtube.com/watch?v=EAcXCdMiuEo"
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
        youtube: "https://www.youtube.com/watch?v=NPCC02SaJVg"
      },
      {
        title: "Perfect Combi",
        youtube: "https://www.youtube.com/watch?v=jUsE4hcoS2c"
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
        title: "Love Nwantiti (ah ah ah) - Remix",
        youtube: "https://www.youtube.com/watch?v=D-YDEyuDxWU"
      },
      {
        title: "Emiliana",
        youtube: "https://www.youtube.com/watch?v=Ypr5QN7Xn_M"
      },
      {
        title: "Walhala",
        youtube: "https://www.youtube.com/watch?v=7bjIixyVEjE"
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
        youtube: "https://www.youtube.com/watch?v=IW9NtE2TN10"
      },
      {
        title: "Sensima",
        youtube: "https://www.youtube.com/watch?v=zqkDioXLTO8"
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
        title: "Blessings",
        youtube: "https://www.youtube.com/watch?v=ut4uAVjRxns&t=2s"
      }
    ]
  },
  {
    id: "oxlade",
    name: "Oxlade",
    website: null,
    image: "/artists/oxlade.jpg",
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
        title: "Away",
        youtube: "https://www.youtube.com/watch?v=9410qCyQuJ4"
      },
      {
        title: "Ku Lo Sa",
        youtube: "https://www.youtube.com/watch?v=R4qud199tQk"
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
        youtube: "https://www.youtube.com/watch?v=DPBRGWUgQsA"
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
        title: "Naija Funk",
        youtube: "https://www.youtube.com/watch?v=fAgE823FyJs"
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
        youtube: "https://www.youtube.com/watch?v=wyKccbQm1f0"
      }
    ]
  },
  {
    id: "kcee",
    name: "Kcee",
    website: null,
    image: "/artists/kcee.webp",
    instagram: null,
    twitter: null,
    spotify: null,
    youtube: "https://www.youtube.com/channel/UC5IWg-ltJXPyCOgCUjnh2Uw",
    soundcloud: null,
    tiktok: null,
    facebook: null,
    linkedin: null,
    top_songs: [
      {
        title: "Ojapiano",
        youtube: "https://youtu.be/WsMwhD0SmHU?si=rNoAzcbbb_kwZNVL"
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
        title: "Party No Dey Stop",
        youtube: "https://www.youtube.com/watch?v=VnXq06m9P4g"
      },
      {
        title: "High ft Davido",
        youtube: "https://www.youtube.com/watch?v=juBnNBm0cPw"
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
    youtube: "https://www.youtube.com/@iamodeal/",
    soundcloud: null,
    tiktok: null,
    facebook: null,
    linkedin: null,
    top_songs: [
      {
        title: "Soh-Soh",
        youtube: "https://www.youtube.com/watch?v=ks48Gb5JeYM"
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
        youtube: "https://www.youtube.com/watch?v=l_-v1fNdSHs"
      },
      {
        title: "Jinja",
        youtube: "https://www.youtube.com/watch?v=5FYvvWl1Frw"
      },
      {
        title: "Tumpet ft Ckay",
        youtube: "https://youtu.be/FcjOlcWaaU8?si=JHGYSJ07HeMKJ97z"
      },
      {
        title: "Tesinapot",
        youtube: "https://www.youtube.com/watch?v=cIjkFCCLdcA"
      }
    ]
  }, 
  {
    id: "shallipopi",
    name: "Shallipopi",
    website: null,
    image: "/artists/shallipopi.jpg",
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
        title:  "Elon Musk",
        youtube: "https://www.youtube.com/watch?v=546V71zODtk"
      },
      {
        title: "Cast ft ODUMODUBLVCK",
        youtube: "https://www.youtube.com/watch?v=g2j40WZ08Vw"
      },
      {
        title: "Laho",
        youtube: "https://www.youtube.com/watch?v=qARrn7G067w"
      }

    ]
  }]