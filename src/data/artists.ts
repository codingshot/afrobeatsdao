
export interface Song {
  title: string;
  youtube: string;
}

export interface Artist {
  name: string;
  website: string | null;
  image: string;
  top_songs: Song[];
}

export const ARTISTS: Artist[] = [
  {
    name: "Burna Boy",
    website: "http://www.onaspaceship.com",
    image: "https://notcommon.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fnotcommon%2Fimage%2Fupload%2Fv1703779727%2Fprofiles%2Fburna-boy.jpg&w=384&q=75",
    top_songs: [
      {
        title: "Last Last",
        youtube: "https://www.youtube.com/watch?v=421w1j87fEM"
      },
      {
        title: "Sittin' On Top Of The World",
        youtube: "https://www.youtube.com/watch?v=QzP6YlS9Q6E"
      }
    ]
  },
  {
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
    name: "J Hus",
    website: null,
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/J_Hus_(cropped).jpg",
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
