import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Paperclip,
  Shield,
  User,
  MessageCircle,
  AlertTriangle,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  getReportById,
  updateReportStatus,
  Report as ReportType,
} from "@/lib/data/reports";

const ReportDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<ReportType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const reportData = getReportById(id);
      if (reportData) {
        setReport(reportData);
      }
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Report Not Found</h2>
        <p className="mb-4">
          The report you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate("/reports")}>Back to Reports</Button>
      </div>
    );
  }

  // Map report status to UI status
  const mapStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "pending";
      case "in-progress":
        return "investigating";
      case "resolved":
        return "resolved";
      case "rejected":
        return "closed";
      default:
        return "pending";
    }
  };

  // Extract report properties
  const {
    id: reportId,
    title,
    description,
    date,
    type,
    status: reportStatus,
    progress,
    anonymous: isAnonymous,
    location,
    submittedBy,
    submitterAvatar,
    media = [],
    timeline = [],
  } = report;

  // Format time (in a real app, we would store and parse proper timestamps)
  const time = "10:30 AM";

  // Map the status for UI
  const status = mapStatus(reportStatus);
  const [newComment, setNewComment] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-300"
          >
            Pending Review
          </Badge>
        );
      case "investigating":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 border-blue-300"
          >
            Under Investigation
          </Badge>
        );
      case "resolved":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-300"
          >
            Resolved
          </Badge>
        );
      case "closed":
        return (
          <Badge
            variant="outline"
            className="bg-gray-100 text-gray-800 border-gray-300"
          >
            Closed
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "investigating":
        return <AlertTriangle className="h-5 w-5 text-blue-500" />;
      case "resolved":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "closed":
        return <Clock3 className="h-5 w-5 text-gray-500" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const handleSubmitComment = () => {
    if (newComment.trim() && id) {
      // Update the report with the new comment
      const updatedReport = updateReportStatus(id, reportStatus, newComment);
      if (updatedReport) {
        setReport(updatedReport);
      }
      setNewComment("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm w-full max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          className="mr-2"
          size="sm"
          onClick={() => navigate("/reports")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Reports
        </Button>
        <h1 className="text-2xl font-bold ml-auto">Report #{reportId}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{title}</CardTitle>
                <CardDescription className="mt-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {date} at {time}
                </CardDescription>
              </div>
              <div className="flex items-center">
                {getStatusIcon(status)}
                <span className="ml-2">{getStatusBadge(status)}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Description
              </h3>
              <p className="text-gray-700">{description}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Location
              </h3>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                <span>{location}</span>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Report Type
              </h3>
              <Badge variant="secondary">{type}</Badge>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Submitted By
              </h3>
              <div className="flex items-center">
                {isAnonymous ? (
                  <>
                    <Shield className="h-4 w-4 mr-2 text-gray-400" />
                    <span>Anonymous Report</span>
                  </>
                ) : (
                  <>
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={submitterAvatar} alt={submittedBy} />
                      <AvatarFallback>{submittedBy.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{submittedBy}</span>
                  </>
                )}
              </div>
            </div>

            {media && media.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Attached Evidence
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {media.map((item) => (
                    <div
                      key={item.id}
                      className="border rounded-md p-2 flex items-center"
                    >
                      <Paperclip className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm truncate">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resolution Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between mb-1 text-sm">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
                <div
                  className={`h-4 w-4 rounded-full ${status === "pending" || status === "investigating" || status === "resolved" || status === "closed" ? "bg-green-500" : "bg-gray-200"}`}
                ></div>
                <span className="ml-2 text-sm">Report Received</span>
              </div>
              <div className="flex items-center">
                <div
                  className={`h-4 w-4 rounded-full ${status === "investigating" || status === "resolved" || status === "closed" ? "bg-green-500" : "bg-gray-200"}`}
                ></div>
                <span className="ml-2 text-sm">Under Investigation</span>
              </div>
              <div className="flex items-center">
                <div
                  className={`h-4 w-4 rounded-full ${status === "resolved" || status === "closed" ? "bg-green-500" : "bg-gray-200"}`}
                ></div>
                <span className="ml-2 text-sm">Resolution Proposed</span>
              </div>
              <div className="flex items-center">
                <div
                  className={`h-4 w-4 rounded-full ${status === "closed" ? "bg-green-500" : "bg-gray-200"}`}
                ></div>
                <span className="ml-2 text-sm">Case Closed</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="comments">Comments & Updates</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {timeline.map((event, index) => (
                  <div key={event.id} className="relative">
                    {index < timeline.length - 1 && (
                      <div className="absolute top-7 left-3 bottom-0 w-0.5 bg-gray-200"></div>
                    )}
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">{event.title}</h4>
                          <span className="text-xs text-gray-500">
                            {event.date}, {event.time}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">
                          {event.description}
                        </p>
                        {event.user && (
                          <div className="mt-2 flex items-center">
                            <Avatar className="h-5 w-5 mr-1">
                              <AvatarImage
                                src={event.userAvatar}
                                alt={event.user}
                              />
                              <AvatarFallback>
                                {event.user.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-gray-500">
                              {event.user}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comments">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex items-center mb-3">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Officer"
                        alt="Case Officer"
                      />
                      <AvatarFallback>CO</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-medium">Case Officer</h4>
                      <span className="text-xs text-gray-500">
                        2023-06-20, 11:30 AM
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    We have reviewed your report and have initiated contact with
                    the local government office. We will be conducting
                    interviews with staff members next week.
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-2">
                    Add a Comment or Update
                  </h4>
                  <Textarea
                    placeholder="Type your comment here..."
                    className="mb-3"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <Button
                    onClick={handleSubmitComment}
                    disabled={!newComment.trim()}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Submit Comment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportDetail;
