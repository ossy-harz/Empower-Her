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
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MessageSquare,
  Search,
  Users,
  Clock,
  ArrowLeft,
  Send,
} from "lucide-react";

interface ForumPost {
  id: number;
  content: string;
  author: {
    name: string;
    avatar?: string;
    role?: string;
  };
  timestamp: string;
  likes: number;
  isLiked?: boolean;
}

interface ForumTopic {
  id: number;
  title: string;
  description: string;
  category: string;
  posts: number;
  views: number;
  lastActivity: string;
  tags: string[];
  thread?: ForumPost[];
}

export default function CommunityForums() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState<ForumTopic | null>(null);
  const [replyContent, setReplyContent] = useState("");

  // Mock forum topics data
  const forumTopics: ForumTopic[] = [
    {
      id: 1,
      title: "Introduction and Welcome Thread",
      description: "New to the community? Introduce yourself here!",
      category: "general",
      posts: 45,
      views: 230,
      lastActivity: "2 hours ago",
      tags: ["welcome", "introduction"],
      thread: [
        {
          id: 1,
          content:
            "Welcome to our community! This is a safe space for all women to connect, share experiences, and support each other. Please introduce yourself and let us know what brings you here.",
          author: {
            name: "Grace Achieng",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace",
            role: "Moderator",
          },
          timestamp: "2 days ago",
          likes: 15,
          isLiked: true,
        },
        {
          id: 2,
          content:
            "Hello everyone! I'm Sarah from Kampala. I'm here to learn digital skills and connect with other women entrepreneurs. Looking forward to learning from all of you!",
          author: {
            name: "Sarah Nambi",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
          },
          timestamp: "1 day ago",
          likes: 8,
        },
        {
          id: 3,
          content:
            "Hi all, I'm Esther from Jinja. I'm interested in financial literacy and starting my own small business. Excited to be part of this community!",
          author: {
            name: "Esther Mukasa",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Esther",
          },
          timestamp: "12 hours ago",
          likes: 5,
        },
      ],
    },
    {
      id: 2,
      title: "Digital Literacy Resources",
      description:
        "Share and discuss helpful resources for improving digital literacy.",
      category: "resources",
      posts: 32,
      views: 187,
      lastActivity: "1 day ago",
      tags: ["digital-literacy", "resources"],
      thread: [
        {
          id: 1,
          content:
            "I've compiled a list of free resources for learning basic computer skills. These are especially helpful for those who are just starting their digital journey.",
          author: {
            name: "Rebecca Ochieng",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rebecca",
            role: "Digital Trainer",
          },
          timestamp: "3 days ago",
          likes: 22,
          isLiked: false,
        },
        {
          id: 2,
          content:
            "Thank you for sharing these resources! I've been looking for materials to teach basic computer skills in my community.",
          author: {
            name: "Mary Okello",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mary",
          },
          timestamp: "2 days ago",
          likes: 7,
        },
      ],
    },
    {
      id: 3,
      title: "Business Registration Process in Uganda",
      description:
        "Questions and answers about the business registration process.",
      category: "business",
      posts: 28,
      views: 156,
      lastActivity: "3 days ago",
      tags: ["business", "registration"],
      thread: [
        {
          id: 1,
          content:
            "Can someone explain the steps for registering a small business in Uganda? What documents do I need and what are the fees?",
          author: {
            name: "Jane Akello",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
          },
          timestamp: "5 days ago",
          likes: 10,
        },
        {
          id: 2,
          content:
            "I registered my business last year. You'll need: 1) Business name reservation, 2) Registration with URSB, 3) Tax registration with URA. The total cost was around 150,000 UGX.",
          author: {
            name: "Patricia Nantongo",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia",
          },
          timestamp: "4 days ago",
          likes: 15,
        },
      ],
    },
    {
      id: 4,
      title: "Mobile Banking Tips and Tricks",
      description:
        "Discuss mobile banking options and share tips for secure usage.",
      category: "finance",
      posts: 37,
      views: 210,
      lastActivity: "5 hours ago",
      tags: ["finance", "mobile-banking"],
      thread: [
        {
          id: 1,
          content:
            "What mobile banking platforms do you recommend for small businesses? I need something with low transaction fees.",
          author: {
            name: "Florence Atim",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Florence",
          },
          timestamp: "2 days ago",
          likes: 8,
        },
        {
          id: 2,
          content:
            "I've been using MTN MoMo for my business and it works well. The transaction fees are reasonable and most of my customers already use it.",
          author: {
            name: "Irene Nakato",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Irene",
          },
          timestamp: "1 day ago",
          likes: 5,
        },
        {
          id: 3,
          content:
            "Airtel Money has been reliable for me. Their business account has some good features for tracking transactions.",
          author: {
            name: "Betty Namusisi",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Betty",
          },
          timestamp: "12 hours ago",
          likes: 3,
        },
      ],
    },
  ];

  // Filter topics based on search query and category
  const filteredTopics = forumTopics.filter((topic) => {
    const matchesSearch =
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || topic.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleViewTopic = (topic: ForumTopic) => {
    setSelectedTopic(topic);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
  };

  const handleReplySubmit = () => {
    if (!replyContent.trim() || !selectedTopic) return;

    // In a real app, this would be an API call to save the reply
    // For now, we'll just update the local state
    const newPost: ForumPost = {
      id: (selectedTopic.thread?.length || 0) + 1,
      content: replyContent,
      author: {
        name: "You (Current User)",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser",
      },
      timestamp: "Just now",
      likes: 0,
    };

    // Create a new topic object with the updated thread
    const updatedTopic = {
      ...selectedTopic,
      posts: selectedTopic.posts + 1,
      lastActivity: "Just now",
      thread: [...(selectedTopic.thread || []), newPost],
    };

    // Update the selected topic
    setSelectedTopic(updatedTopic);

    // Clear the reply input
    setReplyContent("");
  };

  // If a topic is selected, show the thread view
  if (selectedTopic) {
    return (
      <div className="bg-background">
        <div className="mb-6">
          <Button
            variant="ghost"
            className="flex items-center gap-2 mb-4"
            onClick={handleBackToTopics}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Topics
          </Button>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{selectedTopic.title}</CardTitle>
                <div className="flex gap-2">
                  {selectedTopic.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <CardDescription>{selectedTopic.description}</CardDescription>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
                <div className="flex items-center">
                  <MessageSquare className="h-3.5 w-3.5 mr-1" />
                  {selectedTopic.posts} posts
                </div>
                <div className="flex items-center">
                  <Users className="h-3.5 w-3.5 mr-1" />
                  {selectedTopic.views} views
                </div>
                <div className="flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  Last activity: {selectedTopic.lastActivity}
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Thread Posts */}
        <div className="space-y-4 mb-6">
          {selectedTopic.thread?.map((post) => (
            <Card key={post.id}>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={post.author.avatar}
                      alt={post.author.name}
                    />
                    <AvatarFallback>
                      {post.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{post.author.name}</p>
                        {post.author.role && (
                          <Badge variant="outline" className="text-xs">
                            {post.author.role}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {post.timestamp}
                      </p>
                    </div>
                    <p className="mt-2 whitespace-pre-line">{post.content}</p>
                    <div className="flex items-center gap-4 mt-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground"
                      >
                        {post.isLiked ? "Liked" : "Like"} ({post.likes})
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground"
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reply Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Post a Reply</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser"
                  alt="You"
                />
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Write your reply here..."
                  className="min-h-[100px]"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleReplySubmit} disabled={!replyContent.trim()}>
              <Send className="h-4 w-4 mr-2" />
              Post Reply
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Otherwise, show the topics list view
  return (
    <div className="bg-background">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search topics..."
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
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="resources">Resources</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button variant="outline" className="w-full md:w-auto">
          New Topic
        </Button>
      </div>

      {/* Topics List */}
      <div className="space-y-4">
        {filteredTopics.map((topic) => (
          <Card key={topic.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{topic.title}</CardTitle>
                <div className="flex gap-2">
                  {topic.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <CardDescription className="line-clamp-2">
                {topic.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <MessageSquare className="h-3.5 w-3.5 mr-1" />
                  {topic.posts} posts
                </div>
                <div className="flex items-center">
                  <Users className="h-3.5 w-3.5 mr-1" />
                  {topic.views} views
                </div>
                <div className="flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  Last activity: {topic.lastActivity}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto"
                onClick={() => handleViewTopic(topic)}
              >
                View Topic
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredTopics.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No topics found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Try adjusting your search or filter to find what you're looking for,
            or create a new topic.
          </p>
        </div>
      )}
    </div>
  );
}
