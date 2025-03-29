
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  BrainCircuit, 
  Leaf, 
  Languages, 
  BarChart, 
  Bug, 
  Calendar, 
  ArrowRight, 
  Send, 
  Loader2 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AIAgriculturalAssistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([{
    role: 'assistant',
    content: 'Hello! I\'m your AI Agricultural Assistant. Ask me any questions about farming, crops, market trends, or general information. How can I help you today?'
  }]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFeaturesDialog, setShowFeaturesDialog] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput("");
    setIsLoading(true);
    
    // Simulate AI response (would connect to actual AI API in production)
    setTimeout(() => {
      // Mock response based on keywords in user input
      let response = "I'm processing your question about farming. In a production environment, this would connect to an AI API for accurate responses.";
      
      // Simple keyword-based responses
      if (userMessage.toLowerCase().includes("market") || userMessage.toLowerCase().includes("price")) {
        response = "Market trends indicate stable pricing for most crops this season. For detailed price predictions, I would analyze regional market data and seasonal patterns in a production environment.";
      } else if (userMessage.toLowerCase().includes("pest") || userMessage.toLowerCase().includes("disease")) {
        response = "For pest and disease issues, proper identification is key. Send photos for more accurate diagnosis. Common controls include integrated pest management (IPM) strategies using biological controls and targeted treatments.";
      } else if (userMessage.toLowerCase().includes("crop") || userMessage.toLowerCase().includes("plant")) {
        response = "Successful crop production depends on soil health, proper water management, and timing. Consider your local climate zone and soil tests before planting.";
      } else if (userMessage.toLowerCase().includes("soil")) {
        response = "Healthy soil is the foundation of successful farming. Regular soil testing helps monitor pH, nutrients, and organic matter. Cover crops and crop rotation can improve soil health naturally.";
      } else if (userMessage.toLowerCase().includes("weather") || userMessage.toLowerCase().includes("climate")) {
        response = "Weather patterns significantly impact farming operations. Long-term climate data shows [region] typically experiences [weather pattern]. Consider weather-resistant crop varieties for your area.";
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 1500);
  };

  // Features for the dialog
  const features = [
    {
      icon: <BrainCircuit className="h-5 w-5 text-farm-green" />,
      title: "AI-Powered Farming Knowledge",
      description: "Ask specific questions about crops, soil, pests, and farming techniques"
    },
    {
      icon: <BarChart className="h-5 w-5 text-farm-green" />,
      title: "Market Analysis",
      description: "Get real-time market trends and price predictions for your crops"
    },
    {
      icon: <Bug className="h-5 w-5 text-farm-green" />,
      title: "Pest & Disease Diagnosis",
      description: "Troubleshoot farming issues with AI-powered diagnosis"
    },
    {
      icon: <Calendar className="h-5 w-5 text-farm-green" />,
      title: "Planting Optimization",
      description: "Calculate optimal planting times and crop rotations for your region"
    },
    {
      icon: <Languages className="h-5 w-5 text-farm-green" />,
      title: "Multilingual Support",
      description: "Access support in 48 different languages for global farming assistance"
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 mt-6">
      <Card className="farm-module-card">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Leaf className="h-5 w-5 text-farm-green" />
            <CardTitle>AI Agricultural Assistant</CardTitle>
          </div>
          <CardDescription>
            Get expert farming advice, market insights, and answers to your agricultural questions
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 flex flex-col h-[600px]">
              <div className="flex-1 relative overflow-hidden bg-muted/30 rounded-md mb-4">
                <ScrollArea className="absolute inset-0 p-4">
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div 
                        key={index} 
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.role === 'user' 
                              ? 'bg-primary text-primary-foreground ml-12' 
                              : 'bg-muted mr-12'
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-lg p-3 flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Thinking...</span>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
              
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <Textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about crops, pest management, market trends, or any farming question..."
                  className="flex-1 min-h-[70px] resize-none"
                />
                <Button type="submit" disabled={isLoading || !input.trim()}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </form>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Assistant Features</h3>
              <div className="space-y-3">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-start space-x-2 p-3 border rounded-md">
                    <div className="mt-0.5">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{feature.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Popular Queries</h3>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" size="sm" 
                    onClick={() => {
                      setInput("What crops grow best in sandy soil?");
                      document.querySelector<HTMLTextAreaElement>("textarea")?.focus();
                    }}
                  >
                    Crops for sandy soil
                  </Button>
                  <Button 
                    variant="outline" size="sm"
                    onClick={() => {
                      setInput("How do I identify tomato blight?");
                      document.querySelector<HTMLTextAreaElement>("textarea")?.focus();
                    }}
                  >
                    Identify tomato blight
                  </Button>
                  <Button 
                    variant="outline" size="sm"
                    onClick={() => {
                      setInput("Current market price for organic wheat");
                      document.querySelector<HTMLTextAreaElement>("textarea")?.focus();
                    }}
                  >
                    Organic wheat prices
                  </Button>
                  <Button 
                    variant="outline" size="sm"
                    onClick={() => {
                      setInput("Best cover crops for nitrogen fixation");
                      document.querySelector<HTMLTextAreaElement>("textarea")?.focus();
                    }}
                  >
                    Nitrogen-fixing cover crops
                  </Button>
                </div>
              </div>
              
              <Button 
                variant="default" 
                className="w-full" 
                onClick={() => setShowFeaturesDialog(true)}
              >
                Learn More About AI Features
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <div className="border rounded-md p-3 bg-muted/30">
                <Badge variant="outline" className="mb-2">Beta Feature</Badge>
                <p className="text-sm text-muted-foreground">
                  The AI Agricultural Assistant is currently in beta. In production, this would connect to agricultural AI models for accurate responses.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={showFeaturesDialog} onOpenChange={setShowFeaturesDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Leaf className="h-5 w-5 text-farm-green" />
              <span>AI Agricultural Assistant Features</span>
            </DialogTitle>
            <DialogDescription>
              Explore the powerful capabilities of your AI Agricultural Assistant
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {features.map((feature, i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardHeader className="bg-muted/40 pb-2">
                      <div className="flex items-center space-x-2">
                        {feature.icon}
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p>{feature.description}</p>
                      
                      <div className="mt-4 border-t pt-4">
                        <h4 className="font-medium mb-2">Sample Queries:</h4>
                        <ul className="space-y-2">
                          {i === 0 && (
                            <>
                              <li className="text-sm">• "What are the signs of nitrogen deficiency in corn?"</li>
                              <li className="text-sm">• "How deep should I plant potato seeds?"</li>
                              <li className="text-sm">• "Best practices for organic weed control"</li>
                            </>
                          )}
                          {i === 1 && (
                            <>
                              <li className="text-sm">• "What's the current price trend for soybeans?"</li>
                              <li className="text-sm">• "Predict wheat prices for next quarter"</li>
                              <li className="text-sm">• "Best markets for organic vegetables in my region"</li>
                            </>
                          )}
                          {i === 2 && (
                            <>
                              <li className="text-sm">• "What's causing these yellow spots on my tomato leaves?"</li>
                              <li className="text-sm">• "How to control aphids organically?"</li>
                              <li className="text-sm">• "Identify this weed in my cornfield"</li>
                            </>
                          )}
                          {i === 3 && (
                            <>
                              <li className="text-sm">• "When should I plant winter wheat in Zone 6?"</li>
                              <li className="text-sm">• "Calculate optimal crop rotation for my 40-acre farm"</li>
                              <li className="text-sm">• "Best companion plants for tomatoes"</li>
                            </>
                          )}
                          {i === 4 && (
                            <>
                              <li className="text-sm">• "Switch to Spanish for all communications"</li>
                              <li className="text-sm">• "Translate this farming guide to Mandarin"</li>
                              <li className="text-sm">• "Agricultural terms in French"</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">Integration Capabilities</h3>
                <p className="mb-4">
                  In a production environment, the AI Agricultural Assistant would integrate with:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <Leaf className="h-4 w-4 text-farm-green mt-1" />
                    <span className="text-sm">Weather APIs for real-time climate data and forecasting</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Leaf className="h-4 w-4 text-farm-green mt-1" />
                    <span className="text-sm">Market databases for accurate pricing and trend analysis</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Leaf className="h-4 w-4 text-farm-green mt-1" />
                    <span className="text-sm">Soil and crop databases for region-specific recommendations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Leaf className="h-4 w-4 text-farm-green mt-1" />
                    <span className="text-sm">Image recognition APIs for pest and disease identification</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Leaf className="h-4 w-4 text-farm-green mt-1" />
                    <span className="text-sm">Translation services for multilingual support</span>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
