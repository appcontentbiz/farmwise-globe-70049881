
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, FileText, ClipboardList, LineChart, FilePlus, BookOpen, Users } from "lucide-react";

interface ResourceCardGridProps {
  onResourceClick: (title: string, type: string) => void;
}

export function ResourceCardGrid({ onResourceClick }: ResourceCardGridProps) {
  const resourceCards = [
    {
      title: "Farm Vision Worksheet",
      description: "Define your farm's purpose and direction",
      icon: FileText,
      type: "vision"
    },
    {
      title: "Goal Template",
      description: "Create SMART goals for your farm business",
      icon: ClipboardList,
      type: "goals"
    },
    {
      title: "Resource Inventory",
      description: "Track your assets, equipment, and resources",
      icon: ClipboardList,
      type: "inventory"
    },
    {
      title: "Market Research Guide",
      description: "Analyze local markets and customer demographics",
      icon: LineChart,
      type: "market"
    },
    {
      title: "Business Plan Template",
      description: "Comprehensive farm business plan structure",
      icon: FilePlus,
      type: "business"
    },
    {
      title: "Financial Calculator",
      description: "Estimate startup costs and financial projections",
      icon: LineChart,
      type: "calculator"
    },
    {
      title: "Training Resources",
      description: "Courses, workshops, and learning materials",
      icon: BookOpen,
      type: "training"
    },
    {
      title: "Find a Mentor",
      description: "Connect with experienced farmers for guidance",
      icon: Users,
      type: "mentor"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {resourceCards.map((card) => (
        <Card 
          key={card.title} 
          className="border hover:border-farm-green cursor-pointer transition-all"
          onClick={() => onResourceClick(card.title, card.type)}
        >
          <CardContent className="p-4 flex justify-between items-start">
            <div>
              <h3 className="font-medium flex items-center">
                <card.icon className="h-4 w-4 mr-2 text-farm-green" />
                {card.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{card.description}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
