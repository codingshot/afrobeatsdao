export interface Song {
  title: string;
  youtube: string;
}

export interface Artist {
  id: string;
  name: string;
  website: string | null;
  image: string;
  genre?: string;
  country?: string;
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
    genre: "Afrobeats",
    country: "Nigeria",
    instagram: "https://www.instagram.com/burnaboygram/",
    twitter: "https://x.com/burnaboy",
    spotify:
      "https://open.spotify.com/artist/3wcj11K77LjEY1PkEazffa?si=GK8NxyllR92rUCaXnLRG3w",
    youtube:
      "https://music.youtube.com/channel/UCr61sufuLt7_eB7ak1bXHIg?si=4oUT-VONMbxDuOqn",
    tiktok:
      "https://www.tiktok.com/@burnaboyofficial?is_from_webapp=1&sender_device=pc",
    facebook: "https://web.facebook.com/Officialburnaboy/",
    linkedin: null,
    soundcloud: null,
    top_songs: [
      {
        title: "Last Last",
        youtube: "https://www.youtube.com/watch?v=421w1j87fEM",
      },
      {
        title: "City Boys",
        youtube: "https://www.youtube.com/watch?v=hLDQ88vAhIs",
      },
      {
        title: "Tested, Approved & Trusted",
        youtube:
          "https://music.youtube.com/watch?v=UbrLtfvTZSg&si=usNFhAyC_qKAZIFA",
      },
      {
        title: "Ye",
        youtube: "https://www.youtube.com/watch?v=lPe09eE6Xio",
      },
      {
        title: "On the Low",
        youtube: "https://www.youtube.com/watch?v=Ecl8Aod0Tl0",
      },
      {
        title: "Gbona",
        youtube:
          "https://music.youtube.com/watch?v=a7MY8ls0NKc&si=YbeLkbO9fyfl4gkJ",
      },
      {
        title: "It's Plenty",
        youtube:
          "https://music.youtube.com/watch?v=PsBdgtiFQXE&si=B9SkGsRclMhcIqDP",
      },
      {
        title: "Jagele",
        youtube: "https://youtu.be/-UfEhUTxct0?si=wkNkTgs5T2iOEMWQ",
      },
      {
        title: "For My Hand (feat. Ed Sheeran)",
        youtube:
          "https://music.youtube.com/watch?v=PbOeM1FF3Uc&si=wN2UwqS62acwyBeb",
      },
      {
        title: "Common Person",
        youtube:
          "https://music.youtube.com/watch?v=ZmZi1ZuPB9A&si=27EEXMiUiJvT48X5",
      },
      {
        title: "Alone",
        youtube:
          "https://music.youtube.com/watch?v=m7MJFRayEkM&si=5cRG2CXomJ9irP3s",
      },
      {
        title: "Dem Dey",
        youtube:
          "https://music.youtube.com/watch?v=zMg90HoIwoQ&si=xou0WE2BkI_dm8gS",
      },
      {
        title: "Anybody",
        youtube:
          "https://music.youtube.com/watch?v=_hUwdn1Smdo&si=BPexlErOpRZJx5E9",
      },
      {
        title: "Update",
        youtube:
          "https://music.youtube.com/watch?v=7BWYUZ1DOUE&si=8hDCiih-rL9Zr0qH",
      },
      {
        title: "Kilometer",
        youtube:
          "https://music.youtube.com/watch?v=l_4ft71rhPw&si=HFk1dkj87ztIiNsv",
      },
      {
        title: "23",
        youtube:
          "https://music.youtube.com/watch?v=nWSUoqatwKM&si=Z9nix4pak4wMfN0Q",
      },
      {
        title: "Bundle by Bundle",
        youtube:
          "https://music.youtube.com/watch?v=R9NV0Zm1stc&si=jlJk8vsfPIYt7dgI",
      },
      {
        title: "Bank On It",
        youtube:
          "https://music.youtube.com/watch?v=tZEFazqEYqY&si=Ox9m06fGcVDk5oin",
      },
      {
        title: "Killin Dem (feat. Zlatan)",
        youtube:
          "https://music.youtube.com/watch?v=QvY03hNu60s&si=GanmuU2i2aWo87a2",
      },
      {
        title: "Hallelujah",
        youtube:
          "https://music.youtube.com/watch?v=qbk0COyAIo0&si=j6DiObsMWvrfkAr4",
      },
      {
        title: "No Panic",
        youtube:
          "https://music.youtube.com/watch?v=04T5ruuMVqA&si=YHsGGXYs20AOeqpH",
      },
      {
        title: "No Sign of Weakness",
        youtube:
          "https://music.youtube.com/watch?v=poY4czC8h3o&si=ePt5vDA1r8Jd5orE",
      },
      {
        title: "Buy You Life",
        youtube:
          "https://music.youtube.com/watch?v=bIgNKKU7bpw&si=Kb4oTOow1sTwu_1q",
      },
      {
        title: "Love",
        youtube:
          "https://music.youtube.com/watch?v=twDtPs5NCjA&si=py9ZePyKXkDpQZPB",
      },
      {
        title: "TaTaTa",
        youtube:
          "https://music.youtube.com/watch?v=Uj1g5oumzWY&si=TQHFScXl3s4z7IW-",
      },
      {
        title: "Come Gimme",
        youtube:
          "https://music.youtube.com/watch?v=tBa5iUSxvPs&si=AZqzaeT4wdQrbdJ2",
      },
      {
        title: "Sweet Love",
        youtube:
          "https://music.youtube.com/watch?v=Z-jTmVfi33Q&si=Fdpp6KTWkZkC9W_O",
      },
      {
        title: "28 grams",
        youtube:
          "https://music.youtube.com/watch?v=6osB5y_-1Ao&si=sm7wgZzjbrGx3U-g",
      },
      {
        title: "Kabiyesi",
        youtube:
          "https://music.youtube.com/watch?v=OCekxDXbmQE&si=iKZmRQ20Yr5eiPtO",
      },
      {
        title: "Empty Chairs (feat. Mick Jagger)",
        youtube:
          "https://music.youtube.com/watch?v=uM-FYEuLJC8&si=4usYUrt_zOWSVCYC",
      },
      {
        title: "Pardon",
        youtube:
          "https://music.youtube.com/watch?v=UJgPYwlUGTs&si=erJnpjSnJNmmz74n",
      },
      {
        title: "Change Your Mind (feat. Shaboozey)",
        youtube:
          "https://music.youtube.com/watch?v=7dDJi9WI_3Y&si=MbfXW0fnj7RQi_ik",
      },
      {
        title: "Born Winner",
        youtube:
          "https://music.youtube.com/watch?v=0DlCqC4iloY&si=R0i_fCsvI2r8nTZj",
      },
      {
        title: "I Told Them (feat. GZA)",
        youtube:
          "https://music.youtube.com/watch?v=cknp0H6P7Mo&si=0fzUzNI-YVUFATWT",
      },
      {
        title: "Normal",
        youtube:
          "https://music.youtube.com/watch?v=ab-0GReSZ4E&si=yr3cfLcSo7HpbNf-",
      },
      {
        title: "On Form",
        youtube:
          "https://music.youtube.com/watch?v=c0uvqtfDMvk&si=6Gk-PPFJN4XjJ3_h",
      },
      {
        title: "Sittin' On Top Of The World (feat. 21 Savage)",
        youtube:
          "https://music.youtube.com/watch?v=mMJ3Gogi2Qk&si=vqD-9XLouKR9iFWO",
      },
      {
        title: "Tested, Approved & Trusted",
        youtube:
          "https://music.youtube.com/watch?v=bGsKQxIwEeQ&si=fh5FE--l2PfMkhu7",
      },
      {
        title: "Cheat On Me(feat. Dave)",
        youtube:
          "https://music.youtube.com/watch?v=qgHV_nv8u3E&si=x2zU0o_3E3W9Z8x-",
      },
      {
        title: "Virgil",
        youtube:
          "https://music.youtube.com/watch?v=v9feT7K27HM&si=mqB1iap5qCI74XiZ",
      },
      {
        title: "Big 7",
        youtube:
          "https://music.youtube.com/watch?v=6GATRApPww8&si=OjNW0xi55yi51Wl3",
      },
      {
        title: "Dey Play",
        youtube:
          "https://music.youtube.com/watch?v=73WvAWUrKPw&si=Q61O4RYX2QHBQRsE",
      },
      {
        title: "Giza (feat. Seyi Vibez)",
        youtube:
          "https://music.youtube.com/watch?v=bWxyVF1LJAo&si=4M4fuGP99m104nEf",
      },
      {
        title: "12 Jewels (feat. RZA)",
        youtube:
          "https://music.youtube.com/watch?v=mG5MjELJN9U&si=6R_1tFhazwRICEtv",
      },
      {
        title: "If I'm Lying",
        youtube:
          "https://music.youtube.com/watch?v=Hs3i-IEK5h0&si=mEXT95hiJTgv8zrL",
      },
      {
        title: "Thanks(feat. J.Cole)",
        youtube:
          "https://music.youtube.com/watch?v=V0OkzP72qPs&si=PwZfWi07R7G5LczZ",
      },
      {
        title: "Talibans II (Bonus Track)",
        youtube:
          "https://music.youtube.com/watch?v=vrUGcGkPxP0&si=cONGJZunaTIq3Zar",
      },
      {
        title: "Vanilla",
        youtube:
          "https://music.youtube.com/watch?v=wNYl4ZCZDAI&si=CwXSLLmgBfLuOla4",
      },
      {
        title: "Rollercoaster (feat. J Balvin)",
        youtube:
          "https://music.youtube.com/watch?v=ZyVVGW-5ITw&si=kIImwXdV1n4utTdy",
      },
      {
        title: "Wonderful",
        youtube:
          "https://music.youtube.com/watch?v=k33o1IgtUEM&si=uOQxEEwIZTzUNySy",
      },
      {
        title: "Onyeka (Baby)",
        youtube:
          "https://music.youtube.com/watch?v=dW5y-4gKnIE&si=g8UEBK4vKWFKtrsu",
      },
      {
        title: "Wonderful",
        youtube:
          "https://music.youtube.com/watch?v=wy_j--ljb9w&si=tFUa4f7otrcKzNmW",
      },
      {
        title: "Real Life (feat. Stormzy)",
        youtube:
          "https://music.youtube.com/watch?v=dXeOBkKdiAg&si=3SNuBsWQhao2p18O",
      },
    ],
  },
  {
    id: "davido",
    name: "Davido",
    image: "/artists/davido.jpg",
    genre: "Afrobeats",
    country: "Nigeria",
    website: "https://www.iamdavido.com",
    youtube: "https://www.youtube.com/channel/UCkBV3nBa0iRdxEGc4DUS3xA",
    instagram: "https://www.instagram.com/davido/",
    twitter: "https://x.com/davido",
    spotify:
      "https://open.spotify.com/artist/0Y3agQaa6g2r0YmHPOO9rh?si=wRoAc2zESQ2w7NsDDhpprQ",
    tiktok: "https://www.tiktok.com/@davido?is_from_webapp=1&sender_device=pc",
    facebook: "https://web.facebook.com/davidoofficial2",
    soundcloud: null,
    linkedin: null,
    top_songs: [
      {
        title: "Fall",
        youtube: "https://www.youtube.com/watch?v=3Iyuym-Gci0",
      },
      {
        title: "With You (feat. Omah Lay)",
        youtube:
          "https://music.youtube.com/watch?v=XCjU9qbfv1U&si=yuVoIGJa_RNjyFST",
      },
      {
        title: "Unavailable",
        youtube: "https://www.youtube.com/watch?v=OSBan_sH_b8",
      },
      {
        title: "Kante (feat.Fave)",
        youtube:
          "https://music.youtube.com/watch?v=3bFPDfWReN0&si=7zXcO-m4ICZWStZd",
      },
      {
        title: "FEEL",
        youtube: "https://www.youtube.com/watch?v=GoWGGiWDsac",
      },
      {
        title: "If",
        youtube: "https://www.youtube.com/watch?v=helEv0kGHd4",
      },
      {
        title: "FEM",
        youtube:
          "https://music.youtube.com/watch?v=lta5go9P-go&si=Ksy4w0phdP4b8JnR",
      },
      {
        title: "Skelewu",
        youtube:
          "https://music.youtube.com/watch?v=201Key-GFZE&si=R1ROayY6130nMezJ",
      },
      {
        title: "FIA",
        youtube: "https://www.youtube.com/watch?v=8ORvJcpe2Oc",
      },
      {
        title: "Aye",
        youtube:
          "https://music.youtube.com/watch?v=Rah0515VNQ4&si=DFwJqgfjXj7UNPm4",
      },
      {
        title: "Risky",
        youtube:
          "https://music.youtube.com/watch?v=fUXSk0BoML4&si=78c1U5WCoJ2l07bp",
      },
      {
        title: "Assurance",
        youtube:
          "https://music.youtube.com/watch?v=s6oSG-HdZsw&si=wOqZleplEru-Sq1q",
      },
      {
        title: "Blow My Mind",
        youtube:
          "https://music.youtube.com/watch?v=r6fihQByHx0&si=1SnNRb-a2obWLuKv",
      },
      {
        title: "Jowo",
        youtube:
          "https://music.youtube.com/watch?v=1o8KwbP9CsQ&si=F9Pqf0KHLw8HPa5-",
      },
      {
        title: "Away",
        youtube:
          "https://music.youtube.com/watch?v=SbgKpHi-Cao&si=aRiRdKco64S6YeT7",
      },
      {
        title: "Na Money (feat.The Cavemen & Angélique Kidjo)",
        youtube:
          "https://music.youtube.com/watch?v=5OyDO_02yj8&si=DMorBtXXKCxn8mS0",
      },
      {
        title: "No Competition (feat. Asake)",
        youtube:
          "https://music.youtube.com/watch?v=qbfpZ8ieqsQ&si=qtgwrfbSRnrI3lwq",
      },
      {
        title: "Picasso (feat. Logos Olori)",
        youtube:
          "https://music.youtube.com/watch?v=SeZsIc99fxQ&si=6p1MHesM-Qc2UZcj",
      },
      {
        title: "For The Road",
        youtube:
          "https://music.youtube.com/watch?v=k04o0Zn7Zm8&si=vTCskfuF8ocsclAx",
      },
      {
        title: "Funds (feat. ODUMODUBLVCK & Chike)",
        youtube:
          "https://music.youtube.com/watch?v=7adDm9YACpE&si=n0qZu3D3t2DI_di2",
      },
      {
        title: "Awuke",
        youtube:
          "https://music.youtube.com/watch?v=ZzzvXGhq1JU&si=fjs0us3tkMJAhbgP",
      },
      {
        title: "R&B (Official Audio) (feat. 450)",
        youtube:
          "https://music.youtube.com/watch?v=SOh--nzeFtY&si=v3KDzo4Uwu7draip",
      },
      {
        title: "Offa Me (feat. Victoria Monét)",
        youtube:
          "https://music.youtube.com/watch?v=NnWe5Lhi0G8&si=gmYYVO3nzJlfmdkY",
      },
      {
        title: "Holy Water (feat. Victony & Musa Keys)",
        youtube:
          "https://music.youtube.com/watch?v=1xeNdOGej04&si=wmItdBFvR2cOmEKR",
      },
      {
        title: "Titanium (feat. Chris Brown)",
        youtube:
          "https://music.youtube.com/watch?v=7pCN8_V6Uvc&si=XxPjX02OE3-my09P",
      },
      {
        title: "10 Kilo",
        youtube:
          "https://music.youtube.com/watch?v=effQqa3_Xso&si=Pn1xIYy-JA2kEMA8",
      },
      {
        title: "Skelewu",
        youtube:
          "https://music.youtube.com/watch?v=201Key-GFZE&si=R1ROayY6130nMezJ",
      },
      {
        title: "Champion Sound",
        youtube:
          "https://music.youtube.com/watch?v=uG6Rz62ulqQ&si=DY0QVC8YS4XcSW0r",
      },
      {
        title: "Anything",
        youtube:
          "https://music.youtube.com/watch?v=MhQhczDRD1c&si=4vfYsRa_2WsFkTu_",
      },
      {
        title: "Be There Still",
        youtube:
          "https://music.youtube.com/watch?v=dAD73UeU6Dw&si=NeZJBAUwVv-Qp6mu",
      },
      {
        title: "CFMF",
        youtube:
          "https://music.youtube.com/watch?v=gWxnoiwrSNI&si=PuJTVf0oTAGhC5nu",
      },
      {
        title: "Don't Know",
        youtube:
          "https://music.youtube.com/watch?v=Jj3PBdPN1PQ&si=0kSEYCS0vg0lvkLF",
      },
      {
        title: "R&B (feat. Shenseea & 450)",
        youtube:
          "https://music.youtube.com/watch?v=SOh--nzeFtY&si=-AXem6iUcQqPmkOu",
      },
      {
        title: "Nuttin Dey",
        youtube:
          "https://music.youtube.com/watch?v=Xz9xnQsf1FY&si=Iv7CmRojP_2J5m8l",
      },
      {
        title: "Lately",
        youtube:
          "https://music.youtube.com/watch?v=bhOqx2m-peQ&si=JW8YnbiX5EnZ0ZpF",
      },
      {
        title: "Tek (feat. Becky G)",
        youtube:
          "https://music.youtube.com/watch?v=tD3Rp3Kcfos&si=pTL_BIfK1jpNh7_o",
      },
      {
        title: "Lover Boy (feat. Tayc & Dadju)",
        youtube:
          "https://music.youtube.com/watch?v=dWuRYkH_dgU&si=eoXXNjvz46kX4fTp",
      },
      {
        title: "OVER DEM",
        youtube:
          "https://music.youtube.com/watch?v=xy1VEf8NiPk&si=SixlSK6cm4Ob9IjH",
      },
      {
        title: "IN THE GARDEN (feat. Morravey)",
        youtube:
          "https://music.youtube.com/watch?v=eFStBh7AMZQ&si=o_ogPTyIIevlLdjn",
      },
      {
        title: "GODFATHER",
        youtube:
          "https://music.youtube.com/watch?v=zXwfKTvJ6lY&si=emkv4wJ3fpnCbj9I",
      },
      {
        title: "BOP (feat. Dexta Daps)",
        youtube:
          "https://music.youtube.com/watch?v=k3KtJXSBdH4&si=GC7HzPF_3ulMqRBP",
      },
      {
        title: "E PAIN ME",
        youtube:
          "https://music.youtube.com/watch?v=7NBSzoEJEBQ&si=MVH5dMqkdh0nrFAZ",
      },
      {
        title: "PRECISION",
        youtube:
          "https://music.youtube.com/watch?v=zNiwjQ7ioyk&si=aiZQiXhSRN_hEHEP",
      },
      {
        title: "U (JUJU) (feat. Skepta)",
        youtube:
          "https://music.youtube.com/watch?v=nEsEQJa43l0&si=ZmBx42KPG8TBEftv",
      },
      {
        title: "LCND",
        youtube:
          "https://music.youtube.com/watch?v=QkHTd2kCcj8&si=eETZ0piFX2t-8e7L",
      },
      {
        title: "Something Fishy",
        youtube:
          "https://music.youtube.com/watch?v=f3n7qG8f0oQ&si=ReL_obRouCld_qye",
      },
      {
        title: "Holy Ground (feat. Nicki Minaj)",
        youtube:
          "https://music.youtube.com/watch?v=JtEv_3Rwn1o&si=jUqI4d3Rz8a8Rkd1",
      },
      {
        title: "Heaven",
        youtube:
          "https://music.youtube.com/watch?v=5Xl0kAVywDo&si=pPNYHUWEij4wFhxn",
      },
      {
        title: "Very Special",
        youtube:
          "https://music.youtube.com/watch?v=5rsYTFfA2fA&si=MocPYGZQZf3vCKja",
      },
      {
        title: "The Best (feat. Mayorkun)",
        youtube:
          "https://music.youtube.com/watch?v=91D1H29rToQ&si=X05wcf9LJ8AKPG6_",
      },
      {
        title: "Shopping Spree (feat. Chris Brown & Young Thug)",
        youtube:
          "https://music.youtube.com/watch?v=vKR0Drgf6vc&si=4P7ADJIPzrtSc_e1",
      },
      {
        title: "Sunlight",
        youtube:
          "https://music.youtube.com/watch?v=1_NT6L_Hx_Y&si=5lf-rUoEgX8c9FZz",
      },
      {
        title: "Tanana (feat. Tiwa Savage)",
        youtube:
          "https://music.youtube.com/watch?v=VUMae7HT3TY&si=piYpyVYgwxXZ1PG7",
      },
      {
        title: "Mebe (feat. MUGEEZ)",
        youtube:
          "https://music.youtube.com/watch?v=pjl3FaElICc&si=K7s6OgqyBm0AxUPG",
      },
      {
        title: "La La (feat. Ckay)",
        youtube:
          "https://music.youtube.com/watch?v=NM8cY2VzqkI&si=P_HqkLEzjp73Ofga",
      },
      {
        title: "So Crazy (feat. Lil Baby)",
        youtube:
          "https://music.youtube.com/watch?v=8xjE0cGsFHY&si=Jydwgs-vC6UR5ltP",
      },
      {
        title: "Shopping Spree (feat. Chris Brown & Young Thug)",
        youtube:
          "https://music.youtube.com/watch?v=vKR0Drgf6vc&si=4P7ADJIPzrtSc_e1",
      },
      {
        title: "Birthday Cake (feat. Nas & Hitboy)",
        youtube:
          "https://music.youtube.com/watch?v=HZgbmo5f3d0&si=MTQCRA7KRCwyxu8Y",
      },
      {
        title: "I Got a Friend (feat. Mayorkun & Sho Madjozi)",
        youtube:
          "https://music.youtube.com/watch?v=3FJCASAOmts&si=4xxqDFbpCPJh5mea",
      },
      {
        title: "Fade (feat. Bella Shmurda)",
        youtube:
          "https://music.youtube.com/watch?v=9y9a8adcL00&si=IuqWwHTzwOoJG9Xf",
      },
      {
        title: "On My Way (feat. Sauti Sol)",
        youtube:
          "https://music.youtube.com/watch?v=aHUwnGUlAog&si=qsqaOpRrLL1TN4Fp",
      },
      {
        title: "1 Milli",
        youtube:
          "https://music.youtube.com/watch?v=1x5tIv6GC1o&si=HH_xoEoVI6R056Dd",
      },
      {
        title: "Disturbance (feat. Peruzzi)",
        youtube:
          "https://music.youtube.com/watch?v=d9OL9NgE8JA&si=8K4v6dpPRVGr9fkr",
      },
      {
        title: "Sweet in the Middle (feat. Wurld, Naira Marley & Zlatan)",
        youtube:
          "https://music.youtube.com/watch?v=UVte8a_2q80&si=o5AQe38X4kV4xwRL",
      },
      {
        title: "Dami Duro",
        youtube:
          "https://music.youtube.com/watch?v=6CyUo6rQ2rU&si=KtZJtF_l6XGohRME",
      },
      {
        title: "Back When (feat. Naeto C)",
        youtube:
          "https://music.youtube.com/watch?v=0rA4gE_Dtsw&si=_-IX7w8W5WP8LOLp",
      },
      {
        title:
          "Davido - All of You (Official Video) (feat. Young Thug & Rae Sremmurd)",
        youtube:
          "https://music.youtube.com/watch?v=A8h0G3wrH7s&si=vMruMlWVwtgXWVES",
      },
      {
        title: "Stand Strong (feat. Sunday Service Choir)",
        youtube:
          "https://music.youtube.com/watch?v=vtWjk_CiSQI&si=84Hzi6G3J1Vmjp64",
      },
    ],
  },
  {
    id: "asake",
    name: "Asake",
    website: null,
    image: "/artists/asake.jpeg",
    genre: "Afrobeats",
    country: "Nigeria",
    instagram: "https://www.instagram.com/asakefp/",
    twitter: "https://x.com/asakemusik",
    spotify:
      "https://open.spotify.com/artist/3a1tBryiczPAZpgoZN9Rzg?si=y6FOZ-7JS-SkvEYe8WppAg",
    youtube: "https://www.youtube.com/channel/UCU9R50wyBPKpdbcIScAyZig",
    tiktok:
      "https://www.tiktok.com/@asakelife?is_from_webapp=1&sender_device=pc",
    facebook: null,
    soundcloud: null,
    linkedin: null,
    top_songs: [
      {
        title: "Sungba",
        youtube: "https://www.youtube.com/watch?v=5A-CjKOQWvg",
      },
      {
        title: "MMS",
        youtube: "https://www.youtube.com/watch?v=iiOHqmmjdGk",
      },
      {
        title: "Organise",
        youtube:
          "https://music.youtube.com/watch?v=JDTZWazs-Fs&si=pGWqv7YM_yUIE6Uq",
      },
      {
        title: "Peace Be Unto You (PBUY)",
        youtube: "https://www.youtube.com/watch?v=MefXQvGTYtE",
      },
      {
        title: "Amapiano",
        youtube: "https://www.youtube.com/watch?v=l_-v1fNdSHs",
      },
      {
        title: "Lonely At The Top",
        youtube:
          "https://music.youtube.com/watch?v=T4G5uTd72EM&si=FhOsclPSsXdw1Gen",
      },
      {
        title: "Remember",
        youtube:
          "https://music.youtube.com/watch?v=MhvVRw5XTVY&si=pIpDLuxC0dfeOD_J",
      },
      {
        title: "Sungba (Remix) (feat. Burna Boy)",
        youtube:
          "https://music.youtube.com/watch?v=KpfgApk7ERA&si=DlFNwQqOw-q5I-FS",
      },
      {
        title: "Omo Ope (feat. Olamide)",
        youtube:
          "https://music.youtube.com/watch?v=IGUXFzIzWMo&si=urKKtmvyKACUPLei",
      },
      {
        title: "Joha",
        youtube:
          "https://music.youtube.com/watch?v=Dc6Sk-YfEWQ&si=fB3oIVQw322I5NrS",
      },
      {
        title: "Nzaza",
        youtube:
          "https://music.youtube.com/watch?v=KF0Xl-uJyNc&si=y_Sx0gFp_zmBx7mU",
      },

      {
        title: "Terminator",
        youtube:
          "https://music.youtube.com/watch?v=yi2D7H4b9BY&si=Uvt_4PMc7v3UUFnS",
      },
      {
        title: "Ototo",
        youtube:
          "https://music.youtube.com/watch?v=g8nu0IoC3Mw&si=MYjjDIXTofN5t104",
      },
      {
        title: "Yoga",
        youtube:
          "https://music.youtube.com/watch?v=UeIT8OHwtd0&si=fSszd2XZBNmGB8za",
      },
      {
        title: "Basquiat",
        youtube:
          "https://music.youtube.com/watch?v=UzSDU9WC5kY&si=0CB_bLc8-aJ-kI6H",
      },
      {
        title: "2:30",
        youtube:
          "https://music.youtube.com/watch?v=xsgDo3mOGFM&si=i5194qc62rm3XczM",
      },
      {
        title: "Great Guy",
        youtube:
          "https://music.youtube.com/watch?v=NKqXl7ddKTQ&si=Y6CYW8whgFi-8t__",
      },
      {
        title: "Mogbe",
        youtube:
          "https://music.youtube.com/watch?v=8rdIBplBlqA&si=vuwH9cF-Em-rWhEV",
      },
      {
        title: "Mood",
        youtube:
          "https://music.youtube.com/watch?v=nuXHzN1QDcA&si=XsT5Hh1Wkr4CVGZK",
      },
      {
        title: "Dupe",
        youtube:
          "https://music.youtube.com/watch?v=thXd_T_xpFU&si=v_1ol2JPo-VRC6mR",
      },
      {
        title: "Only Me",
        youtube:
          "https://music.youtube.com/watch?v=leY0Bu5wCHs&si=dUI2eNAjN0FDCfpF",
      },
      {
        title: "I Believe",
        youtube:
          "https://music.youtube.com/watch?v=xOMPzlzGcfM&si=kIgI-xQCVgBwrpDx",
      },

      {
        title: "What's Up My G",
        youtube:
          "https://music.youtube.com/watch?v=xCMXE0sGZNM&si=9LkA68GgAi7-QeI2",
      },
      {
        title: "Dull",
        youtube:
          "https://music.youtube.com/watch?v=lxK1V0siJqI&si=69ANyXGpELHJiD8T",
      },
      {
        title: "My Heart",
        youtube:
          "https://music.youtube.com/watch?v=gs9Ard7ql6s&si=uDdExN5E_F3gs7--",
      },
      {
        title: "Worldwide",
        youtube:
          "https://music.youtube.com/watch?v=kDgumW4ARRg&si=O_2kzQyDzXKymnSP",
      },
      {
        title: "Active",
        youtube:
          "https://music.youtube.com/watch?v=sZhysJHLn_s&si=RnYDncho7qNumSb0",
      },

      {
        title: "Suru",
        youtube:
          "https://music.youtube.com/watch?v=9ESi6RpUg2E&si=yUYR2z0nBMYvqN7F",
      },
      {
        title: "Skating",
        youtube:
          "https://music.youtube.com/watch?v=nTcLF0rpLAI&si=EUborwGLyLIbOdeC",
      },
      {
        title: "Wave",
        youtube:
          "https://music.youtube.com/watch?v=cNHfCr_hjYc&si=EvOv7uaaIQaZzKbh",
      },
      {
        title: "Mentally",
        youtube:
          "https://music.youtube.com/watch?v=_vQY4wmO0M0&si=eOG-RkLMf7jDvp39",
      },
      {
        title: "Uhh Yeahh",
        youtube:
          "https://music.youtube.com/watch?v=amojDNZ_ZkY&si=7_VeHnUpV6Oe5XSd",
      },
      {
        title: "I Swear",
        youtube:
          "https://music.youtube.com/watch?v=1f13PrjFgBs&si=AV1xIvWC9e5T6Ron",
      },
      {
        title: "Ligali",
        youtube:
          "https://music.youtube.com/watch?v=GhMK-fp6Hps&si=TD8XokcwMwf6U7KV",
      },
      {
        title: "Whine",
        youtube:
          "https://music.youtube.com/watch?v=XbeYV3fZYfE&si=Sr8Znp8n0dK4w5IK",
      },
      {
        title: "Fuji Vibe",
        youtube:
          "https://music.youtube.com/watch?v=9KzD3lTZ2es&si=NyAwfaj_OUg-9icQ",
      },
      {
        title: "WHY LOVE",
        youtube:
          "https://music.youtube.com/watch?v=VmakV_meVY0&si=RiFix4z-MuPuhJIx",
      },
      {
        title: "Sunshine",
        youtube:
          "https://music.youtube.com/watch?v=PUkabY_aNmI&si=i-TZcXGI9FIpoMoe",
      },
      {
        title: "Olorun",
        youtube:
          "https://music.youtube.com/watch?v=Yt-841OSeLA&si=zgTqoTaqG3UnOOzX",
      },
      {
        title: "Awodi",
        youtube:
          "https://music.youtube.com/watch?v=-lkZ25iPCBI&si=YqjoIz-McfxDSoHc",
      },
      {
        title: "Introduction",
        youtube:
          "https://music.youtube.com/watch?v=pBsfFaMGtp0&si=fWDRTSnj_g-jCRS9",
      },
      {
        title: "Muse",
        youtube:
          "https://music.youtube.com/watch?v=Zrd-ZJMWySs&si=P03MVtZfdrSHAk9a",
      },
      {
        title: "Reason (feat. Russ)",
        youtube:
          "https://music.youtube.com/watch?v=bBCIZe6Cjd0&si=UuQKnyCl_0uMiSq_",
      },
      {
        title: "Sunmomi",
        youtube:
          "https://music.youtube.com/watch?v=BNxcwtBg1W4&si=Xop92umbPG8GPbSz",
      },
      {
        title: "Trabaye",
        youtube:
          "https://music.youtube.com/watch?v=veKu9fWWeJ0&si=Ttjj8o8SmqhRdqkv",
      },
      {
        title: "Baba God",
        youtube:
          "https://music.youtube.com/watch?v=G5qInEh1I0I&si=i8YRA0WeWjfqcYJD",
      },
      {
        title: "Military",
        youtube:
          "https://music.youtube.com/watch?v=GVE9G5CiLbs&si=GYNJHyChUNBD7Vxb",
      },
    ],
  },
  {
    id: "focalistic",
    name: "Focalistic",
    website: null,
    image: "/artists/focalistic.jpg",
    genre: "Amapiano",
    country: "South Africa",
    instagram: "https://www.instagram.com/focalistic/",
    twitter: " https://x.com/FOCALISTIC",
    spotify:
      "https://open.spotify.com/artist/2GJMSZ7M3D0KyyKRhYgWju?si=iMAjWS0zT-yOQ-ycc6j9hA",
    youtube: "https://www.youtube.com/channel/UC9nSslE0YFzYrisAPx13RTg",
    tiktok:
      "https://www.tiktok.com/@focalisticofficial?is_from_webapp=1&sender_device=pc",
    facebook: "https://web.facebook.com/FOCALISTIC",
    soundcloud: null,
    linkedin: null,
    top_songs: [
      {
        title: "Ke Star",
        youtube: "https://www.youtube.com/watch?v=a9_da2P5JjQ",
      },
      {
        title: "Champion Sound (with Davido)",
        youtube: "https://www.youtube.com/watch?v=i-J0Fdze42M",
      },
      {
        title: "Mehlomadala (feat. Lusanda, Zwayetoven & SOUL NATIVES)",
        youtube:
          "https://music.youtube.com/watch?v=tuc1Ixhalac&si=xVnGLhS_BWCPpPia",
      },
      {
        title: "13 POS (Ke Bo Mang)",
        youtube:
          "https://music.youtube.com/watch?v=FV59CFdZG2Q&si=0dPZMJJzHX8gOjAc",
      },
      {
        title: "Schwarzenegger (feat. Sims Noreng & Herc Cut the Lights)",
        youtube:
          "https://music.youtube.com/watch?v=tnlD6MKXNG4&si=4jRy1hbkJ47nBNez",
      },
      {
        title: "Tsoma Rona",
        youtube:
          "https://music.youtube.com/watch?v=j370eBD0c-g&si=mgDMAGYJSj6AK-Z9",
      },
      {
        title: "Lephodisa (feat. Mellow & Sleazy & Vyno Keys)",
        youtube:
          "https://music.youtube.com/watch?v=g4WdghIwFic&si=PfPqPl1UGMPh3tL-",
      },
      {
        title: "Summer Ya Mapara (feat. Mellow & Sleazy & Thama Tee)",
        youtube:
          "https://music.youtube.com/watch?v=fTVyR8iN93c&si=WE8TdQdgfg20llja",
      },
      {
        title: "PSL WAVE (feat. Ch'cco, M.J, Mellow & Sleazy & Thama Tee)",
        youtube:
          "https://music.youtube.com/watch?v=Qa4QHn_dCCc&si=ZZumhJIy2yVWCMrL",
      },
      {
        title: "Letheka (feat. Thama Tee)",
        youtube:
          "https://music.youtube.com/watch?v=vt68SD0D0d4&si=9UhZlehmzmWnWM14",
      },
      {
        title: "Shwele",
        youtube:
          "https://music.youtube.com/watch?v=fYefy2U3tw4&si=zeZpsMwM89N0U0Ea",
      },
      {
        title: "Dipuo (feat. Herc & Sjava)",
        youtube:
          "https://music.youtube.com/watch?v=K4BKevYCsDE&si=gzHnEpAkWXW4RHSf",
      },
      {
        title: "Timana (feat. DBN Gogo & Sfarzo Rtee)",
        youtube:
          "https://music.youtube.com/watch?v=Yw0jJiUW_g0&si=0fZG3hCaI_qx8qOt",
      },
      {
        title: "Boshego (feat. Elaine, Mellow ",
        youtube:
          "https://music.youtube.com/watch?v=TZVjQCROHp4&si=TCEMEXpUUjt4D8h_",
      },
      {
        title: "Tsela Tse Nyane (feat. M.J, MJ, MNS & Pabi Cooper)",
        youtube:
          "https://music.youtube.com/watch?v=kSJRWUfRngY&si=yhq7CZ6v6gByCanu",
      },
      {
        title:
          "Tabela Hape (feat. Kabza De Small, M.J, MJ & Mellow and Sleazy)",
        youtube:
          "https://music.youtube.com/watch?v=1MB7nlEImT4&si=AabKDPNCuTHzC3DU",
      },
      {
        title: "Botlhoko (feat. Herc)",
        youtube:
          "https://music.youtube.com/watch?v=xR6DACr94Xk&si=ho4avJHGPhIhr5Go",
      },
      {
        title:
          "HARDA (feat. Herc Cut the Lights, Jay Sax, Shishiliza & Tshego)",
        youtube:
          "https://music.youtube.com/watch?v=69cn12aNh78&si=0Vj6ldKn0jDMSITw",
      },
      {
        title: "Limousine (feat. DJ 787 & Justin99)",
        youtube:
          "https://music.youtube.com/watch?v=EVeSMQzMru4&si=eszMdBMZCxi4TE3V",
      },
      {
        title: "Ntjaka Mei Dawg (feat. Ch'cco, Lastborn, MNS & SjavasDeDeejay)",
        youtube:
          "https://music.youtube.com/watch?v=qnz2I1DO7Ok&si=HPomkq4NC95lK_2W",
      },
      {
        title: "SJEPA (feat. M.J)",
        youtube:
          "https://music.youtube.com/watch?v=PXuUT8Ny8rY&si=tEct1UVA9kZeBdV6",
      },
      {
        title: "Fire (feat. Felo Le Tee, MHD, Mellow & Sleazy & Mellow)",
        youtube:
          "https://music.youtube.com/watch?v=GLI1x3bPqPM&si=zLJHke3t3yH73G-R",
      },
      {
        title: "Dzudza (feat. Mellow & Sleazy, Mellow & Sleazy)",
        youtube:
          "https://music.youtube.com/watch?v=Z5vYaSTHQFQ&si=BafI0X8aT66mDfcW",
      },
      {
        title: "I'm Not The Father (feat. Justin99)",
        youtube:
          "https://music.youtube.com/watch?v=bk50HqgWVMk&si=ItJMkEwkwXdlO4P4",
      },
      {
        title: "Nka Mo Dira (feat. Herc Cut the Lights)",
        youtube:
          "https://music.youtube.com/watch?v=tXOsVqTYQZ4&si=AaAhcsJkPxGObUTR",
      },
      {
        title: "Might Not Forgive You (feat. Dynasty & Sjava)",
        youtube:
          "https://music.youtube.com/watch?v=41cOv5QOiFM&si=AyZ3-klAenit8CI4",
      },
      {
        title: "Sghubu Ses Excellent (feat. Bongza, MDU aka TRP & Madumane)",
        youtube:
          "https://music.youtube.com/watch?v=jKY9LH5c42k&si=5MY05AnuqTOZbqW-",
      },
      {
        title: "Ke Star (feat. Vigro Deep)",
        youtube:
          "https://music.youtube.com/watch?v=a9_da2P5JjQ&si=W2YOIV6gv3TukxM-",
      },
      {
        title: "Tashkuma (feat. Mellow & Sleazy, Tyler ICU, Sleazy & Mellow)",
        youtube:
          "https://music.youtube.com/watch?v=QjXM02IAoVo&si=me_RIXdm2M4jqaoT",
      },
      {
        title: "Onoroko (feat. Reece Madlisa, Riky Rick & Semi Tee)",
        youtube:
          "https://music.youtube.com/watch?v=Ar_4Ow2gqf8&si=oYZ5QrK1MRyN2HSA",
      },
      {
        title: "Benz and Beamer (feat. Mas Musiq)",
        youtube:
          "https://music.youtube.com/watch?v=9TMDKBoF4cQ&si=7i4Yp09kqD2ejjg5",
      },
      {
        title: "Vrr Phaa (feat. Vigro Deep)",
        youtube:
          "https://music.youtube.com/watch?v=ck1J6LbnP9w&si=7idVFxg6hPHuw1nP",
      },
      {
        title: "In Your Mind (feat. DJ Maphorisa, DJ Venom & Tyler ICU)",
        youtube:
          "https://music.youtube.com/watch?v=4a0efQh1UnY&si=Ah3LlwMoJ0D20f2x",
      },
      {
        title: "Stlamatlama (feat. 25K, Abidoza & Junior Taurus)",
        youtube:
          "https://music.youtube.com/watch?v=zFtGXiGgdfo&si=-DyBZJZhXXjphd_8",
      },
      {
        title: "Billion",
        youtube:
          "https://music.youtube.com/watch?v=nnVl4fDfCWk&si=1X1xaBnivGgQbZiH",
      },
      {
        title: "Palama (feat. DBN Gogo, Mellow & Sleazy & Sleazy)",
        youtube:
          "https://music.youtube.com/watch?v=PhGaIX4Z5Is&si=OPwBhTUdm-EbJFjl",
      },
      {
        title: "Phalafala (feat. Mr JazziQ)",
        youtube:
          "https://music.youtube.com/watch?v=l63UFWaaf-s&si=diaufM-X0VuQH7Gp",
      },
      {
        title: "Blecke (feat. JazziDisciples)",
        youtube:
          "https://music.youtube.com/watch?v=fHDjfd4tNGI&si=auElIGRqvr0wQdHs",
      },
      {
        title: "Sefela (feat. Mas Musiq)",
        youtube:
          "https://music.youtube.com/watch?v=1E-bXYc9_GE&si=WgAzEA6tgN47aHyg",
      },
      {
        title: "City on Fire (feat. Abidoza & Squad Sa Maradona)",
        youtube:
          "https://music.youtube.com/watch?v=mIKdM6vByUY&si=OXbDEx2q43_rf4sN",
      },
    ],
  },
  {
    id: "wizkid",
    name: "Wizkid",
    website: "https://www.wizkidofficial.com/",
    image: "/artists/wizkid.jpg",
    genre: "Afrobeats",
    country: "Nigeria",
    instagram: "https://www.instagram.com/wizkidayo/",
    twitter: "https://x.com/wizkidayo",
    spotify:
      "https://open.spotify.com/artist/3tVQdUvClmAT7URs9V3rsp?si=kd0IBcDwQ16ectjyrL3uig",
    youtube: "https://www.youtube.com/channel/UCi7Cbr-F3zFQjwafFh5RWJA",
    tiktok:
      "https://www.tiktok.com/@wizkidayo?is_from_webapp=1&sender_device=pc",
    facebook: "https://web.facebook.com/wizkidmusic",
    soundcloud: null,
    linkedin: null,
    top_songs: [
      {
        title: "Essence (feat. Tems)",
        youtube: "https://www.youtube.com/watch?v=jipQpjUA_o8",
      },
      {
        title: "2 Sugar (feat. Ayra Starr)",
        youtube: "https://youtu.be/o_oenl2Be-w?si=a-sJhfe7ED9gl5cV",
      },
      {
        title: "Ojuelegba",
        youtube: "https://www.youtube.com/watch?v=Q7QiLceJSLQ",
      },
      {
        title: "Bad to Me",
        youtube: "https://youtu.be/2mkhevOXVNk?si=qC1s7JYl2E1J8zu5",
      },
      {
        title: "Ginger ft Burna Boy",
        youtube: "https://www.youtube.com/watch?v=YSy2lBZ1QrA",
      },
      {
        title: "Come Closer (feat. Drake)",
        youtube:
          "https://music.youtube.com/watch?v=vqW18C4plZ8&si=XzFOkCGhaNF9n7p4",
      },
      {
        title: "KANTE",
        youtube: "https://www.youtube.com/watch?v=3bFPDfWReN0",
      },
      {
        title: "Kese (Dance)",
        youtube:
          "https://music.youtube.com/watch?v=HLnf2Hz7uNQ&si=YYPIzt2jhUvu-8hW",
      },
      {
        title: "Daddy Yo",
        youtube:
          "https://music.youtube.com/watch?v=_2uqOvEo2bQ&si=Qjx0dqoddzQ9eOw8",
      },
      {
        title: "Piece of My Heart (feat. Brent Faiyaz)",
        youtube:
          "https://music.youtube.com/watch?v=zr_sTaYTCnU&si=lyiuGqO7DtbEgX2K",
      },
      {
        title: "Troubled Mind",
        youtube:
          "https://music.youtube.com/watch?v=yQqgmnm7FYQ&si=WcnxD-kLO9-tCJWG",
      },
      {
        title: "Karamo",
        youtube:
          "https://music.youtube.com/watch?v=_hVqCmQnjVI&si=PhZIit_Lhz6_svs5",
      },
      {
        title: "Bad Girl (feat. Asake)",
        youtube:
          "https://music.youtube.com/watch?v=_yBN8oPTYw8&si=V8cacjpVEc2HWs_b",
      },
      {
        title: "Time",
        youtube:
          "https://music.youtube.com/watch?v=W9fnpW4gj2c&si=83-uN1q0Qacab_oa",
      },
      {
        title: "Break Me Down",
        youtube:
          "https://music.youtube.com/watch?v=4X99ILim7lY&si=bntwOP03otTrkZ0m",
      },
      {
        title: "Bend",
        youtube:
          "https://music.youtube.com/watch?v=ysCEMY5xji8&si=vX12CQFLDW1zXRre",
      },
      {
        title: "A Million Blessings",
        youtube:
          "https://music.youtube.com/watch?v=ZJK2PGATcks&si=DYO5vth-ilS3jTNK",
      },
      {
        title: "Après Minuit (feat. Tiakola)",
        youtube:
          "https://music.youtube.com/watch?v=8P9OTwq56nA&si=6HspknhF7BetHous",
      },
      {
        title: "Bad For You (feat. Jazmine Sullivan)",
        youtube:
          "https://music.youtube.com/watch?v=4xuIeEbKMxg&si=Ae0xInHhOXXmjnui",
      },
      {
        title: "Soji",
        youtube:
          "https://music.youtube.com/watch?v=4qcx3fDRPMY&si=RPrGTxGwsghZDYy4",
      },
      {
        title: "Don't Care",
        youtube:
          "https://music.youtube.com/watch?v=lqzWCQbp5IY&si=rA0pCT7_g6y18JYK",
      },
      {
        title: "Slow (feat. Anaïs Cardot)",
        youtube:
          "https://music.youtube.com/watch?v=eLpDOvpQ_Bg&si=8v58C4tDm8F4LX72",
      },
      {
        title: "Lose",
        youtube:
          "https://music.youtube.com/watch?v=7QTZ0UXuHMo&si=CTQLCYk2r0eKRbzd",
      },
      {
        title: "Pray",
        youtube:
          "https://music.youtube.com/watch?v=Q3RwMNTYQ4M&si=7jP5Kv40_ueQNH3z",
      },
      {
        title: "Money & Love",
        youtube:
          "https://music.youtube.com/watch?v=rEEZD5hXgrQ&si=4b5aiK_strZx56O6",
      },
      {
        title: "Balance",
        youtube:
          "https://music.youtube.com/watch?v=nuWA-Gz2XJE&si=w9ogrdjVu4gKE6GC",
      },
      {
        title: "Everyday",
        youtube:
          "https://music.youtube.com/watch?v=9N1KuCtPymQ&si=N540Dm8sxww7-vbl",
      },
      {
        title: "Slip N Slide (feat. Skillibeng & Shenseea)",
        youtube:
          "https://music.youtube.com/watch?v=rfXpczaipOE&si=pLMtB7hzS399b42n",
      },
      {
        title: "Deep",
        youtube:
          "https://music.youtube.com/watch?v=00vI7Bfr7Zc&si=55bFa-VozzFIoSB_",
      },
      {
        title: "Flower Pads",
        youtube:
          "https://music.youtube.com/watch?v=0IgAZ6LS-30&si=vDlIFQL-crYUc1gZ",
      },
      {
        title: "Wow (feat. Skepta & Naira Marley)",
        youtube:
          "https://music.youtube.com/watch?v=-O-APTagYKw&si=15R1DkWnjS6S8u6b",
      },
      {
        title: "Pressure",
        youtube:
          "https://music.youtube.com/watch?v=bycVtHqd_XU&si=ezPkdl9miLuEFFjF",
      },
      {
        title: "Plenty Loving",
        youtube:
          "https://music.youtube.com/watch?v=9qyWiofvzpA&si=4E9cuFbkh4rvZcm0",
      },
      {
        title: "Special (feat. Don Toliver)",
        youtube:
          "https://music.youtube.com/watch?v=O5u8syC6xOo&si=h80L2elOnT4IGwfP",
      },
      {
        title: "Frames (Who's Gonna Know)",
        youtube:
          "https://music.youtube.com/watch?v=Pva6HclLqkI&si=-kYFjWgyYzDYnPfW",
      },
      {
        title: "Reckless",
        youtube:
          "https://music.youtube.com/watch?v=qEEsc8j-FVI&si=CqEIJRyQr5mzpMt7",
      },
      {
        title: "Longtime (feat. Skepta)",
        youtube:
          "https://music.youtube.com/watch?v=RPxw0nR9HXU&si=SWZ5AaxdAJXfiiJP",
      },
      {
        title: "Mighty Wine",
        youtube:
          "https://music.youtube.com/watch?v=_KXHTdq9URg&si=p_jusLWvHgF_csGU",
      },
      {
        title: "Blessed (feat. Damian Marley)",
        youtube:
          "https://music.youtube.com/watch?v=QUSc5al8JpY&si=9tFlGbxFdNJrLC68",
      },
      {
        title: "Smile (feat. H.E.R.)",
        youtube:
          "https://music.youtube.com/watch?v=4oseK1D6ru0&si=ChiyvWZwfqKlCwjp",
      },
      {
        title: "Piece of Me (feat. Ella Mai)",
        youtube:
          "https://music.youtube.com/watch?v=dMlShGP7TfY&si=GaJU90mZbQEsqMP5",
      },
      {
        title: "No Stress",
        youtube:
          "https://music.youtube.com/watch?v=veIK9yEabNc&si=leHseeKUmf29kcyb",
      },
      {
        title: "True Love (feat. Tay Iwar & Projexx)",
        youtube:
          "https://music.youtube.com/watch?v=RstK5waga3o&si=JCw1arTAPHSv0u32",
      },
      {
        title: "Sweet One",
        youtube:
          "https://music.youtube.com/watch?v=b-K6O8yxXpg&si=kphPPL5eyjOEbcxf",
      },
      {
        title: "Roma (feat. Terri)",
        youtube:
          "https://music.youtube.com/watch?v=J_pYbRiFwJM&si=nI6QCU9PfHQu1eyQ",
      },
      {
        title: "Gyrate",
        youtube:
          "https://music.youtube.com/watch?v=L0ZB_UvVAuI&si=bq9a1v2fFcIajKO3",
      },
      {
        title: "Grace",
        youtube:
          "https://music.youtube.com/watch?v=wInDaQ1Hj6A&si=4nYilMj6Pmjva181",
      },
      {
        title: "Anoti",
        youtube:
          "https://music.youtube.com/watch?v=6OCkvnz4_Tc&si=syoWZP4pc6gIZ4ok",
      },
      {
        title: "Mood (feat. BNXN)",
        youtube:
          "https://music.youtube.com/watch?v=r-Q6UrrxF4U&si=OcK9fHL-5pnzqLh6",
      },
      {
        title: "Steady",
        youtube:
          "https://music.youtube.com/watch?v=3YFz0CDeHMQ&si=2UX18RPkrwRPMmYW",
      },
      {
        title: "Essence (feat. Justin Bieber & Tems)",
        youtube:
          "https://music.youtube.com/watch?v=WYSQ5nyRQ9Q&si=hMFzOutbZ9Zh58MA",
      },
      {
        title: "Shabba",
        youtube:
          "https://music.youtube.com/watch?v=h-EUPC7SGaw&si=eg4sZ2XjVYIi8RMp",
      },
      {
        title: "Wad Up",
        youtube:
          "https://music.youtube.com/watch?v=QaGqsV5VV-k&si=YWiv2Cd5FIxyUNeS",
      },
      {
        title: "For You",
        youtube:
          "https://music.youtube.com/watch?v=3Us0oEwRwu0&si=EQ9C1uZTH-WY_t2K",
      },
      {
        title: "Slow Whine",
        youtube:
          "https://music.youtube.com/watch?v=JVf7zIdhz34&si=Yy_V6wcz9lOZ-6G0",
      },
      {
        title: "Jaiye Jaiye",
        youtube:
          "https://music.youtube.com/watch?v=bejM44z1NIA&si=dGB6RB4otj6e17hZ",
      },
      {
        title: "Dutty Whine",
        youtube:
          "https://music.youtube.com/watch?v=UetdgIVHNBs&si=YtwmlF8cKtpuh-p4",
      },
      {
        title: "Bombay",
        youtube:
          "https://music.youtube.com/watch?v=7U4l5ccwb-A&si=sU5f5c2J-WRIbOf_",
      },
      {
        title: "One Life",
        youtube:
          "https://music.youtube.com/watch?v=a7Lk-wym0sA&si=tL7y-lhJqdVKoEMC",
      },
      {
        title: "In Love",
        youtube:
          "https://music.youtube.com/watch?v=3RIZGePKT2s&si=PISG3EADNhlLEHCG",
      },
      {
        title: "Murder",
        youtube:
          "https://music.youtube.com/watch?v=wjdo1-3OBYM&si=oRIjOAePifXbI-29",
      },
      {
        title: "For Me",
        youtube:
          "https://music.youtube.com/watch?v=-iWNl8xdO0I&si=CTRC3-buz5y4mJDw",
      },
      {
        title: "One Question",
        youtube:
          "https://music.youtube.com/watch?v=xDAtmOu_oyk&si=g6UTIEiyKhSLQwQd",
      },
      {
        title: "Roll It (Remix)",
        youtube:
          "https://music.youtube.com/watch?v=ESs0-2Xlgok&si=7CIqs0Lrel_FfZZT",
      },
      {
        title: "Celebrate",
        youtube:
          "https://music.youtube.com/watch?v=XL_9X5BZcs4&si=yvgzLpdE9nayMdlT",
      },
      {
        title: "Sweet Love",
        youtube:
          "https://music.youtube.com/watch?v=yFTaNokK4cU&si=ZeK5If8opjIlVLcw",
      },
      {
        title: "Naughty Ride (feat. Major Lazer)",
        youtube:
          "https://music.youtube.com/watch?v=e3AyM9SFBJY&si=WtdtYGDdFw-npK_k",
      },
      {
        title: "African Bad Gyal (feat. Chris Brown)",
        youtube:
          "https://music.youtube.com/watch?v=HxDBJ1fOQ4I&si=aOHzUhE9xbXGGDt9",
      },
      {
        title: "One For Me (feat. Ty Dolla $ign)",
        youtube:
          "https://music.youtube.com/watch?v=WiG8qNbv3No&si=PwG89DsM1oK59nn0",
      },
      {
        title: "Picture Perfect",
        youtube:
          "https://music.youtube.com/watch?v=2AG9OXP8NNU&si=yAVdTydSwcgRECdC",
      },
      {
        title: "Nobody",
        youtube:
          "https://music.youtube.com/watch?v=azZ0Tcq1IYU&si=r6Kw5LVLYrfzL-cE",
      },
      {
        title: "Sexy",
        youtube:
          "https://music.youtube.com/watch?v=Nth7ckNr3HY&si=EUaJcsJFfz4TKHVd",
      },
      {
        title: "All For Love (feat. Bucie)",
        youtube:
          "https://music.youtube.com/watch?v=OQTIqSfOp5Q&si=n0YMMML1ow_rjThF",
      },
      {
        title: "Dirty Wine (feat. Ty Dolla $ign)",
        youtube:
          "https://music.youtube.com/watch?v=8ZsD_EW0HYc&si=dh56-kDPNT9bKQ66",
      },
      {
        title: "Gbese (feat. Trey Songz)",
        youtube:
          "https://music.youtube.com/watch?v=3aCPGqC_bmA&si=S_u5j09E4ce7rtt0",
      },
      {
        title: "Jaiye Jaiye (feat. Femi Kuti)",
        youtube:
          "https://music.youtube.com/watch?v=eF_CWfI481A&si=dLAE7_u1f92bodpC",
      },
      {
        title: "Show You the Money",
        youtube:
          "https://music.youtube.com/watch?v=WL0KfsOFR6Y&si=GGLB055oR2Fux7gP",
      },
      {
        title: "In My Bed",
        youtube:
          "https://music.youtube.com/watch?v=2YsSCQpJm7M&si=gmhNuCn42fH_jBFK",
      },
      {
        title: "Mummy Mi",
        youtube:
          "https://music.youtube.com/watch?v=LNxUPHQziQw&si=Cap-J_12EXoqMjn3",
      },
      {
        title: "Kind Love",
        youtube:
          "https://music.youtube.com/watch?v=IKB8mxgEWls&si=u4Z8s5YK-usx5lrL",
      },
      {
        title: "On Top Your Matter",
        youtube:
          "https://music.youtube.com/watch?v=8wjbt1Vilb4&si=lGteX6jSk6pDpV9M",
      },
      {
        title: "In Love (feat. Seyi Shay)",
        youtube:
          "https://music.youtube.com/watch?v=vVZZaX2OOIQ&si=LMTAdCjcnTmMgW6Q",
      },
      {
        title: "For You (feat. Akon)",
        youtube:
          "https://music.youtube.com/watch?v=JSfWlUwr22I&si=E9SAL5GT3rcVJm4N",
      },
      {
        title: "Dutty Whyne (feat. Banky W.)",
        youtube:
          "https://music.youtube.com/watch?v=C4loqy8Safo&si=xBz3vJMe0ACjlY_m",
      },
      {
        title: "Ki Lo Fe",
        youtube:
          "https://music.youtube.com/watch?v=NrwowGhTVtM&si=5xx1bomyNJaLMa1p",
      },
      {
        title: "Omalicha",
        youtube:
          "https://music.youtube.com/watch?v=XTRGxg8qr6A&si=5U7SfTN-HZG5LIEr",
      },
      {
        title: "Bombay (feat. Phyno)",
        youtube:
          "https://music.youtube.com/watch?v=aowFjLwAGL0&si=VwONvxYNX8ZgKV3t",
      },
      {
        title: "One Question (feat. Yemi Sax)",
        youtube:
          "https://music.youtube.com/watch?v=afOHeg33OC4&si=DqaIe2KeqtQNjHnJ",
      },
      {
        title: "Celebrate",
        youtube:
          "https://music.youtube.com/watch?v=iJ_7Esj1T6s&si=Pu9xL7uxuTa1mHEG",
      },
      {
        title: "Show You the Money (Remix) (feat. Tyga)",
        youtube:
          "https://music.youtube.com/watch?v=ocFQLGZBMLE&si=Kfz0E-6nLmccmD2R",
      },
      {
        title: "Murder (feat. Wale)",
        youtube:
          "https://music.youtube.com/watch?v=P5LTYgA1qw0&si=jZaUL3FTIzXSfYCG",
      },
      {
        title: "Joy",
        youtube:
          "https://music.youtube.com/watch?v=yack1jPECjw&si=qS0uWgjseK4sM_Ex",
      },
      {
        title: "Caro (feat. L.A.X)",
        youtube:
          "https://music.youtube.com/watch?v=L0fsgy-VyC0&si=_prBbb1-m76MVQZz",
      },
      {
        title: "Say My Name",
        youtube:
          "https://music.youtube.com/watch?v=cagJhfLXLUw&si=ZmqrJ8vBMtIbZ0Au",
      },
      {
        title: "No Lele",
        youtube:
          "https://music.youtube.com/watch?v=vCmc_37Z1WQ&si=PNP5jSEVO6T9DPEH",
      },
      {
        title: "Scatter the Floor",
        youtube:
          "https://music.youtube.com/watch?v=lSqri0N0sWw&si=4mMDQpZ3wRb0LCvl",
      },
      {
        title: "Pakurumo",
        youtube:
          "https://music.youtube.com/watch?v=7rUbWzifbVA&si=1c3o8ZxZFwr-Cgm1",
      },
      {
        title: "Slow Whine (feat. Banky W.)",
        youtube:
          "https://music.youtube.com/watch?v=nycaF-KRiv8&si=Jx8ujlToQ2IUVb8f",
      },
      {
        title: "Love My Baby",
        youtube:
          "https://music.youtube.com/watch?v=yTo2s7huxME&si=-s3rOxB6qaQEH28l",
      },
      {
        title: "Gidi Girl",
        youtube:
          "https://music.youtube.com/watch?v=XdrjfMBBgdw&si=FfHjdWhrVKBlN9Vb",
      },
      {
        title: "Oluwa Lo Ni",
        youtube:
          "https://music.youtube.com/watch?v=lXqrGP9npIw&si=mI7BsqliM81eZQ49",
      },
      {
        title: "Don't Dull",
        youtube:
          "https://music.youtube.com/watch?v=5NjUWx0e6gA&si=93FzJ-dZkIntMZGR",
      },
      {
        title: "Tease Me / Bad Guys",
        youtube:
          "https://music.youtube.com/watch?v=KA3Gc-p6OGQ&si=Kn4o57UODApCjijJ",
      },
      {
        title: "Eme Boyz (feat. Skales & Banky W.)",
        youtube:
          "https://music.youtube.com/watch?v=2VHlyNmhl38&si=z34edkjZrwm2lRbX",
      },
      {
        title: "What You Wanna Do?",
        youtube:
          "https://music.youtube.com/watch?v=nGlVqp4NbZ4&si=FiaMB1PmswuQqXD0",
      },
      {
        title: "For Me (feat. Wande Coal)",
        youtube:
          "https://music.youtube.com/watch?v=Kr_-HBGTCTw&si=Sz6s5_cqDo26mSGg",
      },
      {
        title: "Holla at Your Boy",
        youtube:
          "https://music.youtube.com/watch?v=ULvAsgP26TE&si=jxKBA9fu-FoFQJFi",
      },
      {
        title: "Wad Up (feat. D'Prince)",
        youtube:
          "https://music.youtube.com/watch?v=ICN1o4sV0Eg&si=k2P9uYy084msKli_",
      },
      {
        title: "Shout Out",
        youtube:
          "https://music.youtube.com/watch?v=FCgzLZ_7plk&si=rBwKJAIIxh7hYmED",
      },
    ],
  },
  {
    id: "j-hus",
    name: "J Hus",
    website: null,
    image: "/artists/jhus.jpg",
    genre: "Afrobeats",
    country: "UK",
    top_songs: [
      {
        title: "Did You See",
        youtube: "https://www.youtube.com/watch?v=3rk6_Ax0mQo",
      },
      {
        title: "Spirit",
        youtube: "https://www.youtube.com/watch?v=hBgF6JrWaO8",
      },
    ],
  },
  {
    id: "nsg",
    name: "NSG",
    website: null,
    image: "/artists/nsg.jpg",
    genre: "Afrobeats",
    country: "UK",
    top_songs: [
      {
        title: "Options (feat. Tion Wayne)",
        youtube: "https://www.youtube.com/watch?v=E34REPgVpXk",
      },
      {
        title: "OT Bop",
        youtube: "https://www.youtube.com/watch?v=BkoX45IEuOk",
      },
    ],
  },
  {
    id: "yxng-bane",
    name: "Yxng Bane",
    website: null,
    image: "/artists/yxngbane.jpeg",
    genre: "Afrobeats",
    country: "UK",
    top_songs: [
      {
        title: "Rihanna",
        youtube: "https://www.youtube.com/watch?v=1ruitsqQ34c",
      },
      {
        title: "Fine Wine",
        youtube: "https://www.youtube.com/watch?v=pkk9oRfhIxs",
      },
    ],
  },
  {
    id: "b-young",
    name: "B Young",
    website: null,
    image: "/artists/byoung.jpg",
    genre: "Afrobeats",
    country: "UK",
    top_songs: [
      {
        title: "Jumanji",
        youtube: "https://www.youtube.com/watch?v=JFlrNP6_I28",
      },
      {
        title: "079ME",
        youtube: "https://www.youtube.com/watch?v=oQu5hOkzJDs",
      },
    ],
  },
  {
    id: "ziezie",
    name: "ZieZie",
    website: null,
    image: "/artists/ziezie.jpeg",
    genre: "Afrobeats",
    country: "UK",
    top_songs: [
      {
        title: "Fine Girl",
        youtube: "https://www.youtube.com/watch?v=As1pRzoKmJ8",
      },
      {
        title: "Sensei",
        youtube: "https://www.youtube.com/watch?v=8vlC73glsWI",
      },
    ],
  },
  {
    id: "young-t-bugsey",
    name: "Young T & Bugsey",
    website: null,
    image: "/artists/youngtbugsey.jpg",
    genre: "Afrobeats",
    country: "UK",
    top_songs: [
      {
        title: "Don't Rush (feat. Headie One)",
        youtube: "https://www.youtube.com/watch?v=ouCuyQI9pXc",
      },
      {
        title: "Strike a Pose",
        youtube: "https://www.youtube.com/watch?v=ng83tmoQ3yU",
      },
    ],
  },
  {
    id: "not3s",
    name: "Not3s",
    website: null,
    image: "/artists/not3s.jpg",
    genre: "Afrobeats",
    country: "UK",
    top_songs: [
      {
        title: "My Lover",
        youtube: "https://www.youtube.com/watch?v=X9RnnZf6zHQ",
      },
      {
        title: "Addison Lee",
        youtube: "https://www.youtube.com/watch?v=ICPp_1SDueM",
      },
    ],
  },
  {
    id: "darkoo",
    name: "Darkoo",
    website: null,
    image: "/artists/darkoo.jpg",
    genre: "Afrobeats",
    country: "UK",
    top_songs: [
      {
        title: "Gangsta",
        youtube: "https://www.youtube.com/watch?v=hRrMo8DzvW4",
      },
      {
        title: "Juicy (feat. Hardy Caprio)",
        youtube: "https://www.youtube.com/watch?v=yralWiuWWec",
      },
    ],
  },
  {
    id: "kojo-funds",
    name: "Kojo Funds",
    website: null,
    image: "/artists/kojofunds.jpg",
    genre: "Afrobeats",
    country: "UK",
    top_songs: [
      {
        title: "Dun Talkin",
        youtube: "https://www.youtube.com/watch?v=CyfwmoGJzNE",
      },
      {
        title: "Check",
        youtube: "https://www.youtube.com/watch?v=ncu3eYkmTxk",
      },
    ],
  },
  {
    id: "joeboy",
    name: "Joeboy",
    website: null,
    youtube: "https://www.youtube.com/channel/UCv3EFZRGITcQwdyCE_ap0UA",
    image: "/artists/joeboy.webp",
    genre: "Afrobeats",
    country: "Nigeria",
    top_songs: [
      {
        title: "Sip (Alcohol)",
        youtube: "https://youtu.be/UEcAPvoSe_8?si=zs2_pRdEE5AfaWDg",
      },
    ],
  },
  {
    id: "ayo-maff",
    name: "Ayo Maff",
    website: null,
    image: "/artists/ayomaff.jpg",
    genre: "Afrobeats",
    country: "Nigeria",
    top_songs: [
      {
        title: "Dealer (feat. Fireboy DML)",
        youtube: "https://www.youtube.com/watch?v=JUWxpWD71VA",
      },
      {
        title: "Are You There?",
        youtube: "https://www.youtube.com/watch?v=Fcxh3DbGgR8",
      },
    ],
  },
  {
    id: "costatitch",
    name: "Costa Titch",
    website: null,
    image: "/artists/costatitch.jpg",
    genre: "Amapiano",
    country: "South Africa",
    top_songs: [
      {
        title: "Big Flexa",
        youtube: "https://www.youtube.com/watch?v=8g0v2SDe6MU",
      },
      {
        title: "Just Do It",
        youtube: "https://youtu.be/h2cYMEK5v-Y?si=xnOUshItL7d1PUS4",
      },
      {
        title: "Superstar ft Ma Gang",
        youtube: "https://youtu.be/YNzLp2OChBU?si=gr7xiQsvOaRIIr_H",
      },
    ],
  },
  {
    id: "qing-madi",
    name: "Qing Madi",
    website: null,
    image: "/artists/qingmadi.webp",
    genre: "Afrobeats",
    country: "Nigeria",
    top_songs: [
      {
        title: "See Finish",
        youtube: "https://www.youtube.com/watch?v=UGGL375aau8",
      },
      {
        title: "Ole (feat. BNXN)",
        youtube: "https://www.youtube.com/watch?v=wBNKFH7Xj70",
      },
    ],
  },
  {
    id: "teejay",
    name: "Teejay",
    website: null,
    image: "/artists/teejay.jpg",
    genre: "Afrobeats",
    country: "Nigeria",
    top_songs: [
      {
        title: "Drift",
        youtube: "https://www.youtube.com/watch?v=-UG2F5G1Qk0",
      },
    ],
  },
  {
    id: "llona",
    name: "Llona",
    website: null,
    image: "/artists/llona.png",
    genre: "Afrobeats",
    country: "Nigeria",
    top_songs: [
      {
        title: "Cant Breathe",
        youtube: "https://www.youtube.com/watch?v=f1j7vcdpg4w",
      },
      {
        title: "HBP (Remix) feat. Bella Shmurda",
        youtube: "https://www.youtube.com/watch?v=7q1oljdE_JU",
      },
    ],
  },
  {
    id: "kizz-daniel",
    name: "Kizz Daniel",
    website: null,
    image: "/artists/kizzdaniel.jpg",
    genre: "Afrobeats",
    country: "Nigeria",
    top_songs: [
      {
        title: "Cough",
        youtube: "https://www.youtube.com/watch?v=4j7Fa2PCMow",
      },
    ],
  },
  {
    id: "bnxn",
    name: "BNXN (fka Buju)",
    website: "https://www.instagram.com/toyourears",
    image: "/artists/bnxn.jpeg",
    genre: "Afrobeats",
    country: "Nigeria",
    top_songs: [
      {
        title: "Finesse (with Pheelz)",
        youtube: "https://www.youtube.com/watch?v=Vcwhe0pY4Bg",
      },
      {
        title: "Gwagwalada (feat. Kizz Daniel & Seyi Vibez)",
        youtube: "https://www.youtube.com/watch?v=7fhtbd5NxW0",
      },
    ],
  },
  {
    id: "moliy",
    name: "MOLIY",
    website: null,
    image: "/artists/moliy.jpg",
    genre: "Afrobeats",
    country: "Nigeria",
    top_songs: [
      {
        title: "Shake it to the Max",
        youtube: "https://youtu.be/9Jf8rfvjRbQ?si=v1Ux_FcK0BHEk4Bh",
      },
    ],
  },
  {
    id: "seyi-vibez",
    name: "Seyi Vibez",
    website: "https://www.instagram.com/seyi_vibez",
    image: "/artists/seyivibez.jpeg",
    genre: "Afrobeats",
    country: "Nigeria",
    top_songs: [
      {
        title: "Chance (Na Ham)",
        youtube: "https://www.youtube.com/watch?v=BfIUgmQG9c4",
      },
      {
        title: "Hat-trick",
        youtube: "https://www.youtube.com/watch?v=zmd69R6n4Sg",
      },
    ],
  },
  {
    id: "1da-ban",
    name: "1da Banton",
    website: null,
    youtube: "https://www.youtube.com/channel/UCDZN6-FTxmc3lmW-tNShEeQ",
    image: "/artists/1daban.jpg",
    genre: "Afrobeats",
    country: "Nigeria",
    top_songs: [
      {
        title: "No Wahala (Remix) feat. Kizz Daniel & Tiwa Savage",
        youtube: "https://youtu.be/D7wqi1HZFq8?si=XMX1dlCz-xCkqj49",
      },
    ],
  },
  {
    id: "swizz-panache",
    name: "Swizz Panache",
    website: null,
    youtube: "https://www.youtube.com/@swizzpanache",
    image: "/artists/swizzpanache.jpg",
    genre: "Afrobeats",
    country: "Nigeria",
    top_songs: [
      {
        title: "Shayi Mpempe",
        youtube: "https://www.youtube.com/watch?v=Hfxra_LxMoc",
      },
      {
        title: "Izulu",
        youtube: "https://www.youtube.com/watch?v=MsOntAbV024",
      },
    ],
  },
  {
    id: "phyno",
    name: "Phyno",
    website: null,
    youtube: "https://www.youtube.com/@officialphyno",
    instagram: "instagram.com/phynofino",
    twitter: "twitter.com/phynofino",
    image: "/artists/phyno.jpg",
    genre: "Afrobeats",
    country: "Nigeria",
    top_songs: [
      {
        title: "Do I",
        youtube: "https://www.youtube.com/watch?v=oeP_8Wm9PQQ",
      },
    ],
  },
  {
    id: "rema",
    name: "Rema",
    website: null,
    image: "/artists/rema.jpg",
    instagram: null,
    twitter: null,
    spotify:
      "https://open.spotify.com/artist/5yOvAmpIR7hVxiS6Ls5DPO?si=coCiyq1wTLKus5oJBclqxA",
    youtube: "https://www.youtube.com/channel/UCHGF6zfD2gwLuke95X3CKFQ",
    soundcloud: null,
    tiktok: null,
    facebook: null,
    linkedin: null,
    genre: "Afrobeats",
    country: "Nigeria",
    top_songs: [
      {
        title: "Calm Down",
        youtube: "https://www.youtube.com/watch?v=CQLsdm1ZYAw",
      },
      {
        title: "Charm",
        youtube: "https://youtu.be/dNt1QR1ecuM?si=Zs4mVJBo9k7CYuLZ",
      },
      {
        title: "Dumebi",
        youtube: "https://www.youtube.com/watch?v=zUU1bIWpH5c",
      },
      {
        title: "Soundgasm",
        youtube: "https://www.youtube.com/watch?v=nrTkERuwdCc",
      },
      {
        title: "BENIN BOYS ft Shallipop",
        youtube: "https://www.youtube.com/watch?v=eYsldLTYyrM",
      },
      {
        title: "Ozeba",
        youtube: "https://youtu.be/LIhDklvBUyg?si=hZsmOPm4s4fq7k1p",
      },
      {
        title: "AZAMAN",
        youtube: "https://www.youtube.com/watch?v=Z2L51xr45As",
      },
    ],
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
    genre: "Afrobeats",
    country: "Nigeria",
    top_songs: [
      {
        title: "Rush",
        youtube: "https://www.youtube.com/watch?v=crtQSTYWtqE",
      },
      {
        title: "Commas",
        youtube:
          "https://www.youtube.com/watch?v=EhyzYPSHRQU&list=PL7-PoJCUqjFzfiwCE8_1N4RORb3_LPDxL&index=9",
      },
      {
        title: "All The Love",
        youtube: "https://www.youtube.com/watch?v=Lighfnq-1SM",
      },

      {
        title: "Sability",
        youtube: "https://www.youtube.com/watch?v=KYn3k8dpRJI",
      },
    ],
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
    genre: "Afrobeats",
    country: "Nigeria",
    top_songs: [
      {
        title: "Free Mind",
        youtube: "https://www.youtube.com/watch?v=e8GzTXRAJ30",
      },
      {
        title: "Not An Angel",
        youtube: "https://www.youtube.com/watch?v=9KtU6f_ZPjU",
      },
      {
        title: "Replay",
        youtube: "https://youtu.be/_dJvxxOZVX0?si=cMg4hzmRGDYQzOXx",
      },
    ],
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
    genre: "Afrobeats",
    country: "Nigeria",
    top_songs: [
      {
        title: "All Over",
        youtube: "https://www.youtube.com/watch?v=dFBQzRNsMK0",
      },
      {
        title: "One Heart (Can Change The World)",
        youtube: "https://www.youtube.com/watch?v=k0aPh2zoeiE",
      },
      {
        title: "Ma Lo",
        youtube: "https://youtu.be/VdCjMGeMhaM?si=lvoNP_6m3Jmf1Pr4",
      },
      {
        title: "Who Is Your Guy?",
        youtube: "https://www.youtube.com/watch?v=OHnXY9F7m9c",
      },
    ],
  },
  {
    id: "omah-lay",
    name: "Omah Lay",
    website: null,
    image: "/artists/omahlay.jpg",
    instagram: "https://www.instagram.com/omah_lay/",
    twitter: "https://twitter.com/Omah_Lay",
    spotify:
      "https://open.spotify.com/artist/5yOvAmpIR7hVxiS6Ls5DPO?si=coCiyq1wTLKus5oJBclqxA",
    youtube: "https://www.youtube.com/watch?v=1oBATitnUsA",
    soundcloud: null,
    tiktok: "https://www.tiktok.com/@omah_lay",
    facebook: "https://www.facebook.com/OfficialOmahLay",
    linkedin: null,
    genre: "Afrobeats",
    country: "Nigeria",
    top_songs: [
      {
        title: "Understand",
        youtube: "https://www.youtube.com/watch?v=X3Ai6osw3Mk",
      },
      {
        title: "Godly",
        youtube: "https://www.youtube.com/watch?v=DqUd72pK15Y",
      },
      {
        title: "Lo Lo",
        youtube: "https://www.youtube.com/watch?v=xYD2SQljwJo",
      },
      {
        title: "Holy Ghost",
        youtube: "https://www.youtube.com/watch?v=E3E8qQmP4t8",
      },
    ],
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
    genre: "Afrobeats",
    country: "Nigeria",
    top_songs: [
      {
        title: "Everyday",
        youtube: "https://www.youtube.com/watch?v=77YFPhgt8P0",
      },
      {
        title: "Vibration",
        youtube: "https://www.youtube.com/watch?v=YRhBfL3GEjQ",
      },
      {
        title: "Bandana",
        youtube: "https://youtu.be/gCLUIzOsgGg?si=OfDjfMPBiPsM2iId",
      },
      {
        title: "Peru",
        youtube: "https://www.youtube.com/watch?v=pekzpzNCNDQ",
      },
      {
        title: "YAWA",
        youtube: "https://www.youtube.com/watch?v=J7CHVcjwpAg",
      },
    ],
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
    genre: "Afrobeats",
    country: "Nigeria",
    top_songs: [
      {
        title: "Soweto",
        youtube: "https://www.youtube.com/watch?v=DPBRGWUgQsA",
      },
      {
        title: "Stubborn (with Asake)",
        youtube: "https://www.youtube.com/watch?v=vp0b_fqPvkM",
      },
    ],
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
    genre: "Afrobeats",
    country: "Nigeria",
    top_songs: [
      {
        title: "Asiwaju",
        youtube: "https://www.youtube.com/watch?v=MqqBH9Fa4NQ",
      },
      {
        title: "Girlfriend",
        youtube: "https://www.youtube.com/watch?v=7M2Gps9xR8g",
      },
    ],
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
    genre: "Afrobeats",
    country: "Nigeria",
    top_songs: [
      {
        title: "Legalize",
        youtube: "https://www.youtube.com/watch?v=q6Mp0u5Y1wA",
      },
    ],
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
    genre: "Afrobeats",
    country: "Nigeria",
    top_songs: [
      {
        title: "Pana",
        youtube: "https://www.youtube.com/watch?v=8YhAFBOSk1U",
      },
      {
        title: "Duro",
        youtube: "https://www.youtube.com/watch?v=TlJ33-6tPTE",
      },
    ],
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
    genre: "Afrobeats",
    country: "Nigeria",
    top_songs: [
      {
        title: "Rapid Fire",
        youtube: "https://www.youtube.com/watch?v=hMuFO9nhtfA",
      },
      {
        title: "TAPENGA",
        youtube: "https://www.youtube.com/watch?v=v4ul6zYmS_I",
      },
    ],
  },
  {
    id: "lojay",
    name: "Lojay",
    website: null,
    image: "/artists/lojay.jpg",
    genre: "Afrobeats",
    country: "Nigeria",
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
        youtube: "https://www.youtube.com/watch?v=to8nQNGarRw",
      },
      {
        title: "Arizona",
        youtube: "https://www.youtube.com/watch?v=p2USH3lAJ88",
      },
    ],
  },
  {
    id: "black-sherif",
    name: "Black Sherif",
    website: null,
    image: "/artists/blacksherif.jpeg",
    instagram:
      "https://www.instagram.com/blacksherif_?igsh=MWY1aXh6dXZ5ejVqcg==",
    twitter: null,
    spotify: null,
    youtube: "https://www.youtube.com/watch?v=zz_Q49_RecY",
    soundcloud: null,
    tiktok: null,
    facebook: null,
    linkedin: null,
    genre: "Afrobeats",
    country: "Ghana",
    top_songs: [
      {
        title: "Lord I'm Amazed",
        youtube: "http://youtube.com/watch?v=zz_Q49_RecY",
      },
    ],
  },

  // New artists from AfroBEATS dataset
  {
    id: "young-jonn",
    name: "Young Jonn",
    website: null,
    image: "/artists/youngjonn.webp",
    genre: "Afrobeats",
    country: "Nigeria",
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
        youtube: "https://www.youtube.com/watch?v=LWWCj-EbevI",
      },
    ],
  },
  {
    id: "tyla",
    name: "Tyla",
    website: null,
    image: "/artists/tyla.jpeg",
    genre: "Afrobeats",
    country: "South Africa",
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
        youtube: "https://youtu.be/UKpz-I9EV84?si=nivjaTyCbbXC8iI6",
      },
      {
        title: "Push 2 Start",
        youtube: "https://www.youtube.com/watch?v=uLK2r3sG4lE",
      },
      {
        title: "Water",
        youtube: "https://www.youtube.com/watch?v=XoiOOiuH8iI",
      },
    ],
  },
  {
    id: "spinall",
    name: "SPINALL",
    website: null,
    image: "/artists/spinall.jpg",
    genre: "Afrobeats",
    country: "Nigeria",
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
        youtube: "https://www.youtube.com/watch?v=udtsQ3weRz0",
      },
      {
        title: "Nowo",
        youtube: "https://www.youtube.com/watch?v=ES8XuZBafz0",
      },
      {
        title: "One Call ft Tyla Omah Lay",
        youtube: "https://www.youtube.com/watch?v=zB4tnXnUFKs",
      },
      {
        title: "Dis Love",
        youtube: "https://www.youtube.com/watch?v=EAcXCdMiuEo",
      },
    ],
  },
  {
    id: "king-promise",
    name: "King Promise",
    website: null,
    image: "/artists/kingpromise.jpg",
    genre: "Afrobeats",
    country: "Ghana",
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
        youtube: "https://www.youtube.com/watch?v=NPCC02SaJVg",
      },
      {
        title: "Perfect Combi",
        youtube: "https://www.youtube.com/watch?v=jUsE4hcoS2c",
      },
    ],
  },
  {
    id: "ckay",
    name: "CKay",
    website: null,
    image: "/artists/ckay.jpg",
    genre: "Afrobeats",
    country: "Nigeria",
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
        youtube: "https://www.youtube.com/watch?v=D-YDEyuDxWU",
      },
      {
        title: "Emiliana",
        youtube: "https://www.youtube.com/watch?v=Ypr5QN7Xn_M",
      },
      {
        title: "Walhala",
        youtube: "https://www.youtube.com/watch?v=7bjIixyVEjE",
      },
    ],
  },
  {
    id: "skiibii",
    name: "Skiibii",
    website: null,
    image: "/artists/skiibii.jpg",
    genre: "Afrobeats",
    country: "Nigeria",
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
        youtube: "https://www.youtube.com/watch?v=IW9NtE2TN10",
      },
      {
        title: "Sensima",
        youtube: "https://www.youtube.com/watch?v=zqkDioXLTO8",
      },
    ],
  },
  {
    id: "dj-tunez",
    name: "DJ Tunez",
    website: null,
    image: "/artists/djtunez.webp",
    genre: "Afrobeats",
    country: "Nigeria",
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
        youtube: "https://www.youtube.com/watch?v=ut4uAVjRxns&t=2s",
      },
    ],
  },
  {
    id: "oxlade",
    name: "Oxlade",
    website: null,
    image: "/artists/oxlade.jpg",
    genre: "Afrobeats",
    country: "Nigeria",
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
        youtube: "https://www.youtube.com/watch?v=9410qCyQuJ4",
      },
      {
        title: "Ku Lo Sa",
        youtube: "https://www.youtube.com/watch?v=R4qud199tQk",
      },
    ],
  },

  {
    id: "tempoe",
    name: "Tempoe",
    website: null,
    image: "/artists/tempoe.jpg",
    genre: "Afrobeats",
    country: "Nigeria",
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
        youtube: "https://www.youtube.com/watch?v=DPBRGWUgQsA",
      },
    ],
  },
  {
    id: "azanti",
    name: "Azanti",
    website: null,
    image: "/artists/azanti.jpg",
    genre: "Afrobeats",
    country: "Nigeria",
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
        youtube: "https://www.youtube.com/watch?v=fAgE823FyJs",
      },
    ],
  },
  {
    id: "spyro",
    name: "Spyro",
    website: null,
    image: "/artists/spyro.jpg",
    genre: "Afrobeats",
    country: "Nigeria",
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
        youtube: "https://www.youtube.com/watch?v=wyKccbQm1f0",
      },
    ],
  },
  {
    id: "kcee",
    name: "Kcee",
    website: null,
    image: "/artists/kcee.webp",
    genre: "Afrobeats",
    country: "Nigeria",
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
        youtube: "https://youtu.be/WsMwhD0SmHU?si=rNoAzcbbb_kwZNVL",
      },
    ],
  },
  {
    id: "adekunle-gold",
    name: "Adekunle Gold",
    website: null,
    image: "/artists/adekunlegold.jpg",
    genre: "Afrobeats",
    country: "Nigeria",
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
        youtube: "https://www.youtube.com/watch?v=VnXq06m9P4g",
      },
      {
        title: "High ft Davido",
        youtube: "https://www.youtube.com/watch?v=juBnNBm0cPw",
      },
    ],
  },
  {
    id: "odeal",
    name: "Odeal",
    website: null,
    image: "/artists/odeal.jpeg",
    genre: "Afrobeats",
    country: "Nigeria",
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
        youtube: "https://www.youtube.com/watch?v=ks48Gb5JeYM",
      },
    ],
  },
  {
    id: "olamide",
    name: "Olamide",
    website: null,
    image: "/artists/olamide.jpg",
    genre: "Afrobeats",
    country: "Nigeria",
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
        youtube: "https://www.youtube.com/watch?v=l_-v1fNdSHs",
      },
      {
        title: "Jinja",
        youtube: "https://www.youtube.com/watch?v=5FYvvWl1Frw",
      },
      {
        title: "Tumpet ft Ckay",
        youtube: "https://youtu.be/FcjOlcWaaU8?si=JHGYSJ07HeMKJ97z",
      },
      {
        title: "Tesinapot",
        youtube: "https://www.youtube.com/watch?v=cIjkFCCLdcA",
      },
    ],
  },
  {
    id: "shallipopi",
    name: "Shallipopi",
    website: null,
    image: "/artists/shallipopi.jpg",
    genre: "Afrobeats",
    country: "Nigeria",
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
        title: "Elon Musk",
        youtube: "https://www.youtube.com/watch?v=546V71zODtk",
      },
      {
        title: "Cast ft ODUMODUBLVCK",
        youtube: "https://www.youtube.com/watch?v=g2j40WZ08Vw",
      },
      {
        title: "Laho",
        youtube: "https://www.youtube.com/watch?v=qARrn7G067w",
      },
    ],
  },
];
