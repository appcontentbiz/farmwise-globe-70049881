
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Download, 
  ExternalLink, 
  FileSpreadsheet, 
  FileText,
  List, 
  SlidersHorizontal 
} from "lucide-react";

export function GuidanceContent() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">Structured Guidance for New Farmers</h4>
          <p className="text-sm text-muted-foreground">Step-by-step approach to starting your farm</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Print Guide
          </Button>
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Customize
          </Button>
        </div>
      </div>
      
      <div className="bg-muted/30 p-5 rounded-lg space-y-5">
        <div className="space-y-2">
          <h3 className="text-lg font-medium flex items-center">
            <span className="h-6 w-6 rounded-full bg-farm-green text-white flex items-center justify-center text-sm mr-2">1</span>
            Define Your Farm Vision & Goals
          </h3>
          <p className="text-sm text-muted-foreground ml-8">
            Establish clear goals for your farm - whether it's for profit, sustainability, lifestyle, or a combination of factors.
          </p>
          <div className="ml-8 mt-2 flex gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              <FileText className="h-3 w-3 mr-1" />
              Farm Vision Worksheet
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <FileSpreadsheet className="h-3 w-3 mr-1" />
              Goal Template
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium flex items-center">
            <span className="h-6 w-6 rounded-full bg-farm-green text-white flex items-center justify-center text-sm mr-2">2</span>
            Assess Resources & Market Opportunities
          </h3>
          <p className="text-sm text-muted-foreground ml-8">
            Evaluate available land, capital, equipment, skills, and identify potential markets for your products.
          </p>
          <div className="ml-8 mt-2 flex gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              <List className="h-3 w-3 mr-1" />
              Resource Inventory
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <ExternalLink className="h-3 w-3 mr-1" />
              Market Research Guide
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium flex items-center">
            <span className="h-6 w-6 rounded-full bg-farm-green text-white flex items-center justify-center text-sm mr-2">3</span>
            Develop Business & Financial Plans
          </h3>
          <p className="text-sm text-muted-foreground ml-8">
            Create a comprehensive business plan including startup costs, operating expenses, and projected revenue.
          </p>
          <div className="ml-8 mt-2 flex gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              <Download className="h-3 w-3 mr-1" />
              Business Plan Template
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <FileSpreadsheet className="h-3 w-3 mr-1" />
              Financial Calculator
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium flex items-center">
            <span className="h-6 w-6 rounded-full bg-farm-green text-white flex items-center justify-center text-sm mr-2">4</span>
            Acquire Knowledge & Skills
          </h3>
          <p className="text-sm text-muted-foreground ml-8">
            Gain necessary knowledge through educational resources, training programs, mentorship, and hands-on experience.
          </p>
          <div className="ml-8 mt-2 flex gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              <BookOpen className="h-3 w-3 mr-1" />
              Training Resources
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <ExternalLink className="h-3 w-3 mr-1" />
              Find a Mentor
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-farm-green/10 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Did You Know?</h4>
        <ul className="text-sm space-y-2">
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-farm-green flex items-center justify-center text-white text-xs mr-2 mt-0.5">i</div>
            <div>According to USDA, over 25% of beginning farmers have been farming for less than 10 years.</div>
          </li>
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-farm-green flex items-center justify-center text-white text-xs mr-2 mt-0.5">i</div>
            <div>Beginning farmers under age 35 increased 11% between 2012 and 2017.</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
