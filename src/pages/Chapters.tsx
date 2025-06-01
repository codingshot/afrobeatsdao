
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChaptersMap } from "@/components/chapters/ChaptersMap";
import { ChaptersList } from "@/components/chapters/ChaptersList";
import { ResourceHub } from "@/components/chapters/ResourceHub";
import { StartChapterGuide } from "@/components/chapters/StartChapterGuide";
import { ChapterBenefits } from "@/components/chapters/ChapterBenefits";
import { Globe, Users, Calendar, BookOpen, MessageCircle, Twitter } from 'lucide-react';

const Chapters = () => {
  const [activeView, setActiveView] = useState<'map' | 'list'>('map');

  return (
    <div className="min-h-screen bg-afro-yellow font-afro">
      {/* Hero Section */}
      <section className="py-16 bg-afro-teal text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-heading font-bold mb-6">
            Afrobeats DAO College Chapters
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join the global movement by starting an Afrobeats DAO chapter at your university. 
            Promote culture, develop talent, and host vibrant events with blockchain technology.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-afro-yellow text-black hover:bg-afro-yellow/90 font-heading text-xl rounded-full px-8 py-6 h-auto"
              onClick={() => document.getElementById('start-guide')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start a Chapter
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-afro-teal font-heading text-xl rounded-full px-8 py-6 h-auto"
              onClick={() => window.open('https://discord.gg/TNrWwSA955', '_blank')}
            >
              <MessageCircle className="mr-2 h-6 w-6" />
              Join Discord
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <Globe className="h-8 w-8 mx-auto text-afro-teal" />
              <div className="text-2xl font-bold text-black">15+</div>
              <div className="text-sm text-gray-600">Target Universities</div>
            </div>
            <div className="space-y-2">
              <Users className="h-8 w-8 mx-auto text-afro-orange" />
              <div className="text-2xl font-bold text-black">5</div>
              <div className="text-sm text-gray-600">Min Team Members</div>
            </div>
            <div className="space-y-2">
              <Calendar className="h-8 w-8 mx-auto text-afro-red" />
              <div className="text-2xl font-bold text-black">4+</div>
              <div className="text-sm text-gray-600">Events per Semester</div>
            </div>
            <div className="space-y-2">
              <BookOpen className="h-8 w-8 mx-auto text-purple-600" />
              <div className="text-2xl font-bold text-black">10+</div>
              <div className="text-sm text-gray-600">Resource Templates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter Map & Directory */}
      <section className="py-16 bg-afro-yellow">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4 text-black">
              Desired Chapter Locations
            </h2>
            <p className="text-xl text-black/80 max-w-2xl mx-auto mb-8">
              Explore universities where we're looking to establish Afrobeats DAO chapters and help us expand the movement globally.
            </p>
            <div className="flex justify-center gap-4 mb-6">
              <Button
                variant={activeView === 'map' ? 'default' : 'outline'}
                onClick={() => setActiveView('map')}
                className={activeView === 'map' ? 'bg-afro-teal text-white' : 'text-black border-black'}
              >
                <Globe className="mr-2 h-4 w-4" />
                Map View
              </Button>
              <Button
                variant={activeView === 'list' ? 'default' : 'outline'}
                onClick={() => setActiveView('list')}
                className={activeView === 'list' ? 'bg-afro-teal text-white' : 'text-black border-black'}
              >
                <Users className="mr-2 h-4 w-4" />
                List View
              </Button>
            </div>
          </div>
          
          {activeView === 'map' ? <ChaptersMap /> : <ChaptersList />}
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="start-guide" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="start-guide">Start a Chapter</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
              <TabsTrigger value="resources">Resource Hub</TabsTrigger>
              <TabsTrigger value="agreements">Agreements</TabsTrigger>
            </TabsList>
            
            <TabsContent value="start-guide" id="start-guide">
              <StartChapterGuide />
            </TabsContent>
            
            <TabsContent value="benefits">
              <ChapterBenefits />
            </TabsContent>
            
            <TabsContent value="resources">
              <ResourceHub />
            </TabsContent>
            
            <TabsContent value="agreements">
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-3xl font-heading font-bold mb-4 text-black">
                    Chapter Agreement Templates
                  </h3>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Editable agreement templates for establishing and managing your Afrobeats DAO chapter.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Chapter Agreement Template
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600">
                        Comprehensive agreement outlining responsibilities, support, and compliance requirements between the chapter and Afrobeats DAO.
                      </p>
                      <div className="space-y-2">
                        <Button className="w-full" variant="outline">
                          Edit Template
                        </Button>
                        <Button className="w-full" variant="outline">
                          Download PDF
                        </Button>
                        <Button className="w-full" variant="outline">
                          Copy Text
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        University Registration Forms
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600">
                        Templates for constitution, bylaws, and registration documents required for university recognition.
                      </p>
                      <div className="space-y-2">
                        <Button className="w-full" variant="outline">
                          Edit Constitution
                        </Button>
                        <Button className="w-full" variant="outline">
                          Edit Bylaws
                        </Button>
                        <Button className="w-full" variant="outline">
                          Registration Form
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-afro-teal text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">
            Ready to Start Your Chapter?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Connect with us on our social platforms to begin your chapter journey and get support from our community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-afro-yellow text-black hover:bg-afro-yellow/90 font-heading text-xl rounded-full px-8 py-6 h-auto"
              onClick={() => window.open('https://discord.gg/TNrWwSA955', '_blank')}
            >
              <MessageCircle className="mr-2 h-6 w-6" />
              Join Discord
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-afro-teal font-heading text-xl rounded-full px-8 py-6 h-auto"
              onClick={() => window.open('https://t.me/afrobeats_party', '_blank')}
            >
              <MessageCircle className="mr-2 h-6 w-6" />
              Telegram
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-afro-teal font-heading text-xl rounded-full px-8 py-6 h-auto"
              onClick={() => window.open('https://x.com/afrobeatsdao', '_blank')}
            >
              <Twitter className="mr-2 h-6 w-6" />
              Twitter
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Chapters;
