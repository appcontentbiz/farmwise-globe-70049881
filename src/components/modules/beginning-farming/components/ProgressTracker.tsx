
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ListChecks } from "lucide-react";
import { FarmingReadinessScore } from "./FarmingReadinessScore";

export function ProgressTracker() {
  return (
    <Card className="farm-module-card">
      <CardHeader className="pb-2">
        <CardTitle className="farm-module-card-title">
          <ListChecks className="h-5 w-5 text-farm-green" />
          Progress Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <FarmingReadinessScore />
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Planning & Research</span>
                <span className="font-medium text-farm-green">85%</span>
              </div>
              <div className="w-full bg-muted/20 rounded-full h-2">
                <div className="bg-farm-green h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Equipment & Infrastructure</span>
                <span className="font-medium text-farm-sky">60%</span>
              </div>
              <div className="w-full bg-muted/20 rounded-full h-2">
                <div className="bg-farm-sky h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Marketing & Sales</span>
                <span className="font-medium text-amber-500">45%</span>
              </div>
              <div className="w-full bg-muted/20 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Knowledge & Training</span>
                <span className="font-medium text-farm-wheat-dark">70%</span>
              </div>
              <div className="w-full bg-muted/20 rounded-full h-2">
                <div className="bg-farm-wheat-dark h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="mt-5 pt-4 border-t space-y-4">
            <h4 className="font-medium text-sm">Next Steps</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Check className="h-4 w-4 text-farm-green mt-0.5" />
                <div className="text-sm">Develop a comprehensive business plan</div>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-4 w-4 text-farm-green mt-0.5" />
                <div className="text-sm">Connect with local extension office for guidance</div>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-4 w-4 text-farm-green mt-0.5" />
                <div className="text-sm">Research USDA beginning farmer loans</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
