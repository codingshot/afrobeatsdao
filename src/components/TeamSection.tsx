import { Twitter } from "lucide-react";
type TeamMember = {
  name: string;
  role: string;
  image: string;
  twitter?: string;
  instagram?: string;
};
const teamMembers: TeamMember[] = [{
  name: "Larkim",
  role: "Artist",
  image: "/larkim.png",
  twitter: "https://x.com/boy_larkim",
  instagram: "https://www.instagram.com/larkimolorin/"
}];
export function TeamSection() {
  return <section id="team" className="py-16 bg-afro-yellow font-afro">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-black text-4xl font-heading font-bold mb-4 flex items-center justify-center gap-2">
            <span>Meet the Team</span>
            <span className="text-4xl" aria-label="Hands emoji">🫶</span>
          </h2>
          <p className="text-black text-xl max-w-2xl mx-auto">The lives behind the parties.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map(member => <div key={member.name} className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center border-4 border-afro-orange max-w-xs">
              <div className="rounded-full overflow-hidden w-40 h-40 mb-4 border-4 border-afro-teal flex items-center justify-center">
                <img src={member.image} alt={`${member.name} profile`} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-1 text-slate-950">{member.name}</h3>
              <p className="text-lg text-gray-700 mb-3">{member.role}</p>
              <div className="flex gap-4">
                {member.twitter && <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-[#1DA1F2] hover:text-afro-orange transition-colors" aria-label="Twitter">
                    <Twitter className="h-6 w-6" />
                  </a>}
                {member.instagram && <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-[#E4405F] hover:text-afro-orange transition-colors" aria-label="Instagram">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><title>Instagram</title><path d="M12 2.2c3.2 0 3.6.01 4.8.07 1.08.06 1.67.23 2.06.39.52.21.89.47 1.28.86.39.39.65.76.86 1.28.16.39.33.98.39 2.06.06 1.21.07 1.6.07 4.8s-.01 3.59-.07 4.8c-.06 1.08-.23 1.67-.39 2.06-.21.52-.47.89-.86 1.28-.39.39-.76.65-1.28.86-.39.16-.98.33-2.06.39-1.21.06-1.6.07-4.8.07s-3.6-.01-4.8-.07c-1.08-.06-1.67-.23-2.06-.39-.52-.21-.89-.47-1.28-.86-.39-.39-.65-.76-.86-1.28-.16-.39-.33-.98-.39-2.06C2.21 15.6 2.2 15.2 2.2 12s.01-3.59.07-4.8c.06-1.08.23-1.67.39-2.06.21-.52.47-.89.86-1.28.39-.39.76-.65 1.28-.86.39-.16.98-.33 2.06-.39C8.4 2.21 8.79 2.2 12 2.2zM12 0C8.7 0 8.3.01 7.1.07c-1.2.06-2.03.25-2.74.54-.74.3-1.35.71-2.01 1.36C1.29 2.7.89 3.31.59 4.06.3 4.77.11 5.6.07 6.8.01 7.99 0 8.4 0 12s.01 4.01.07 5.2c.06 1.2.25 2.03.54 2.74.3.74.71 1.35 1.36 2.01.66.65 1.27 1.05 2.01 1.36.71.29 1.54.48 2.74.54 1.19.06 1.59.07 5.19.07s4.01-.01 5.2-.07c1.2-.06 2.03-.25 2.74-.54.74-.3 1.35-.71 2.01-1.36.65-.66 1.05-1.27 1.36-2.01.29-.71.48-1.54.54-2.74.06-1.19.07-1.59.07-5.2s-.01-4.01-.07-5.2c-.06-1.2-.25-2.03-.54-2.74-.3-.74-.71-1.35-1.36-2.01C21.3 1.29 20.7.89 19.95.59c-.71-.29-1.54-.48-2.74-.54C15.6.01 15.2 0 12 0z" /><circle cx="12" cy="12" r="3.4" /><path d="M18.4 4.6a.86.86 0 11-1.72 0 .86.86 0 011.72 0z" /></svg>
                  </a>}
              </div>
            </div>)}
        </div>
      </div>
    </section>;
}