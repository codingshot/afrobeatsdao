import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { FileText, Download, Copy, Edit, Users, Calendar, DollarSign, BookOpen, Settings, HelpCircle, Clock } from 'lucide-react';
import { TemplateEditor } from './TemplateEditor';
import { templateContent } from '@/data/templateContent';

const documentTemplates = [
  {
    id: 'constitution',
    title: 'Chapter Constitution Template',
    description: 'Complete constitution template with customizable sections for university requirements.',
    category: 'governance',
    available: true,
    content: templateContent.constitution
  },
  {
    id: 'bylaws',
    title: 'Chapter Bylaws Template',
    description: 'Detailed bylaws covering officer duties, elections, and operational procedures.',
    category: 'governance',
    available: true,
    content: templateContent.bylaws
  },
  {
    id: 'advisor-agreement',
    title: 'Faculty Advisor Agreement',
    description: 'Template agreement outlining advisor responsibilities and involvement.',
    category: 'governance',
    available: true,
    content: templateContent['advisor-agreement']
  },
  {
    id: 'registration-form',
    title: 'University Registration Application',
    description: 'Complete application template for gaining official university recognition.',
    category: 'governance',
    available: true,
    content: templateContent['registration-form']
  },
  {
    id: 'event-proposal',
    title: 'Event Proposal Template',
    description: 'Comprehensive template for planning and proposing events to university administration.',
    category: 'events',
    available: true,
    content: templateContent['event-proposal']
  },
  {
    id: 'budget-template',
    title: 'Event Budget Template',
    description: 'Detailed budget planning template with income and expense categories.',
    category: 'funding',
    available: true,
    content: templateContent['budget-template']
  },
  {
    id: 'membership-form',
    title: 'Membership Signup Form',
    description: 'Customizable member registration form with digital integration options.',
    category: 'membership',
    available: false
  },
  {
    id: 'chapter-agreement',
    title: 'Afrobeats DAO Chapter Agreement',
    description: 'Official agreement between chapter and Afrobeats DAO outlining responsibilities.',
    category: 'governance',
    available: false
  }
];

const fundingResources = [
  {
    title: 'University Grant Applications',
    description: 'Guide to securing funding from student activities, cultural diversity, and academic departments.',
    available: false,
    links: ['Student Activities Fund', 'Cultural Programming Grants', 'International Student Services']
  },
  {
    title: 'Sponsorship Opportunities',
    description: 'Template pitch decks and contact strategies for local businesses and music platforms.',
    available: false,
    links: ['Local Business Sponsorship Template', 'Music Platform Partnership Guide', 'Event Sponsor Proposal']
  },
  {
    title: 'Crowdfunding Strategies',
    description: 'Best practices for POTLOCK campaigns and community fundraising.',
    available: false,
    links: ['POTLOCK Campaign Setup', 'Community Fundraising Tips', 'Social Media Promotion']
  },
  {
    title: 'Revenue Generation',
    description: 'Methods for generating income through events, merchandise, and services.',
    available: false,
    links: ['Ticket Sales Strategy', 'Merchandise Planning', 'Service Revenue Models']
  }
];

const eventTemplates = [
  {
    title: 'Listening Sessions',
    description: 'Intimate gatherings to discover new music and discuss Afrobeats culture.',
    available: false,
    checklist: ['Venue booking', 'Playlist curation', 'Discussion topics', 'Refreshments']
  },
  {
    title: 'Dance Workshops',
    description: 'Learn and teach popular Afrobeats dance moves and choreography.',
    available: false,
    checklist: ['Instructor booking', 'Space requirements', 'Music system', 'Registration process']
  },
  {
    title: 'Artist Showcases',
    description: 'Platform for emerging artists to perform and connect with audiences.',
    available: false,
    checklist: ['Artist recruitment', 'Technical requirements', 'Promotion strategy', 'Artist compensation']
  },
  {
    title: 'Industry Panels',
    description: 'Educational sessions with music industry professionals.',
    available: false,
    checklist: ['Speaker recruitment', 'Topic development', 'Q&A moderation', 'Networking time']
  },
  {
    title: 'Cultural Festivals',
    description: 'Large-scale celebrations of Afrobeats culture and African heritage.',
    available: false,
    checklist: ['Multi-venue coordination', 'Vendor management', 'Cultural programming', 'Community partnerships']
  }
];

