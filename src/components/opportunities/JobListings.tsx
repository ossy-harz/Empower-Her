import { useState } from "react";
import {
  Search,
  Filter,
  MapPin,
  Briefcase,
  Clock,
  ExternalLink,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Mock data for job listings
const mockJobs = [
  {
    id: 1,
    title: "Digital Marketing Specialist",
    company: "TechGrow Uganda",
    location: "Kampala, Uganda",
    type: "Full-time",
    salary: "$800-1200/month",
    posted: "2 days ago",
    description:
      "We are looking for a Digital Marketing Specialist to develop and implement marketing strategies for our clients. The ideal candidate should have experience with social media management, content creation, and digital advertising.",
    requirements: [
      "2+ years of experience in digital marketing",
      "Proficiency in social media platforms",
      "Basic knowledge of graphic design",
      "Excellent communication skills",
    ],
    tags: ["Marketing", "Digital", "Social Media"],
  },
  {
    id: 2,
    title: "Web Developer",
    company: "Innovate Solutions",
    location: "Remote (Uganda-based)",
    type: "Contract",
    salary: "$15-25/hour",
    posted: "1 week ago",
    description:
      "Seeking a talented Web Developer to create responsive websites and web applications. You will be responsible for both front-end and back-end development, ensuring high performance and responsiveness.",
    requirements: [
      "Experience with HTML, CSS, JavaScript",
      "Familiarity with React or Angular",
      "Basic understanding of server-side languages",
      "Portfolio of previous work",
    ],
    tags: ["Development", "Web", "Remote"],
  },
  {
    id: 3,
    title: "Community Outreach Coordinator",
    company: "Women Empowerment Initiative",
    location: "Gulu, Uganda",
    type: "Part-time",
    salary: "$500-700/month",
    posted: "3 days ago",
    description:
      "Join our team as a Community Outreach Coordinator to help connect women with resources and opportunities. You will organize community events, workshops, and training sessions.",
    requirements: [
      "Strong communication and interpersonal skills",
      "Experience working with communities",
      "Knowledge of local languages (Acholi preferred)",
      "Passion for women's empowerment",
    ],
    tags: ["Community", "Outreach", "Part-time"],
  },
  {
    id: 4,
    title: "E-commerce Manager",
    company: "AfriMarket",
    location: "Entebbe, Uganda",
    type: "Full-time",
    salary: "$1000-1500/month",
    posted: "5 days ago",
    description:
      "AfriMarket is seeking an E-commerce Manager to oversee our online marketplace operations. The ideal candidate will have experience in e-commerce management, vendor relations, and digital marketing.",
    requirements: [
      "3+ years of experience in e-commerce",
      "Strong analytical and problem-solving skills",
      "Experience with inventory management",
      "Knowledge of SEO and digital marketing",
    ],
    tags: ["E-commerce", "Management", "Digital"],
  },
];

export default function JobListings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);

  const handleSearch = () => {
    const filtered = mockJobs.filter((job) => {
      const matchesSearch =
        searchTerm === "" ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        jobType === "all-types" ||
        jobType === "" ||
        job.type.toLowerCase() === jobType.toLowerCase();

      const matchesLocation =
        location === "all-locations" ||
        location === "" ||
        job.location.toLowerCase().includes(location.toLowerCase());

      return matchesSearch && matchesType && matchesLocation;
    });

    setFilteredJobs(filtered);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setJobType("all-types");
    setLocation("all-locations");
    setFilteredJobs(mockJobs);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <h1 className="text-xl font-bold">Job Listings</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Find Your Next Opportunity
          </h2>
          <p className="text-muted-foreground">
            Browse through job listings tailored for women in technology and
            related fields.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search jobs by title, company, or keywords"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">All Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-locations">All Locations</SelectItem>
                  <SelectItem value="Kampala">Kampala</SelectItem>
                  <SelectItem value="Entebbe">Entebbe</SelectItem>
                  <SelectItem value="Gulu">Gulu</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSearch}>
              <Filter className="mr-2 h-4 w-4" /> Apply Filters
            </Button>
            <Button variant="outline" onClick={resetFilters}>
              Reset
            </Button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No jobs found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <CardDescription className="text-base">
                        {job.company}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        job.type === "Full-time" ? "default" : "secondary"
                      }
                    >
                      {job.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {job.salary}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Posted {job.posted}
                      </div>
                    </div>
                    <p>{job.description}</p>
                    <div>
                      <h4 className="font-medium mb-2">Requirements:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Save Job
                  </Button>
                  <Button size="sm">
                    Apply Now <ExternalLink className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
