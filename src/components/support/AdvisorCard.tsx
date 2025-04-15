import { Advisor } from "@/types/advisor";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MessageSquare, Star } from "lucide-react";

interface AdvisorCardProps {
  advisor: Advisor;
  onSchedule?: (advisor: Advisor) => void;
  onMessage?: (advisor: Advisor) => void;
}

export default function AdvisorCard({
  advisor,
  onSchedule,
  onMessage,
}: AdvisorCardProps) {
  return (
    <Card className="w-full max-w-md bg-white overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100">
            <img
              src={advisor.imageUrl}
              alt={advisor.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg">{advisor.name}</CardTitle>
            <CardDescription className="text-sm">
              {advisor.title}
            </CardDescription>
            <div className="flex items-center mt-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-sm font-medium">{advisor.rating}</span>
              <span className="text-xs text-muted-foreground ml-1">
                ({advisor.reviews} reviews)
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <h4 className="text-sm font-semibold">Expertise</h4>
            <div className="flex flex-wrap gap-1 mt-1">
              {advisor.expertise.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Languages</h4>
            <p className="text-sm text-muted-foreground">
              {advisor.languages.join(", ")}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Location</h4>
            <p className="text-sm text-muted-foreground">{advisor.location}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Availability</h4>
            <p className="text-sm text-muted-foreground">
              {advisor.availability}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onSchedule && onSchedule(advisor)}
        >
          <CalendarIcon className="h-4 w-4 mr-2" />
          Schedule
        </Button>
        <Button
          variant="default"
          size="sm"
          className="flex-1"
          onClick={() => onMessage && onMessage(advisor)}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Message
        </Button>
      </CardFooter>
    </Card>
  );
}
