
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Globe, 
  Upload,
  Send 
} from "lucide-react";

interface FieldReportFormProps {
  onSubmit: () => void;
}

export function FieldReportForm({ onSubmit }: FieldReportFormProps) {
  const [reportType, setReportType] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the data to a server
    console.log({ reportType, location, title, description });
    onSubmit();
    
    // Reset form
    setReportType("");
    setLocation("");
    setTitle("");
    setDescription("");
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="farm-module-card">
        <CardHeader className="pb-2">
          <CardTitle className="farm-module-card-title">
            <Globe className="h-5 w-5 text-farm-green" />
            Submit Field Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weather">Weather Event</SelectItem>
                  <SelectItem value="disease">Crop Disease/Pest</SelectItem>
                  <SelectItem value="innovation">Farming Technique</SelectItem>
                  <SelectItem value="market">Market Insight</SelectItem>
                  <SelectItem value="policy">Policy Impact</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                placeholder="City, Region, Country" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Report Title</Label>
              <Input 
                id="title" 
                placeholder="Brief title of your report" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Detailed information about your observation or insight" 
                className="min-h-[120px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="attachments">Attachments (Optional)</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Drag & drop files or click to browse
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Supports: JPG, PNG, PDF (max 5MB)
                </p>
              </div>
            </div>
            
            <Button type="submit" className="w-full">
              <Send className="h-4 w-4 mr-2" />
              Submit Report
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card className="farm-module-card">
        <CardHeader className="pb-2">
          <CardTitle className="farm-module-card-title">
            <Globe className="h-5 w-5 text-farm-green" />
            Why Contribute?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-medium mb-2">Collective Intelligence</h3>
            <p className="text-sm text-muted-foreground">
              By sharing your observations and insights, you contribute to a global knowledge base that helps farmers worldwide prepare for challenges and opportunities.
            </p>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-medium mb-2">Early Warning System</h3>
            <p className="text-sm text-muted-foreground">
              Field reports create an early warning network that can identify emerging issues before they become widespread problems.
            </p>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-medium mb-2">Global Community</h3>
            <p className="text-sm text-muted-foreground">
              Connect with farmers and agricultural experts worldwide who share similar challenges and innovative solutions.
            </p>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <h3 className="font-medium mb-2">Recent Contributions</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Successful companion planting technique in Iowa</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span>New wheat rust variant detected in Saskatchewan</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>Unusual rainfall patterns affecting rice in Thailand</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
