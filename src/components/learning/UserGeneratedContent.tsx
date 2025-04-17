import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateUserGeneratedContent from "./CreateUserGeneratedContent";
import ContentItem, { ContentItemType } from "./ContentItem";
import ContentDetailView from "./ContentDetailView";
import EmptyContentState from "./EmptyContentState";
import { v4 as uuidv4 } from "uuid";

export default function UserGeneratedContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedContent, setSelectedContent] =
    useState<ContentItemType | null>(null);

  // Mock user-generated content data
  const [contentItems, setContentItems] = useState<ContentItemType[]>([
    {
      id: uuidv4(),
      title: "Starting a Small Business in Uganda: A Beginner's Guide",
      summary:
        "Learn the essential steps to start your own business in Uganda with minimal capital.",
      content:
        "Starting a business in Uganda can be challenging but rewarding. This guide covers the basic steps from registration to marketing your products or services.\n\nFirst, identify a business opportunity that addresses a need in your community. Consider your skills, interests, and the resources available to you.\n\nSecond, register your business with the Uganda Registration Services Bureau (URSB). For small businesses, you can register as a sole proprietorship which is simpler and less expensive.\n\nThird, obtain the necessary permits and licenses for your specific business type. This may include trading licenses from your local authority.\n\nFourth, open a business bank account to separate your personal and business finances.\n\nFinally, create a simple marketing plan to reach your potential customers. This can include social media, word of mouth, and community engagement.\n\nRemember, starting small and growing gradually is often the most sustainable approach for new entrepreneurs.",
      category: "business",
      tags: ["entrepreneurship", "small business", "startup"],
      author: {
        name: "Sarah Nambi",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      },
      publishedDate: "3 days ago",
      likes: 24,
      comments: 7,
      isLiked: false,
    },
    {
      id: uuidv4(),
      title: "Digital Security Tips for Women Online",
      summary:
        "Practical advice for staying safe online and protecting your digital privacy.",
      content:
        "As more women access the internet in Uganda, it's important to be aware of digital security practices that can help keep you safe online.\n\nUse strong, unique passwords for each of your accounts. Consider using a password manager to help you keep track of them.\n\nEnable two-factor authentication whenever possible. This adds an extra layer of security to your accounts.\n\nBe cautious about the information you share online. Avoid posting personal details like your home address, phone number, or daily routines.\n\nBe aware of phishing attempts. Don't click on suspicious links in emails or messages, especially if they ask for personal information.\n\nRegularly update your devices and applications to ensure you have the latest security patches.\n\nLearn how to block and report abusive or harassing behavior on social media platforms.\n\nRemember, protecting your digital privacy is an important part of your overall safety and wellbeing.",
      category: "digital-literacy",
      tags: ["security", "privacy", "online safety"],
      author: {
        name: "Grace Achieng",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace",
      },
      publishedDate: "1 week ago",
      likes: 36,
      comments: 12,
      isLiked: true,
    },
    {
      id: uuidv4(),
      title: "Mobile Money Management for Small Businesses",
      summary:
        "How to effectively use mobile money services to manage your business finances.",
      content:
        "Mobile money services like MTN MoMo and Airtel Money have revolutionized how small businesses operate in Uganda. Here's how to make the most of these services.\n\nSet up a dedicated business mobile money account separate from your personal account. This helps with tracking business transactions.\n\nRegularly check your transaction history and keep records of all payments received and sent. This will be valuable for accounting and tax purposes.\n\nConsider using the business-specific features offered by mobile money providers, such as merchant accounts that may have lower transaction fees.\n\nBe aware of the transaction limits and fees associated with your mobile money account. Plan large transactions accordingly.\n\nImplement security measures such as using a PIN that is different from your other PINs and not sharing your PIN with others.\n\nExplore integration with other digital financial services, such as savings groups or microloans that work with mobile money.\n\nMobile money can be a powerful tool for financial inclusion and business growth when used effectively.",
      category: "finance",
      tags: ["mobile money", "financial management", "business finance"],
      author: {
        name: "Esther Mukasa",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Esther",
      },
      publishedDate: "2 weeks ago",
      likes: 19,
      comments: 5,
      isLiked: false,
    },
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Filter content based on search query and category
  const filteredContent = contentItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleViewContent = (content: ContentItemType) => {
    setSelectedContent(content);
  };

  const handleBackToList = () => {
    setSelectedContent(null);
  };

  const handleCreateContent = (newContent: {
    title: string;
    summary: string;
    content: string;
    category: string;
    tags: string[];
  }) => {
    // Create a new content item with the form data
    const newContentItem: ContentItemType = {
      id: uuidv4(),
      ...newContent,
      author: {
        name: "Current User", // In a real app, this would be the logged-in user
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User",
      },
      publishedDate: "Just now",
      likes: 0,
      comments: 0,
      isLiked: false,
    };

    // Add the new content to the contentItems array
    setContentItems([newContentItem, ...contentItems]);

    // Close the create dialog
    setIsCreateDialogOpen(false);
  };

  const handleCancelCreate = () => {
    setIsCreateDialogOpen(false);
  };

  // If a content item is selected, show the detailed view
  if (selectedContent) {
    return (
      <ContentDetailView
        content={selectedContent}
        onBackToList={handleBackToList}
      />
    );
  }

  // Otherwise, show the content list view
  return (
    <div className="bg-background">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search content..."
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
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="w-full md:w-auto"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" /> Create Content
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <CreateUserGeneratedContent
              onSubmit={handleCreateContent}
              onCancel={handleCancelCreate}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Content List */}
      <div className="space-y-4">
        {filteredContent.map((item) => (
          <ContentItem
            key={item.id}
            item={item}
            onViewContent={handleViewContent}
          />
        ))}
      </div>

      {filteredContent.length === 0 && <EmptyContentState />}
    </div>
  );
}
