
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Briefcase, Music, Zap, Globe, BookOpen, Star, DollarSign } from 'lucide-react';

const studentBenefits = [
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: "Industry Connections",
    description: "Direct access to Afrobeats artists, producers, and music industry professionals through our global network."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Leadership Experience",
    description: "Develop event management, team leadership, and organizational skills that enhance your resume."
  },
  {
    icon: <Music className="h-6 w-6" />,
    title: "Campus Facilities Access",
    description: "Use university recording studios, performance venues, and rehearsal spaces for your creative projects."
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Global Community",
    description: "Connect with students worldwide who share your passion for Afrobeats culture and music."
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Blockchain Technology",
    description: "Learn cutting-edge Web3 technologies through NFT ticketing, artist payments, and decentralized governance."
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Mentorship Programs",
    description: "Receive guidance from industry veterans and successful entrepreneurs in the music and tech sectors."
  }
];

const universityBenefits = [
  {
    icon: <Star className="h-6 w-6" />,
    title: "Cultural Enrichment",
    description: "Enhance campus diversity with vibrant Afrobeats events, festivals, and cultural programming."
  },
  {
    icon: <Music className="h-6 w-6" />,
    title: "Artist Performances",
    description: "Attract emerging and established Afrobeats artists for exclusive campus concerts and workshops."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Student Engagement",
    description: "Increase student retention and satisfaction through active cultural communities and events."
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "International Recognition",
    description: "Join a global network that enhances the university's international profile and partnerships."
  }
];

const daoBenefits = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "Talent Pipeline",
    description: "Discover and develop the next generation of Afrobeats artists, producers, and industry professionals."
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Global Expansion",
    description: "Establish Afrobeats DAO presence on campuses worldwide, building a decentralized cultural movement."
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Innovation Hub",
    description: "Test new blockchain technologies and Web3 applications in real-world educational environments."
  },
  {
    icon: <Music className="h-6 w-6" />,
    title: "Cultural Impact",
    description: "Amplify Afrobeats culture globally while supporting local scenes and emerging artists."
  }
];

const membershipBenefits = [
  {
    title: "Premium Events",
    description: "Exclusive access to artist meet-and-greets, VIP concert experiences, and industry panels.",
    type: "access"
  },
  {
    title: "Resource Library",
    description: "Comprehensive toolkit including event templates, funding guides, and industry contacts.",
    type: "resources"
  },
  {
    title: "Blockchain Integration",
    description: "NFT membership cards, crypto payments for events, and decentralized governance participation.",
    type: "technology"
  },
  {
    title: "Funding Opportunities",
    description: "Access to university grants, DAO funding, sponsorship connections, and crowdfunding platforms.",
    type: "funding"
  },
  {
    title: "Professional Development",
    description: "Music production workshops, DJ training, social media marketing, and entrepreneurship programs.",
    type: "skills"
  },
  {
    title: "Alumni Network",
    description: "Lifetime connections with chapter graduates working in music, tech, and entertainment industries.",
    type: "network"
  }
];

export const ChapterBenefits = () => {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-heading font-bold mb-4 text-black">
          Chapter Benefits
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover the advantages of joining or starting an Afrobeats DAO chapter. 
          Our program creates value for students, universities, and the global Afrobeats community.
        </p>
      </div>

      {/* For Students */}
      <div>
        <h3 className="text-2xl font-heading font-bold mb-6 text-black text-center">
          Benefits for Students
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentBenefits.map((benefit, index) => (
            <Card key={index} className="border-2 border-afro-orange hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-afro-orange/10 rounded-lg text-afro-orange">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* For Universities */}
      <div>
        <h3 className="text-2xl font-heading font-bold mb-6 text-black text-center">
          Benefits for Universities
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {universityBenefits.map((benefit, index) => (
            <Card key={index} className="border-2 border-afro-teal hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-afro-teal/10 rounded-lg text-afro-teal">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* For Afrobeats DAO */}
      <div>
        <h3 className="text-2xl font-heading font-bold mb-6 text-black text-center">
          Benefits for Afrobeats DAO
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {daoBenefits.map((benefit, index) => (
            <Card key={index} className="border-2 border-afro-red hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-afro-red/10 rounded-lg text-afro-red">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Membership Benefits */}
      <div className="bg-gradient-to-r from-afro-teal to-afro-orange text-white rounded-lg p-8">
        <h3 className="text-2xl font-heading font-bold mb-6 text-center">
          Chapter Membership Benefits
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {membershipBenefits.map((benefit, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-semibold mb-2">{benefit.title}</h4>
              <p className="text-sm text-white/90">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Success Metrics */}
      <div className="bg-gray-50 rounded-lg p-8">
        <h3 className="text-2xl font-heading font-bold mb-6 text-black text-center">
          Success Metrics & Goals
        </h3>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-afro-teal mb-2">50+</div>
            <div className="text-sm text-gray-600">Target Chapters by 2026</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-afro-orange mb-2">1000+</div>
            <div className="text-sm text-gray-600">Student Members</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-afro-red mb-2">200+</div>
            <div className="text-sm text-gray-600">Events per Year</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-2">100+</div>
            <div className="text-sm text-gray-600">Artists Discovered</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-afro-yellow rounded-lg p-8">
        <h3 className="text-2xl font-heading font-bold mb-4 text-black">
          Ready to Experience These Benefits?
        </h3>
        <p className="text-lg text-black/80 mb-6">
          Join the Afrobeats DAO movement and be part of a global community that's reshaping music culture.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            className="bg-afro-teal text-white px-6 py-3 rounded-full font-semibold hover:bg-afro-teal/90 transition-colors"
            onClick={() => document.getElementById('start-guide')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start a Chapter
          </button>
          <button 
            className="bg-white text-afro-teal border-2 border-afro-teal px-6 py-3 rounded-full font-semibold hover:bg-afro-teal hover:text-white transition-colors"
            onClick={() => window.open('https://discord.gg/TNrWwSA955', '_blank')}
          >
            Join Community
          </button>
        </div>
      </div>
    </div>
  );
};
