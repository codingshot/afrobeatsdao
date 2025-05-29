
export type TeamMember = {
  name: string;
  role: string;
  image: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
};

export const teamMembers: TeamMember[] = [
  {
    name: "Larkim",
    role: "Artist",
    image: "/larkim.png",
    twitter: "https://x.com/boy_larkim",
    instagram: "https://www.instagram.com/larkimolorin/"
  },
  {
    name: "Israel Igboze",
    role: "Web3 Lead",
    image: "/igboze.png",
    twitter: "https://x.com/israel_igboze",
  },
  {
    name: "Oteejo",
    role: "Community Lead",
    image: "/oteejoe.png",
    twitter: "https://x.com/oteejoe",
    instagram: "https://www.instagram.com/oteejo",
    linkedin: "https://www.linkedin.com/in/otoabasi-bassey-4b9055113/"
  }
];
