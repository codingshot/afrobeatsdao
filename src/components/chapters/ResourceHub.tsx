
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, Copy, Edit, Users, Calendar, DollarSign, BookOpen, Settings, HelpCircle } from 'lucide-react';

const documentTemplates = [
  {
    id: 'constitution',
    title: 'Chapter Constitution Template',
    description: 'Complete constitution template with customizable sections for university requirements.',
    category: 'governance',
    downloadUrl: '#',
    editable: true,
    previewText: 'Article I: Name\nThe official name of the organization shall be the Afrobeats DAO [University Name] Chapter...'
  },
  {
    id: 'bylaws',
    title: 'Chapter Bylaws Template',
    description: 'Detailed bylaws covering officer duties, elections, and operational procedures.',
    category: 'governance',
    downloadUrl: '#',
    editable: true,
    previewText: 'Article I: Officer Duties\nPresident: Leads chapter strategy and represents the chapter...'
  },
  {
    id: 'advisor-agreement',
    title: 'Faculty Advisor Agreement',
    description: 'Template agreement outlining advisor responsibilities and involvement.',
    category: 'governance',
    downloadUrl: '#',
    editable: true,
    previewText: 'Advisor Responsibilities:\n- Attend at least 2 chapter meetings per semester...'
  },
  {
    id: 'registration-form',
    title: 'University Registration Application',
    description: 'Complete application template for gaining official university recognition.',
    category: 'governance',
    downloadUrl: '#',
    editable: true,
    previewText: 'Basic Information:\nClub Name: Afrobeats DAO [University Name] Chapter...'
  },
  {
    id: 'event-proposal',
    title: 'Event Proposal Template',
    description: 'Comprehensive template for planning and proposing events to university administration.',
    category: 'events',
    downloadUrl: '#',
    editable: true,
    previewText: 'Event Name: [Event Title]\nDate: [Date]\nLocation: [Venue]...'
  },
  {
    id: 'budget-template',
    title: 'Event Budget Template',
    description: 'Detailed budget planning template with income and expense categories.',
    category: 'funding',
    downloadUrl: '#',
    editable: true,
    previewText: 'Event Budget:\nIncome:\n- University Grant: $X\n- Sponsorships: $X...'
  },
  {
    id: 'membership-form',
    title: 'Membership Signup Form',
    description: 'Customizable member registration form with digital integration options.',
    category: 'membership',
    downloadUrl: '#',
    editable: true,
    previewText: 'Member Information:\nName: [Full Name]\nStudent ID: [ID Number]...'
  },
  {
    id: 'chapter-agreement',
    title: 'Afrobeats DAO Chapter Agreement',
    description: 'Official agreement between chapter and Afrobeats DAO outlining responsibilities.',
    category: 'governance',
    downloadUrl: '#',
    editable: true,
    previewText: 'This Chapter Agreement is entered into between Afrobeats DAO and [Chapter Lead Name]...'
  }
];

const fundingResources = [
  {
    title: 'University Grant Applications',
    description: 'Guide to securing funding from student activities, cultural diversity, and academic departments.',
    links: ['Student Activities Fund', 'Cultural Programming Grants', 'International Student Services']
  },
  {
    title: 'Sponsorship Opportunities',
    description: 'Template pitch decks and contact strategies for local businesses and music platforms.',
    links: ['Local Business Sponsorship Template', 'Music Platform Partnership Guide', 'Event Sponsor Proposal']
  },
  {
    title: 'Crowdfunding Strategies',
    description: 'Best practices for POTLOCK campaigns and community fundraising.',
    links: ['POTLOCK Campaign Setup', 'Community Fundraising Tips', 'Social Media Promotion']
  },
  {
    title: 'Revenue Generation',
    description: 'Methods for generating income through events, merchandise, and services.',
    links: ['Ticket Sales Strategy', 'Merchandise Planning', 'Service Revenue Models']
  }
];

const eventTemplates = [
  {
    title: 'Listening Sessions',
    description: 'Intimate gatherings to discover new music and discuss Afrobeats culture.',
    checklist: ['Venue booking', 'Playlist curation', 'Discussion topics', 'Refreshments']
  },
  {
    title: 'Dance Workshops',
    description: 'Learn and teach popular Afrobeats dance moves and choreography.',
    checklist: ['Instructor booking', 'Space requirements', 'Music system', 'Registration process']
  },
  {
    title: 'Artist Showcases',
    description: 'Platform for emerging artists to perform and connect with audiences.',
    checklist: ['Artist recruitment', 'Technical requirements', 'Promotion strategy', 'Artist compensation']
  },
  {
    title: 'Industry Panels',
    description: 'Educational sessions with music industry professionals.',
    checklist: ['Speaker recruitment', 'Topic development', 'Q&A moderation', 'Networking time']
  },
  {
    title: 'Cultural Festivals',
    description: 'Large-scale celebrations of Afrobeats culture and African heritage.',
    checklist: ['Multi-venue coordination', 'Vendor management', 'Cultural programming', 'Community partnerships']
  }
];

