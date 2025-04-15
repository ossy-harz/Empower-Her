import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Briefcase,
  ChevronRight,
  FileText,
  MapPin,
  MessageSquare,
  PieChart,
  Plus,
  Settings,
  ShoppingBag,
  User,
  Users,
} from "lucide-react";

const Home = () => {
  // Mock data for reports
  const recentReports = [
    {
      id: 1,
      title: "Harassment Report",
      date: "2023-09-15",
      status: "In Progress",
      type: "Harassment",
    },
    {
      id: 2,
      title: "Digital Security Incident",
      date: "2023-09-10",
      status: "Resolved",
      type: "Security",
    },
    {
      id: 3,
      title: "Rights Violation",
      date: "2023-09-05",
      status: "Under Review",
      type: "Rights",
    },
  ];

  // Mock data for recent activity
  const recentActivity = [
    {
      id: 1,
      action: "Report status updated",
      date: "2023-09-16",
      details: "Your harassment report is now being investigated",
    },
    {
      id: 2,
      action: "New resource available",
      date: "2023-09-14",
      details: "Digital security guide has been published",
    },
    {
      id: 3,
      action: "Appointment scheduled",
      date: "2023-09-12",
      details: "Legal consultation on Sep 20, 2023",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/vite.svg" alt="App Logo" className="h-8 w-8" />
            <h1 className="text-xl font-bold">Digital Empowerment Platform</h1>
          </div>

          <nav className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
            <Link
              to="/reports"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Reports
            </Link>
            <Link
              to="/support"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Support
            </Link>
            <Link
              to="/opportunities"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Economic Empowerment
            </Link>
            <Link
              to="/community"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Community
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123"
                alt="User"
              />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        {/* Welcome Section */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Welcome back, Sarah
              </h2>
              <p className="text-muted-foreground">
                Here's an overview of your reports and recent activity.
              </p>
            </div>
            <div className="flex gap-2">
              <Button asChild>
                <Link to="/reports/new">
                  <Plus className="mr-2 h-4 w-4" /> Create New Report
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/reports">View All Reports</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Reports
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                2 updated recently
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">+3 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Appointments
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                Next: Sep 20, 2023
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Main Dashboard Content */}
        <div className="grid gap-6 md:grid-cols-7">
          {/* Reports and Activity Tabs */}
          <div className="md:col-span-4">
            <Tabs defaultValue="reports" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="reports">Recent Reports</TabsTrigger>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              </TabsList>
              <TabsContent value="reports" className="space-y-4 mt-4">
                {recentReports.map((report) => (
                  <Card key={report.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">
                          {report.title}
                        </CardTitle>
                        <Badge
                          variant={
                            report.status === "Resolved"
                              ? "secondary"
                              : "default"
                          }
                        >
                          {report.status}
                        </Badge>
                      </div>
                      <CardDescription>
                        Submitted on {report.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{report.type}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          Kampala, Uganda
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto"
                        asChild
                      >
                        <Link to={`/reports/${report.id}`}>
                          View Details <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/reports">View All Reports</Link>
                </Button>
              </TabsContent>
              <TabsContent value="activity" className="space-y-4 mt-4">
                {recentActivity.map((activity) => (
                  <Card key={activity.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">
                          {activity.action}
                        </CardTitle>
                        <span className="text-sm text-muted-foreground">
                          {activity.date}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{activity.details}</p>
                    </CardContent>
                  </Card>
                ))}
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </TabsContent>
            </Tabs>
          </div>

          {/* Quick Access and Resources */}
          <div className="md:col-span-3">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Quick Access</CardTitle>
                <CardDescription>
                  Access key features and resources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Card className="bg-muted/50 mb-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      Economic Empowerment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-0">
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto py-1 justify-start"
                        asChild
                      >
                        <Link to="/opportunities?tab=jobs">
                          <Briefcase className="h-4 w-4 mr-1" /> Jobs
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto py-1 justify-start"
                        asChild
                      >
                        <Link to="/opportunities?tab=marketplace">
                          <ShoppingBag className="h-4 w-4 mr-1" /> Marketplace
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto py-1 justify-start"
                        asChild
                      >
                        <Link to="/opportunities?tab=mentorship">
                          <Users className="h-4 w-4 mr-1" /> Mentorship
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center"
                    asChild
                  >
                    <Link to="/support/directory">
                      <User className="h-6 w-6 mb-2" />
                      <span>Professional Directory</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center"
                    asChild
                  >
                    <Link to="/support/chat">
                      <MessageSquare className="h-6 w-6 mb-2" />
                      <span>Get Support</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center"
                    asChild
                  >
                    <Link to="/opportunities">
                      <Briefcase className="h-6 w-6 mb-2" />
                      <span>Economic Empowerment</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center"
                    asChild
                  >
                    <Link to="/community/learning">
                      <FileText className="h-6 w-6 mb-2" />
                      <span>Learning Resources</span>
                    </Link>
                  </Button>
                </div>

                <Card className="bg-muted/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Access our AI assistant for immediate guidance or schedule
                      a consultation with a professional.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm" className="w-full">
                      Start AI Chat
                    </Button>
                  </CardFooter>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
