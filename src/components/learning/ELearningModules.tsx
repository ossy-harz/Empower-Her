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
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Search, Award, Play } from "lucide-react";

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  lessons: number;
  progress?: number;
  instructor: {
    name: string;
    title: string;
  };
  image: string;
}

export default function ELearningModules() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");

  // Mock course data
  const courses: Course[] = [
    {
      id: 1,
      title: "Digital Literacy Fundamentals",
      description:
        "Learn the basics of using digital tools and navigating the internet safely.",
      category: "digital-literacy",
      level: "beginner",
      duration: "4 hours",
      lessons: 8,
      progress: 75,
      instructor: {
        name: "Grace Achieng",
        title: "Digital Skills Trainer",
      },
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80",
    },
    {
      id: 2,
      title: "Introduction to Entrepreneurship",
      description:
        "Discover the fundamentals of starting and running a successful small business.",
      category: "business",
      level: "beginner",
      duration: "6 hours",
      lessons: 10,
      instructor: {
        name: "Sarah Nambi",
        title: "Business Development Consultant",
      },
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&q=80",
    },
    {
      id: 3,
      title: "Financial Literacy for Women",
      description:
        "Learn essential financial skills including budgeting, saving, and investing.",
      category: "finance",
      level: "intermediate",
      duration: "5 hours",
      lessons: 7,
      progress: 30,
      instructor: {
        name: "Esther Mukasa",
        title: "Financial Advisor",
      },
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80",
    },
    {
      id: 4,
      title: "Advanced Digital Marketing",
      description:
        "Master social media marketing, content creation, and digital advertising strategies.",
      category: "marketing",
      level: "advanced",
      duration: "8 hours",
      lessons: 12,
      instructor: {
        name: "Rebecca Ochieng",
        title: "Digital Marketing Specialist",
      },
      image:
        "https://images.unsplash.com/photo-1557838923-2985c318be48?w=500&q=80",
    },
  ];

  // Filter courses based on search query, category, and level
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || course.category === categoryFilter;

    const matchesLevel = levelFilter === "all" || course.level === levelFilter;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="bg-background">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="digital-literacy">Digital Literacy</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select value={levelFilter} onValueChange={setLevelFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Level</SelectLabel>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden flex flex-col">
            <div className="aspect-video w-full overflow-hidden bg-muted">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <Badge
                  variant={
                    course.level === "beginner"
                      ? "secondary"
                      : course.level === "intermediate"
                        ? "outline"
                        : "default"
                  }
                >
                  {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                </Badge>
              </div>
              <CardDescription className="line-clamp-2">
                {course.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2 flex-grow">
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                <span className="font-medium">{course.instructor.name}</span>
                <span>•</span>
                <span>{course.instructor.title}</span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-3.5 w-3.5 mr-1" />
                  {course.lessons} lessons
                </div>
              </div>
              {course.progress !== undefined && (
                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                {course.progress !== undefined ? (
                  <>
                    <Play className="mr-2 h-4 w-4" /> Continue Learning
                  </>
                ) : (
                  <>
                    <BookOpen className="mr-2 h-4 w-4" /> Start Course
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No courses found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}
