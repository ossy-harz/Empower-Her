import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { FileText, ThumbsUp, MessageSquare } from "lucide-react";
import { ContentItemType } from "./ContentItem";

interface ContentDetailViewProps {
  content: ContentItemType;
  onBackToList: () => void;
}

export default function ContentDetailView({
  content,
  onBackToList,
}: ContentDetailViewProps) {
  return (
    <div className="bg-background">
      <div className="mb-6">
        <Button
          variant="ghost"
          className="flex items-center gap-2 mb-4"
          onClick={onBackToList}
        >
          <FileText className="h-4 w-4" />
          Back to Content List
        </Button>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">{content.title}</CardTitle>
              <div className="flex gap-2">
                {content.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={content.author.avatar}
                  alt={content.author.name}
                />
                <AvatarFallback>{content.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{content.author.name}</span>
              <span className="text-sm text-muted-foreground">
                • {content.publishedDate}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{content.summary}</p>
            <Separator className="my-4" />
            <div className="whitespace-pre-line">{content.content}</div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
              >
                <ThumbsUp className="h-4 w-4" />
                {content.isLiked ? "Liked" : "Like"} ({content.likes})
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
              >
                <MessageSquare className="h-4 w-4" />
                Comments ({content.comments})
              </Button>
            </div>
            <Button variant="outline" size="sm">
              Share
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
