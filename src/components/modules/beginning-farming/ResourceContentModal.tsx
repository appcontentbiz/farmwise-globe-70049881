
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Download, CheckCircle, ClipboardList, LineChart, FileText, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FarmFinancialCalculator } from "./FarmFinancialCalculator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ResourceContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    title: string;
    type: string;
  };
}

export function ResourceContentModal({ isOpen, onClose, content }: ResourceContentModalProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("overview");

  const handleDownload = (resourceName: string) => {
    toast({
      title: "Download Started",
      description: `${resourceName} will be downloaded shortly.`,
    });
    
    // Simulate a download after a short delay
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `${resourceName} has been downloaded successfully.`,
      });
    }, 1500);
  };

  const handleSave = (type: string) => {
    toast({
      title: "Progress Saved",
      description: `Your ${type} has been saved successfully.`,
    });
  };

  const getModalContent = () => {
    switch (content.type) {
      case "vision":
        return (
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="worksheet">Worksheet</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="space-y-4">
                <p>A Farm Vision Worksheet helps you define your farming values, mission, and long-term vision. This provides a foundation for all your farming decisions.</p>
                
                <h3 className="text-lg font-medium">Why Create a Farm Vision?</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Clarifies your purpose and farming values</li>
                  <li>Guides decision-making for your farm business</li>
                  <li>Helps communicate your farm's identity to customers</li>
                  <li>Provides direction when faced with opportunities or challenges</li>
                </ul>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("worksheet")}>
                    Continue to Worksheet
                  </Button>
                  <Button onClick={() => handleDownload("Farm Vision Worksheet.pdf")}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="worksheet">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Personal Values & Motivations</h3>
                  <p className="text-sm text-muted-foreground">What values are most important to you as a farmer? Why did you choose farming?</p>
                  <textarea 
                    className="w-full h-24 p-3 border rounded-md" 
                    placeholder="Write your personal values and motivations here..."
                  ></textarea>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Farm Mission Statement</h3>
                  <p className="text-sm text-muted-foreground">A concise statement that describes your farm's purpose and core goals (1-2 sentences)</p>
                  <textarea 
                    className="w-full h-24 p-3 border rounded-md" 
                    placeholder="Write your farm mission statement here..."
                  ></textarea>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Long-term Vision (5-10 years)</h3>
                  <p className="text-sm text-muted-foreground">Describe what you want your farm to become in the future</p>
                  <textarea 
                    className="w-full h-24 p-3 border rounded-md" 
                    placeholder="Write your long-term vision here..."
                  ></textarea>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("examples")}>
                    View Examples
                  </Button>
                  <Button onClick={() => handleSave("farm vision")}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Save Vision
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="examples">
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium">Example: Community Supported Farm</h3>
                    <div className="mt-3 space-y-3">
                      <div>
                        <p className="text-sm font-medium">Values & Motivations:</p>
                        <p className="text-sm mt-1">We value sustainable agriculture, community connection, and food security. We farm because we believe everyone deserves access to healthy, locally-grown food.</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Mission Statement:</p>
                        <p className="text-sm mt-1">Green Valley Farm produces nutritious, sustainably-grown vegetables while building community relationships and caring for the land that sustains us all.</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Long-term Vision:</p>
                        <p className="text-sm mt-1">By 2030, Green Valley Farm will be a thriving 15-acre vegetable operation serving 200 CSA members, supplying three farmers markets, and offering educational programs for the community. We'll utilize regenerative practices, powered by renewable energy, and employ four year-round staff members.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium">Example: Heritage Livestock Farm</h3>
                    <div className="mt-3 space-y-3">
                      <div>
                        <p className="text-sm font-medium">Values & Motivations:</p>
                        <p className="text-sm mt-1">We value animal welfare, genetic diversity, and traditional farming methods. We farm to preserve heritage breeds and produce exceptional meat and dairy products.</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Mission Statement:</p>
                        <p className="text-sm mt-1">Oak Hill Farm raises heritage livestock breeds with respect and care to produce high-quality meat and dairy products while preserving genetic diversity for future generations.</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Long-term Vision:</p>
                        <p className="text-sm mt-1">Within 10 years, Oak Hill Farm will be a recognized breeder of heritage livestock with direct sales to restaurants and conscious consumers. We'll maintain breeding programs for three endangered livestock breeds, host on-farm events and tours, and operate a small farm store featuring our products and those of neighboring farms.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("worksheet")}>
                    Return to Worksheet
                  </Button>
                  <Button onClick={() => handleDownload("Farm Vision Examples.pdf")}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Examples
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        );
      
      case "goals":
        return (
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="template">Template</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="space-y-4">
                <p>Setting SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) helps you create a clear roadmap for your farming success.</p>
                
                <h3 className="text-lg font-medium">Types of Farm Goals</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><span className="font-medium">Production Goals:</span> Crop yields, livestock growth, product quality</li>
                  <li><span className="font-medium">Financial Goals:</span> Revenue targets, profit margins, debt reduction</li>
                  <li><span className="font-medium">Land & Infrastructure:</span> Soil improvement, equipment acquisition, building projects</li>
                  <li><span className="font-medium">Marketing & Sales:</span> Customer acquisition, market expansion, branding</li>
                  <li><span className="font-medium">Personal & Lifestyle:</span> Work hours, skill development, family time</li>
                </ul>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("template")}>
                    Continue to Template
                  </Button>
                  <Button onClick={() => handleDownload("Farm Goals Template.pdf")}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="template">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Short-term Goals (1 year)</h3>
                  
                  <div className="border p-3 rounded-md space-y-3">
                    <div>
                      <label className="text-sm font-medium">Goal Description:</label>
                      <input type="text" className="w-full mt-1 p-2 border rounded-md" placeholder="What do you want to accomplish?" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium">Specific Measures:</label>
                        <input type="text" className="w-full mt-1 p-2 border rounded-md" placeholder="How will you measure success?" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Timeline:</label>
                        <input type="text" className="w-full mt-1 p-2 border rounded-md" placeholder="By when?" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Actions Needed:</label>
                      <textarea className="w-full mt-1 p-2 border rounded-md h-20" placeholder="What steps will you take?"></textarea>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Resources Required:</label>
                      <input type="text" className="w-full mt-1 p-2 border rounded-md" placeholder="What do you need to accomplish this?" />
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="mt-2">
                    <ClipboardList className="h-4 w-4 mr-2" />
                    Add Another Short-term Goal
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Medium-term Goals (1-3 years)</h3>
                  
                  <div className="border p-3 rounded-md space-y-3">
                    <div>
                      <label className="text-sm font-medium">Goal Description:</label>
                      <input type="text" className="w-full mt-1 p-2 border rounded-md" placeholder="What do you want to accomplish?" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium">Specific Measures:</label>
                        <input type="text" className="w-full mt-1 p-2 border rounded-md" placeholder="How will you measure success?" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Timeline:</label>
                        <input type="text" className="w-full mt-1 p-2 border rounded-md" placeholder="By when?" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Actions Needed:</label>
                      <textarea className="w-full mt-1 p-2 border rounded-md h-20" placeholder="What steps will you take?"></textarea>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="mt-2">
                    <ClipboardList className="h-4 w-4 mr-2" />
                    Add Another Medium-term Goal
                  </Button>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("examples")}>
                    View Examples
                  </Button>
                  <Button onClick={() => handleSave("farm goals")}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Save Goals
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="examples">
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium">Example: Market Garden Farm</h3>
                    
                    <div className="mt-3">
                      <p className="text-sm font-medium">Short-term Goal (1 year):</p>
                      <div className="mt-2 pl-4 border-l-2 border-farm-green">
                        <p className="text-sm"><span className="font-medium">Description:</span> Establish direct sales at two farmers markets</p>
                        <p className="text-sm"><span className="font-medium">Specific Measures:</span> Generate $1,000 weekly revenue from farmers markets by August</p>
                        <p className="text-sm"><span className="font-medium">Timeline:</span> Apply by March, begin markets in May</p>
                        <p className="text-sm"><span className="font-medium">Actions:</span> Apply to markets, create display materials, develop product mix, set pricing strategy</p>
                        <p className="text-sm"><span className="font-medium">Resources:</span> Market fees ($500), tent and tables ($800), signage and branding ($400)</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-sm font-medium">Medium-term Goal (2 years):</p>
                      <div className="mt-2 pl-4 border-l-2 border-farm-green">
                        <p className="text-sm"><span className="font-medium">Description:</span> Add season extension infrastructure to extend growing season</p>
                        <p className="text-sm"><span className="font-medium">Specific Measures:</span> Install 2 high tunnels (30'x96') to produce crops 10 months of the year</p>
                        <p className="text-sm"><span className="font-medium">Timeline:</span> Research and apply for NRCS funding by fall Year 1, install by spring Year 2</p>
                        <p className="text-sm"><span className="font-medium">Actions:</span> Research designs, apply for NRCS funding, prepare site, contract installation</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium">Example: Livestock Farm</h3>
                    
                    <div className="mt-3">
                      <p className="text-sm font-medium">Short-term Goal (1 year):</p>
                      <div className="mt-2 pl-4 border-l-2 border-farm-green">
                        <p className="text-sm"><span className="font-medium">Description:</span> Implement rotational grazing system</p>
                        <p className="text-sm"><span className="font-medium">Specific Measures:</span> Convert 20 acres to managed rotational grazing with 10 paddocks</p>
                        <p className="text-sm"><span className="font-medium">Timeline:</span> Complete by June before summer grazing season</p>
                        <p className="text-sm"><span className="font-medium">Actions:</span> Design paddock layout, install fencing and water systems, develop rotation schedule</p>
                        <p className="text-sm"><span className="font-medium">Resources:</span> Fencing materials ($3,000), water system ($1,500), labor (40 hours)</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-sm font-medium">Medium-term Goal (3 years):</p>
                      <div className="mt-2 pl-4 border-l-2 border-farm-green">
                        <p className="text-sm"><span className="font-medium">Description:</span> Develop direct marketing program for grass-finished beef</p>
                        <p className="text-sm"><span className="font-medium">Specific Measures:</span> Sell 10 grass-finished steers direct to consumer as quarter, half, and whole animals</p>
                        <p className="text-sm"><span className="font-medium">Timeline:</span> Build customer list Year 1-2, full direct marketing program by Year 3</p>
                        <p className="text-sm"><span className="font-medium">Actions:</span> Establish relationships with processors, develop pricing structure, create marketing materials</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("template")}>
                    Return to Template
                  </Button>
                  <Button onClick={() => handleDownload("Farm Goal Examples.pdf")}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Examples
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        );
      
      case "inventory":
        return (
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="land">Land & Natural Resources</TabsTrigger>
              <TabsTrigger value="equipment">Equipment & Infrastructure</TabsTrigger>
              <TabsTrigger value="financial">Financial Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="space-y-4">
                <p>A resource inventory helps you identify what assets you have available and what you'll need to acquire to start your farming operation.</p>
                
                <h3 className="text-lg font-medium">Why Create a Resource Inventory?</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Assess what resources you already have access to</li>
                  <li>Identify resource gaps that need to be addressed</li>
                  <li>Prioritize resource acquisition based on your farm plan</li>
                  <li>Create a realistic startup budget and timeline</li>
                </ul>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("land")}>
                    Start Inventory
                  </Button>
                  <Button onClick={() => handleDownload("Resource Inventory Template.xlsx")}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="land">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Land Resources</h3>
                  
                  <div className="border p-3 rounded-md space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium">Total Acreage:</label>
                        <input type="text" className="w-full mt-1 p-2 border rounded-md" placeholder="Number of acres" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Ownership Status:</label>
                        <select className="w-full mt-1 p-2 border rounded-md">
                          <option value="">Select status</option>
                          <option value="own">Own</option>
                          <option value="lease">Lease</option>
                          <option value="seeking">Seeking land</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Current Land Use:</label>
                      <textarea className="w-full mt-1 p-2 border rounded-md h-20" placeholder="Describe the current condition and uses of the land"></textarea>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium">Soil Type:</label>
                        <input type="text" className="w-full mt-1 p-2 border rounded-md" placeholder="Main soil types" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Water Sources:</label>
                        <input type="text" className="w-full mt-1 p-2 border rounded-md" placeholder="Wells, ponds, streams, etc." />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Natural Resources & Features</h3>
                  
                  <div className="border p-3 rounded-md space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium">Topography:</label>
                        <select className="w-full mt-1 p-2 border rounded-md">
                          <option value="">Select primary topography</option>
                          <option value="flat">Mostly flat</option>
                          <option value="rolling">Gently rolling</option>
                          <option value="hilly">Hilly</option>
                          <option value="mixed">Mixed terrain</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Drainage:</label>
                        <select className="w-full mt-1 p-2 border rounded-md">
                          <option value="">Select drainage quality</option>
                          <option value="excellent">Excellent</option>
                          <option value="good">Good</option>
                          <option value="fair">Fair</option>
                          <option value="poor">Poor</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Existing Natural Features:</label>
                      <textarea className="w-full mt-1 p-2 border rounded-md h-20" placeholder="Woodlots, streams, ponds, wetlands, etc."></textarea>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Wildlife Considerations:</label>
                      <textarea className="w-full mt-1 p-2 border rounded-md h-20" placeholder="Beneficial or problematic wildlife present"></textarea>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("equipment")}>
                    Next: Equipment
                  </Button>
                  <Button onClick={() => handleSave("land inventory")}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Save Land Inventory
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="equipment">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Buildings & Infrastructure</h3>
                  
                  <div className="border p-3 rounded-md space-y-3">
                    <div>
                      <label className="text-sm font-medium">Existing Buildings:</label>
                      <textarea className="w-full mt-1 p-2 border rounded-md h-20" placeholder="Barns, sheds, greenhouses, etc. Include sizes and conditions"></textarea>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium">Housing:</label>
                        <input type="text" className="w-full mt-1 p-2 border rounded-md" placeholder="Describe available housing" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Storage Facilities:</label>
                        <input type="text" className="w-full mt-1 p-2 border rounded-md" placeholder="Storage for equipment, products, etc." />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium">Utilities:</label>
                        <input type="text" className="w-full mt-1 p-2 border rounded-md" placeholder="Electricity, water, etc." />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Fencing:</label>
                        <input type="text" className="w-full mt-1 p-2 border rounded-md" placeholder="Existing fencing and condition" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Equipment & Tools</h3>
                  
                  <div className="border p-3 rounded-md space-y-3">
                    <div>
                      <label className="text-sm font-medium">Major Equipment Owned:</label>
                      <textarea className="w-full mt-1 p-2 border rounded-md h-20" placeholder="Tractors, implements, vehicles, etc."></textarea>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Hand Tools & Small Equipment:</label>
                      <textarea className="w-full mt-1 p-2 border rounded-md h-20" placeholder="Hand tools, small machinery, etc."></textarea>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Equipment Needed to Acquire:</label>
                      <textarea className="w-full mt-1 p-2 border rounded-md h-20" placeholder="Equipment you'll need to purchase or rent"></textarea>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("financial")}>
                    Next: Financial Resources
                  </Button>
                  <Button onClick={() => handleSave("equipment inventory")}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Save Equipment Inventory
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="financial">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Financial Resources</h3>
                  
                  <div className="border p-3 rounded-md space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium">Available Startup Capital:</label>
                        <input type="text" className="w-full mt-1 p-2 border rounded-md" placeholder="Amount available to invest" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Monthly Farm Budget:</label>
                        <input type="text" className="w-full mt-1 p-2 border rounded-md" placeholder="Expected monthly expenses" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Other Income Sources:</label>
                      <textarea className="w-full mt-1 p-2 border rounded-md h-20" placeholder="Off-farm income or other revenue streams"></textarea>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Potential Funding Sources:</label>
                      <textarea className="w-full mt-1 p-2 border rounded-md h-20" placeholder="Grants, loans, investors, etc. you plan to pursue"></textarea>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Human Resources</h3>
                  
                  <div className="border p-3 rounded-md space-y-3">
                    <div>
                      <label className="text-sm font-medium">Available Labor:</label>
                      <textarea className="w-full mt-1 p-2 border rounded-md h-20" placeholder="Family members, partners, employees available to work"></textarea>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Skills & Experience:</label>
                      <textarea className="w-full mt-1 p-2 border rounded-md h-20" placeholder="Relevant skills and experience of the farm team"></textarea>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Training Needs:</label>
                      <textarea className="w-full mt-1 p-2 border rounded-md h-20" placeholder="Skills you need to develop or training required"></textarea>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("overview")}>
                    Back to Overview
                  </Button>
                  <Button onClick={() => handleSave("complete resource inventory")}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Save Complete Inventory
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        );
      
      case "market":
        return (
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="research">Market Research</TabsTrigger>
              <TabsTrigger value="channels">Marketing Channels</TabsTrigger>
              <TabsTrigger value="analysis">Competition Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="space-y-4">
                <p>Market research is essential for beginning farmers to identify viable markets, understand customer needs, and develop effective pricing and distribution strategies.</p>
                
                <h3 className="text-lg font-medium">Why Conduct Market Research?</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Identify profitable crops/products to grow</li>
                  <li>Understand local market demand and pricing</li>
                  <li>Assess competition and find market gaps</li>
                  <li>Select appropriate marketing channels</li>
                  <li>Develop informed marketing strategies</li>
                </ul>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("research")}>
                    Start Research
                  </Button>
                  <Button onClick={() => handleDownload("Market Research Guide.pdf")}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Guide
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="research">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Market Demographics</h3>
                  
                  <div className="border p-3 rounded-md space-y-3">
                    <div>
                      <label className="text-sm font-medium">Primary Market Area:</label>
                      <textarea className="w-full mt-1 p-2 border rounded-md h-20" placeholder="Geographic area you plan to serve (cities, counties, radius from farm)"></textarea>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Target Customer Profile:</label>
                      <textarea className="w-full mt-1 p-2 border rounded-md h-20" placeholder="Describe your ideal customers (age, income, values, shopping habits)"></textarea>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Population Data:</label>
                      <textarea className="w-full mt-1 p-2 border rounded-md h-20" placeholder="Population size, growth trends, income levels in your market area"></textarea>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("channels")}>
                    Next: Marketing Channels
                  </Button>
                  <Button onClick={() => handleSave("market research")}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Save Research
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="channels">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Marketing Channel Assessment</h3>
                  
                  <div className="border p-3 rounded-md space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-3 bg-gray-50 rounded-md">
                        <div className="flex items-start">
                          <input type="checkbox" className="mt-1 mr-2" />
                          <div>
                            <label className="text-sm font-medium">Farmers Markets</label>
                            <p className="text-xs text-muted-foreground mt-1">Local markets where farmers sell directly to consumers</p>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <div>
                                <label className="text-xs font-medium">Potential Markets:</label>
                                <input type="text" className="w-full mt-1 p-1.5 text-sm border rounded-md" placeholder="List potential markets" />
                              </div>
                              <div>
                                <label className="text-xs font-medium">Market Days/Hours:</label>
                                <input type="text" className="w-full mt-1 p-1.5 text-sm border rounded-md" placeholder="Days and times" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-gray-50 rounded-md">
                        <div className="flex items-start">
                          <input type="checkbox" className="mt-1 mr-2" />
                          <div>
                            <label className="text-sm font-medium">Community Supported Agriculture (CSA)</label>
                            <p className="text-xs text-muted-foreground mt-1">Subscription service where members receive regular shares of produce</p>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <div>
                                <label className="text-xs font-medium">Target Members:</label>
                                <input type="text" className="w-full mt-1 p-1.5 text-sm border rounded-md" placeholder="Number of members" />
                              </div>
                              <div>
                                <label className="text-xs font-medium">Share Price:</label>
                                <input type="text" className="w-full mt-1 p-1.5 text-sm border rounded-md" placeholder="Estimated share price" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-gray-50 rounded-md">
                        <div className="flex items-start">
                          <input type="checkbox" className="mt-1 mr-2" />
                          <div>
                            <label className="text-sm font-medium">Restaurants & Food Service</label>
                            <p className="text-xs text-muted-foreground mt-1">Selling directly to restaurants, cafes, caterers, etc.</p>
                            <div className="mt-2">
                              <label className="text-xs font-medium">Potential Restaurants:</label>
                              <textarea className="w-full mt-1 p-1.5 text-sm border rounded-md h-10" placeholder="List potential restaurant clients"></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-gray-50 rounded-md">
                        <div className="flex items-start">
                          <input type="checkbox" className="mt-1 mr-2" />
                          <div>
                            <label className="text-sm font-medium">Wholesale & Retail</label>
                            <p className="text-xs text-muted-foreground mt-1">Selling to grocery stores, co-ops, food hubs, distributors</p>
                            <div className="mt-2">
                              <label className="text-xs font-medium">Potential Buyers:</label>
                              <textarea className="w-full mt-1 p-1.5 text-sm border rounded-md h-10" placeholder="List potential wholesale clients"></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("analysis")}>
                    Next: Competition Analysis
                  </Button>
                  <Button onClick={() => handleSave("marketing channels")}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Save Channel Analysis
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="analysis">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Competitor Analysis</h3>
                  
                  <div className="border p-3 rounded-md space-y-3">
                    <div>
                      <label className="text-sm font-medium">Local Competitors:</label>
                      <textarea className="w-full mt-1 p-2 border rounded-md h-20" placeholder="List other farms and businesses selling similar products in your area"></textarea>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Competitor Products & Pricing:</label>
                      <textarea className="w-full mt-1 p-2 border rounded-md h-20" placeholder="Products offered by competitors and their price points"></textarea>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Market Gaps/Opportunities:</label>
                      <textarea className="w-full mt-1 p-2 border rounded-md h-20" placeholder="Identify underserved markets or products not currently available"></textarea>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Your Competitive Advantage:</label>
                      <textarea className="w-full mt-1 p-2 border rounded-md h-20" placeholder="What will make your farm/products unique or better than competitors?"></textarea>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("overview")}>
                    Back to Overview
                  </Button>
                  <Button onClick={() => handleSave("complete market analysis")}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Save Complete Analysis
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        );
      
      case "business":
        return (
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="template">Business Plan Template</TabsTrigger>
              <TabsTrigger value="outline">Plan Outline</TabsTrigger>
              <TabsTrigger value="examples">Sample Plans</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="space-y-4">
                <p>A well-developed business plan is crucial for beginning farmers. It serves as a roadmap for your farm business and is essential when seeking financing or partnerships.</p>
                
                <h3 className="text-lg font-medium">Why Create a Business Plan?</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Clarifies your farm business concept and strategy</li>
                  <li>Required by lenders and grant programs</li>
                  <li>Identifies potential challenges before they arise</li>
                  <li>Provides measurable goals and benchmarks</li>
                  <li>Forces you to think through all aspects of your farm business</li>
                </ul>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("template")}>
                    View Template
                  </Button>
                  <Button onClick={() => handleDownload("Farm Business Plan Template.docx")}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="template">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Farm Business Plan Template</h3>
                  
                  <div className="border p-3 rounded-md">
                    <p className="text-sm">This template provides a comprehensive structure for your farm business plan. Download the complete template or explore each section using the outline tab.</p>
                    
                    <div className="mt-4 space-y-4">
                      <div className="p-3 bg-gray-50 rounded-md">
                        <h4 className="font-medium">1. Executive Summary</h4>
                        <p className="text-xs text-muted-foreground mt-1">Brief overview of your farm business, mission, products, and financial highlights</p>
                      </div>
                      
                      <div className="p-3 bg-gray-50 rounded-md">
                        <h4 className="font-medium">2. Business Description</h4>
                        <p className="text-xs text-muted-foreground mt-1">Detailed description of your farm, legal structure, location, and history</p>
                      </div>
                      
                      <div className="p-3 bg-gray-50 rounded-md">
                        <h4 className="font-medium">3. Products & Services</h4>
                        <p className="text-xs text-muted-foreground mt-1">Description of what you'll produce, production methods, and unique qualities</p>
                      </div>
                      
                      <div className="p-3 bg-gray-50 rounded-md">
                        <h4 className="font-medium">4. Market Analysis</h4>
                        <p className="text-xs text-muted-foreground mt-1">Industry trends, target market, competition, and marketing strategy</p>
                      </div>
                      
                      <div className="p-3 bg-gray-50 rounded-md">
                        <h4 className="font-medium">5. Operations Plan</h4>
                        <p className="text-xs text-muted-foreground mt-1">Production methods, facilities, equipment, supplies, and labor</p>
                      </div>
                      
                      <div className="p-3 bg-gray-50 rounded-md">
                        <h4 className="font-medium">6. Management & Organization</h4>
                        <p className="text-xs text-muted-foreground mt-1">Management team, advisors, organizational structure, and personnel plan</p>
                      </div>
                      
                      <div className="p-3 bg-gray-50 rounded-md">
                        <h4 className="font-medium">7. Financial Plan</h4>
                        <p className="text-xs text-muted-foreground mt-1">Startup costs, operating budget, cash flow projections, break-even analysis</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("outline")}>
                    View Full Outline
                  </Button>
                  <Button onClick={() => handleDownload("Farm Business Plan Template.docx")}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="outline">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Detailed Business Plan Outline</h3>
                  
                  <div className="border p-3 rounded-md space-y-4">
                    <div>
                      <h4 className="font-medium">1. Executive Summary</h4>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li className="text-sm">Business name and ownership</li>
                        <li className="text-sm">Mission statement</li>
                        <li className="text-sm">Brief description of products/services</li>
                        <li className="text-sm">Overview of market opportunity</li>
                        <li className="text-sm">Financial highlights and funding needs</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">2. Business Description</h4>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li className="text-sm">Farm history or startup story</li>
                        <li className="text-sm">Legal structure (sole proprietorship, LLC, etc.)</li>
                        <li className="text-sm">Farm location and facilities</li>
                        <li className="text-sm">Short and long-term goals</li>
                        <li className="text-sm">Vision for the future</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">3. Products & Services</h4>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li className="text-sm">Detailed description of products/services</li>
                        <li className="text-sm">Production methods and practices</li>
                        <li className="text-sm">Unique selling points or differentiators</li>
                        <li className="text-sm">Certifications or special standards</li>
                        <li className="text-sm">Future product development plans</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">4. Market Analysis</h4>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li className="text-sm">Industry overview and trends</li>
                        <li className="text-sm">Target market demographics</li>
                        <li className="text-sm">Competitive analysis</li>
                        <li className="text-sm">Marketing strategy and channels</li>
                        <li className="text-sm">Pricing strategy</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">5. Operations Plan</h4>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li className="text-sm">Production methods and schedule</li>
                        <li className="text-sm">Facilities and equipment</li>
                        <li className="text-sm">Supply chain and input sourcing</li>
                        <li className="text-sm">Quality control processes</li>
                        <li className="text-sm">Regulatory compliance</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">6. Management & Organization</h4>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li className="text-sm">Owner/management team qualifications</li>
                        <li className="text-sm">Personnel plan and labor requirements</li>
                        <li className="text-sm">Advisory team (mentors, consultants, etc.)</li>
                        <li className="text-sm">Professional services (accountant, lawyer, etc.)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">7. Financial Plan</h4>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li className="text-sm">Startup costs and funding sources</li>
                        <li className="text-sm">Sales forecasts (3-5 years)</li>
                        <li className="text-sm">Profit and loss projections</li>
                        <li className="text-sm">Cash flow analysis</li>
                        <li className="text-sm">Break-even analysis</li>
                        <li className="text-sm">Financial assumptions</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Appendices</h4>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li className="text-sm">Detailed financial projections</li>
                        <li className="text-sm">Owner resumes</li>
                        <li className="text-sm">Farm maps and layouts</li>
                        <li className="text-sm">Equipment lists</li>
                        <li className="text-sm">Supporting market research</li>
                        <li className="text-sm">Letters of support or intent</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("examples")}>
                    View Sample Plans
                  </Button>
                  <Button onClick={() => handleDownload("Farm Business Plan Detailed Outline.pdf")}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Outline
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="examples">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Sample Business Plans</h3>
                  
                  <div className="border p-3 rounded-md space-y-4">
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">Market Garden Farm Plan</h4>
                          <p className="text-xs text-muted-foreground mt-1">5-acre diversified vegetable farm with direct-to-consumer sales</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => handleDownload("Sample Market Garden Business Plan.pdf")}>
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">Small Livestock Operation</h4>
                          <p className="text-xs text-muted-foreground mt-1">Pastured pork and poultry farm with diversified marketing channels</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => handleDownload("Sample Livestock Business Plan.pdf")}>
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">Value-Added Dairy</h4>
                          <p className="text-xs text-muted-foreground mt-1">Goat dairy with cheese and soap production</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => handleDownload("Sample Dairy Business Plan.pdf")}>
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">Specialty Crop Farm</h4>
                          <p className="text-xs text-muted-foreground mt-1">Organic medicinal herb production with value-added products</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => handleDownload("Sample Specialty Crop Business Plan.pdf")}>
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Business Plan Resources</h3>
                  
                  <div className="border p-3 rounded-md space-y-3">
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">AgPlan (University of Minnesota)</h4>
                          <p className="text-xs text-muted-foreground mt-1">Free online business plan creator with agricultural focus</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => window.open("https://agplan.umn.edu", "_blank")}>
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Visit
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">Building a Sustainable Business (SARE)</h4>
                          <p className="text-xs text-muted-foreground mt-1">Comprehensive guide to farm business planning</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => window.open("https://www.sare.org/resources/building-a-sustainable-business/", "_blank")}>
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Visit
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">Farm Business Planning Workshops</h4>
                          <p className="text-xs text-muted-foreground mt-1">Find local workshops through Extension offices</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => handleResourceClick("training")}>
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Find Workshops
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("overview")}>
                    Back to Overview
                  </Button>
                  <Button onClick={() => handleDownload("Complete Business Plan Package.zip")}>
                    <Download className="h-4 w-4 mr-2" />
                    Download All Resources
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        );

      case "calculator":
        return <FarmFinancialCalculator />;
      
      case "training":
        return (
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">Online Courses</TabsTrigger>
              <TabsTrigger value="workshops">Workshops & Trainings</TabsTrigger>
              <TabsTrigger value="resources">Free Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="space-y-4">
                <p>Building your knowledge and skills is an essential part of successful farming. This guide helps you find high-quality educational resources for beginning farmers.</p>
                
                <h3 className="text-lg font-medium">Training Categories</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                  <Card className="border">
                    <CardContent className="p-4">
                      <h4 className="font-medium flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-farm-green" />
                        Production Skills
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">Crop/livestock production, soil health, pest management</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border">
                    <CardContent className="p-4">
                      <h4 className="font-medium flex items-center">
                        <Calculator className="h-4 w-4 mr-2 text-farm-green" />
                        Business Management
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">Finances, marketing, legal considerations, planning</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border">
                    <CardContent className="p-4">
                      <h4 className="font-medium flex items-center">
                        <LineChart className="h-4 w-4 mr-2 text-farm-green" />
                        Marketing & Sales
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">Building markets, customer relationships, branding</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border">
                    <CardContent className="p-4">
                      <h4 className="font-medium flex items-center">
                        <Users className="h-4 w-4 mr-2 text-farm-green" />
                        Farm Labor & Management
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">Hiring, training, and managing farm workers</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("courses")}>
                    Explore Online Courses
                  </Button>
                  <Button onClick={() => handleDownload("Training Resources Guide.pdf")}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Guide
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="courses">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Featured Online Courses</h3>
                  
                  <div className="border p-3 rounded-md space-y-4">
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">Beginning Farmer and Rancher Course</h4>
                          <p className="text-xs text-muted-foreground mt-1">Cornell Small Farms Program - Comprehensive training for new farmers</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">Self-paced</Badge>
                            <Badge variant="outline" className="text-xs">$200-$300</Badge>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => window.open("https://smallfarms.cornell.edu/online-courses/", "_blank")}>
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Visit
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">Farm Business Course</h4>
                          <p className="text-xs text-muted-foreground mt-1">New Entry Sustainable Farming Project - Business planning for small-scale farming</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">Instructor-led</Badge>
                            <Badge variant="outline" className="text-xs">$150-$400</Badge>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => window.open("https://nesfp.org/farmer-training/farm-business-training", "_blank")}>
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Visit
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">Organic Farming Certificate Program</h4>
                          <p className="text-xs text-muted-foreground mt-1">Michigan State University - Comprehensive training in organic farming methods</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">9-month program</Badge>
                            <Badge variant="outline" className="text-xs">$2,000+</Badge>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => window.open("https://www.canr.msu.edu/organicfarmingcertificate/", "_blank")}>
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Visit
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">Livestock Production Courses</h4>
                          <p className="text-xs text-muted-foreground mt-1">Extension Foundation - Species-specific livestock production training</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">Self-paced</Badge>
                            <Badge variant="outline" className="text-xs">Free-$50</Badge>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => window.open("https://extension.org/", "_blank")}>
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Visit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("workshops")}>
                    View Workshops
                  </Button>
                  <Button variant="outline" onClick={() => handleDownload("Online Course Catalog.pdf")}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Course Guide
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="workshops">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-medium">In-Person Training Opportunities</h3>
                  
                  <div className="border p-3 rounded-md space-y-4">
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">NCAT/ATTRA Beginning Farmer Workshops</h4>
                          <p className="text-xs text-muted-foreground mt-1">Hands-on workshops covering sustainable farming practices</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">Various locations</Badge>
                            <Badge variant="outline" className="text-xs">1-2 days</Badge>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => window.open("https://attra.ncat.org/events/", "_blank")}>
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Find Workshops
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">Cooperative Extension Workshops</h4>
                          <p className="text-xs text-muted-foreground mt-1">Local training provided by county Extension offices</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">County-based</Badge>
                            <Badge variant="outline" className="text-xs">Low cost</Badge>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => window.open("https://www.farmers.gov/working-with-us/service-center-locator", "_blank")}>
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Find Local Office
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">Beginning Farmer Incubator Programs</h4>
                          <p className="text-xs text-muted-foreground mt-1">Land access and mentoring for startup farm businesses</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">1-3 years</Badge>
                            <Badge variant="outline" className="text-xs">Applications required</Badge>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => window.open("https://nesfp.org/resources/incubator-farm-projects", "_blank")}>
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Find Programs
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">Farm Conferences</h4>
                          <p className="text-xs text-muted-foreground mt-1">Annual agricultural conferences with workshops and networking</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">Seasonal</Badge>
                            <Badge variant="outline" className="text-xs">Registration fees vary</Badge>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => window.open("https://www.farmaid.org/our-work/resources-for-farmers/farm-resources/", "_blank")}>
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Find Conferences
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("resources")}>
                    View Free Resources
                  </Button>
                  <Button variant="outline" onClick={() => handleDownload("Workshop Calendar.pdf")}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Calendar
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="resources">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Free Learning Resources</h3>
                  
                  <div className="border p-3 rounded-md space-y-4">
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">ATTRA - National Sustainable Agriculture</h4>
                          <p className="text-xs text-muted-foreground mt-1">Comprehensive library of farming publications, videos, and tutorials</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => window.open("https://attra.ncat.org/", "_blank")}>
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Visit
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">SARE Learning Center</h4>
                          <p className="text-xs text-muted-foreground mt-1">Sustainable Agriculture Research & Education resources and guides</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => window.open("https://www.sare.org/resources/", "_blank")}>
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Visit
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">eXtension - Farming Resources</h4>
                          <p className="text-xs text-muted-foreground mt-1">Research-based information from Cooperative Extension System</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => window.open("https://extension.org/", "_blank")}>
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Visit
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">USDA New Farmers Resources</h4>
                          <p className="text-xs text-muted-foreground mt-1">Government resources for beginning farmers, including funding programs</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => window.open("https://newfarmers.usda.gov/", "_blank")}>
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Visit
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">Farmer to Farmer Videos</h4>
                          <p className="text-xs text-muted-foreground mt-1">Practical demonstrations from experienced farmers</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => window.open("https://www.youtube.com/user/soildoctorvideos/", "_blank")}>
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Watch
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("overview")}>
                    Back to Overview
                  </Button>
                  <Button onClick={() => handleDownload("Beginning Farmer Resource Library.pdf")}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Resource List
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        );
      
      case "mentor":
        return (
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="programs">Mentorship Programs</TabsTrigger>
              <TabsTrigger value="connect">How to Connect</TabsTrigger>
              <TabsTrigger value="questions">Questions to Ask</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="space-y-4">
                <p>Finding an experienced mentor is one of the most valuable steps you can take as a beginning farmer. A good mentor provides practical knowledge, helps you avoid costly mistakes, and offers guidance specific to your situation.</p>
                
                <h3 className="text-lg font-medium">Benefits of Farm Mentorship</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Access to real-world farming experience and practical knowledge</li>
                  <li>Opportunity to learn region-specific farming practices</li>
                  <li>Guidance on challenging decisions and problem-solving</li>
                  <li>Introduction to local farming networks and resources</li>
                  <li>Emotional support and encouragement from someone who understands</li>
                </ul>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("programs")}>
                    Find Mentorship Programs
                  </Button>
                  <Button onClick={() => handleDownload("Mentorship Guide.pdf")}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Guide
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="programs">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Formal Mentorship Programs</h3>
                  
                  <div className="border p-3 rounded-md space-y-4">
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">Beginning Farmer & Rancher Development Program</h4>
                          <p className="text-xs text-muted-foreground mt-1">USDA-funded mentorship programs operating across the country</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => window.open("https://nifa.usda.gov/grants/programs/beginning-farmer-rancher-development-program-bfrdp", "_blank")}>
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Visit
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">Apprenticeship Programs</h4>
                          <p className="text-xs text-muted-foreground mt-1">On-farm learning opportunities with structured mentorship</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => window.open("https://attra.ncat.org/internships/", "_blank")}>
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Find Programs
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">State Beginning Farmer Programs</h4>
                          <p className="text-xs text-muted-foreground mt-1">Many states offer specific mentorship programs for new farmers</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => window.open("https://www.beginningfarmers.org/beginning-farmer-training-programs/", "_blank")}>
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Find Programs
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">Farmer Veteran Coalition Mentorship</h4>
                          <p className="text-xs text-muted-foreground mt-1">Connecting military veterans with experienced farmer mentors</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => window.open("https://farmvetco.org/", "_blank")}>
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Visit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("connect")}>
                    How to Connect
                  </Button>
                  <Button onClick={() => handleDownload("Mentorship Programs Directory.pdf")}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Directory
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="connect">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Finding a Mentor</h3>
                  
                  <div className="border p-3 rounded-md space-y-4">
                    <h4 className="font-medium">Where to Look</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li className="text-sm">Local farming organizations and associations</li>
                      <li className="text-sm">Farmers markets (talk to vendors with similar operations)</li>
                      <li className="text-sm">County Extension offices (ask for recommendations)</li>
                      <li className="text-sm">Sustainable farming conferences and workshops</li>
                      <li className="text-sm">Online farming forums and social media groups</li>
                      <li className="text-sm">Farm supply stores (ask staff for recommendations)</li>
                    </ul>
                    
                    <h4 className="font-medium mt-4">Approaching Potential Mentors</h4>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li className="text-sm">Do your homework - learn about their farm before approaching them</li>
                      <li className="text-sm">Be specific about what you're looking for in a mentorship</li>
                      <li className="text-sm">Respect their time - offer to help on their farm in exchange for knowledge</li>
                      <li className="text-sm">Start with a specific question or challenge rather than asking for general help</li>
                      <li className="text-sm">Be open about your experience level and what you're hoping to learn</li>
                    </ol>
                    
                    <h4 className="font-medium mt-4">Formal vs. Informal Mentorship</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div className="p-3 bg-gray-50 rounded-md">
                        <h5 className="text-sm font-medium">Formal Programs</h5>
                        <ul className="list-disc pl-4 mt-2 space-y-1">
                          <li className="text-xs">Structured curriculum or learning plan</li>
                          <li className="text-xs">Regular scheduled meetings or work sessions</li>
                          <li className="text-xs">Often includes specific training components</li>
                          <li className="text-xs">May include stipends or educational credits</li>
                        </ul>
                      </div>
                      
                      <div className="p-3 bg-gray-50 rounded-md">
                        <h5 className="text-sm font-medium">Informal Relationships</h5>
                        <ul className="list-disc pl-4 mt-2 space-y-1">
                          <li className="text-xs">Flexible and adaptable to both parties' needs</li>
                          <li className="text-xs">Based on questions and specific challenges</li>
                          <li className="text-xs">Can be as simple as occasional farm visits</li>
                          <li className="text-xs">Often develops organically through community</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("questions")}>
                    Questions to Ask
                  </Button>
                  <Button onClick={() => handleDownload("Finding a Mentor Guide.pdf")}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Guide
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="questions">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Questions to Ask a Potential Mentor</h3>
                  
                  <div className="border p-3 rounded-md space-y-4">
                    <div className="p-3 bg-gray-50 rounded-md">
                      <h4 className="font-medium">Getting Started Questions</h4>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li className="text-sm">What do you wish you had known when you started farming?</li>
                        <li className="text-sm">What were your biggest mistakes early on?</li>
                        <li className="text-sm">If you were starting again today, what would you do differently?</li>
                        <li className="text-sm">What resources were most helpful to you when starting out?</li>
                        <li className="text-sm">How did you decide what scale was right for your operation?</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md">
                      <h4 className="font-medium">Production Questions</h4>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li className="text-sm">What are the most challenging crops/animals to raise in this region?</li>
                        <li className="text-sm">How do you handle [specific pest or disease] in this area?</li>
                        <li className="text-sm">What equipment has been most valuable for your operation?</li>
                        <li className="text-sm">How do you manage your soil fertility?</li>
                        <li className="text-sm">What's your approach to [specific production practice]?</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md">
                      <h4 className="font-medium">Business Questions</h4>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li className="text-sm">Which marketing channels have worked best for you?</li>
                        <li className="text-sm">How do you determine your pricing?</li>
                        <li className="text-sm">What record-keeping systems do you use?</li>
                        <li className="text-sm">How do you manage cash flow throughout the season?</li>
                        <li className="text-sm">What unexpected expenses should I be prepared for?</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-md">
                      <h4 className="font-medium">Mentorship-Specific Questions</h4>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li className="text-sm">What kind of mentorship relationship would work for you?</li>
                        <li className="text-sm">How often would you be comfortable meeting or talking?</li>
                        <li className="text-sm">Are there specific ways I could help on your farm in exchange for knowledge?</li>
                        <li className="text-sm">Do you prefer to communicate by phone, email, or in-person visits?</li>
                        <li className="text-sm">Are there other beginning farmers you're currently mentoring?</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Making the Most of Mentorship</h3>
                  
                  <div className="border p-3 rounded-md">
                    <ol className="list-decimal pl-5 space-y-2">
                      <li className="text-sm">Come prepared with specific questions for each interaction</li>
                      <li className="text-sm">Take notes during conversations and farm visits</li>
                      <li className="text-sm">Follow up on advice given and report back on results</li>
                      <li className="text-sm">Respect boundaries and time limits</li>
                      <li className="text-sm">Express gratitude regularly</li>
                      <li className="text-sm">Look for ways to give back or pay it forward</li>
                      <li className="text-sm">Apply what you learn and be willing to adapt</li>
                    </ol>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("overview")}>
                    Back to Overview
                  </Button>
                  <Button onClick={() => handleDownload("Mentor Questions Guide.pdf")}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Questions Guide
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        );
      
      default:
        return (
          <div className="p-6">
            <h3 className="text-xl font-medium mb-4">Resource Content</h3>
            <p>Select a resource from the Structured Guidance tab to view detailed content.</p>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{content.title}</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[calc(100vh-220px)]">
          <div className="p-4">
            {getModalContent()}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