export const ResourceHub = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<{id: string, title: string, content: string} | null>(null);

  const handleEditTemplate = (template: any) => {
    setSelectedTemplate({
      id: template.id,
      title: template.title,
      content: template.content
    });
  };

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Toast notification would go here
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const categories = {
    governance: documentTemplates.filter(t => t.category === 'governance'),
    events: documentTemplates.filter(t => t.category === 'events'),
    funding: documentTemplates.filter(t => t.category === 'funding'),
    membership: documentTemplates.filter(t => t.category === 'membership')
  };

  return (
    <TooltipProvider>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-heading font-bold mb-4 text-black">
            Resource Hub
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Access comprehensive templates, guides, and tools to establish and manage your Afrobeats DAO chapter successfully.
          </p>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="templates" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="funding">Funding</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          {/* Document Templates */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid gap-6">
              {Object.entries(categories).map(([category, templates]) => (
                <div key={category}>
                  <h3 className="text-xl font-semibold mb-4 capitalize text-black">
                    {category} Documents
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {templates.map((template) => (
                      <Card key={template.id} className={`border-2 transition-colors ${
                        template.available 
                          ? 'border-gray-200 hover:border-afro-teal' 
                          : 'border-gray-100 bg-gray-50'
                      }`}>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <CardTitle className={`text-lg ${!template.available ? 'text-gray-400' : ''}`}>
                              {template.title}
                            </CardTitle>
                            <div className="flex gap-2">
                              <Badge variant="outline" className="text-xs">
                                {template.category}
                              </Badge>
                              {!template.available && (
                                <Badge variant="secondary" className="text-xs">
                                  Soon
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className={`text-sm ${template.available ? 'text-gray-600' : 'text-gray-400'}`}>
                            {template.description}
                          </p>
                          <div className="flex gap-2">
                            {template.available ? (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEditTemplate(template)}
                                >
                                  <Edit className="mr-1 h-3 w-3" />
                                  Edit
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleCopyToClipboard(template.content)}
                                >
                                  <Copy className="mr-1 h-3 w-3" />
                                  Copy
                                </Button>
                              </>
                            ) : (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button size="sm" variant="outline" disabled>
                                    <Clock className="mr-1 h-3 w-3" />
                                    Coming Soon
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>This template will be available soon</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Event Planning */}
          <TabsContent value="events" className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-black">Event Planning Templates</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventTemplates.map((event, index) => (
                  <Card key={index} className={`border-2 transition-shadow ${
                    event.available 
                      ? 'border-afro-orange hover:shadow-lg' 
                      : 'border-gray-100 bg-gray-50'
                  }`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center gap-2 ${!event.available ? 'text-gray-400' : ''}`}>
                        <Calendar className={`h-5 w-5 ${event.available ? 'text-afro-orange' : 'text-gray-400'}`} />
                        {event.title}
                        {!event.available && (
                          <Badge variant="secondary" className="text-xs ml-2">
                            Soon
                          </Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className={`text-sm ${event.available ? 'text-gray-600' : 'text-gray-400'}`}>
                        {event.description}
                      </p>
                      <div>
                        <p className={`text-sm font-medium mb-2 ${event.available ? 'text-gray-700' : 'text-gray-400'}`}>
                          Planning Checklist:
                        </p>
                        <ul className="space-y-1">
                          {event.checklist.map((item, idx) => (
                            <li key={idx} className={`text-xs flex items-center gap-2 ${
                              event.available ? 'text-gray-600' : 'text-gray-400'
                            }`}>
                              <div className={`w-1 h-1 rounded-full ${
                                event.available ? 'bg-afro-orange' : 'bg-gray-300'
                              }`} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {event.available ? (
                        <Button size="sm" className="w-full bg-afro-orange hover:bg-afro-orange/90">
                          <FileText className="mr-1 h-3 w-3" />
                          Get Template
                        </Button>
                      ) : (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button size="sm" className="w-full" variant="outline" disabled>
                              <Clock className="mr-1 h-3 w-3" />
                              Coming Soon
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>This template will be available soon</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Funding Resources */}
          <TabsContent value="funding" className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-black">Funding Resources</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {fundingResources.map((resource, index) => (
                  <Card key={index} className={`border-2 transition-shadow ${
                    resource.available 
                      ? 'border-green-200 hover:shadow-lg' 
                      : 'border-gray-100 bg-gray-50'
                  }`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center gap-2 ${!resource.available ? 'text-gray-400' : ''}`}>
                        <DollarSign className={`h-5 w-5 ${resource.available ? 'text-green-600' : 'text-gray-400'}`} />
                        {resource.title}
                        {!resource.available && (
                          <Badge variant="secondary" className="text-xs ml-2">
                            Soon
                          </Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className={`text-sm ${resource.available ? 'text-gray-600' : 'text-gray-400'}`}>
                        {resource.description}
                      </p>
                      <div className="space-y-2">
                        {resource.links.map((link, idx) => (
                          <Button 
                            key={idx} 
                            size="sm" 
                            variant="outline" 
                            className="w-full justify-start"
                            disabled={!resource.available}
                          >
                            <FileText className="mr-2 h-3 w-3" />
                            {link}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* FAQ */}
          <TabsContent value="faq" className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-black">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {[
                  {
                    question: "How much time commitment is required to run a chapter?",
                    answer: "Leadership roles typically require 2-7 hours per week, with event weeks requiring 10+ hours. The time commitment varies by role and chapter size."
                  },
                  {
                    question: "What if my campus has no existing Afrobeats community?",
                    answer: "Start by partnering with African Student Associations, music clubs, or dance groups. Use social media and campus events to gauge interest and build awareness."
                  },
                  {
                    question: "How do I transition chapter leadership after graduation?",
                    answer: "Recruit underclassmen early, document all processes, and create a comprehensive handover guide. Engage alumni for continued mentorship and support."
                  },
                  {
                    question: "What are the benefits of having a campus club?",
                    answer: "Access to university facilities, funding opportunities, official recognition, ability to book campus venues, and connection to academic resources."
                  },
                  {
                    question: "How can I book Afrobeats artists for events?",
                    answer: "Leverage Afrobeats DAO's artist network, partner with local promoters, and work with your campus events office for larger acts."
                  },
                  {
                    question: "What funding sources are available?",
                    answer: "University grants, student activity funds, cultural programming budgets, local sponsorships, event revenue, and DAO-supported crowdfunding campaigns."
                  }
                ].map((faq, index) => (
                  <Card key={index} className="border-l-4 border-afro-teal">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <HelpCircle className="h-5 w-5 text-afro-teal mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-2">{faq.question}</h4>
                          <p className="text-sm text-gray-600">{faq.answer}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Template Editor Modal */}
        <TemplateEditor
          isOpen={!!selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
          template={selectedTemplate}
        />
      </div>
    </TooltipProvider>
  );
};
