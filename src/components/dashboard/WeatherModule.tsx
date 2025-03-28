
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Droplets, Sun, Thermometer, Wind } from "lucide-react";

export function WeatherModule() {
  return (
    <Card className="farm-module-card">
      <CardHeader className="pb-2">
        <CardTitle className="farm-module-card-title">
          <Cloud className="h-5 w-5 text-farm-sky-dark" />
          Weather Conditions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center my-3">
            <Sun className="h-16 w-16 text-yellow-400 animate-pulse-gentle" />
          </div>
          <div className="text-3xl font-bold mb-1">72°F</div>
          <div className="text-muted-foreground mb-6">Partly Cloudy</div>
          
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full">
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-farm-green" />
              <span className="text-sm">High: 76°F</span>
            </div>
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-farm-sky" />
              <span className="text-sm">Low: 56°F</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-farm-sky" />
              <span className="text-sm">Wind: 8 mph</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-farm-sky" />
              <span className="text-sm">Humidity: 45%</span>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t w-full">
            <h4 className="font-medium mb-2 text-sm">5-Day Forecast</h4>
            <div className="flex justify-between">
              {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
                <div key={day} className="flex flex-col items-center">
                  <div className="text-xs font-medium">{day}</div>
                  {i === 0 && <Sun className="my-1 h-5 w-5 text-yellow-400" />}
                  {i === 1 && <Sun className="my-1 h-5 w-5 text-yellow-400" />}
                  {i === 2 && <Cloud className="my-1 h-5 w-5 text-farm-sky" />}
                  {i === 3 && <Droplets className="my-1 h-5 w-5 text-farm-sky" />}
                  {i === 4 && <Sun className="my-1 h-5 w-5 text-yellow-400" />}
                  <div className="text-xs">{70 + i}°</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
