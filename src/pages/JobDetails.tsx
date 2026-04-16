
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Briefcase, Users } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { jobListings } from "@/data/job-listings";
import { JobListing } from "@/types/job";
import { Footer } from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { SITE_ORIGIN, SITE_NAME, absoluteUrl, sanitizeSnippet, jsonLdGraph, breadcrumbListSchema } from "@/lib/siteSeo";

// Add a custom style to ensure the job title text color is properly set
const jobTitleStyle = {
  color: '#FFD600',
  textShadow: '0 0 1px rgba(255, 214, 0, 0.5)'
};

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
      <>
        <Helmet>
          <title>{`Careers | ${SITE_NAME}`}</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-4">Loading job details...</h1>
            <div className="w-16 h-16 border-4 border-[#FFD600] border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </>
    );
  }

  if (!job) {
    return (
      <>
        <Helmet>
          <title>{`Job not found | Careers | ${SITE_NAME}`}</title>
          <meta name="description" content="This job listing is not available. Browse open roles at Afrobeats.party careers." />
          <meta name="robots" content="noindex, follow" />
        </Helmet>
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
      </>
    );
  }

  const jobPageUrl = `${SITE_ORIGIN}/careers/${job.slug}`;
  const jobMetaDescription = sanitizeSnippet(job.summary);
  const jobPostingBody = sanitizeSnippet(`${job.summary}\n\n${job.description}`, 8000);
  const jobOg = absoluteUrl("/AfrobeatsDAOMeta.png");
  const jobJsonLd = jsonLdGraph([
    breadcrumbListSchema([
      { name: "Home", url: SITE_ORIGIN },
      { name: "Careers", url: `${SITE_ORIGIN}/careers` },
      { name: job.title, url: jobPageUrl },
    ]),
    {
      "@type": "JobPosting",
      title: job.title,
      description: jobPostingBody,
      datePosted: job.postedDate,
      employmentType: job.type,
      hiringOrganization: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_ORIGIN,
        logo: jobOg,
      },
      jobLocation: {
        "@type": "Place",
        name: job.location,
      },
      directApply: true,
      url: jobPageUrl,
    },
  ]);

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Helmet>
        <title>{`${job.title} | Careers | ${SITE_NAME}`}</title>
        <meta name="description" content={jobMetaDescription} />
        <link rel="canonical" href={jobPageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${job.title} | ${SITE_NAME}`} />
        <meta property="og:description" content={jobMetaDescription} />
        <meta property="og:url" content={jobPageUrl} />
        <meta property="og:image" content={jobOg} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${job.title} | ${SITE_NAME}`} />
        <meta name="twitter:description" content={jobMetaDescription} />
        <meta name="twitter:image" content={jobOg} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <script type="application/ld+json">{JSON.stringify(jobJsonLd)}</script>
      </Helmet>
      <div className="container mx-auto py-20 px-4">
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
            
            {/* Using both inline style and className for maximum specificity */}
            <h1 
              className="text-3xl md:text-4xl font-bold mb-6" 
              style={jobTitleStyle}
            >
              {job.title}
            </h1>
            
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
