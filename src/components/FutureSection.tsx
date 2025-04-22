
import { Button } from "@/components/ui/button";
import { Mic, Music, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Initiative = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  emoji: string;
  action: () => void;
};

export function FutureSection() {
  const navigate = useNavigate();

  const scrollToEvents = () => {
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const initiatives: Initiative[] = [{
    id: 1,
    title: "Community-run Concerts",
    description: "Join us in creating global Afrobeats events curated by the community, for the community.",
    icon: <Mic className="h-6 w-6" />,
    emoji: "🎤",
    action: scrollToEvents
  }, {
    id: 2,
    title: "Learn to Dance",
    description: "Online and in-person workshops to learn traditional and modern African dance styles.",
    icon: <Music className="h-6 w-6" />,
    emoji: "💃",
    action: () => navigate('/dance')
  }, {
    id: 3,
    title: "Afrobeats Tech & Incubator",
    description: "Supporting music tech startups focused on promoting African music and culture.",
    icon: <Lightbulb className="h-6 w-6" />,
    emoji: "💡",
    action: () => window.open('https://discord.gg/TNrWwSA955', '_blank')
  }];

  return <section id="future" className="py-16 bg-gradient-to-b from-[#E63946]/10 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <span>Our Future</span>
            <span className="text-4xl">🌟</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">More than just parties. We scaling vibes fr 🥳</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {initiatives.map(initiative => (
            <div 
              key={initiative.id} 
              className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#F4A261] hover:border-[#FFD700] transition-all hover:shadow-xl group cursor-pointer"
              onClick={initiative.action}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-[#E63946] rounded-full flex items-center justify-center text-white">
                  <span className="text-3xl group-hover:animate-emoji-bounce">{initiative.emoji}</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-center">{initiative.title}</h3>
              <p className="text-gray-600 text-center mb-4">{initiative.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 flex justify-center">
          <Button 
            className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#264653] text-lg px-8 py-6 rounded-full shadow-lg transform transition hover:scale-105 flex items-center gap-2 font-heading"
            onClick={() => navigate('/dance')}
          >
            Learn to Dance
          </Button>
        </div>
      </div>
    </section>;
}