const sampleConstitutions = [
  {
    title: 'African Student Association Constitution',
    university: 'Generic Template',
    focus: 'Cultural promotion and community building with flexible membership structures.',
    downloadUrl: '#'
  },
  {
    title: 'Music Club Constitution',
    university: 'Generic Template',
    focus: 'Performance and industry networking with detailed officer roles.',
    downloadUrl: '#'
  },
  {
    title: 'Cultural Organization Bylaws',
    university: 'Generic Template',
    focus: 'Event planning and budget management procedures.',
    downloadUrl: '#'
  }
];

export const ResourceHub = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [templateContent, setTemplateContent] = useState<string>('');

  const handleEditTemplate = (template: any) => {
    setSelectedTemplate(template.id);
    setTemplateContent(template.previewText);
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  const categories = {
    governance: documentTemplates.filter(t => t.category === 'governance'),
    events: documentTemplates.filter(t => t.category === 'events'),
    funding: documentTemplates.filter(t => t.category === 'funding'),
    membership: documentTemplates.filter(t => t.category === 'membership')
  };

  return (
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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="funding">Funding</TabsTrigger>
          <TabsTrigger value="samples">Samples</TabsTrigger>
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
                    <Card key={template.id} className="border-2 border-gray-200 hover:border-afro-teal transition-colors">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg">{template.title}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {template.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-gray-600">{template.description}</p>
                        <div className="flex gap-2">
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
                            onClick={() => window.open(template.downloadUrl, '_blank')}
                          >
                            <Download className="mr-1 h-3 w-3" />
                            PDF
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCopyToClipboard(template.previewText)}
                          >
                            <Copy className="mr-1 h-3 w-3" />
                            Copy
                          </Button>
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
                <Card key={index} className="border-2 border-afro-orange hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-afro-orange" />
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{event.description}</p>
                    <div>
                      <p className="text-sm font-medium mb-2">Planning Checklist:</p>
                      <ul className="space-y-1">
                        {event.checklist.map((item, idx) => (
                          <li key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                            <div className="w-1 h-1 bg-afro-orange rounded-full" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button size="sm" className="w-full bg-afro-orange hover:bg-afro-orange/90">
                      <FileText className="mr-1 h-3 w-3" />
                      Get Template
                    </Button>
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
                <Card key={index} className="border-2 border-green-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      {resource.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{resource.description}</p>
                    <div className="space-y-2">
                      {resource.links.map((link, idx) => (
                        <Button key={idx} size="sm" variant="outline" className="w-full justify-start">
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

        {/* Sample Constitutions */}
        <TabsContent value="samples" className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-black">Sample Constitutions</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {sampleConstitutions.map((sample, index) => (
                <Card key={index} className="border-2 border-blue-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      {sample.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">University:</p>
                      <p className="text-sm text-gray-600">{sample.university}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Focus:</p>
                      <p className="text-sm text-gray-600">{sample.focus}</p>
                    </div>
                    <Button size="sm" className="w-full" variant="outline">
                      <Download className="mr-1 h-3 w-3" />
                      Download Sample
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> These samples are for inspiration only. Always customize documents to meet your university's specific requirements and Afrobeats DAO guidelines.
              </p>
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

      {/* Template Editor Modal (if selectedTemplate) */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[80vh] overflow-hidden">
            <CardHeader>
              <CardTitle>Edit Template</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                value={templateContent}
                onChange={(e) => setTemplateContent(e.target.value)}
                className="w-full h-96 p-4 border rounded-lg font-mono text-sm"
              />
              <div className="flex gap-2">
                <Button onClick={() => setSelectedTemplate(null)}>
                  Close
                </Button>
                <Button className="bg-afro-teal">
                  <Download className="mr-1 h-4 w-4" />
                  Export PDF
                </Button>
                <Button variant="outline" onClick={() => handleCopyToClipboard(templateContent)}>
                  <Copy className="mr-1 h-4 w-4" />
                  Copy Text
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
