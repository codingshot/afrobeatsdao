
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Twitter, Instagram, MessageCircle } from 'lucide-react';
import { teamMembers } from "@/data/team";

export function TeamContactSection() {
  return (
    <section className="py-16 bg-afro-teal text-white font-afro">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-white text-4xl font-heading font-bold mb-4 flex items-center justify-center gap-2">
            <span>Connect with Our Team</span>
            <span className="text-4xl" aria-label="Handshake emoji">🤝</span>
          </h2>
          <p className="text-white text-xl max-w-2xl mx-auto">
            Have questions, partnership ideas, or want to get involved? Our team is here to help you join the Afrobeats movement.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {teamMembers.map(member => (
            <Card key={member.name} className="bg-white/10 border-white/20 text-white max-w-xs backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="rounded-full overflow-hidden w-20 h-20 mx-auto mb-4 border-3 border-afro-yellow">
                  <img src={member.image} alt={`${member.name} profile`} className="w-full h-full object-cover" />
                </div>
                <CardTitle className="text-lg text-white">{member.name}</CardTitle>
                <CardDescription className="text-white/80">{member.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center gap-3">
                  {member.twitter && (
                    <a 
                      href={member.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-white/80 hover:text-afro-yellow transition-colors"
                      aria-label={`${member.name}'s Twitter`}
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {member.instagram && (
                    <a 
                      href={member.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-white/80 hover:text-afro-yellow transition-colors"
                      aria-label={`${member.name}'s Instagram`}
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-white/80 hover:text-afro-yellow transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <Button 
              size="lg" 
              className="bg-afro-yellow text-black hover:bg-afro-yellow/90 font-heading text-xl rounded-full px-8 py-6 h-auto mr-4"
              onClick={() => window.open('https://discord.gg/TNrWwSA955', '_blank')}
            >
              <MessageCircle className="mr-2 h-6 w-6" />
              Join Our Discord
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-afro-teal font-heading text-xl rounded-full px-8 py-6 h-auto"
              onClick={() => window.location.href = '/partner'}
            >
              Explore Partnerships
            </Button>
          </div>
          <p className="text-white/80 text-lg">
            Ready to collaborate? Drop into our Discord introduction channel and let's create something amazing together!
          </p>
        </div>
      </div>
    </section>
  );
}
