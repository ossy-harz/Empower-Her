import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Search, Users } from "lucide-react";

interface Mentor {
  id: number;
  name: string;
  title: string;
  expertise: string[];
  experience: number;
  location: string;
  availability: string;
  bio: string;
  avatar: string;
}

export default function MentorshipConnections() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expertiseFilter, setExpertiseFilter] = useState("all");

  // Mock mentor data
  const mentors: Mentor[] = [
    {
      id: 1,
      name: "Grace Achieng",
      title: "Business Development Consultant",
      expertise: ["business", "marketing", "entrepreneurship"],
      experience: 8,
      location: "Kampala",
      availability: "Weekdays",
      bio: "Business consultant with 8 years of experience helping women entrepreneurs scale their businesses across East Africa.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace",
    },
    {
      id: 2,
      name: "Sarah Nambi",
      title: "Digital Marketing Specialist",
      expertise: ["digital", "marketing", "social media"],
      experience: 5,
      location: "Entebbe",
      availability: "Weekends",
      bio: "Digital marketing expert specializing in social media strategy and content creation for small businesses.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      id: 3,
      name: "Esther Mukasa",
      title: "Financial Advisor",
      expertise: ["finance", "accounting", "investment"],
      experience: 10,
      location: "Jinja",
      availability: "Flexible",
      bio: "Certified financial advisor helping women achieve financial independence through smart planning and investment.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Esther",
    },
    {
      id: 4,
      name: "Rebecca Ochieng",
      title: "Tech Entrepreneur",
      expertise: ["technology", "startups", "innovation"],
      experience: 7,
      location: "Kampala",
      availability: "Evenings",
      bio: "Founder of two successful tech startups, passionate about helping women enter and thrive in the tech industry.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rebecca",
    },
  ];

  // Filter mentors based on search query and expertise
  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.bio.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesExpertise =
      expertiseFilter === "all" || mentor.expertise.includes(expertiseFilter);

    return matchesSearch && matchesExpertise;
  });

  return (
    <div className="bg-background">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search mentors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={expertiseFilter} onValueChange={setExpertiseFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Expertise" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Expertise</SelectLabel>
              <SelectItem value="all">All Areas</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="entrepreneurship">Entrepreneurship</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMentors.map((mentor) => (
          <Card key={mentor.id} className="flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={mentor.avatar} alt={mentor.name} />
                  <AvatarFallback>{mentor.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{mentor.name}</CardTitle>
                  <CardDescription>{mentor.title}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2 flex-grow">
              <p className="text-sm mb-3">{mentor.bio}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {mentor.expertise.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  <span>{mentor.experience} years exp.</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{mentor.availability}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Request Mentorship</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredMentors.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No mentors found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}
