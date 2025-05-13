
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Briefcase, Users } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { jobListings } from "@/data/job-listings";
import { JobListing } from "@/types/job";
import { Footer } from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const JobDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [job, setJob] = useState<JobListing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const findJob = () => {
      const foundJob = jobListings.find((j) => j.slug === slug);
      setJob(foundJob || null);
      setIsLoading(false);
    };

    setTimeout(findJob, 300); // Simulate loading for better UX
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-4">Loading job details...</h1>
          <div className="w-16 h-16 border-4 border-[#FFD600] border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <Alert variant="destructive" className="max-w-md mb-6 bg-red-500/10 border-red-500/20 text-white">
          <AlertTitle className="text-xl font-heading mb-2">Job Not Found</AlertTitle>
          <AlertDescription className="text-gray-200">
            Sorry, we couldn't find the job listing you're looking for. It might have been moved or removed.
          </AlertDescription>
        </Alert>
        
        <Button 
          onClick={() => navigate("/careers")}
          variant="default"
          className="bg-[#FFD600] hover:bg-[#FFD600]/80 text-black font-medium flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Careers
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button 
              onClick={() => navigate("/careers")}
              variant="outline"
              className="mb-6"
              size="sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Careers
            </Button>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#FFD600]">{job.title}</h1>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-zinc-800 px-4 py-2 rounded-md text-zinc-300 flex items-center">
                <Briefcase className="h-4 w-4 mr-2" />
                {job.type}
              </span>
              <span className="bg-zinc-800 px-4 py-2 rounded-md text-zinc-300 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                {job.location}
              </span>
              {job.compensation && (
                <span className="bg-zinc-800 px-4 py-2 rounded-md text-zinc-300">
                  {job.compensation}
                </span>
              )}
            </div>
            
            <p className="text-lg text-zinc-300 mb-8">{job.summary}</p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button variant="accent" size="lg" asChild>
                <Link to={job.applyLink} target="_blank">
                  Apply Now
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="https://discord.com/invite/TNrWwSA955" target="_blank">
                  Join Discord
                </Link>
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="description" className="mb-12">
            <TabsList className="bg-zinc-900 mb-6">
              <TabsTrigger value="description" className="data-[state=active]:bg-[#FFD600] data-[state=active]:text-black">Description</TabsTrigger>
              <TabsTrigger value="requirements" className="data-[state=active]:bg-[#FFD600] data-[state=active]:text-black">Requirements</TabsTrigger>
              <TabsTrigger value="how-to-apply" className="data-[state=active]:bg-[#FFD600] data-[state=active]:text-black">How to Apply</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="text-zinc-300 space-y-4">
              <JobDetail 
                title="About AfrobeatsDAO" 
                content={job.about} 
              />
              
              <JobDetail 
                title="Role Overview" 
                content={job.description} 
              />
              
              <h3 className="text-xl font-bold mt-8 mb-4 text-white">Key Responsibilities</h3>
              {job.responsibilities.map((section, index) => (
                <JobDetail 
                  key={index}
                  title={section.title} 
                  content={section.items} 
                />
              ))}
              
              <JobDetail 
                title="KPIs" 
                content={job.kpis} 
              />
              
              <JobDetail 
                title="Compensation & Time Commitment" 
                content={job.compensationDetails} 
              />
            </TabsContent>
            
            <TabsContent value="requirements" className="text-zinc-300 space-y-4">
              <JobDetail 
                title="Requirements" 
                content={job.requirements} 
              />
            </TabsContent>
            
            <TabsContent value="how-to-apply" className="text-zinc-300 space-y-4">
              <JobDetail 
                title="How to Apply" 
                content={job.howToApply} 
              />
            </TabsContent>
          </Tabs>
          
          <div className="bg-zinc-900 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-[#FFD600]">Brand</h3>
            <div className="flex flex-col gap-2 mb-6">
              {job.brand.map((link, index) => (
                <a 
                  key={index}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-zinc-300 hover:text-[#FFD600]"
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            <Separator className="my-6" />
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="accent" asChild>
                <Link to={job.applyLink} target="_blank">
                  Apply for this Position
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Helper component to render job details sections
const JobDetail = ({ 
  title, 
  content 
}: { 
  title: string, 
  content: string | string[] 
}) => (
  <div className="mb-8">
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    {typeof content === 'string' ? (
      <div className="text-zinc-300 whitespace-pre-line">{content}</div>
    ) : (
      <ul className="list-disc pl-5 space-y-1 text-zinc-300">
        {content.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    )}
  </div>
);

export default JobDetails;
