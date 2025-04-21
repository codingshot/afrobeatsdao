
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Twitter, Instagram } from "lucide-react";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  emoji: string;
  image: string;
  twitter?: string;
  instagram?: string;
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Larkim",
    role: "Artist and Creative 🎨",
    emoji: "🎨",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80",
    twitter: "#",
    instagram: "#",
  },
  {
    id: 2,
    name: "Earnest Etim",
    role: "Community Vibe Starter 🌟",
    emoji: "🌟",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80",
    twitter: "#",
    instagram: "#",
  },
  {
    id: 3,
    name: "DJ Samba",
    role: "Music Director 🎧",
    emoji: "🎧",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=800&q=80",
    twitter: "#",
    instagram: "#",
  },
];

export function TeamSection() {
  return (
    <section id="team" className="py-16 bg-gradient-to-b from-[#F4A261]/20 to-[#F28C38]/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <span>Meet the Team</span>
            <span className="text-4xl">🫶</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The vibe creators behind Afrobeats DAO 🌟
          </p>
        </div>

        <div className="mt-10 max-w-5xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {teamMembers.map((member) => (
                <CarouselItem key={member.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <TeamMemberCard member={member} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious className="static translate-y-0 bg-afro-orange text-white border-none hover:bg-afro-orange/80">⬅️</CarouselPrevious>
              <CarouselNext className="static translate-y-0 bg-afro-orange text-white border-none hover:bg-afro-orange/80">➡️</CarouselNext>
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}

interface TeamMemberCardProps {
  member: TeamMember;
}

function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg p-6 text-center group hover:shadow-xl transition-all">
      <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-afro-gold">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
        />
        <div className="absolute inset-0 rounded-full border-4 border-dashed border-afro-gold border-opacity-50 animate-spin-slow"></div>
        <div className="absolute top-1 right-1 text-2xl animate-emoji-bounce">{member.emoji}</div>
        <div className="absolute bottom-1 left-1 text-2xl animate-emoji-bounce delay-300">✨</div>
      </div>
      
      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
      <p className="text-gray-600 mb-4">{member.role}</p>
      
      <div className="flex justify-center space-x-4">
        {member.twitter && (
          <a 
            href={member.twitter} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#264653] hover:text-[#F28C38] transition-colors flex items-center gap-1"
          >
            <Twitter size={18} />
            <span>🐦</span>
          </a>
        )}
        
        {member.instagram && (
          <a 
            href={member.instagram} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-afro-teal hover:text-afro-orange transition-colors flex items-center gap-1"
          >
            <Instagram size={18} />
            <span>📸</span>
          </a>
        )}
      </div>
    </div>
  );
}
