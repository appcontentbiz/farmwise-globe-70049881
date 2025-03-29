
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Download, Save } from "lucide-react";

export interface CustomizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const guideTopics = [
  { id: 'introduction', label: 'Introduction to Farming', checked: true },
  { id: 'planning', label: 'Farm Planning', checked: true },
  { id: 'land', label: 'Land & Infrastructure', checked: true },
  { id: 'production', label: 'Production Methods', checked: true },
  { id: 'marketing', label: 'Marketing & Sales', checked: true },
  { id: 'management', label: 'Farm Management', checked: true },
  { id: 'finance', label: 'Financial Planning', checked: true },
  { id: 'risk', label: 'Risk Management', checked: true },
  { id: 'scaling', label: 'Scaling Your Farm', checked: false },
  { id: 'certification', label: 'Organic Certification', checked: false },
  { id: 'valueAdded', label: 'Value-Added Products', checked: false },
  { id: 'agriTourism', label: 'Agritourism Opportunities', checked: false },
  { id: 'successPlanning', label: 'Succession Planning', checked: false },
  { id: 'technology', label: 'Farm Technology', checked: false },
];

export function CustomizeGuideModal({ 
  isOpen, 
  onClose 
}: CustomizeGuideModalProps) {
  const { toast } = useToast();
  const [topics, setTopics] = useState(guideTopics);
  const [farmType, setFarmType] = useState('vegetable');
  const [acreage, setAcreage] = useState('small');
  
  const handleToggleTopic = (id: string) => {
    setTopics(topics.map(topic => 
      topic.id === id ? { ...topic, checked: !topic.checked } : topic
    ));
  };
  
  const handleSaveCustomization = () => {
    // In a real app, this would save the customization to user preferences
    toast({
      title: "Guide Customized",
      description: "Your custom guide preferences have been saved",
    });
    onClose();
  };
  
  const handleDownloadGuide = () => {
    toast({
      title: "Guide Downloading",
      description: "Your customized guide is being generated and will download shortly",
    });
    
    // Simulate download delay
    setTimeout(() => {
      onClose();
    }, 1500);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Customize Your Farming Guide</DialogTitle>
          <DialogDescription>
            Select the topics and characteristics that match your specific farming interests.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div>
            <h3 className="text-sm font-medium mb-3">Farm Type</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant={farmType === 'vegetable' ? 'default' : 'outline'} 
                onClick={() => setFarmType('vegetable')}
                className="justify-start"
              >
                Vegetable/Market Garden
              </Button>
              <Button 
                variant={farmType === 'livestock' ? 'default' : 'outline'} 
                onClick={() => setFarmType('livestock')}
                className="justify-start"
              >
                Livestock/Animal Husbandry
              </Button>
              <Button 
                variant={farmType === 'mixed' ? 'default' : 'outline'} 
                onClick={() => setFarmType('mixed')}
                className="justify-start"
              >
                Mixed Production
              </Button>
              <Button 
                variant={farmType === 'specialty' ? 'default' : 'outline'} 
                onClick={() => setFarmType('specialty')}
                className="justify-start"
              >
                Specialty Crops
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Farm Size</h3>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant={acreage === 'small' ? 'default' : 'outline'} 
                onClick={() => setAcreage('small')}
              >
                Small (1-5 acres)
              </Button>
              <Button 
                variant={acreage === 'medium' ? 'default' : 'outline'} 
                onClick={() => setAcreage('medium')}
              >
                Medium (6-40 acres)
              </Button>
              <Button 
                variant={acreage === 'large' ? 'default' : 'outline'} 
                onClick={() => setAcreage('large')}
              >
                Large (40+ acres)
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Topics to Include</h3>
            <div className="grid grid-cols-2 gap-4">
              {topics.map((topic) => (
                <div key={topic.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={topic.id} 
                    checked={topic.checked}
                    onCheckedChange={() => handleToggleTopic(topic.id)}
                  />
                  <Label htmlFor={topic.id}>{topic.label}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handleSaveCustomization}>
            <Save className="h-4 w-4 mr-2" />
            Save Preferences
          </Button>
          <Button onClick={handleDownloadGuide}>
            <Download className="h-4 w-4 mr-2" />
            Generate Guide
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
