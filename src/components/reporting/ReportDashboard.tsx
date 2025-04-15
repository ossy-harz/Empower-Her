import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Search, Filter, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ReportStats {
  total: number;
  pending: number;
  inProgress: number;
  resolved: number;
  rejected: number;
}

interface ReportTrend {
  month: string;
  count: number;
}

interface ReportType {
  type: string;
  count: number;
  percentage: number;
}

interface ReportLocation {
  name: string;
  count: number;
  percentage: number;
}

interface ReportDashboardProps {
  stats?: ReportStats;
  trends?: ReportTrend[];
  types?: ReportType[];
  locations?: ReportLocation[];
}

const ReportDashboard: React.FC<ReportDashboardProps> = ({
  stats = {
    total: 124,
    pending: 32,
    inProgress: 45,
    resolved: 38,
    rejected: 9,
  },
  trends = [
    { month: "Jan", count: 12 },
    { month: "Feb", count: 18 },
    { month: "Mar", count: 15 },
    { month: "Apr", count: 22 },
    { month: "May", count: 27 },
    { month: "Jun", count: 30 },
  ],
  types = [
    { type: "Harassment", count: 48, percentage: 38.7 },
    { type: "Digital Security", count: 32, percentage: 25.8 },
    { type: "Rights Violation", count: 28, percentage: 22.6 },
    { type: "Other", count: 16, percentage: 12.9 },
  ],
  locations = [
    { name: "Kampala", count: 42, percentage: 33.9 },
    { name: "Gulu", count: 23, percentage: 18.5 },
    { name: "Mbarara", count: 19, percentage: 15.3 },
    { name: "Jinja", count: 15, percentage: 12.1 },
    { name: "Other", count: 25, percentage: 20.2 },
  ],
}) => {
  const [dateRange, setDateRange] = useState("30days");
  const [viewType, setViewType] = useState("summary");
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
    };

    loadData();
  }, [dateRange, searchValue]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchValue);
    // Here you would typically trigger a search API call
  };

  return (
    <div className="w-full p-6 bg-background">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Report Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor and analyze report statistics and trends.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-end md:items-center gap-4">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2"
          >
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search reports..."
                className="pl-8 w-[200px] md:w-[250px]"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>
            <Button type="submit" variant="default" size="sm">
              Search
            </Button>
          </form>
          <div className="flex items-center gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">Last year</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Calendar className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Filter className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9"
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 500);
              }}
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
        </div>
      </div>

      {searchValue && (
        <div className="mb-4 p-2 bg-muted rounded-md">
          <p className="text-sm">
            Showing results for:{" "}
            <span className="font-medium">"{searchValue}"</span>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 h-6 px-2"
              onClick={() => setSearchValue("")}
            >
              Clear
            </Button>
          </p>
        </div>
      )}

      <Tabs value={viewType} onValueChange={setViewType} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="types">Report Types</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Reports"
              value={stats.total}
              color="bg-blue-100 text-blue-700"
            />
            <StatCard
              title="Pending"
              value={stats.pending}
              color="bg-yellow-100 text-yellow-700"
            />
            <StatCard
              title="In Progress"
              value={stats.inProgress}
              color="bg-purple-100 text-purple-700"
            />
            <StatCard
              title="Resolved"
              value={stats.resolved}
              color="bg-green-100 text-green-700"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Resolution Progress</CardTitle>
              <CardDescription>
                Overall resolution rate:{" "}
                {Math.round((stats.resolved / stats.total) * 100)}%
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <StatusProgressBar
                  label="Pending"
                  value={(stats.pending / stats.total) * 100}
                  color="bg-yellow-500"
                  count={stats.pending}
                />
                <StatusProgressBar
                  label="In Progress"
                  value={(stats.inProgress / stats.total) * 100}
                  color="bg-purple-500"
                  count={stats.inProgress}
                />
                <StatusProgressBar
                  label="Resolved"
                  value={(stats.resolved / stats.total) * 100}
                  color="bg-green-500"
                  count={stats.resolved}
                />
                <StatusProgressBar
                  label="Rejected"
                  value={(stats.rejected / stats.total) * 100}
                  color="bg-red-500"
                  count={stats.rejected}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest report submissions and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ActivityItem
                    title="New Report Submitted"
                    description="Harassment incident in Kampala"
                    time="2 hours ago"
                    status="pending"
                  />
                  <ActivityItem
                    title="Status Update"
                    description="Digital security report #1082"
                    time="5 hours ago"
                    status="in-progress"
                  />
                  <ActivityItem
                    title="Report Resolved"
                    description="Rights violation case in Gulu"
                    time="Yesterday"
                    status="resolved"
                  />
                  <ActivityItem
                    title="New Evidence Added"
                    description="To harassment report #1079"
                    time="2 days ago"
                    status="in-progress"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
                <CardDescription>Report submissions over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[220px] flex items-end justify-between">
                  {trends.map((trend, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className="w-12 bg-primary rounded-t-md"
                        style={{
                          height: `${(trend.count / Math.max(...trends.map((t) => t.count))) * 180}px`,
                        }}
                      ></div>
                      <span className="text-xs mt-2">{trend.month}</span>
                      <span className="text-xs text-muted-foreground">
                        {trend.count}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Submission Trends</CardTitle>
              <CardDescription>
                Number of reports submitted over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-end justify-between">
                {trends.map((trend, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="w-16 bg-primary rounded-t-md"
                      style={{
                        height: `${(trend.count / Math.max(...trends.map((t) => t.count))) * 250}px`,
                      }}
                    ></div>
                    <span className="text-sm mt-2">{trend.month}</span>
                    <span className="text-sm font-medium">{trend.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="types" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Types Distribution</CardTitle>
              <CardDescription>
                Breakdown of reports by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {types.map((type, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{type.type}</span>
                      <span className="text-muted-foreground">
                        {type.count} reports ({type.percentage}%)
                      </span>
                    </div>
                    <Progress value={type.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Locations</CardTitle>
              <CardDescription>
                Geographic distribution of reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {locations.map((location, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{location.name}</span>
                      <span className="text-muted-foreground">
                        {location.count} reports ({location.percentage}%)
                      </span>
                    </div>
                    <Progress value={location.percentage} className="h-2" />
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 border rounded-md bg-muted/50 text-center">
                <p className="text-muted-foreground">
                  Map visualization would appear here
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Showing geographic distribution of reports
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, color }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-sm">{title}</span>
          <span className="text-3xl font-bold">{value}</span>
          <div className={`w-full h-1.5 mt-2 rounded-full ${color}`}></div>
        </div>
      </CardContent>
    </Card>
  );
};

interface StatusProgressBarProps {
  label: string;
  value: number;
  color: string;
  count: number;
}

const StatusProgressBar: React.FC<StatusProgressBarProps> = ({
  label,
  value,
  color,
  count,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-muted-foreground">{count} reports</span>
      </div>
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  status: "pending" | "in-progress" | "resolved" | "rejected";
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  title,
  description,
  time,
  status,
}) => {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    "in-progress": "bg-purple-100 text-purple-800 border-purple-200",
    resolved: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
  };

  const statusLabels = {
    pending: "Pending",
    "in-progress": "In Progress",
    resolved: "Resolved",
    rejected: "Rejected",
  };

  return (
    <div className="flex items-start gap-2 pb-3 border-b last:border-0 last:pb-0">
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-muted-foreground">{time}</span>
          <Badge variant="outline" className={statusColors[status]}>
            {statusLabels[status]}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default ReportDashboard;
