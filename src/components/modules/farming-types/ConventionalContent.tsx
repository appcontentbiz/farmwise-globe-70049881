
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { CloudSun, DollarSign, Tractor, TrendingUp } from "lucide-react";

// Sample data for conventional farming
const yieldData = [
  { year: '2018', corn: 187, wheat: 68, soybeans: 53 },
  { year: '2019', corn: 192, wheat: 70, soybeans: 55 },
  { year: '2020', corn: 196, wheat: 72, soybeans: 56 },
  { year: '2021', corn: 199, wheat: 71, soybeans: 58 },
  { year: '2022', corn: 205, wheat: 73, soybeans: 60 },
  { year: '2023', corn: 210, wheat: 74, soybeans: 62 },
];

export function ConventionalContent() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">Conventional Farming Performance</h4>
          <p className="text-sm text-muted-foreground">Yield and efficiency metrics for conventional methods</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            Analysis
          </Button>
        </div>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={yieldData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="corn" name="Corn (bu/acre)" stroke="#4CAF50" />
            <Line type="monotone" dataKey="wheat" name="Wheat (bu/acre)" stroke="#FBC02D" />
            <Line type="monotone" dataKey="soybeans" name="Soybeans (bu/acre)" stroke="#42A5F5" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Tractor className="h-5 w-5 text-farm-green" />
            <h4 className="font-medium">Efficiency</h4>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Labor Hours/Acre:</div>
            <div className="text-lg font-semibold text-farm-green">3.2 hours</div>
            <div className="text-xs text-farm-green">↓ 8% from previous year</div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-5 w-5 text-farm-green" />
            <h4 className="font-medium">Production Cost</h4>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Average Cost/Acre:</div>
            <div className="text-lg font-semibold text-amber-500">$625</div>
            <div className="text-xs text-amber-500">↑ 5% from previous year</div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <CloudSun className="h-5 w-5 text-farm-green" />
            <h4 className="font-medium">Sustainability</h4>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Conservation Practices:</div>
            <div className="text-lg font-semibold text-farm-green">4 implemented</div>
            <div className="text-xs text-farm-green">Cover crops, reduced tillage</div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="bg-muted/30 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Optimization Opportunities</h4>
          <ul className="text-sm space-y-2">
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-farm-green flex items-center justify-center text-white text-xs mr-2 mt-0.5">1</div>
              <div>Precision application technology could reduce input costs by 12-15%</div>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-farm-green flex items-center justify-center text-white text-xs mr-2 mt-0.5">2</div>
              <div>Variable rate seeding may increase yield by 5-8% in variable fields</div>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-farm-green flex items-center justify-center text-white text-xs mr-2 mt-0.5">3</div>
              <div>Soil sensors could optimize irrigation timing and reduce water usage</div>
            </li>
          </ul>
        </div>
        
        <div className="bg-muted/30 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Conventional Best Practices</h4>
          <ul className="text-sm space-y-2">
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-farm-green flex items-center justify-center text-white text-xs mr-2 mt-0.5">1</div>
              <div>Integrated Pest Management (IPM) to minimize pesticide use</div>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-farm-green flex items-center justify-center text-white text-xs mr-2 mt-0.5">2</div>
              <div>Split application of nitrogen to reduce runoff and improve uptake</div>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-farm-green flex items-center justify-center text-white text-xs mr-2 mt-0.5">3</div>
              <div>Buffer strips along waterways to filter runoff and protect water quality</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
