
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  Video, 
  Shirt, 
  Music, 
  Users, 
  Heart, 
  Instagram, 
  Twitter, 
  Newspaper, 
  Star, 
  Play, 
  MapPin, 
  Megaphone,
  Globe,
  Handshake,
  TrendingUp,
  Target,
  Zap,
  MessageCircle
} from 'lucide-react';
import { teamMembers } from "@/data/team";

const Partner = () => {
  const partnershipTypes = [
    {
      id: 'events',
      icon: Calendar,
      title: 'Partner on Events',
      description: 'Collaborate on live or virtual Afrobeats events (e.g., club nights, festivals).',
      benefits: 'Brand visibility, audience engagement, co-hosting opportunities',
      deliverables: 'Sponsorship, talent booking, or promotional support',
      cta: 'Host an Event with Us'
    },
    {
      id: 'content',
      icon: Video,
      title: 'Partner on Content',
      description: 'Co-create blogs, videos, podcasts, or social media campaigns celebrating Afrobeats.',
      benefits: 'Reach new audiences, showcase brand values',
      deliverables: 'Sponsored content, guest features, or distribution partnerships',
      cta: 'Create Content Together'
    },
    {
      id: 'merchandise',
      icon: Shirt,
      title: 'Partner on Merchandise',
      description: 'Design and sell Afrobeats-themed apparel, accessories, or digital collectibles (e.g., NFTs).',
      benefits: 'Revenue sharing, brand exposure',
      deliverables: 'Production, retail, or design support',
      cta: 'Launch Merch with Us'
    },
    {
      id: 'festivals',
      icon: Music,
      title: 'Partner on Festivals',
      description: 'Sponsor or co-organize large-scale Afrobeats festivals.',
      benefits: 'Headline branding, VIP activations, media coverage',
      deliverables: 'Funding, artist bookings, or logistical support',
      cta: 'Sponsor a Festival'
    },
    {
      id: 'social-media',
      icon: Users,
      title: 'Partner on Social Media Management',
      description: 'Offer social media services for music brands (e.g., content creation, influencer campaigns).',
      benefits: 'Enhanced online presence, fan engagement',
      deliverables: 'Campaign management, analytics reports',
      cta: 'Boost Your Social Media'
    },
    {
      id: 'artists',
      icon: Star,
      title: 'Connect Artists',
      description: 'Facilitate connections between artists and industry stakeholders (e.g., agencies, managers, producers).',
      benefits: 'Talent discovery, career growth opportunities',
      deliverables: 'Networking events, showcase opportunities',
      cta: 'Support Afrobeats Artists'
    },
    {
      id: 'fundraisers',
      icon: Heart,
      title: 'Organize Fundraisers',
      description: 'Host Afrobeats-themed charity events or community drives.',
      benefits: 'Community impact, positive brand association',
      deliverables: 'Funding, venues, or promotion',
      cta: 'Give Back with Us'
    },
    {
      id: 'instagram',
      icon: Instagram,
      title: 'Instagram Promotion',
      description: 'Feature partner brands, events, or artists in Afrobeats.party\'s Instagram posts, Stories, or Reels.',
      benefits: 'Access to our engaged Instagram audience (50,000+ followers)',
      deliverables: 'Sponsored posts, Stories (e.g., 3 posts/month), or account takeovers',
      cta: 'Get Featured on Instagram'
    },
    {
      id: 'twitter',
      icon: Twitter,
      title: 'Twitter Promotion',
      description: 'Promote partners via Afrobeats.party\'s Twitter account through tweets, threads, or Spaces.',
      benefits: 'Real-time engagement with Afrobeats fans and industry leaders',
      deliverables: 'Sponsored tweets (e.g., 5 tweets/month), Twitter Spaces hosting, or retweet campaigns',
      cta: 'Shine on Twitter'
    },
    {
      id: 'news',
      icon: Newspaper,
      title: 'Feature on News Feed',
      description: 'Showcase partner news, events, or campaigns in Afrobeats.party\'s website news feed or newsletter.',
      benefits: 'Exposure to our website visitors and telegram subscribers',
      deliverables: 'Dedicated news articles, newsletter mentions, or banner ads',
      cta: 'Get Featured in Our News'
    },
    {
      id: 'artist-promotion',
      icon: Star,
      title: 'Featured Artist Promotion',
      description: 'Promote partner-affiliated artists on Afrobeats.party\'s website, social media, or events.',
      benefits: 'Boost artist visibility, fanbase growth',
      deliverables: 'Artist profile pages, social media shoutouts, or event performances',
      cta: 'Promote Your Artist'
    },
    {
      id: 'song-feature',
      icon: Play,
      title: 'Featured Song on Player',
      description: 'Highlight partner-selected Afrobeats songs in Afrobeats.party\'s music player or curated playlists.',
      benefits: 'Increased streams, fan discovery',
      deliverables: 'Song placement in player, playlist features, or social media promotion',
      cta: 'Feature Your Song'
    },
    {
      id: 'club-feature',
      icon: MapPin,
      title: 'Featured Club',
      description: 'Promote partner-affiliated clubs as premier Afrobeats nightlife destinations.',
      benefits: 'Attract Afrobeats fans, boost club attendance',
      deliverables: 'Dedicated club profile on website, social media features, or event collaborations',
      cta: 'Showcase Your Club'
    },
    {
      id: 'event-ads',
      icon: Megaphone,
      title: 'Featured Event Advertisement Placements',
      description: 'Place partner event ads on Afrobeats.party\'s website, social media, or newsletters.',
      benefits: 'Targeted promotion to Afrobeats enthusiasts',
      deliverables: 'Banner ads, social media campaigns, or newsletter event listings',
      cta: 'Advertise Your Event'
    }
  ];

  const caseStudies = [
    {
      partner: 'POTLOCK',
      type: 'Fundraiser Partnership',
      outcome: '15,000+ community members engaged',
      description: 'Successful charity drive connecting Afrobeats culture with social impact.',
      quote: 'Afrobeats.party amplified our mission to a global audience!'
    },
    {
      partner: 'Beat DAO',
      type: 'Artist Pipeline & Events',
      outcome: '20+ emerging artists featured',
      description: 'Collaborative artist development and community event programming.',
      quote: 'The perfect partner for discovering and promoting new Afrobeats talent.'
    }
  ];

  const benefits = [
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Access to a worldwide, engaged Afrobeats audience across 20+ countries.'
    },
    {
      icon: TrendingUp,
      title: 'Growing Platform',
      description: 'Exposure through our website, social media, and live events with thousands of monthly users.'
    },
    {
      icon: Handshake,
      title: 'Authentic Partnerships',
      description: 'Collaboration with top artists, platforms, and cultural organizations in the Afrobeats space.'
    },
    {
      icon: Target,
      title: 'Targeted Audience',
      description: 'Connect with passionate Afrobeats fans, artists, and cultural enthusiasts.'
    }
  ];

  const handleDiscordJoin = () => {
    window.open('https://discord.gg/TNrWwSA955', '_blank');
  };

  return (
    <div className="min-h-screen bg-afro-yellow font-sans">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-afro-yellow to-afro-orange">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-black mb-6">
              Partner with Afrobeats.party
            </h1>
            <p className="text-2xl md:text-3xl text-black mb-8 font-medium">
              The Heartbeat of Afrobeats Culture
            </p>
            <p className="text-xl text-black mb-8 max-w-3xl mx-auto">
              Join the world's leading Afrobeats hub to connect with fans, artists, and communities through events, music, and promotions.
            </p>
            <Button 
              size="lg" 
              className="bg-afro-teal text-white hover:bg-afro-teal/90 font-heading text-xl rounded-full px-8 py-6 h-auto"
              onClick={handleDiscordJoin}
            >
              <MessageCircle className="mr-2 h-6 w-6" />
              Join Our Discord & Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-black mb-4">
              Why Partner with Afrobeats.party?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Afrobeats.party is the most up-to-date resource for Afrobeats music, events, culture, and community. 
              Partner with us to amplify your impact in the global Afrobeats ecosystem.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-2 border-afro-orange hover:shadow-lg transition-shadow">
                <CardHeader>
                  <benefit.icon className="h-12 w-12 text-afro-teal mx-auto mb-4" />
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section id="partnership-types" className="py-16 bg-afro-yellow">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-black mb-4">
              Partnership Opportunities
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto">
              Choose from our diverse range of partnership types to find the perfect collaboration for your goals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnershipTypes.map((type) => (
              <Card key={type.id} className="border-2 border-afro-teal hover:shadow-lg transition-all hover:scale-105">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <type.icon className="h-8 w-8 text-afro-teal" />
                    <CardTitle className="text-lg">{type.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-700">
                    {type.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-sm text-afro-teal">Benefits:</p>
                      <p className="text-sm text-gray-600">{type.benefits}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-afro-teal">Deliverables:</p>
                      <p className="text-sm text-gray-600">{type.deliverables}</p>
                    </div>
                    <Button 
                      className="w-full bg-afro-orange text-white hover:bg-afro-orange/90"
                      onClick={handleDiscordJoin}
                    >
                      {type.cta}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-black mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              See how our partnerships have created meaningful impact in the Afrobeats community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <Card key={index} className="border-2 border-afro-orange">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-2xl text-afro-teal">{study.partner}</CardTitle>
                    <Badge variant="outline">{study.type}</Badge>
                  </div>
                  <CardDescription className="text-lg font-semibold text-afro-orange">
                    {study.outcome}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{study.description}</p>
                  <blockquote className="border-l-4 border-afro-teal pl-4 italic text-gray-600">
                    "{study.quote}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button 
              size="lg" 
              className="bg-afro-teal text-white hover:bg-afro-teal/90 font-heading"
              onClick={handleDiscordJoin}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Want results like these? Join our Discord!
            </Button>
          </div>
        </div>
      </section>

      {/* Web3 Organizations */}
      <section className="py-16 bg-afro-teal text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">
              Web3 & Platform Integration
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              Join our decentralized ecosystem and integrate with our platform for innovative Afrobeats experiences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-2xl">Afrobeats DAO Partners</CardTitle>
                <CardDescription className="text-white/80">
                  Join our DAO ecosystem for governance, funding, and community initiatives.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  <li>• NFT ticketing solutions</li>
                  <li>• Artist royalty management</li>
                  <li>• Community governance voting</li>
                  <li>• Decentralized funding pools</li>
                </ul>
                <Button 
                  className="bg-afro-yellow text-black hover:bg-afro-yellow/90"
                  onClick={handleDiscordJoin}
                >
                  Join Our DAO
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-2xl">Platform Integration</CardTitle>
                <CardDescription className="text-white/80">
                  Technical integrations and API access for seamless collaboration.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  <li>• Content embedding solutions</li>
                  <li>• Artist metadata API</li>
                  <li>• Event data syndication</li>
                  <li>• Custom Web3 experiences</li>
                </ul>
                <Button 
                  className="bg-afro-yellow text-black hover:bg-afro-yellow/90"
                  onClick={handleDiscordJoin}
                >
                  Request API Access
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Team Section */}
      <section className="py-16 bg-afro-orange text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              Ready to partner with us? Connect with our team to discuss your collaboration ideas.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {teamMembers.map(member => (
              <Card key={member.name} className="bg-white text-black max-w-xs">
                <CardHeader className="text-center">
                  <div className="rounded-full overflow-hidden w-24 h-24 mx-auto mb-4">
                    <img src={member.image} alt={`${member.name} profile`} className="w-full h-full object-cover" />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-gray-600">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center gap-3">
                    {member.twitter && (
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-[#1DA1F2] hover:text-afro-orange transition-colors">
                        <Twitter className="h-5 w-5" />
                      </a>
                    )}
                    {member.instagram && (
                      <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-[#E4405F] hover:text-afro-orange transition-colors">
                        <Instagram className="h-5 w-5" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#0077B5] hover:text-afro-orange transition-colors">
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
          
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-white text-afro-orange hover:bg-gray-100 font-heading text-xl px-8 py-6 h-auto"
              onClick={handleDiscordJoin}
            >
              <MessageCircle className="mr-2 h-6 w-6" />
              Join Our Discord & Introduce Yourself
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partner;
