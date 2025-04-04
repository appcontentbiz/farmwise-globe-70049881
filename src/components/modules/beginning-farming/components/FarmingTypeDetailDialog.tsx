
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, LineChart, Sprout, Calendar, Download } from "lucide-react";

interface FarmingTypeDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  farmingType: {
    name: string;
    description: string;
  } | null;
  contentType?: 'general' | 'certification' | 'market' | 'transition';
}

export function FarmingTypeDetailDialog({ 
  open, 
  onOpenChange, 
  farmingType,
  contentType = 'general'
}: FarmingTypeDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {contentType === 'certification' && <Leaf className="h-5 w-5 text-farm-green" />}
            {contentType === 'market' && <LineChart className="h-5 w-5 text-farm-green" />}
            {contentType === 'transition' && <Sprout className="h-5 w-5 text-amber-500" />}
            {contentType === 'general' ? farmingType?.name : 
              contentType === 'certification' ? 'Organic Certification Details' :
              contentType === 'market' ? 'Market Analysis' : 'Transition Plan'}
          </DialogTitle>
        </DialogHeader>
        
        {contentType === 'general' && (
          <div className="space-y-4 py-4">
            <p>{farmingType?.description}</p>
            <p>
              Additional details about {farmingType?.name} will be available soon. 
              This will include detailed guides, best practices, equipment requirements, 
              and success stories from farmers using this approach.
            </p>
          </div>
        )}

        {contentType === 'certification' && (
          <div className="space-y-4 py-4">
            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <p className="text-muted-foreground">
                  USDA Organic certification verifies that your farming operation follows organic practices and meets all USDA organic regulations.
                </p>
                
                <div className="bg-muted/20 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Certification Status</h4>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-farm-green"></div>
                    <span>Active since 2020</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">Next renewal: April 2025</div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Button variant="outline" className="flex-1 gap-2">
                    <Download className="h-4 w-4" />
                    Download Certificate
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    <Calendar className="h-4 w-4" />
                    Schedule Inspection
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="requirements" className="space-y-4">
                <h4 className="font-medium">USDA Organic Requirements</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Land must be free from prohibited substances for 3+ years</li>
                  <li>Implementation of organic system plan</li>
                  <li>Separation of organic and non-organic crops</li>
                  <li>Use of approved substances only</li>
                  <li>No GMOs, ionizing radiation or sewage sludge</li>
                  <li>Annual on-site inspections</li>
                </ul>
                
                <div className="bg-amber-50 p-4 rounded-md border border-amber-200 mt-4">
                  <h4 className="font-medium text-amber-800 mb-2">Required Documentation</h4>
                  <ul className="text-sm text-amber-700 space-y-1.5">
                    <li>Field histories and maps</li>
                    <li>Input records (seeds, fertilizers, pest control)</li>
                    <li>Harvest and sales records</li>
                    <li>Buffer zone management plan</li>
                    <li>Soil and water test results</li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="timeline" className="space-y-4">
                <h4 className="font-medium">Certification Timeline</h4>
                <div className="relative">
                  <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-muted"></div>
                  
                  <div className="relative pl-10 pb-6">
                    <div className="absolute left-0 w-6 h-6 rounded-full bg-farm-green flex items-center justify-center text-white text-xs">1</div>
                    <h5 className="font-medium">Application Submission</h5>
                    <p className="text-sm text-muted-foreground">Submit application, Organic System Plan, and fees</p>
                  </div>
                  
                  <div className="relative pl-10 pb-6">
                    <div className="absolute left-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">2</div>
                    <h5 className="font-medium">Initial Review</h5>
                    <p className="text-sm text-muted-foreground">Certifying agent reviews application (1-2 months)</p>
                  </div>
                  
                  <div className="relative pl-10 pb-6">
                    <div className="absolute left-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">3</div>
                    <h5 className="font-medium">On-site Inspection</h5>
                    <p className="text-sm text-muted-foreground">Inspector visits farm to verify compliance</p>
                  </div>
                  
                  <div className="relative pl-10 pb-6">
                    <div className="absolute left-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">4</div>
                    <h5 className="font-medium">Final Review & Decision</h5>
                    <p className="text-sm text-muted-foreground">Certifying agent evaluates inspection report</p>
                  </div>
                  
                  <div className="relative pl-10">
                    <div className="absolute left-0 w-6 h-6 rounded-full bg-farm-green flex items-center justify-center text-white text-xs">5</div>
                    <h5 className="font-medium">Certification Issued</h5>
                    <p className="text-sm text-muted-foreground">Certificate issued if compliant (3-6 months total)</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
        
        {contentType === 'market' && (
          <div className="space-y-4 py-4">
            <p className="text-muted-foreground mb-4">
              Comprehensive analysis of market conditions, pricing trends, and consumer demand for organic products.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-muted/20 p-4 rounded-md">
                <h4 className="font-medium mb-2">Price Premium Analysis</h4>
                <div className="text-2xl font-bold text-farm-green">32% Average</div>
                <div className="text-sm text-muted-foreground mt-1">Price premium over conventional</div>
                <div className="mt-3 text-sm">
                  <div className="flex justify-between">
                    <span>Leafy Greens</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vegetables</span>
                    <span className="font-medium">28%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fruits</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Grains</span>
                    <span className="font-medium">22%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/20 p-4 rounded-md">
                <h4 className="font-medium mb-2">Market Growth</h4>
                <div className="text-2xl font-bold text-farm-green">9.7% Annual</div>
                <div className="text-sm text-muted-foreground mt-1">Growth rate in organic sector</div>
                <div className="w-full bg-muted h-2 rounded-full mt-3">
                  <div className="bg-farm-green h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="text-xs text-right mt-1">75% market penetration potential</div>
              </div>
            </div>
            
            <div className="bg-muted/20 p-4 rounded-md mb-4">
              <h4 className="font-medium mb-2">Consumer Demographics</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Millennials (25-40)</span>
                    <span className="font-medium">38%</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full mt-1">
                    <div className="bg-farm-green h-2 rounded-full" style={{ width: '38%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Gen X (41-56)</span>
                    <span className="font-medium">29%</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full mt-1">
                    <div className="bg-farm-green h-2 rounded-full" style={{ width: '29%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Baby Boomers (57-75)</span>
                    <span className="font-medium">21%</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full mt-1">
                    <div className="bg-farm-green h-2 rounded-full" style={{ width: '21%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Gen Z (18-24)</span>
                    <span className="font-medium">12%</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full mt-1">
                    <div className="bg-farm-green h-2 rounded-full" style={{ width: '12%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-farm-green/10 p-4 rounded-md">
              <h4 className="font-medium mb-2">Marketing Recommendations</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-farm-green flex items-center justify-center text-white text-xs mt-0.5">1</div>
                  <span>Focus on direct-to-consumer sales channels for highest margins</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-farm-green flex items-center justify-center text-white text-xs mt-0.5">2</div>
                  <span>Invest in digital marketing to reach millennial demographic</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-farm-green flex items-center justify-center text-white text-xs mt-0.5">3</div>
                  <span>Highlight health and environmental benefits in product messaging</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-farm-green flex items-center justify-center text-white text-xs mt-0.5">4</div>
                  <span>Consider value-added products to increase revenue per acre</span>
                </li>
              </ul>
            </div>
          </div>
        )}
        
        {contentType === 'transition' && (
          <div className="space-y-4 py-4">
            <p className="text-muted-foreground mb-4">
              Detailed transition plan for converting conventional fields to organic production, including timeline and resource requirements.
            </p>
            
            <div className="bg-amber-50 p-4 rounded-md border border-amber-200 mb-4">
              <h4 className="font-medium text-amber-800 mb-2">Transition Status</h4>
              <div className="flex items-center gap-2 mb-1">
                <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                <span className="font-medium">In Progress</span>
              </div>
              <p className="text-sm text-amber-700">
                2 fields (15 acres) currently in transition period. Expected completion June 2025.
              </p>
            </div>
            
            <h4 className="font-medium">Transition Timeline</h4>
            <div className="space-y-4">
              <div className="bg-muted/20 p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-medium">Phase 1: Pre-transition Planning</h5>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Complete</span>
                </div>
                <ul className="text-sm space-y-1.5">
                  <li className="flex items-start gap-1.5">
                    <span className="text-green-600">✓</span>
                    <span>Soil testing and analysis</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-green-600">✓</span>
                    <span>Selection of transition fields</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-green-600">✓</span>
                    <span>Documentation of field history</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-green-600">✓</span>
                    <span>Buffer zone establishment</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-muted/20 p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-medium">Phase 2: Active Transition (Year 1)</h5>
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">In Progress</span>
                </div>
                <ul className="text-sm space-y-1.5">
                  <li className="flex items-start gap-1.5">
                    <span className="text-green-600">✓</span>
                    <span>Implementation of organic practices</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-green-600">✓</span>
                    <span>Cover cropping and green manures</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-600">→</span>
                    <span>Natural pest management integration</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-muted-foreground">○</span>
                    <span>First inspection (scheduled for August 2024)</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-muted/20 p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-medium">Phase 3: Continued Transition (Years 2-3)</h5>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Upcoming</span>
                </div>
                <ul className="text-sm space-y-1.5">
                  <li>Soil building and fertility management</li>
                  <li>Crop rotation implementation</li>
                  <li>Documentation maintenance</li>
                  <li>Annual inspections</li>
                </ul>
              </div>
              
              <div className="bg-muted/20 p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-medium">Phase 4: Certification (Year 3)</h5>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">June 2025</span>
                </div>
                <ul className="text-sm space-y-1.5">
                  <li>Final inspection</li>
                  <li>Certification application</li>
                  <li>Organic labeling implementation</li>
                  <li>Market transition planning</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-farm-green/10 p-4 rounded-md mt-4">
              <h4 className="font-medium mb-2">Resource Requirements</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium mb-1">Equipment Needs</h5>
                  <ul className="text-sm space-y-1">
                    <li>Mechanical weeders</li>
                    <li>Compost spreader</li>
                    <li>Cover crop seeders</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium mb-1">Materials Needed</h5>
                  <ul className="text-sm space-y-1">
                    <li>Approved fertilizers</li>
                    <li>Organic seeds</li>
                    <li>Natural pest controls</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
