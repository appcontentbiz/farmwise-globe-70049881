
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Layers, Plus } from "lucide-react";
import { useState } from "react";

export function FarmMap() {
  const [activeField, setActiveField] = useState<string | null>(null);
  
  const fields = [
    { id: "field1", name: "North Field", crop: "Corn", size: "12 acres", health: "Good" },
    { id: "field2", name: "South Field", crop: "Wheat", size: "8 acres", health: "Excellent" },
    { id: "field3", name: "East Field", crop: "Soybeans", size: "10 acres", health: "Fair" },
  ];

  return (
    <Card className="farm-module-card col-span-2 h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="farm-module-card-title">
            <MapPin className="h-5 w-5 text-farm-green" />
            Farm Fields
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Layers className="h-4 w-4 mr-2" />
              Layers
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Field
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-[300px] bg-secondary/50 rounded-md overflow-hidden border-2 border-dashed border-muted">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">Interactive map visualizing your farm fields</p>
            </div>
          </div>
          
          {/* Field indicators positioned absolutely over the map */}
          <div className="absolute top-1/4 left-1/4 cursor-pointer">
            <div 
              className={`w-6 h-6 rounded-full ${activeField === 'field1' ? 'bg-farm-green' : 'bg-farm-green/60'} flex items-center justify-center text-white hover:scale-110 transition-transform`}
              onClick={() => setActiveField('field1')}
            >
              1
            </div>
          </div>
          
          <div className="absolute top-2/3 left-1/2 cursor-pointer">
            <div 
              className={`w-6 h-6 rounded-full ${activeField === 'field2' ? 'bg-farm-green' : 'bg-farm-green/60'} flex items-center justify-center text-white hover:scale-110 transition-transform`}
              onClick={() => setActiveField('field2')}
            >
              2
            </div>
          </div>
          
          <div className="absolute top-1/3 right-1/4 cursor-pointer">
            <div 
              className={`w-6 h-6 rounded-full ${activeField === 'field3' ? 'bg-farm-green' : 'bg-farm-green/60'} flex items-center justify-center text-white hover:scale-110 transition-transform`}
              onClick={() => setActiveField('field3')}
            >
              3
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="font-medium mb-2">Field Overview</h4>
          <div className="grid grid-cols-3 gap-4">
            {fields.map((field) => (
              <div 
                key={field.id}
                className={`p-3 rounded-md border ${activeField === field.id ? 'bg-accent/20 border-accent' : 'bg-card hover:bg-secondary/30'} cursor-pointer transition-colors`}
                onClick={() => setActiveField(field.id)}
              >
                <div className="font-medium">{field.name}</div>
                <div className="text-sm text-muted-foreground">
                  {field.crop} · {field.size}
                </div>
                <div className="mt-1 text-xs">
                  Health: <span className="font-medium">{field.health}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
