
import { AlertCircle } from "lucide-react";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Risk prediction data
const riskPredictionData = [
  { x: 68, y: 78, z: 200, name: 'Field 1: High Risk' },
  { x: 45, y: 55, z: 150, name: 'Field 2: Medium Risk' },
  { x: 30, y: 40, z: 100, name: 'Field 3: Low Risk' },
  { x: 72, y: 85, z: 250, name: 'Field 4: Critical Risk' },
  { x: 35, y: 30, z: 120, name: 'Field 5: Low Risk' },
];

export function RiskPrediction() {
  return (
    <div className="space-y-4">
      <h4 className="font-medium">Risk Prediction Model</h4>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid />
                <XAxis type="number" dataKey="x" name="Temperature (°F)" />
                <YAxis type="number" dataKey="y" name="Humidity (%)" />
                <ZAxis type="number" dataKey="z" range={[40, 160]} name="Risk Score" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Risk Prediction" data={riskPredictionData} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-sm text-muted-foreground">Temperature vs. Humidity Risk Correlation</div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1 text-red-600" />
              High Risk Areas
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Field 4 (North)</span>
                  <span className="font-medium">Critical Risk</span>
                </div>
                <div className="w-full bg-red-100 rounded-full h-2 mt-1">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Field 1 (East)</span>
                  <span className="font-medium">High Risk</span>
                </div>
                <div className="w-full bg-red-100 rounded-full h-2 mt-1">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Field 2 (South)</span>
                  <span className="font-medium">Medium Risk</span>
                </div>
                <div className="w-full bg-yellow-100 rounded-full h-2 mt-1">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '55%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Risk Factors</h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs mr-2 mt-0.5">1</div>
                <div>High humidity ({'>'}75%) increases fungal disease risk</div>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs mr-2 mt-0.5">2</div>
                <div>Temperature range 65-80°F optimal for most pests</div>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs mr-2 mt-0.5">3</div>
                <div>Previous pest presence increases reoccurrence risk</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
