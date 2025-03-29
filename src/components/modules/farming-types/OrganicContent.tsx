
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { Download, ExternalLink, Leaf, PlusCircle, Sprout } from "lucide-react";

// Sample data for organic practices
const organicData = [
  { practice: 'Cover Crops', adoption: 85, benefit: 92 },
  { practice: 'Crop Rotation', adoption: 95, benefit: 90 },
  { practice: 'Composting', adoption: 78, benefit: 85 },
  { practice: 'Biological Pest Control', adoption: 65, benefit: 75 },
  { practice: 'No-till/Reduced Till', adoption: 60, benefit: 80 },
];

export function OrganicContent() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">Organic Farming Practices</h4>
          <p className="text-sm text-muted-foreground">Implementation and effectiveness of organic methods</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            Resources
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={organicData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="practice" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="adoption" name="Adoption Rate (%)" fill="#4CAF50" />
            <Bar dataKey="benefit" name="Benefit Score (%)" fill="#42A5F5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="h-5 w-5 text-farm-green" />
            <h4 className="font-medium">Certification</h4>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Status:</div>
            <div className="text-lg font-semibold text-farm-green">USDA Certified Organic</div>
            <div className="text-xs text-muted-foreground">Certified since 2020</div>
            <Button variant="outline" size="sm" className="mt-2 w-full">
              <PlusCircle className="h-3.5 w-3.5 mr-1" />
              Certification Details
            </Button>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sprout className="h-5 w-5 text-farm-green" />
            <h4 className="font-medium">Premium</h4>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Average Price Premium:</div>
            <div className="text-lg font-semibold text-farm-green">32%</div>
            <div className="text-xs text-muted-foreground">Above conventional market prices</div>
            <Button variant="outline" size="sm" className="mt-2 w-full">
              <ExternalLink className="h-3.5 w-3.5 mr-1" />
              Market Analysis
            </Button>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="h-5 w-5 text-farm-green" />
            <h4 className="font-medium">Transition</h4>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Fields in Transition:</div>
            <div className="text-lg font-semibold text-amber-500">2 fields (15 acres)</div>
            <div className="text-xs text-muted-foreground">Est. completion: June 2025</div>
            <Button variant="outline" size="sm" className="mt-2 w-full">
              <PlusCircle className="h-3.5 w-3.5 mr-1" />
              Transition Plan
            </Button>
          </div>
        </Card>
      </div>
      
      <div className="bg-farm-green/10 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Organic Farming Benefits</h4>
        <ul className="text-sm space-y-2">
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-farm-green flex items-center justify-center text-white text-xs mr-2 mt-0.5">1</div>
            <div>Improved soil health and biodiversity through natural management practices</div>
          </li>
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-farm-green flex items-center justify-center text-white text-xs mr-2 mt-0.5">2</div>
            <div>Reduced exposure to synthetic pesticides and fertilizers</div>
          </li>
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-farm-green flex items-center justify-center text-white text-xs mr-2 mt-0.5">3</div>
            <div>Access to premium markets with higher price points</div>
          </li>
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-farm-green flex items-center justify-center text-white text-xs mr-2 mt-0.5">4</div>
            <div>Greater resilience to climate change through diversified systems</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
