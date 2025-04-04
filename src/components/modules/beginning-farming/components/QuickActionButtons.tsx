
import { Button } from "@/components/ui/button";
import { BookOpen, Users, FileText } from "lucide-react";

interface QuickActionButtonsProps {
  handleQuickAction: (action: string) => void;
}

export function QuickActionButtons({ handleQuickAction }: QuickActionButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <Button size="sm" variant="outline" onClick={() => handleQuickAction("learn")}>
        <BookOpen className="h-4 w-4 mr-2" />
        Learn More
      </Button>
      <Button size="sm" variant="outline" onClick={() => handleQuickAction("connect")}>
        <Users className="h-4 w-4 mr-2" />
        Connect with Mentors
      </Button>
      <Button size="sm" variant="outline" onClick={() => handleQuickAction("tools")}>
        <FileText className="h-4 w-4 mr-2" />
        Equipment Guide
      </Button>
      <Button size="sm" variant="outline" onClick={() => handleQuickAction("grants")}>
        <FileText className="h-4 w-4 mr-2" />
        Find Grants
      </Button>
    </div>
  );
}
