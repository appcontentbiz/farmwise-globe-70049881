
import { Button } from "@/components/ui/button";
import { Download, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GuidedStepsProps {
  onCustomizeClick: () => void;
  onDownload: (resourceName: string) => void;
}

export function GuidedSteps({ onCustomizeClick, onDownload }: GuidedStepsProps) {
  const { toast } = useToast();

  const handleDownload = (resourceName: string) => {
    toast({
      title: "Download Started",
      description: `${resourceName} will be downloaded shortly.`
    });
    
    onDownload(resourceName);
  };

  return (
    <div className="bg-farm-green/10 p-4 rounded-lg border border-farm-green/20">
      <h2 className="text-xl font-semibold mb-2">Structured Guidance for New Farmers</h2>
      <p className="text-muted-foreground mb-4">
        Explore our curated guides designed specifically for beginning farmers. Each guide provides step-by-step 
        instructions, recommendations, and resources to help you start your farming journey with confidence.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          className="border-farm-green text-farm-green hover:bg-farm-green hover:text-white" 
          onClick={onCustomizeClick}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Customize Guidance
        </Button>
        
        <Button 
          variant="outline"
          onClick={() => handleDownload("Complete Farming Guide.pdf")}
        >
          <Download className="h-4 w-4 mr-2" />
          Print Guide
        </Button>
      </div>
    </div>
  );
}
