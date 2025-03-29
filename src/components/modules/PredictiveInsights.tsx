
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Brain, Calendar, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { TrackingEvent, PredictionType, generatePredictions } from "@/utils/predictionUtils";

interface PredictiveInsightsProps {
  moduleName: string;
}

export function PredictiveInsights({ moduleName }: PredictiveInsightsProps) {
  const [predictions, setPredictions] = useState<PredictionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load tracking data from localStorage
    const loadPredictions = () => {
      setIsLoading(true);
      const savedEvents = localStorage.getItem(`farm-tracking-${moduleName}`);
      const events: TrackingEvent[] = savedEvents ? JSON.parse(savedEvents) : [];
      
      // Generate predictions based on past events
      const generatedPredictions = generatePredictions(events, moduleName);
      setPredictions(generatedPredictions);
      setIsLoading(false);
    };

    loadPredictions();
  }, [moduleName]);

  return (
    <Card className="farm-module-card">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Brain className="h-5 w-5 text-purple-500" />
          Predictive Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-pulse text-muted-foreground">Analyzing data...</div>
          </div>
        ) : predictions.length > 0 ? (
          <div className="space-y-5">
            {predictions.map((prediction, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{prediction.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {new Date(prediction.predictedDate).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs">
                          <TrendingUp className="h-3 w-3" />
                          <span>{prediction.confidence}% confidence</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Based on historical patterns and frequency</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                <Progress 
                  value={prediction.confidence} 
                  className="h-1.5" 
                  indicatorClassName={
                    prediction.confidence > 70 ? "bg-green-500" : 
                    prediction.confidence > 40 ? "bg-yellow-500" : "bg-orange-400"
                  }
                />
                
                <p className="text-sm text-muted-foreground mt-1">{prediction.description}</p>
                
                {prediction.basedOn.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-dashed border-muted">
                    <p className="text-xs text-muted-foreground mb-1">Based on:</p>
                    <ul className="text-xs space-y-1">
                      {prediction.basedOn.map((event, i) => (
                        <li key={i} className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground"></span>
                          <span>{event}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 my-2">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">Not enough data</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Add more past events to enable prediction capabilities. We need at least 2-3 similar events to identify patterns.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
