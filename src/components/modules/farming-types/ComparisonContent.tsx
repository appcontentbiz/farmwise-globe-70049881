
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Download, Leaf, Tractor } from "lucide-react";

// Sample data for farming comparison
const comparisonData = [
  { category: 'Yield', organic: 85, conventional: 100, regenerative: 90 },
  { category: 'Input Cost', organic: 75, conventional: 100, regenerative: 65 },
  { category: 'Labor Required', organic: 120, conventional: 100, regenerative: 110 },
  { category: 'Price Premium', organic: 130, conventional: 100, regenerative: 120 },
  { category: 'Soil Health', organic: 135, conventional: 100, regenerative: 150 },
  { category: 'Carbon Footprint', organic: 65, conventional: 100, regenerative: 50 },
];

const distributionData = [
  { name: 'Conventional', value: 78 },
  { name: 'Organic', value: 15 },
  { name: 'Regenerative', value: 7 },
];

const COLORS = ['#8884d8', '#4CAF50', '#FF8042'];

export function ComparisonContent() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">Farming Approach Comparison</h4>
          <p className="text-sm text-muted-foreground">Side-by-side analysis of different farming methods (Conventional = baseline 100%)</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={comparisonData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 160]} />
            <YAxis dataKey="category" type="category" />
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
            <Bar dataKey="organic" name="Organic" fill="#4CAF50" />
            <Bar dataKey="conventional" name="Conventional" fill="#8884d8" />
            <Bar dataKey="regenerative" name="Regenerative" fill="#FF8042" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <h4 className="font-medium mb-3">Market Distribution</h4>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-muted-foreground mt-2">U.S. Agricultural Land by Farming Method (%)</p>
        </div>
        
        <div className="bg-muted/30 p-4 rounded-lg">
          <h4 className="font-medium mb-3">Key Considerations By Approach</h4>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <Tractor className="h-4 w-4 text-purple-500" />
                <h5 className="font-medium text-sm">Conventional Farming</h5>
              </div>
              <ul className="text-sm ml-6 mt-1 space-y-1 list-disc">
                <li>Higher yields but more dependent on external inputs</li>
                <li>Lower labor requirements, more mechanization</li>
                <li>Standard market pricing, broader market access</li>
                <li>Potential environmental concerns with intensive practices</li>
              </ul>
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-farm-green" />
                <h5 className="font-medium text-sm">Organic Farming</h5>
              </div>
              <ul className="text-sm ml-6 mt-1 space-y-1 list-disc">
                <li>Premium prices but often lower yields</li>
                <li>Higher labor requirements and management complexity</li>
                <li>Improved soil health and biodiversity</li>
                <li>Certification process and compliance requirements</li>
              </ul>
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-amber-500" />
                <h5 className="font-medium text-sm">Regenerative Farming</h5>
              </div>
              <ul className="text-sm ml-6 mt-1 space-y-1 list-disc">
                <li>Focus on building soil health and ecosystem services</li>
                <li>Reduced external inputs but moderate yields</li>
                <li>Growing consumer interest and emerging premium markets</li>
                <li>Significant carbon sequestration potential</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
