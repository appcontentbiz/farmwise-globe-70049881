
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [selectedTab, setSelectedTab] = useState<string>("overview");

  // Function to handle resource interactions
  const handleResourceClick = (resourceName: string) => {
    toast({
      title: "Resource Accessed",
      description: `You are now viewing ${resourceName}`,
    });
  };

  // Function to handle downloadable resources
  const handleDownload = (resourceName: string) => {
    toast({
      title: "Download Started",
      description: `${resourceName} will be downloaded shortly.`,
    });
    
    // In a real app, this would be a link to the actual resource
    // Simulating a download after a short delay
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `${resourceName} has been downloaded successfully.`,
      });
    }, 2000);
  };

  // Function to handle external links
  const handleExternalLink = (url: string, resourceName: string) => {
    toast({
      title: "External Resource",
      description: `Opening ${resourceName} in a new tab`,
    });
    window.open(url, "_blank");
  };

  // Content mappings based on the content type
  const renderContent = () => {
    switch (content.type) {
      case "vision":
        return (
          <div className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Farm Vision Worksheet</h3>
              <p className="text-muted-foreground">
                Use this worksheet to clarify your farming vision, goals, and values. A clear 
                vision will guide your business decisions and help you stay focused on what matters most.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Section 1: Your Farming Purpose</h3>
              <div className="space-y-4 mb-6">
                <div className="border p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Why do you want to farm?</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Reflect on your personal motivations and reasons for wanting to farm. 
                    What draws you to agriculture? What impact do you hope to make?
                  </p>
                  <textarea 
                    className="w-full p-3 border rounded-md h-24" 
                    placeholder="Write your thoughts here..."
                  ></textarea>
                </div>

                <div className="border p-4 rounded-lg">
                  <h4 className="font-medium mb-2">What values are most important to you?</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    List 3-5 core values that will guide your farming practices and business decisions.
                  </p>
                  <div className="space-y-2">
                    <input 
                      type="text" 
                      className="w-full p-3 border rounded-md" 
                      placeholder="Value 1"
                    />
                    <input 
                      type="text" 
                      className="w-full p-3 border rounded-md" 
                      placeholder="Value 2"
                    />
                    <input 
                      type="text" 
                      className="w-full p-3 border rounded-md" 
                      placeholder="Value 3"
                    />
                    <input 
                      type="text" 
                      className="w-full p-3 border rounded-md" 
                      placeholder="Value 4"
                    />
                    <input 
                      type="text" 
                      className="w-full p-3 border rounded-md" 
                      placeholder="Value 5"
                    />
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-medium mb-3">Section 2: Farm Vision Statement</h3>
              <div className="border p-4 rounded-lg mb-6">
                <h4 className="font-medium mb-2">Vision Statement</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  A vision statement describes what you want your farm to become. It should be inspiring, 
                  future-oriented, and aligned with your values. (Example: "To create a regenerative 
                  farm that produces healthy food while enhancing the local ecosystem and community.")
                </p>
                <textarea 
                  className="w-full p-3 border rounded-md h-24" 
                  placeholder="Write your vision statement here..."
                ></textarea>
              </div>

              <h3 className="text-lg font-medium mb-3">Section 3: Farm Description</h3>
              <div className="space-y-4 mb-6">
                <div className="border p-4 rounded-lg">
                  <h4 className="font-medium mb-2">What will your farm produce?</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    List the main products or services your farm will provide.
                  </p>
                  <textarea 
                    className="w-full p-3 border rounded-md h-24" 
                    placeholder="Write your products/services here..."
                  ></textarea>
                </div>

                <div className="border p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Who will be your customers?</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Describe your target market and how you plan to reach them.
                  </p>
                  <textarea 
                    className="w-full p-3 border rounded-md h-24" 
                    placeholder="Describe your customers here..."
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => handleDownload("Farm Vision Worksheet.pdf")}>
                  Save as PDF
                </Button>
                <Button>
                  Save Progress
                </Button>
              </div>
            </div>
          </div>
        );

      case "goals":
        return (
          <div className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">SMART Goal Template</h3>
              <p className="text-muted-foreground">
                Create specific, measurable, achievable, relevant, and time-bound goals for your farm business.
                Well-defined goals will help you track progress and stay motivated.
              </p>
            </div>

            <div className="border p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Goal #1</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">S - Specific</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    What exactly do you want to accomplish? Be detailed and clear.
                  </p>
                  <textarea 
                    className="w-full p-3 border rounded-md h-20" 
                    placeholder="Example: Establish a vegetable CSA program with 25 members"
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">M - Measurable</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    How will you know when you've reached this goal? What metrics will you use?
                  </p>
                  <textarea 
                    className="w-full p-3 border rounded-md h-20" 
                    placeholder="Example: Sign up 25 members who each pay $500 for a 20-week CSA share"
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">A - Achievable</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Is this goal realistic given your resources? What do you need to accomplish it?
                  </p>
                  <textarea 
                    className="w-full p-3 border rounded-md h-20" 
                    placeholder="Example: I have 2 acres of growing space and irrigation, and I've calculated that I can produce enough for 25 shares"
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">R - Relevant</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Why is this goal important to your farm vision? How does it align with your values?
                  </p>
                  <textarea 
                    className="w-full p-3 border rounded-md h-20" 
                    placeholder="Example: This goal supports my vision of creating community connections and providing local food access"
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">T - Time-bound</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    When do you plan to achieve this goal? Set a specific deadline.
                  </p>
                  <textarea 
                    className="w-full p-3 border rounded-md h-20" 
                    placeholder="Example: Have all 25 memberships filled by March 1st for the upcoming growing season"
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Action Steps</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    List 3-5 specific actions needed to accomplish this goal.
                  </p>
                  <div className="space-y-2">
                    <input 
                      type="text" 
                      className="w-full p-3 border rounded-md" 
                      placeholder="Action 1"
                    />
                    <input 
                      type="text" 
                      className="w-full p-3 border rounded-md" 
                      placeholder="Action 2"
                    />
                    <input 
                      type="text" 
                      className="w-full p-3 border rounded-md" 
                      placeholder="Action 3"
                    />
                    <input 
                      type="text" 
                      className="w-full p-3 border rounded-md" 
                      placeholder="Action 4"
                    />
                    <input 
                      type="text" 
                      className="w-full p-3 border rounded-md" 
                      placeholder="Action 5"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => handleResourceClick("Add Another Goal")}>
                + Add Another Goal
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={() => handleDownload("SMART Goals Template.pdf")}>
                  Save as PDF
                </Button>
                <Button>
                  Save Progress
                </Button>
              </div>
            </div>
          </div>
        );

      case "inventory":
        return (
          <div className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Farm Resource Inventory</h3>
              <p className="text-muted-foreground">
                Document all the resources available for your farm operation. Understanding what you have will 
                help you identify what you need to acquire and make the most of existing assets.
              </p>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-4">
                <h3 className="font-medium">Land Resources</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Total Acreage</label>
                    <input type="text" className="w-full p-2 border rounded-md" placeholder="Example: 5 acres" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Usable Acreage</label>
                    <input type="text" className="w-full p-2 border rounded-md" placeholder="Example: 3.5 acres" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Land Features</label>
                  <textarea 
                    className="w-full p-2 border rounded-md h-20" 
                    placeholder="Example: Southern exposure slope, creek running through SE corner, wooded area on north edge"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Soil Type</label>
                  <input type="text" className="w-full p-2 border rounded-md" placeholder="Example: Sandy loam" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Current Land Use</label>
                  <textarea 
                    className="w-full p-2 border rounded-md h-20" 
                    placeholder="Example: 1 acre vegetables, 2 acres pasture, 1.5 acres woodland, 0.5 acres infrastructure"
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-4">
                <h3 className="font-medium">Infrastructure</h3>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Buildings</label>
                  <textarea 
                    className="w-full p-2 border rounded-md h-20" 
                    placeholder="Example: 30'x40' barn, 12'x16' shed, 20'x80' high tunnel"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Water Sources</label>
                  <textarea 
                    className="w-full p-2 border rounded-md h-20" 
                    placeholder="Example: Well with 10 gpm flow rate, 2,000 gallon rainwater collection system"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Fencing</label>
                  <textarea 
                    className="w-full p-2 border rounded-md h-20" 
                    placeholder="Example: 2 acres surrounded by 5' woven wire fence, 1 acre with electric net fencing"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Utilities</label>
                  <textarea 
                    className="w-full p-2 border rounded-md h-20" 
                    placeholder="Example: 200 amp electrical service to barn, septic system, broadband internet"
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-4">
                <h3 className="font-medium">Equipment & Tools</h3>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Major Equipment</label>
                  <textarea 
                    className="w-full p-2 border rounded-md h-20" 
                    placeholder="Example: 35hp tractor with bucket loader, 6' rotary mower, 4' tiller"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Hand Tools</label>
                  <textarea 
                    className="w-full p-2 border rounded-md h-20" 
                    placeholder="Example: 2 broadforks, 4 wheel hoes, assorted hand tools for 2 workers"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Processing Equipment</label>
                  <textarea 
                    className="w-full p-2 border rounded-md h-20" 
                    placeholder="Example: Wash station with 3 sinks, root washer, commercial refrigerator"
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => handleDownload("Farm Resource Inventory.pdf")}>
                Save as PDF
              </Button>
              <Button>
                Save Progress
              </Button>
            </div>
          </div>
        );

      case "market":
        return (
          <div className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Market Research Guide</h3>
              <p className="text-muted-foreground">
                Understand your local market and identify opportunities for your farm products. 
                Thorough market research is essential for developing a viable farm business.
              </p>
            </div>

            <div className="border p-4 rounded-lg space-y-4">
              <h3 className="text-lg font-medium">Local Market Assessment</h3>
              
              <div>
                <h4 className="font-medium mb-2">Target Customer Demographics</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Describe the characteristics of your ideal customers. Consider age, income, values, and location.
                </p>
                <textarea 
                  className="w-full p-3 border rounded-md h-24" 
                  placeholder="Describe your target customers here..."
                ></textarea>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Market Channels</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Research and evaluate potential sales channels in your area.
                </p>
                
                <div className="space-y-3">
                  <div className="border p-3 rounded-md">
                    <h5 className="font-medium">Farmers Markets</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div>
                        <label className="block text-sm mb-1">Available Markets</label>
                        <textarea 
                          className="w-full p-2 border rounded-md h-20" 
                          placeholder="List markets, locations, and days"
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Requirements & Fees</label>
                        <textarea 
                          className="w-full p-2 border rounded-md h-20" 
                          placeholder="Note application processes, costs, etc."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border p-3 rounded-md">
                    <h5 className="font-medium">Restaurants & Chefs</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div>
                        <label className="block text-sm mb-1">Potential Buyers</label>
                        <textarea 
                          className="w-full p-2 border rounded-md h-20" 
                          placeholder="List restaurants interested in local food"
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Product Needs</label>
                        <textarea 
                          className="w-full p-2 border rounded-md h-20" 
                          placeholder="Note specific products, quantities, and quality standards"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border p-3 rounded-md">
                    <h5 className="font-medium">CSA (Community Supported Agriculture)</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div>
                        <label className="block text-sm mb-1">Local Competition</label>
                        <textarea 
                          className="w-full p-2 border rounded-md h-20" 
                          placeholder="List existing CSAs in your area"
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Differentiation Strategy</label>
                        <textarea 
                          className="w-full p-2 border rounded-md h-20" 
                          placeholder="How will your CSA be different or better?"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Competitor Analysis</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Identify farms offering similar products in your area and analyze their strategies.
                </p>
                <div className="border p-3 rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm mb-1">Competitor Name</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border rounded-md" 
                        placeholder="Farm name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Products Offered</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border rounded-md" 
                        placeholder="What they sell"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Price Points</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border rounded-md" 
                        placeholder="Their pricing"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm mb-1">Strengths & Weaknesses</label>
                    <textarea 
                      className="w-full p-2 border rounded-md h-20" 
                      placeholder="Note what they do well and where there might be opportunities"
                    ></textarea>
                  </div>
                </div>
                
                <Button variant="outline" className="mt-3" onClick={() => handleResourceClick("Add Another Competitor")}>
                  + Add Another Competitor
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => handleExternalLink("https://www.sba.gov/business-guide/plan-your-business/market-research", "SBA Market Research Guide")}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Additional Resources
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={() => handleDownload("Market Research Guide.pdf")}>
                  Save as PDF
                </Button>
                <Button>
                  Save Progress
                </Button>
              </div>
            </div>
          </div>
        );

      case "business":
        return (
          <div className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Farm Business Plan Template</h3>
              <p className="text-muted-foreground">
                A well-constructed business plan serves as a roadmap for your farm business and is essential 
                for loan applications and grant funding. This template will guide you through creating a comprehensive plan.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <Button 
                  variant="outline" 
                  className="w-full h-auto py-4 flex flex-col items-center justify-center" 
                  onClick={() => setSelectedTab("overview")}
                >
                  <span className="text-base font-medium">Overview</span>
                  <span className="text-xs text-muted-foreground mt-1">Introduction & Guide</span>
                </Button>
              </div>
              <div className="flex-1">
                <Button 
                  variant="outline" 
                  className="w-full h-auto py-4 flex flex-col items-center justify-center" 
                  onClick={() => setSelectedTab("executive")}
                >
                  <span className="text-base font-medium">Executive Summary</span>
                  <span className="text-xs text-muted-foreground mt-1">Business Overview</span>
                </Button>
              </div>
              <div className="flex-1">
                <Button 
                  variant="outline" 
                  className="w-full h-auto py-4 flex flex-col items-center justify-center" 
                  onClick={() => setSelectedTab("operations")}
                >
                  <span className="text-base font-medium">Operations</span>
                  <span className="text-xs text-muted-foreground mt-1">Production Details</span>
                </Button>
              </div>
              <div className="flex-1">
                <Button 
                  variant="outline" 
                  className="w-full h-auto py-4 flex flex-col items-center justify-center" 
                  onClick={() => setSelectedTab("financial")}
                >
                  <span className="text-base font-medium">Financials</span>
                  <span className="text-xs text-muted-foreground mt-1">Projections & Analysis</span>
                </Button>
              </div>
            </div>

            {selectedTab === "overview" && (
              <div className="space-y-4 border p-4 rounded-lg">
                <h3 className="text-lg font-medium">Business Plan Overview</h3>
                <p className="text-muted-foreground">
                  This template will guide you through creating a comprehensive farm business plan. 
                  Each section contains questions and prompts to help you articulate your business strategy.
                </p>
                
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Business Plan Sections</h4>
                  <ul className="space-y-2 ml-5 list-disc">
                    <li><span className="font-medium">Executive Summary:</span> Brief overview of your farm business</li>
                    <li><span className="font-medium">Company Description:</span> Details about your farm and its structure</li>
                    <li><span className="font-medium">Products & Services:</span> What you'll produce and sell</li>
                    <li><span className="font-medium">Market Analysis:</span> Research on your target market and competition</li>
                    <li><span className="font-medium">Marketing Strategy:</span> How you'll reach and retain customers</li>
                    <li><span className="font-medium">Operations Plan:</span> Production systems and management</li>
                    <li><span className="font-medium">Financial Projections:</span> Income, expenses, and profit forecasts</li>
                    <li><span className="font-medium">Funding Request:</span> Capital needs and funding sources</li>
                    <li><span className="font-medium">Appendix:</span> Supporting documents and research</li>
                  </ul>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">How to Use This Template</h4>
                  <ol className="space-y-2 ml-5 list-decimal">
                    <li>Work through each section at your own pace, saving your progress as you go</li>
                    <li>Use the prompts and questions to guide your thinking</li>
                    <li>Be realistic and specific in your plans and projections</li>
                    <li>Update your plan regularly as your business evolves</li>
                    <li>Share your plan with advisors, mentors, or potential funders for feedback</li>
                  </ol>
                </div>
                
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="text-xs px-2 py-1 bg-green-50">
                    <span className="font-medium">Difficulty:</span> Intermediate
                  </Badge>
                  <Badge variant="outline" className="text-xs px-2 py-1 bg-amber-50">
                    <span className="font-medium">Estimated Time:</span> 8-12 hours
                  </Badge>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={() => handleExternalLink("https://www.sba.gov/business-guide/plan-your-business/write-your-business-plan", "SBA Business Plan Guide")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Additional Resources
                  </Button>
                </div>
              </div>
            )}

            {selectedTab === "executive" && (
              <div className="space-y-4 border p-4 rounded-lg">
                <h3 className="text-lg font-medium">Executive Summary</h3>
                <p className="text-sm text-muted-foreground">
                  The executive summary provides a concise overview of your entire business plan.
                  While it appears first, it's usually written last after you've completed the other sections.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Business Name</h4>
                    <input 
                      type="text" 
                      className="w-full p-3 border rounded-md" 
                      placeholder="Your farm name"
                    />
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Mission Statement</h4>
                    <p className="text-xs text-muted-foreground mb-1">
                      A clear, concise statement of your farm's purpose and values.
                    </p>
                    <textarea 
                      className="w-full p-3 border rounded-md h-20" 
                      placeholder="Example: Green Valley Farm's mission is to produce nutritious, sustainably grown vegetables while building soil health and supporting our local community."
                    ></textarea>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Business Overview</h4>
                    <p className="text-xs text-muted-foreground mb-1">
                      Briefly describe your farm business, including products, location, and size.
                    </p>
                    <textarea 
                      className="w-full p-3 border rounded-md h-24" 
                      placeholder="Example: Green Valley Farm is a 15-acre diversified vegetable farm located in Riverside County. We grow over 30 varieties of certified organic vegetables for direct sale through our CSA program, farmers markets, and restaurant accounts."
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Legal Structure</h4>
                      <select className="w-full p-3 border rounded-md">
                        <option value="">Select business structure</option>
                        <option value="sole_proprietorship">Sole Proprietorship</option>
                        <option value="partnership">Partnership</option>
                        <option value="llc">Limited Liability Company (LLC)</option>
                        <option value="corporation">Corporation</option>
                        <option value="cooperative">Cooperative</option>
                      </select>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Years in Operation</h4>
                      <select className="w-full p-3 border rounded-md">
                        <option value="">Select years in operation</option>
                        <option value="startup">Startup (Not yet operating)</option>
                        <option value="less_than_1">Less than 1 year</option>
                        <option value="1_3">1-3 years</option>
                        <option value="4_10">4-10 years</option>
                        <option value="over_10">Over 10 years</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Owners & Key Personnel</h4>
                    <p className="text-xs text-muted-foreground mb-1">
                      List the owners and key team members along with their roles and qualifications.
                    </p>
                    <textarea 
                      className="w-full p-3 border rounded-md h-24" 
                      placeholder="Example: Jane Smith, Owner/Operator - 5 years farming experience, Certificate in Sustainable Agriculture from State University. John Doe, Sales Manager - 10 years experience in food retail and distribution."
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-xs px-2 py-1 bg-blue-50">
                      <span className="font-medium">Status:</span> In Progress
                    </Badge>
                    <Badge variant="outline" className="text-xs px-2 py-1 bg-amber-50">
                      <span className="font-medium">Completion:</span> 0%
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === "operations" && (
              <div className="space-y-4 border p-4 rounded-lg">
                <h3 className="text-lg font-medium">Operations Plan</h3>
                <p className="text-sm text-muted-foreground">
                  The operations plan outlines how your farm will function on a daily basis, 
                  including production methods, facilities, equipment, and management systems.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Production Methods</h4>
                    <p className="text-xs text-muted-foreground mb-1">
                      Describe your farming approach and production practices.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-1">Production System</label>
                        <select className="w-full p-2 border rounded-md">
                          <option value="">Select production system</option>
                          <option value="conventional">Conventional</option>
                          <option value="organic">Certified Organic</option>
                          <option value="organic_transitioning">Transitioning to Organic</option>
                          <option value="regenerative">Regenerative</option>
                          <option value="biodynamic">Biodynamic</option>
                          <option value="permaculture">Permaculture</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Production Scale</label>
                        <select className="w-full p-2 border rounded-md">
                          <option value="">Select scale</option>
                          <option value="home">Home/Garden (under 1/4 acre)</option>
                          <option value="market_garden">Market Garden (1/4 - 3 acres)</option>
                          <option value="small_farm">Small Farm (3-30 acres)</option>
                          <option value="mid_size">Mid-size Farm (30-500 acres)</option>
                          <option value="large">Large Farm (500+ acres)</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-2">
                      <label className="block text-sm mb-1">Key Production Practices</label>
                      <textarea 
                        className="w-full p-2 border rounded-md h-24" 
                        placeholder="Describe your key production practices (e.g., crop rotation, cover cropping, pest management, irrigation methods, etc.)"
                      ></textarea>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Land & Facilities</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-1">Land Access</label>
                        <select className="w-full p-2 border rounded-md">
                          <option value="">Select land status</option>
                          <option value="own">Own</option>
                          <option value="lease_long">Long-term Lease (5+ years)</option>
                          <option value="lease_short">Short-term Lease (1-4 years)</option>
                          <option value="seeking">Seeking Land</option>
                          <option value="other">Other Arrangement</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Total Land Area</label>
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded-md" 
                          placeholder="Total acres or hectares"
                        />
                      </div>
                    </div>
                    <div className="mt-2">
                      <label className="block text-sm mb-1">Buildings & Infrastructure</label>
                      <textarea 
                        className="w-full p-2 border rounded-md h-24" 
                        placeholder="Describe existing buildings, storage facilities, wash/pack areas, greenhouses, irrigation systems, etc."
                      ></textarea>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Equipment & Technology</h4>
                    <p className="text-xs text-muted-foreground mb-1">
                      List major equipment needed for your operation.
                    </p>
                    <div className="border p-2 rounded-md">
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        <div className="font-medium text-sm">Equipment Item</div>
                        <div className="font-medium text-sm">Owned/Needed</div>
                        <div className="font-medium text-sm">Estimated Cost</div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded-md" 
                          placeholder="Item name"
                        />
                        <select className="w-full p-2 border rounded-md">
                          <option value="owned">Already Own</option>
                          <option value="need_immediate">Need Immediately</option>
                          <option value="need_future">Future Need</option>
                          <option value="rent">Will Rent/Borrow</option>
                        </select>
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded-md" 
                          placeholder="$"
                        />
                      </div>
                    </div>
                    <Button variant="outline" className="mt-2" onClick={() => handleResourceClick("Add Equipment Item")}>
                      + Add Equipment Item
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-xs px-2 py-1 bg-blue-50">
                      <span className="font-medium">Status:</span> Not Started
                    </Badge>
                    <Badge variant="outline" className="text-xs px-2 py-1 bg-amber-50">
                      <span className="font-medium">Completion:</span> 0%
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === "financial" && (
              <div className="space-y-4 border p-4 rounded-lg">
                <h3 className="text-lg font-medium">Financial Projections</h3>
                <p className="text-sm text-muted-foreground">
                  Create realistic financial projections for your farm business. These will help you 
                  assess viability, secure funding, and track performance over time.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Startup Costs</h4>
                    <p className="text-xs text-muted-foreground mb-1">
                      Estimate one-time expenses needed to start your farm business.
                    </p>
                    <div className="border p-2 rounded-md">
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div className="font-medium text-sm">Cost Item</div>
                        <div className="font-medium text-sm">Amount</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded-md" 
                          placeholder="Land acquisition/lease"
                        />
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded-md" 
                          placeholder="$"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded-md" 
                          placeholder="Equipment purchase"
                        />
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded-md" 
                          placeholder="$"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded-md" 
                          placeholder="Infrastructure/buildings"
                        />
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded-md" 
                          placeholder="$"
                        />
                      </div>
                    </div>
                    <Button variant="outline" className="mt-2" onClick={() => handleResourceClick("Add Cost Item")}>
                      + Add Cost Item
                    </Button>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Revenue Projections</h4>
                    <p className="text-xs text-muted-foreground mb-1">
                      Estimate your sales revenue by product category.
                    </p>
                    <div className="border p-2 rounded-md">
                      <div className="grid grid-cols-4 gap-2 mb-2">
                        <div className="font-medium text-sm">Product</div>
                        <div className="font-medium text-sm">Unit Price</div>
                        <div className="font-medium text-sm">Annual Units</div>
                        <div className="font-medium text-sm">Annual Revenue</div>
                      </div>
                      <div className="grid grid-cols-4 gap-2 mb-2">
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded-md" 
                          placeholder="Product name"
                        />
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded-md" 
                          placeholder="$"
                        />
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded-md" 
                          placeholder="Quantity"
                        />
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded-md" 
                          placeholder="$"
                        />
                      </div>
                    </div>
                    <Button variant="outline" className="mt-2" onClick={() => handleResourceClick("Add Product")}>
                      + Add Product
                    </Button>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Operating Expenses</h4>
                    <p className="text-xs text-muted-foreground mb-1">
                      Estimate your recurring monthly or annual expenses.
                    </p>
                    <div className="border p-2 rounded-md">
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        <div className="font-medium text-sm">Expense Item</div>
                        <div className="font-medium text-sm">Frequency</div>
                        <div className="font-medium text-sm">Amount</div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded-md" 
                          placeholder="Seeds/plants"
                        />
                        <select className="w-full p-2 border rounded-md">
                          <option value="monthly">Monthly</option>
                          <option value="quarterly">Quarterly</option>
                          <option value="annually">Annually</option>
                          <option value="seasonal">Seasonal</option>
                        </select>
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded-md" 
                          placeholder="$"
                        />
                      </div>
                    </div>
                    <Button variant="outline" className="mt-2" onClick={() => handleResourceClick("Add Expense Item")}>
                      + Add Expense Item
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-xs px-2 py-1 bg-blue-50">
                      <span className="font-medium">Status:</span> Not Started
                    </Badge>
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      <span className="font-medium">Template Type:</span> Basic
                    </Badge>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => handleExternalLink("https://www.sba.gov/business-guide/plan-your-business/write-your-business-plan", "SBA Business Plan Guide")}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Additional Resources
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={() => handleDownload("Farm Business Plan Template.pdf")}>
                  Save as PDF
                </Button>
                <Button>
                  Save Progress
                </Button>
              </div>
            </div>
          </div>
        );

      case "calculator":
        return (
          <div className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Farm Financial Calculator</h3>
              <p className="text-muted-foreground">
                Use this tool to estimate startup costs, operational expenses, and potential revenue 
                for your farm business. Accurate financial projections are essential for planning and securing funding.
              </p>
            </div>

            <div>
              <h3 className="text-base font-medium mb-4">Enterprise Profitability Calculator</h3>
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted p-4">
                  <h4 className="font-medium">Step 1: Define Your Enterprise</h4>
                </div>
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Enterprise Name</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border rounded-md" 
                        placeholder="Example: Tomato Production"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Production Area</label>
                      <div className="flex">
                        <input 
                          type="number" 
                          className="w-full p-2 border rounded-l-md" 
                          placeholder="Area size"
                        />
                        <select className="p-2 border border-l-0 rounded-r-md">
                          <option value="acres">Acres</option>
                          <option value="hectares">Hectares</option>
                          <option value="sq_ft">Square Feet</option>
                          <option value="rows">Rows</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Enterprise Description</label>
                    <textarea 
                      className="w-full p-2 border rounded-md h-20" 
                      placeholder="Brief description of this enterprise"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden mt-4">
                <div className="bg-muted p-4">
                  <h4 className="font-medium">Step 2: Revenue Projections</h4>
                </div>
                <div className="p-4">
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Product</th>
                          <th className="text-left p-2">Unit Type</th>
                          <th className="text-left p-2">Price per Unit</th>
                          <th className="text-left p-2">Expected Yield</th>
                          <th className="text-left p-2">Total Revenue</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2">
                            <input 
                              type="text" 
                              className="w-full p-1 border rounded-md" 
                              placeholder="Product name"
                            />
                          </td>
                          <td className="p-2">
                            <select className="w-full p-1 border rounded-md">
                              <option value="lb">lb</option>
                              <option value="kg">kg</option>
                              <option value="bushel">bushel</option>
                              <option value="box">box</option>
                              <option value="each">each</option>
                              <option value="bunch">bunch</option>
                            </select>
                          </td>
                          <td className="p-2">
                            <div className="flex">
                              <span className="inline-flex items-center px-2 border border-r-0 rounded-l-md bg-muted">$</span>
                              <input 
                                type="number" 
                                className="w-full p-1 border rounded-r-md" 
                                placeholder="0.00"
                              />
                            </div>
                          </td>
                          <td className="p-2">
                            <input 
                              type="number" 
                              className="w-full p-1 border rounded-md" 
                              placeholder="0"
                            />
                          </td>
                          <td className="p-2">
                            <div className="flex">
                              <span className="inline-flex items-center px-2 border border-r-0 rounded-l-md bg-muted">$</span>
                              <input 
                                type="number" 
                                className="w-full p-1 border rounded-r-md bg-muted/30" 
                                placeholder="0.00"
                                readOnly
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr className="border-t font-medium">
                          <td colSpan={4} className="p-2 text-right">Total Projected Revenue:</td>
                          <td className="p-2">
                            <div className="flex">
                              <span className="inline-flex items-center px-2 border border-r-0 rounded-l-md bg-muted">$</span>
                              <input 
                                type="number" 
                                className="w-full p-1 border rounded-r-md bg-muted/30 font-medium" 
                                placeholder="0.00"
                                readOnly
                              />
                            </div>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <Button variant="outline" className="mt-3" onClick={() => handleResourceClick("Add Product Line")}>
                    + Add Product Line
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden mt-4">
                <div className="bg-muted p-4">
                  <h4 className="font-medium">Step 3: Variable Costs</h4>
                </div>
                <div className="p-4">
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Cost Item</th>
                          <th className="text-left p-2">Category</th>
                          <th className="text-left p-2">Unit</th>
                          <th className="text-left p-2">Quantity</th>
                          <th className="text-left p-2">Cost per Unit</th>
                          <th className="text-left p-2">Total Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2">
                            <input 
                              type="text" 
                              className="w-full p-1 border rounded-md" 
                              placeholder="Item name"
                            />
                          </td>
                          <td className="p-2">
                            <select className="w-full p-1 border rounded-md">
                              <option value="">Select category</option>
                              <option value="seeds">Seeds/Plants</option>
                              <option value="fertilizer">Fertilizer</option>
                              <option value="pesticide">Pest Control</option>
                              <option value="labor">Labor</option>
                              <option value="fuel">Fuel</option>
                              <option value="irrigation">Irrigation</option>
                              <option value="other">Other</option>
                            </select>
                          </td>
                          <td className="p-2">
                            <input 
                              type="text" 
                              className="w-full p-1 border rounded-md" 
                              placeholder="Unit type"
                            />
                          </td>
                          <td className="p-2">
                            <input 
                              type="number" 
                              className="w-full p-1 border rounded-md" 
                              placeholder="0"
                            />
                          </td>
                          <td className="p-2">
                            <div className="flex">
                              <span className="inline-flex items-center px-2 border border-r-0 rounded-l-md bg-muted">$</span>
                              <input 
                                type="number" 
                                className="w-full p-1 border rounded-r-md" 
                                placeholder="0.00"
                              />
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="flex">
                              <span className="inline-flex items-center px-2 border border-r-0 rounded-l-md bg-muted">$</span>
                              <input 
                                type="number" 
                                className="w-full p-1 border rounded-r-md bg-muted/30" 
                                placeholder="0.00"
                                readOnly
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr className="border-t font-medium">
                          <td colSpan={5} className="p-2 text-right">Total Variable Costs:</td>
                          <td className="p-2">
                            <div className="flex">
                              <span className="inline-flex items-center px-2 border border-r-0 rounded-l-md bg-muted">$</span>
                              <input 
                                type="number" 
                                className="w-full p-1 border rounded-r-md bg-muted/30 font-medium" 
                                placeholder="0.00"
                                readOnly
                              />
                            </div>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <Button variant="outline" className="mt-3" onClick={() => handleResourceClick("Add Cost Item")}>
                    + Add Cost Item
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden mt-4">
                <div className="bg-muted p-4">
                  <h4 className="font-medium">Step 4: Fixed Costs (Pro-rated for this enterprise)</h4>
                </div>
                <div className="p-4">
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Fixed Cost Item</th>
                          <th className="text-left p-2">Annual Cost</th>
                          <th className="text-left p-2">% Allocated to Enterprise</th>
                          <th className="text-left p-2">Enterprise Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2">
                            <input 
                              type="text" 
                              className="w-full p-1 border rounded-md" 
                              placeholder="Example: Equipment depreciation"
                            />
                          </td>
                          <td className="p-2">
                            <div className="flex">
                              <span className="inline-flex items-center px-2 border border-r-0 rounded-l-md bg-muted">$</span>
                              <input 
                                type="number" 
                                className="w-full p-1 border rounded-r-md" 
                                placeholder="0.00"
                              />
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="flex">
                              <input 
                                type="number" 
                                className="w-full p-1 border rounded-l-md" 
                                placeholder="0"
                              />
                              <span className="inline-flex items-center px-2 border border-l-0 rounded-r-md bg-muted">%</span>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="flex">
                              <span className="inline-flex items-center px-2 border border-r-0 rounded-l-md bg-muted">$</span>
                              <input 
                                type="number" 
                                className="w-full p-1 border rounded-r-md bg-muted/30" 
                                placeholder="0.00"
                                readOnly
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr className="border-t font-medium">
                          <td colSpan={3} className="p-2 text-right">Total Fixed Costs:</td>
                          <td className="p-2">
                            <div className="flex">
                              <span className="inline-flex items-center px-2 border border-r-0 rounded-l-md bg-muted">$</span>
                              <input 
                                type="number" 
                                className="w-full p-1 border rounded-r-md bg-muted/30 font-medium" 
                                placeholder="0.00"
                                readOnly
                              />
                            </div>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <Button variant="outline" className="mt-3" onClick={() => handleResourceClick("Add Fixed Cost")}>
                    + Add Fixed Cost
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden mt-4">
                <div className="bg-muted p-4">
                  <h4 className="font-medium">Step 5: Profitability Summary</h4>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-right font-medium">Total Revenue:</div>
                      <div className="flex">
                        <span className="inline-flex items-center px-2 border border-r-0 rounded-l-md bg-muted">$</span>
                        <input 
                          type="number" 
                          className="w-full p-1 border rounded-r-md bg-muted/30" 
                          placeholder="0.00"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-right font-medium">Total Variable Costs:</div>
                      <div className="flex">
                        <span className="inline-flex items-center px-2 border border-r-0 rounded-l-md bg-muted">$</span>
                        <input 
                          type="number" 
                          className="w-full p-1 border rounded-r-md bg-muted/30" 
                          placeholder="0.00"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-right font-medium">Gross Margin:</div>
                      <div className="flex">
                        <span className="inline-flex items-center px-2 border border-r-0 rounded-l-md bg-muted">$</span>
                        <input 
                          type="number" 
                          className="w-full p-1 border rounded-r-md bg-muted/30" 
                          placeholder="0.00"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-right font-medium">Total Fixed Costs:</div>
                      <div className="flex">
                        <span className="inline-flex items-center px-2 border border-r-0 rounded-l-md bg-muted">$</span>
                        <input 
                          type="number" 
                          className="w-full p-1 border rounded-r-md bg-muted/30" 
                          placeholder="0.00"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 border-t pt-2">
                      <div className="text-right font-medium">Net Profit:</div>
                      <div className="flex">
                        <span className="inline-flex items-center px-2 border border-r-0 rounded-l-md bg-muted">$</span>
                        <input 
                          type="number" 
                          className="w-full p-1 border rounded-r-md bg-green-50 font-medium" 
                          placeholder="0.00"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-right font-medium">Profit Margin:</div>
                      <div className="flex">
                        <input 
                          type="number" 
                          className="w-full p-1 border rounded-l-md bg-green-50 font-medium" 
                          placeholder="0"
                          readOnly
                        />
                        <span className="inline-flex items-center px-2 border border-l-0 rounded-r-md bg-muted">%</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-right font-medium">Break-even Price:</div>
                      <div className="flex">
                        <span className="inline-flex items-center px-2 border border-r-0 rounded-l-md bg-muted">$</span>
                        <input 
                          type="number" 
                          className="w-full p-1 border rounded-r-md bg-muted/30" 
                          placeholder="0.00"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => handleExternalLink("https://farmanswers.org/farm-calculator", "More Farm Calculators")}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Additional Calculators
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={() => handleDownload("Enterprise Budget.xlsx")}>
                  Export to Excel
                </Button>
                <Button onClick={() => handleResourceClick("Calculate Results")}>
                  Calculate
                </Button>
              </div>
            </div>
          </div>
        );

      case "training":
        return (
          <div className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Training Resources for Beginning Farmers</h3>
              <p className="text-muted-foreground">
                Continuous learning is essential for successful farming. These curated resources will help you 
                build your knowledge and skills in various aspects of farm management and production.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted p-4">
                  <h3 className="font-medium">Online Courses</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div className="border-b pb-3">
                    <h4 className="font-medium">Beginning Farmer Certificate Program</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Comprehensive online course covering the fundamentals of sustainable farming.
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Free</Badge>
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 ml-2">Self-paced</Badge>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleExternalLink("https://extension.org/courses", "Extension Courses")}
                      >
                        <ExternalLink className="h-3 w-3 mr-2" />
                        Access Course
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border-b pb-3">
                    <h4 className="font-medium">Soil Health Management</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Learn to build and maintain healthy soil through organic matter management, crop rotation, and more.
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">$49</Badge>
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 ml-2">8 modules</Badge>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleExternalLink("https://soilfirst.org/courses", "Soil Health Course")}
                      >
                        <ExternalLink className="h-3 w-3 mr-2" />
                        Access Course
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border-b pb-3">
                    <h4 className="font-medium">Farm Business Planning</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Develop a comprehensive business plan, understand financial management, and marketing strategies.
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">$75</Badge>
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 ml-2">6 weeks</Badge>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleExternalLink("https://farmcommons.org/courses", "Farm Business Course")}
                      >
                        <ExternalLink className="h-3 w-3 mr-2" />
                        Access Course
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Crop Production Techniques</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Practical methods for vegetable, fruit, and specialty crop production for small to mid-scale farms.
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Free</Badge>
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 ml-2">12 modules</Badge>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleExternalLink("https://crops.extension.org", "Crop Production Course")}
                      >
                        <ExternalLink className="h-3 w-3 mr-2" />
                        Access Course
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted p-4">
                  <h3 className="font-medium">Workshops & Field Days</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div className="border-b pb-3">
                    <h4 className="font-medium">Beginning Farmer Field Day</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Hands-on learning experiences at established farms with demonstrations of equipment and techniques.
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <span className="text-xs text-muted-foreground">Date:</span>
                        <p className="text-sm">June 15, 2023</p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Location:</span>
                        <p className="text-sm">Various Locations</p>
                      </div>
                    </div>
                    <div className="flex justify-end mt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleExternalLink("https://beginning.farmextension.org/events", "Field Day Events")}
                      >
                        <ExternalLink className="h-3 w-3 mr-2" />
                        Find Events
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border-b pb-3">
                    <h4 className="font-medium">Farm Financial Management Workshop</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Interactive workshop on bookkeeping, financial analysis, and budgeting for farm businesses.
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <span className="text-xs text-muted-foreground">Format:</span>
                        <p className="text-sm">In-person & Virtual</p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Duration:</span>
                        <p className="text-sm">One day (8 hours)</p>
                      </div>
                    </div>
                    <div className="flex justify-end mt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleExternalLink("https://farmfinance.org/workshops", "Finance Workshops")}
                      >
                        <ExternalLink className="h-3 w-3 mr-2" />
                        Register
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Farmer-to-Farmer Learning Network</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Join a peer learning community where farmers share knowledge, successes, and challenges.
                    </p>
                    <div className="mt-2">
                      <span className="text-xs text-muted-foreground">Benefits:</span>
                      <ul className="text-sm ml-5 list-disc">
                        <li>Monthly virtual meetings</li>
                        <li>Quarterly farm tours</li>
                        <li>Online forum access</li>
                        <li>Resource sharing library</li>
                      </ul>
                    </div>
                    <div className="flex justify-end mt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleExternalLink("https://farmnetwork.org/join", "Learning Network")}
                      >
                        <ExternalLink className="h-3 w-3 mr-2" />
                        Join Network
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-4">
                <h3 className="font-medium">Recommended Reading</h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium">The Market Gardener</h4>
                    <p className="text-xs text-muted-foreground">by Jean-Martin Fortier</p>
                    <p className="text-sm mt-2">
                      A practical guide to small-scale organic farming with detailed information on crop planning, 
                      tools, and techniques for profitable market gardens.
                    </p>
                    <div className="flex justify-end mt-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleExternalLink("https://www.themarketgardener.com/book", "Market Gardener Book")}
                      >
                        <ExternalLink className="h-3 w-3 mr-2" />
                        Learn More
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium">Farming While Black</h4>
                    <p className="text-xs text-muted-foreground">by Leah Penniman</p>
                    <p className="text-sm mt-2">
                      Essential guide to liberation and land stewardship for farmers of color, 
                      with practical information on sustainable farming techniques.
                    </p>
                    <div className="flex justify-end mt-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleExternalLink("https://www.farmingwhileblack.org", "Farming While Black Book")}
                      >
                        <ExternalLink className="h-3 w-3 mr-2" />
                        Learn More
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium">The Lean Farm</h4>
                    <p className="text-xs text-muted-foreground">by Ben Hartman</p>
                    <p className="text-sm mt-2">
                      How to minimize waste, increase efficiency, and maximize value and profits 
                      with less work on small-scale farms.
                    </p>
                    <div className="flex justify-end mt-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleExternalLink("https://www.chelseagreen.com/product/the-lean-farm", "Lean Farm Book")}
                      >
                        <ExternalLink className="h-3 w-3 mr-2" />
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={() => handleExternalLink("https://www.farmers.gov/your-business/beginning-farmers", "USDA Beginning Farmer Resources")}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Explore All Training Resources
              </Button>
            </div>
          </div>
        );

      case "mentor":
        return (
          <div className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Find a Mentor</h3>
              <p className="text-muted-foreground">
                Connecting with experienced farmers can significantly shorten your learning curve and 
                help you avoid common mistakes. Complete your profile to get matched with mentors who 
                align with your farming interests and goals.
              </p>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-4 flex justify-between items-center">
                <h3 className="font-medium">Your Mentorship Profile</h3>
                <Badge variant="outline" className="bg-amber-50 text-amber-800">
                  Step 1 of 3
                </Badge>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Your Farming Interests</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Select the farming types you're interested in pursuing or learning more about.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="veg" className="rounded border-gray-300" />
                      <label htmlFor="veg" className="text-sm">Vegetable Production</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="fruit" className="rounded border-gray-300" />
                      <label htmlFor="fruit" className="text-sm">Fruit & Berry Production</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="livestock" className="rounded border-gray-300" />
                      <label htmlFor="livestock" className="text-sm">Livestock & Dairy</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="poultry" className="rounded border-gray-300" />
                      <label htmlFor="poultry" className="text-sm">Poultry & Eggs</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="herbs" className="rounded border-gray-300" />
                      <label htmlFor="herbs" className="text-sm">Herbs & Medicinals</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="flowers" className="rounded border-gray-300" />
                      <label htmlFor="flowers" className="text-sm">Cut Flowers</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="grains" className="rounded border-gray-300" />
                      <label htmlFor="grains" className="text-sm">Grain & Field Crops</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="specialty" className="rounded border-gray-300" />
                      <label htmlFor="specialty" className="text-sm">Specialty Crops</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="value" className="rounded border-gray-300" />
                      <label htmlFor="value" className="text-sm">Value-Added Products</label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Production Practices</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Which farming approaches are you most interested in learning?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="organic" className="rounded border-gray-300" />
                      <label htmlFor="organic" className="text-sm">Certified Organic</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="conventional" className="rounded border-gray-300" />
                      <label htmlFor="conventional" className="text-sm">Conventional</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="regenerative" className="rounded border-gray-300" />
                      <label htmlFor="regenerative" className="text-sm">Regenerative</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="biodynamic" className="rounded border-gray-300" />
                      <label htmlFor="biodynamic" className="text-sm">Biodynamic</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="permaculture" className="rounded border-gray-300" />
                      <label htmlFor="permaculture" className="text-sm">Permaculture</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="hydroponics" className="rounded border-gray-300" />
                      <label htmlFor="hydroponics" className="text-sm">Hydroponics/Aquaponics</label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Farm Size</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    What scale of farming are you planning or currently operating?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="micro" name="size" className="rounded-full border-gray-300" />
                      <label htmlFor="micro" className="text-sm">Micro (Under 1 acre)</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="small" name="size" className="rounded-full border-gray-300" />
                      <label htmlFor="small" className="text-sm">Small (1-10 acres)</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="medium" name="size" className="rounded-full border-gray-300" />
                      <label htmlFor="medium" className="text-sm">Medium (10-50 acres)</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="large" name="size" className="rounded-full border-gray-300" />
                      <label htmlFor="large" className="text-sm">Large (50+ acres)</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="undecided" name="size" className="rounded-full border-gray-300" />
                      <label htmlFor="undecided" className="text-sm">Still Deciding</label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Your Location</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    We'll try to match you with mentors in your region or climate zone.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1">State/Province</label>
                      <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter your state or province" />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Country</label>
                      <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter your country" />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">About You</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Help potential mentors understand your background and goals.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-1">Farming Experience Level</label>
                      <select className="w-full p-2 border rounded-md">
                        <option value="">Select your experience level</option>
                        <option value="none">No prior experience</option>
                        <option value="hobby">Hobby gardener/farmer</option>
                        <option value="apprentice">Farm apprentice or employee</option>
                        <option value="beginner">Beginning farmer (0-3 years)</option>
                        <option value="established">Established farmer (3+ years)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Your Farming Goals</label>
                      <textarea 
                        className="w-full p-2 border rounded-md h-24" 
                        placeholder="Briefly describe what you hope to achieve with your farm..."
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm mb-1">What You're Seeking in a Mentor</label>
                      <textarea 
                        className="w-full p-2 border rounded-md h-24" 
                        placeholder="What kind of guidance are you looking for? Any specific skills or knowledge areas?"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-muted/30 p-4 flex justify-end">
                <Button onClick={() => handleResourceClick("Find Mentors")}>
                  Continue to Step 2
                </Button>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-4">
                <h3 className="font-medium">How the Mentorship Program Works</h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-full bg-farm-green/10 flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-farm-green" />
                    </div>
                    <h4 className="font-medium">1. Complete Your Profile</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Tell us about your farming interests, goals, and what you're looking for in a mentor.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-full bg-farm-green/10 flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-farm-green" />
                    </div>
                    <h4 className="font-medium">2. Get Matched</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      We'll suggest potential mentors based on your profile and preferences.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-full bg-farm-green/10 flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-farm-green" />
                    </div>
                    <h4 className="font-medium">3. Connect & Learn</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Start connecting with your mentor through visits, calls, or online meetings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => handleExternalLink("https://beginningfarmers.org/mentorship-programs/", "Mentorship Programs")}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                External Mentorship Programs
              </Button>
              <Button variant="default" onClick={() => handleResourceClick("Find Mentors")}>
                Find a Mentor
              </Button>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-4">
            <h3 className="text-lg font-medium">Resource Content</h3>
            <p className="text-muted-foreground">
              Viewing: {content.title}
            </p>
            <div className="mt-4">
              <p>Detailed content for {content.title} will be displayed here.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{content.title}</DialogTitle>
          <DialogDescription>
            Interactive resource to help you with your farming journey
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[calc(100vh-220px)]">
          <div className="p-4">
            {renderContent()}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
