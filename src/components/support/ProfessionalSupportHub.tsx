import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAdvisors } from "@/lib/data/advisors";
import { Advisor } from "@/types/advisor";
import AdvisorDirectory from "./AdvisorDirectory";
import Messaging from "./Messaging";
import AIAssistant from "./AIAssistant";
import { CalendarIcon, MessageSquare, Users } from "lucide-react";

export default function ProfessionalSupportHub() {
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null);
  const advisors = getAdvisors();

  const handleSelectAdvisor = (advisor: Advisor) => {
    setSelectedAdvisor(advisor);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <h1 className="text-xl font-bold">Professional Support Hub</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Professional Support Hub
          </h2>
          <p className="text-muted-foreground">
            Connect with professional advisors, get support through messaging,
            or use our AI assistant for immediate guidance.
          </p>
        </div>

        <Tabs defaultValue="directory" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="directory" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Advisor Directory
            </TabsTrigger>
            <TabsTrigger value="messaging" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Messaging
            </TabsTrigger>
            <TabsTrigger
              value="ai-assistant"
              className="flex items-center gap-2"
            >
              <CalendarIcon className="h-4 w-4" />
              AI Assistant
            </TabsTrigger>
          </TabsList>

          <TabsContent value="directory" className="space-y-4">
            <AdvisorDirectory
              onSelectAdvisor={(advisor) => {
                handleSelectAdvisor(advisor);
                // Switch to messaging tab when an advisor is selected
                const messagingTab = document.querySelector(
                  '[data-value="messaging"]',
                ) as HTMLElement;
                if (messagingTab) messagingTab.click();
              }}
            />
          </TabsContent>

          <TabsContent value="messaging" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 h-[600px]">
              <Messaging
                advisors={advisors}
                selectedAdvisor={selectedAdvisor}
                onSelectAdvisor={handleSelectAdvisor}
              />
            </div>
          </TabsContent>

          <TabsContent value="ai-assistant" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 h-[600px]">
              <AIAssistant />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
