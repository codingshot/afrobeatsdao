
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Users, FileText, Calendar, MessageCircle, Twitter, Clock } from 'lucide-react';

const steps = [
  {
    title: "Submit a Chapter Formation Request",
    description: "Complete our online form with your university details and vision for the chapter.",
    action: "Join Discord to get started",
    link: "https://discord.gg/TNrWwSA955",
    timeEstimate: "30 minutes"
  },
  {
    title: "Recruit a Founding Team",
    description: "Gather at least 5 committed members including President, Events Director, Marketing Lead, and Treasury Manager.",
    action: "Recruit team members",
    timeEstimate: "1-2 weeks"
  },
  {
    title: "Secure a Faculty Advisor",
    description: "Find a professor or staff member to support your chapter and ensure university compliance.",
    action: "Contact faculty",
    timeEstimate: "1 week"
  },
  {
    title: "Draft Constitution and Bylaws",
    description: "Use our provided templates to create governing documents that meet university requirements.",
    action: "Access templates",
    timeEstimate: "2-3 days"
  },
  {
    title: "Apply for University Recognition",
    description: "Submit your application to the student activities office with all required documents.",
    action: "Submit application",
    timeEstimate: "2-4 weeks processing"
  },
  {
    title: "Complete Orientation Training",
    description: "Attend a consultation with Afrobeats DAO representatives to learn about operations and blockchain integration.",
    action: "Schedule training",
    timeEstimate: "2 hours"
  },
  {
    title: "Launch Your Chapter",
    description: "Host a launch event, establish social media presence, and start recruiting members.",
    action: "Plan launch event",
    timeEstimate: "2-3 weeks"
  },
  {
    title: "Apply for Funding",
    description: "Seek university grants, local sponsorships, or crowdfunding opportunities to support your activities.",
    action: "Explore funding",
    timeEstimate: "Ongoing"
  }
];

const requirements = [
  "Minimum of 5 founding team members",
  "Faculty advisor commitment",
  "Official university recognition",
  "Dedicated social media presence",
  "Host 4+ events per semester",
  "Submit monthly progress reports"
];

const roles = [
  {
    title: "Chapter President",
    description: "Overall strategic direction and liaison with Afrobeats DAO",
    timeCommitment: "5-7 hours/week"
  },
  {
    title: "Events Director",
    description: "Coordinates performances and cultural events",
    timeCommitment: "4-6 hours/week"
  },
  {
    title: "Marketing Lead",
    description: "Manages social media and campus outreach",
    timeCommitment: "3-5 hours/week"
  },
  {
    title: "Treasury Manager",
    description: "Handles budget and fundraising",
    timeCommitment: "2-4 hours/week"
  },
  {
    title: "Technical Lead (Optional)",
    description: "Manages blockchain integration and digital platforms",
    timeCommitment: "2-3 hours/week"
  },
  {
    title: "Community Manager (Optional)",
    description: "Focuses on member engagement and retention",
    timeCommitment: "2-3 hours/week"
  }
];

export const StartChapterGuide = () => {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-heading font-bold mb-4 text-black">
          How to Start a Chapter
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Follow our step-by-step guide to establish an Afrobeats DAO chapter at your university. 
          The entire process typically takes 6-8 weeks from application to launch.
        </p>
      </div>

      {/* Quick Action */}
      <div className="bg-afro-teal text-white rounded-lg p-6 text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
        <p className="mb-6 text-lg">
          Join our Discord community and connect with other chapter leaders and Afrobeats DAO representatives.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            size="lg" 
            className="bg-afro-yellow text-black hover:bg-afro-yellow/90 font-heading"
            onClick={() => window.open('https://discord.gg/TNrWwSA955', '_blank')}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Join Discord Community
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white hover:text-afro-teal font-heading"
            onClick={() => window.open('https://x.com/afrobeatsdao', '_blank')}
          >
            <Twitter className="mr-2 h-5 w-5" />
            Follow on Twitter
          </Button>
        </div>
      </div>

      {/* Step-by-Step Process */}
      <div>
        <h3 className="text-2xl font-heading font-bold mb-6 text-black text-center">
          Step-by-Step Process
        </h3>
        <div className="grid gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="border-l-4 border-afro-teal">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-afro-teal text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                    <p className="text-gray-600 mb-3">{step.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        {step.timeEstimate}
                      </div>
                      {step.link && (
                        <Button
                          size="sm"
                          className="bg-afro-teal hover:bg-afro-teal/90"
                          onClick={() => window.open(step.link, '_blank')}
                        >
                          {step.action}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Core Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {requirements.map((requirement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{requirement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Leadership Roles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roles.map((role, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-4">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-medium text-sm">{role.title}</h5>
                    <Badge variant="outline" className="text-xs">
                      {role.timeCommitment}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600">{role.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Support */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-center">Need Help Getting Started?</h3>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <h4 className="font-medium mb-1">Resource Templates</h4>
            <p className="text-sm text-gray-600">Access all necessary document templates</p>
          </div>
          <div>
            <MessageCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <h4 className="font-medium mb-1">Community Support</h4>
            <p className="text-sm text-gray-600">Connect with other chapter leaders</p>
          </div>
          <div>
            <Calendar className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <h4 className="font-medium mb-1">One-on-One Guidance</h4>
            <p className="text-sm text-gray-600">Schedule consultation with DAO reps</p>
          </div>
        </div>
      </div>
    </div>
  );
};
