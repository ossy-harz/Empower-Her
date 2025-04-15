import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Advisor } from "@/types/advisor";
import { PaperclipIcon, SendIcon, SmileIcon } from "lucide-react";

interface MessagingProps {
  advisors?: Advisor[];
  selectedAdvisor?: Advisor | null;
  onSelectAdvisor?: (advisor: Advisor) => void;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

export default function Messaging({
  advisors = [],
  selectedAdvisor = null,
  onSelectAdvisor,
}: MessagingProps) {
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState<Record<string, Message[]>>(
    generateMockConversations(advisors),
  );

  const handleSendMessage = () => {
    if (!message.trim() || !selectedAdvisor) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: "current-user",
      receiverId: selectedAdvisor.id,
      content: message,
      timestamp: new Date(),
      isRead: true,
    };

    setConversations((prev) => ({
      ...prev,
      [selectedAdvisor.id]: [...(prev[selectedAdvisor.id] || []), newMessage],
    }));

    setMessage("");

    // Simulate response after 1 second
    setTimeout(() => {
      const response: Message = {
        id: `msg-${Date.now()}`,
        senderId: selectedAdvisor.id,
        receiverId: "current-user",
        content: getRandomResponse(),
        timestamp: new Date(),
        isRead: true,
      };

      setConversations((prev) => ({
        ...prev,
        [selectedAdvisor.id]: [...(prev[selectedAdvisor.id] || []), response],
      }));
    }, 1000);
  };

  const currentConversation = selectedAdvisor
    ? conversations[selectedAdvisor.id] || []
    : [];

  return (
    <Card className="w-full h-full bg-white overflow-hidden">
      <Tabs defaultValue="messages" className="h-full flex flex-col">
        <CardHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <CardTitle>Messaging</CardTitle>
            <TabsList>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
            </TabsList>
          </div>
        </CardHeader>

        <TabsContent
          value="messages"
          className="flex-1 flex overflow-hidden p-0 m-0"
        >
          {selectedAdvisor ? (
            <div className="flex flex-col h-full w-full">
              <div className="p-4 border-b flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedAdvisor.imageUrl} />
                  <AvatarFallback>
                    {selectedAdvisor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedAdvisor.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedAdvisor.title}
                  </p>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {currentConversation.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.senderId === "current-user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${msg.senderId === "current-user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                      >
                        <p>{msg.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {formatMessageTime(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <PaperclipIcon className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage();
                      }
                    }}
                    className="rounded-full"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <SmileIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    className="rounded-full"
                    onClick={handleSendMessage}
                  >
                    <SendIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">
                  Select a conversation
                </h3>
                <p className="text-muted-foreground">
                  Choose an advisor from the contacts tab to start messaging
                </p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent
          value="contacts"
          className="flex-1 overflow-hidden p-0 m-0"
        >
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2">
              {advisors.map((advisor) => (
                <div
                  key={advisor.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer"
                  onClick={() => onSelectAdvisor && onSelectAdvisor(advisor)}
                >
                  <Avatar>
                    <AvatarImage src={advisor.imageUrl} />
                    <AvatarFallback>
                      {advisor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium">{advisor.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {advisor.title}
                    </p>
                  </div>
                  {conversations[advisor.id]?.some(
                    (msg) => !msg.isRead && msg.senderId === advisor.id,
                  ) && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  );
}

// Helper functions
function generateMockConversations(
  advisors: Advisor[],
): Record<string, Message[]> {
  const conversations: Record<string, Message[]> = {};

  advisors.forEach((advisor) => {
    const messageCount = Math.floor(Math.random() * 5) + 1;
    const messages: Message[] = [];

    for (let i = 0; i < messageCount; i++) {
      const isUserMessage = i % 2 === 0;
      const timestamp = new Date();
      timestamp.setMinutes(timestamp.getMinutes() - (messageCount - i) * 10);

      messages.push({
        id: `msg-${advisor.id}-${i}`,
        senderId: isUserMessage ? "current-user" : advisor.id,
        receiverId: isUserMessage ? advisor.id : "current-user",
        content: isUserMessage
          ? getRandomUserMessage()
          : getRandomAdvisorMessage(advisor),
        timestamp,
        isRead: true,
      });
    }

    conversations[advisor.id] = messages;
  });

  return conversations;
}

function getRandomUserMessage(): string {
  const messages = [
    "Hello, I'd like to schedule a consultation.",
    "Can you tell me more about your services?",
    "I have a question about my rights in this situation.",
    "Thank you for the information.",
    "When are you available for a meeting?",
    "I need help with a specific issue.",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

function getRandomAdvisorMessage(advisor: Advisor): string {
  const messages = [
    `Hello, I'm ${advisor.name}. How can I help you today?`,
    `I'd be happy to assist with your questions about ${advisor.expertise[0]}.`,
    `Yes, I'm available for consultations on ${advisor.availability}.`,
    `Thank you for reaching out. Would you like to schedule a call?`,
    `I specialize in ${advisor.expertise.join(", ")}. What specific help do you need?`,
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

function getRandomResponse(): string {
  const responses = [
    "Thank you for your message. I'll look into this and get back to you soon.",
    "I appreciate you reaching out. Let's schedule a time to discuss this in more detail.",
    "That's a good question. Based on my experience, I would recommend...",
    "I understand your concern. Here's what we can do to address it...",
    "I'm available to meet on Tuesday or Thursday next week. Would either of those work for you?",
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

function formatMessageTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
