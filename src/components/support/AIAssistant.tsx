import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bot, SendIcon, User } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIAssistantProps {
  className?: string;
}

export default function AIAssistant({ className = "" }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("english");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      ) as HTMLElement;
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Add initial greeting message
  useEffect(() => {
    if (messages.length === 0) {
      const greeting = getGreeting(language);
      setMessages([
        {
          id: "greeting",
          role: "assistant",
          content: greeting,
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  // Update greeting when language changes
  useEffect(() => {
    if (messages.length > 0 && messages[0].id === "greeting") {
      const greeting = getGreeting(language);
      setMessages((prev) => [
        {
          ...prev[0],
          content: greeting,
        },
        ...prev.slice(1),
      ]);
    }
  }, [language]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content: getAIResponse(input, language),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  return (
    <Card className={`w-full h-full bg-white overflow-hidden ${className}`}>
      <CardHeader className="px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <CardTitle>AI Assistant</CardTitle>
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="luganda">Luganda</SelectItem>
              <SelectItem value="swahili">Swahili</SelectItem>
              <SelectItem value="runyankole">Runyankole</SelectItem>
              <SelectItem value="acholi">Acholi</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <div className="flex flex-col h-[calc(100%-73px)]">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="flex gap-3 max-w-[80%]">
                  {message.role === "assistant" && (
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`rounded-lg p-3 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="rounded-lg p-3 bg-muted">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce"></div>
                      <div
                        className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder={getPlaceholder(language)}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
              className="rounded-full"
            />
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
    </Card>
  );
}

// Helper functions
function getGreeting(language: string): string {
  const greetings: Record<string, string> = {
    english:
      "Hello! I'm your AI assistant. How can I help you today? I can provide information on rights, resources, and support services available to you.",
    luganda:
      "Oli otya! Nze AI assistant wo. Nsobola ntya okukuyamba leero? Nsobola okuwa amawulire ku ddembe lyo, ebikozesebwa, n'obuyambi obuli.",
    swahili:
      "Habari! Mimi ni msaidizi wako wa AI. Nawezaje kukusaidia leo? Ninaweza kutoa taarifa kuhusu haki, rasilimali, na huduma za msaada zinazopatikana kwako.",
    runyankole:
      "Agandi! Niinye AI assistant waawe. Ninkubasiza nta eriizooba? Nimpamya kukuha amakuru aha burenganzira bwawe, eby'okukozesa, n'obuhwezi oburiho.",
    acholi:
      "Itye! An obedo AI assistant mamegi. Atwero konyi nining tin? Atwero miyo ngec ikom twero mamegi, jami ma tye, ki kony ma tye.",
  };

  return greetings[language] || greetings.english;
}

function getPlaceholder(language: string): string {
  const placeholders: Record<string, string> = {
    english: "Type a message...",
    luganda: "Wandiika obubaka...",
    swahili: "Andika ujumbe...",
    runyankole: "Handika obutumwa...",
    acholi: "Coo kwena...",
  };

  return placeholders[language] || placeholders.english;
}

function getAIResponse(message: string, language: string): string {
  // Simple keyword-based responses
  const lowercaseMessage = message.toLowerCase();

  // Rights-related responses
  if (
    lowercaseMessage.includes("right") ||
    lowercaseMessage.includes("legal") ||
    lowercaseMessage.includes("law")
  ) {
    const responses: Record<string, string> = {
      english:
        "Everyone has the right to equal protection under the law. If you believe your rights have been violated, you can file a report through our secure reporting system or consult with one of our legal advisors. Would you like me to connect you with a legal advisor?",
      luganda:
        "Buli muntu alina eddembe ly'okukuumibwa mu mateeka. Bw'olowooza nti eddembe lyo livvuludwa, osobola okuwaayo alipoota mu nkola yaffe ey'okuwaayo alipoota oba okubuuza ku omu ku bateesa baffe ab'amateeka. Oyagala nkuyungeko ku muteesa w'amateeka?",
      swahili:
        "Kila mtu ana haki ya ulinzi sawa chini ya sheria. Ikiwa unaamini haki zako zimekiukwa, unaweza kuwasilisha ripoti kupitia mfumo wetu salama wa kuripoti au kushauriana na mmoja wa washauri wetu wa kisheria. Je, ungependa nikuunganishe na mshauri wa kisheria?",
      runyankole:
        "Buri muntu aine obugabe bw'okurindwa ahansi y'ebiragiro. Ku orikuteekateeka ngu obugabe bwawe bwahendekire, noobaasa kutaasyamu ripoota kurabira omu nkora yaitu y'okutaasyamu ripoota erikukingire nari okuhanuura n'omwe aha bahanuuzi baitu b'ebiragiro. Nooyenda nkwungire aha muhanuuzi w'ebiragiro?",
      acholi:
        "Dano ducu tye ki twero me gwoko i bwo cik. Ka itamo ni twero mamegi okieko, itwero culu ripot i kor wa me culu ripot ma ogwoko onyo lok ki achel i luloc mewa me cik. Imito amiyi kube ki laloc me cik?",
    };
    return responses[language] || responses.english;
  }

  // Support-related responses
  if (
    lowercaseMessage.includes("help") ||
    lowercaseMessage.includes("support") ||
    lowercaseMessage.includes("assist")
  ) {
    const responses: Record<string, string> = {
      english:
        "We offer various support services including counseling, legal aid, and healthcare referrals. Our professional support hub connects you with experts in different fields. Would you like to browse our directory of advisors?",
      luganda:
        "Tuwa empeereza ez'enjawulo ez'obuyambi nga mw'eri okubudaabuda, obuyambi bw'amateeka, n'okusindika eri abajjanjabi. Ekifo kyaffe eky'obuyambi obw'abamanyi kikuyunga n'abamanyi mu bitundu eby'enjawulo. Oyagala okulambula endagiriro y'abateesa baffe?",
      swahili:
        "Tunatoa huduma mbalimbali za msaada ikiwa ni pamoja na ushauri, msaada wa kisheria, na rufaa za afya. Kitovu chetu cha msaada wa kitaaluma kinakuunganisha na wataalamu katika nyanja tofauti. Je, ungependa kuvinjari orodha yetu ya washauri?",
      runyankole:
        "Nituha obuheereza bw'obuyambi obutari bumwe obwarimu okuhabura, obuyambi bw'ebiragiro, n'okukutuma aha by'amagara. Ekicweka kyaitu eky'obuyambi bw'abakugu nikukwungira n'abakugu omu mashami gatari gamwe. Nooyenda kuraba omu rutindo rw'abahanuuzi baitu?",
      acholi:
        "Wamino kony ma pat pat mogo tam, kony me cik, ki cwalo bot lutic me yot kom. Kabedo wa me kony me lutic ma ngeni miyo kube ki lutic ma ngeni i kin kom ma pat pat. Imito neno nyig lutic mewa?",
    };
    return responses[language] || responses.english;
  }

  // Safety-related responses
  if (
    lowercaseMessage.includes("safe") ||
    lowercaseMessage.includes("danger") ||
    lowercaseMessage.includes("threat") ||
    lowercaseMessage.includes("emergency")
  ) {
    const responses: Record<string, string> = {
      english:
        "Your safety is our priority. If you're in immediate danger, please contact emergency services at 999. For non-emergency situations, our platform offers resources on digital security, personal safety planning, and connections to local support services.",
      luganda:
        "Obukuumi bwo ye nsonga yaffe esinga. Bw'oba mu kabi amangu, tukusaba okukuba essimu ey'obuyambi obwangu ku 999. Ku nsonga ezitali za bwangu, puletifomu yaffe ewa ebikozesebwa ku bukuumi bwa digito, entegeka y'obukuumi bwo, n'okukuyunga ku mpeereza z'obuyambi ez'omu kitundu kyo.",
      swahili:
        "Usalama wako ni kipaumbele chetu. Ikiwa uko katika hatari ya haraka, tafadhali wasiliana na huduma za dharura kwa 999. Kwa hali zisizo za dharura, jukwaa letu linatoa rasilimali kuhusu usalama wa kidijitali, mpango wa usalama wa kibinafsi, na uhusiano na huduma za msaada za karibu.",
      runyankole:
        "Okukurinda niyo nsonga yaitu erikukirayo. Ku oraabe ori omu kabi ahonaaho, nookushaba okuteera esimu y'obuyambi bw'ahonaaho ahari 999. Ahari embeera ezitari z'ahonaaho, puratufomu yaitu neeheereza eby'okukozesa aha by'okwerinda kwa digito, enteekanisa y'okwerinda kwawe, n'okukwungira aha buheereza bw'obuyambi bw'omuri kyaro kyawe.",
      acholi:
        "Gwoki obedo gin madit wa. Ka itye i kin bol ma oyot, tim ber i kub cim me kony ma oyot i 999. Pi jami ma pe oyot, kor wa miyo jami me gwoko me dijito, yubu me gwoko keni, ki kube ki kony ma cok.",
    };
    return responses[language] || responses.english;
  }

  // Default responses
  const defaultResponses: Record<string, string[]> = {
    english: [
      "I understand your question. Let me help you find the information you need.",
      "Thank you for reaching out. I'm here to assist you with any questions about your rights and available resources.",
      "I'm processing your request. Is there anything specific you'd like to know about our services?",
      "I'm here to support you. Would you like information about reporting, professional support, or economic opportunities?",
      "I appreciate your question. Our platform offers various resources to empower women in Uganda. What area are you most interested in?",
    ],
    luganda: [
      "Ntegedde ekibuuzo kyo. Ka nkuyambe okuzuula amawulire g'weetaaga.",
      "Weebale okutuukirira. Ndi wano okukuyamba n'ebibuuzo byonna ebikwata ku ddembe lyo n'ebikozesebwa ebiriwo.",
      "Nsindika okusaba kwo. Waliwo ekintu kyonna eky'enjawulo ky'oyagala okumanya ku mpeereza zaffe?",
      "Ndi wano okukuwa obuyambi. Oyagala amawulire agakwata ku kuwaayo alipoota, obuyambi obw'abamanyi, oba emikisa egy'ebyenfuna?",
      "Nsiima ekibuuzo kyo. Puletifomu yaffe ewa ebikozesebwa eby'enjawulo okuyamba abakazi mu Uganda. Kitundu ki ky'osinga okwagala?",
    ],
    swahili: [
      "Ninaelewa swali lako. Hebu nikumsaidie kupata habari unazohitaji.",
      "Asante kwa kufikia. Niko hapa kukusaidia na maswali yoyote kuhusu haki zako na rasilimali zinazopatikana.",
      "Ninachakata ombi lako. Je, kuna kitu chochote maalum ungependa kujua kuhusu huduma zetu?",
      "Niko hapa kukusaidia. Je, ungependa habari kuhusu kuripoti, msaada wa kitaaluma, au fursa za kiuchumi?",
      "Nathamini swali lako. Jukwaa letu linatoa rasilimali mbalimbali kuwapa nguvu wanawake nchini Uganda. Ni eneo gani unalofurahia zaidi?",
    ],
    runyankole: [
      "Naayetegyereza ekibuuzo kyawe. Ka nkuyambe kushanga amakuru agwetaaga.",
      "Yebare kutukirira. Ndi hanu kukuyamba n'ebibuuzo byona ebikwatiraine n'obugabe bwawe n'eby'okukozesa ebiriho.",
      "Nindabamu okushaba kwawe. Hariho ekintu kyona eky'omutaano eki orikwenda kumanya ahabw'obuheereza bwaitu?",
      "Ndi hanu kukuha obuyambi. Nooyenda amakuru agakwatiraine n'okutaasyamu ripoota, obuyambi bw'abakugu, nari emihanda y'ebyobushuubuzi?",
      "Ninkusiima ahabw'ekibuuzo kyawe. Puratufomu yaitu neeheereza eby'okukozesa ebitari bimwe kukora abakazi ba Uganda baine amaani. Ni kishengye ki eki orikukirayo kukundira?",
    ],
    acholi: [
      "Aniang penoni. Ber akonyi nongo ngec ma imito.",
      "Apwoyo me kube kwedwa. Atye kany me konyi ki lapeny mo keken ikom twero mamegi ki jami ma tye.",
      "Atye ka timo kwayini. Tye gin mo keken ma imito ngeyo ikom tic wa?",
      "Atye kany me konyi. Imito ngec ikom culu ripot, kony me lutic ma ngeni, onyo tic me lim?",
      "Apwoyo lapeny mamegi. Kor wa miyo jami ma pat pat me miyo mon me Uganda teko. Kabedo mene ma imaro loyo?",
    ],
  };

  const responses = defaultResponses[language] || defaultResponses.english;
  return responses[Math.floor(Math.random() * responses.length)];
}
