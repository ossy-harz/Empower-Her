import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, ShoppingBag, Users } from "lucide-react";
import JobListings from "./JobListings";
import DigitalMarketplace from "./DigitalMarketplace";
import MentorshipConnections from "./MentorshipConnections";

export default function EconomicEmpowermentCenter() {
  const [activeTab, setActiveTab] = useState("jobs");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <h1 className="text-xl font-bold">Economic Empowerment Center</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Economic Empowerment Center
          </h2>
          <p className="text-muted-foreground">
            Access job opportunities, sell your products in our digital
            marketplace, and connect with mentors to grow your career or
            business.
          </p>
        </div>

        <Tabs
          defaultValue="jobs"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Job Listings
            </TabsTrigger>
            <TabsTrigger
              value="marketplace"
              className="flex items-center gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              Digital Marketplace
            </TabsTrigger>
            <TabsTrigger value="mentorship" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Mentorship Connections
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-4">
            <JobListings />
          </TabsContent>

          <TabsContent value="marketplace" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Digital Marketplace</CardTitle>
                <CardDescription>
                  Sell your products and services or shop from women-led
                  businesses.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DigitalMarketplace />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mentorship" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mentorship Connections</CardTitle>
                <CardDescription>
                  Connect with mentors who can help guide your career or
                  business.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MentorshipConnections />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
