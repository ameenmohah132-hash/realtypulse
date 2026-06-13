"use client"

import { useState } from "react"
import { 
  Send, 
  Mic, 
  Paperclip, 
  Sparkles, 
  FileText, 
  MessageSquare, 
  Mail, 
  TrendingUp, 
  FileBarChart,
  Home,
  Bot,
  User
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const suggestedActions = [
  {
    icon: Home,
    title: "Generate Property Description",
    description: "Create compelling listings for your properties",
    prompt: "Generate a luxury property description for a 4-bedroom oceanfront penthouse in Miami Beach with modern amenities and stunning views.",
  },
  {
    icon: MessageSquare,
    title: "Create Marketing Captions",
    description: "Social media content that converts",
    prompt: "Create 5 engaging Instagram captions for promoting a $2.5M luxury villa in Malibu.",
  },
  {
    icon: Mail,
    title: "Write Client Emails",
    description: "Professional follow-ups and proposals",
    prompt: "Write a follow-up email for a client who viewed Ocean View Penthouse yesterday and showed strong interest.",
  },
  {
    icon: TrendingUp,
    title: "Analyze Market Trends",
    description: "Get insights on real estate markets",
    prompt: "Analyze the current luxury real estate market trends in South Florida and provide investment recommendations.",
  },
  {
    icon: FileBarChart,
    title: "Generate Reports",
    description: "Monthly performance and analytics",
    prompt: "Generate a monthly performance report summary for my real estate portfolio including key metrics and recommendations.",
  },
  {
    icon: FileText,
    title: "Contract Assistant",
    description: "Help with legal documents",
    prompt: "Help me understand the key terms I should negotiate in a luxury property purchase agreement.",
  },
]

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content: "Hello! I'm your Realty Pulse AI assistant. I can help you with property descriptions, market analysis, client communications, and much more. How can I assist you today?",
    timestamp: new Date(),
  },
]

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: generateResponse(input),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickAction = (prompt: string) => {
    setInput(prompt)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 animate-pulse-glow">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            AI Assistant
          </h1>
          <p className="text-sm text-muted-foreground">
            Powered by Realty Pulse AI
          </p>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col glass-card rounded-xl overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 animate-fade-in",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[70%] rounded-xl p-4",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-foreground"
                  )}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <p
                    className={cn(
                      "text-[10px] mt-2",
                      message.role === "user"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    )}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {message.role === "user" && (
                  <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
                    <User className="h-4 w-4 text-foreground" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 animate-fade-in">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-secondary/50 rounded-xl p-4">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-primary/50 animate-bounce" />
                    <span
                      className="h-2 w-2 rounded-full bg-primary/50 animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <span
                      className="h-2 w-2 rounded-full bg-primary/50 animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 text-muted-foreground hover:text-foreground"
              >
                <Paperclip className="h-5 w-5" />
              </Button>
              <div className="flex-1 relative">
                <Textarea
                  placeholder="Ask me anything about real estate..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                  className="min-h-[44px] max-h-[120px] resize-none bg-secondary/50 border-border pr-20"
                  rows={1}
                />
                <div className="absolute right-2 bottom-2 flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    className="h-8 w-8 bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={handleSend}
                    disabled={!input.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="hidden lg:block w-80 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">
            Quick Actions
          </h3>
          <div className="space-y-2">
            {suggestedActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action.prompt)}
                className="w-full text-left glass-card rounded-xl p-4 hover:border-primary/30 transition-all duration-200 group"
              >
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <action.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {action.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {action.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function generateResponse(input: string): string {
  const lowerInput = input.toLowerCase()

  if (lowerInput.includes("property description") || lowerInput.includes("listing")) {
    return `Here's a compelling property description for your luxury listing:

**Ocean View Penthouse - Miami Beach**

Discover unparalleled luxury in this stunning 4-bedroom oceanfront penthouse, where modern sophistication meets coastal living. Floor-to-ceiling windows frame breathtaking panoramic views of the Atlantic, while premium finishes throughout create an atmosphere of refined elegance.

**Key Features:**
• 3,500 sq ft of meticulously designed living space
• Private elevator access and smart home technology
• Chef's kitchen with top-of-the-line Miele appliances
• Spa-inspired master suite with ocean views
• Expansive terrace perfect for entertaining

This residence offers the ultimate Miami Beach lifestyle. Would you like me to adjust the tone or add any specific details?`
  }

  if (lowerInput.includes("market") || lowerInput.includes("trend")) {
    return `**South Florida Luxury Real Estate Market Analysis**

The luxury real estate market in South Florida continues to show remarkable resilience:

**Key Trends:**
• Average luxury home prices up 12% YoY
• Miami Beach penthouses seeing 18% premium
• International buyer interest increasing, especially from Europe and Latin America
• Inventory remains tight with 2.3 months of supply

**Recommendations:**
1. Focus on waterfront properties - highest demand
2. Highlight smart home features and sustainability
3. Consider off-market opportunities for premium listings
4. Target high-net-worth individuals relocating from high-tax states

Would you like a detailed analysis of a specific neighborhood?`
  }

  if (lowerInput.includes("email") || lowerInput.includes("follow")) {
    return `Here's a professional follow-up email:

---

**Subject: Thank You for Visiting Ocean View Penthouse**

Dear [Client Name],

Thank you for taking the time to tour the Ocean View Penthouse yesterday. It was wonderful to show you this exceptional property and discuss your luxury home requirements.

I noticed your interest in the panoramic ocean views and the chef's kitchen - truly the highlights of this residence. Given the current market demand for oceanfront penthouses in Miami Beach, I wanted to reach out promptly with some additional information.

I'd be happy to schedule a second viewing at your convenience or answer any questions about the property or financing options.

Best regards,
[Your Name]

---

Would you like me to personalize this further or adjust the tone?`
  }

  return `I'd be happy to help you with that! Based on your request, here are some insights:

1. **Market Overview**: The luxury real estate market remains strong with continued demand for premium properties.

2. **Recommendations**: Focus on highlighting unique property features and leveraging digital marketing channels.

3. **Next Steps**: I can help you create detailed property descriptions, marketing materials, or client communications.

What specific aspect would you like me to elaborate on?`
}
