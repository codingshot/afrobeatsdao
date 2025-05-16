import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import { Footer } from "@/components/Footer";
import JobListingCard from "@/components/careers/JobListingCard";
import { jobListings } from "@/data/job-listings";
import { Helmet } from "react-helmet";

const Careers = () => {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Helmet>
        <title>Careers at AfrobeatsDAO | Join Our Team</title>
        <meta name="description" content="Join the AfrobeatsDAO team and help us build the ultimate destination for Afrobeats culture. View our current job openings and opportunities." />
        <meta property="og:title" content="Careers at AfrobeatsDAO" />
        <meta property="og:description" content="Join the AfrobeatsDAO team and help us build the ultimate destination for Afrobeats culture." />
        <meta property="og:type" content="website" />
        <meta name="keywords" content="afrobeats careers, music industry jobs, african music careers, cultural jobs" />
      </Helmet>

      <div className="container mx-auto py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#FFD600]">Careers</h1>
          
          <Card className="bg-zinc-900 border-zinc-800 text-white mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-[#FFD600]">Join AfrobeatsDAO</CardTitle>
              <CardDescription className="text-zinc-400">
                Help us build the ultimate destination for Afrobeats culture
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                AfrobeatsDAO and Afrobeats.party are on a mission to celebrate and promote Afrobeats music, 
                dance, events, and culture globally. We're looking for passionate individuals who share our vision 
                and want to contribute to the growth of this movement.
              </p>
              <p>
                Browse our open positions below to see if there's an opportunity that matches your skills and interests.
              </p>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Briefcase className="mr-2 h-6 w-6 text-[#FFD600]" /> 
            Open Positions
          </h2>

          <div className="space-y-4">
            {jobListings.length > 0 ? (
              jobListings.map((job) => (
                <JobListingCard key={job.id} job={job} />
              ))
            ) : (
              <Card className="bg-zinc-900 border-zinc-800 text-white">
                <CardContent className="pt-6">
                  <p className="text-center text-zinc-400">No open positions at this time. Please check back soon!</p>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Don't see your role?</h2>
            <p className="mb-6">
              We're always looking for talented individuals passionate about Afrobeats culture.
              If you don't see a role that fits your skills but believe you can contribute to our mission,
              we'd still love to hear from you!
            </p>
            <Button variant="accent" asChild>
              <Link to="https://discord.com/invite/TNrWwSA955" target="_blank">
                Join our Discord
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Careers;
