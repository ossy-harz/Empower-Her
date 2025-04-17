import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, MessageSquare, Tag } from "lucide-react";

export interface ContentItemType {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
  };
  publishedDate: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
}

interface ContentItemProps {
  item: ContentItemType;
  onViewContent: (content: ContentItemType) => void;
}

export default function ContentItem({ item, onViewContent }: ContentItemProps) {
  return (
    <Card key={item.id} className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{item.title}</CardTitle>
          <div className="flex gap-2">
            {item.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
            {item.tags.length > 2 && (
              <Badge variant="outline">+{item.tags.length - 2}</Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Avatar className="h-5 w-5">
            <AvatarImage src={item.author.avatar} alt={item.author.name} />
            <AvatarFallback>{item.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{item.author.name}</span>
          <span className="text-xs text-muted-foreground">
            • {item.publishedDate}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="line-clamp-2 text-muted-foreground">{item.summary}</p>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-3">
          <div className="flex items-center">
            <ThumbsUp className="h-3.5 w-3.5 mr-1" />
            {item.likes} likes
          </div>
          <div className="flex items-center">
            <MessageSquare className="h-3.5 w-3.5 mr-1" />
            {item.comments} comments
          </div>
          <div className="flex items-center">
            <Tag className="h-3.5 w-3.5 mr-1" />
            {item.category}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto"
          onClick={() => onViewContent(item)}
        >
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
}
