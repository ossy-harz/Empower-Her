import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, MessageSquare, FileText } from "lucide-react";
import ELearningModules from "./ELearningModules";
import CommunityForums from "./CommunityForums";
import UserGeneratedContent from "./UserGeneratedContent";

export default function CommunityLearningPortal() {
  const [activeTab, setActiveTab] = useState("courses");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <h1 className="text-xl font-bold">Community Learning Portal</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Community Learning Portal
          </h2>
          <p className="text-muted-foreground">
            Access e-learning modules, participate in community forums, and
            share your knowledge with others.
          </p>
        </div>

        <Tabs
          defaultValue="courses"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              E-Learning Modules
            </TabsTrigger>
            <TabsTrigger value="forums" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Community Forums
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              User-Generated Content
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-4">
            <ELearningModules />
          </TabsContent>

          <TabsContent value="forums" className="space-y-4">
            <CommunityForums />
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <UserGeneratedContent />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
