
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JobListing } from "@/types/job";
import { ArrowRight } from "lucide-react";

interface JobListingCardProps {
  job: JobListing;
}

const JobListingCard = ({ job }: JobListingCardProps) => {
  return (
    <Card className="bg-zinc-900 border-zinc-800 text-white hover:border-[#FFD600] transition-colors">
      <CardContent className="pt-6">
        <h3 className="text-xl font-bold mb-2">{job.title}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-zinc-800 px-3 py-1 rounded-full text-sm text-zinc-300">
            {job.location}
          </span>
          <span className="bg-zinc-800 px-3 py-1 rounded-full text-sm text-zinc-300">
            {job.type}
          </span>
          {job.compensation && (
            <span className="bg-zinc-800 px-3 py-1 rounded-full text-sm text-zinc-300">
              {job.compensation}
            </span>
          )}
        </div>
        <p className="text-zinc-400 line-clamp-2">{job.summary}</p>
      </CardContent>
      <CardFooter>
        <Button variant="white" asChild className="group">
          <Link to={`/careers/${job.slug}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobListingCard;
