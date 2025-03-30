
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Download,
  FileText,
  FileSpreadsheet,
  FileImage,
  FileAudio,
  FileVideo,
  Calendar,
  User2,
  ArrowDownToLine,
  File,
  Check,
  ExternalLink
} from "lucide-react";

// Enhanced resource data with actual file URLs and content previews
const resourceData = [
  {
    id: 1,
    title: "Complete Guide to Organic Certification",
    description: "A comprehensive manual covering all aspects of organic certification including requirements, application process, and maintenance.",
    author: "USDA Organic Program",
    date: "January 10, 2023",
    category: "Certification",
    fileType: "pdf",
    fileSize: "2.4 MB",
    downloads: 1245,
    downloadUrl: "https://www.ams.usda.gov/sites/default/files/media/USDA%20Organic%20Standards.pdf",
    previewContent: `
      <h2>USDA Organic Certification Guide</h2>
      <p>This comprehensive guide walks farmers through the entire organic certification process, from initial application to maintaining certification status. It covers:</p>
      
      <ul>
        <li>Understanding the National Organic Program (NOP) standards</li>
        <li>Required documentation for certification</li>
        <li>Step-by-step application process</li>
        <li>Preparing for inspection</li>
        <li>Approved materials and practices</li>
        <li>Record-keeping requirements</li>
        <li>Annual renewal procedures</li>
      </ul>
      
      <p>The guide includes checklists, sample forms, and case studies to help farmers navigate the certification process efficiently.</p>
      
      <h3>Key Sections:</h3>
      
      <h4>1. Land Requirements</h4>
      <p>Details on the 3-year transition period, buffer zones, preventing contamination, and managing boundaries with conventional operations.</p>
      
      <h4>2. Soil Management Practices</h4>
      <p>Approved methods for building soil health, managing fertility, and documentation requirements for soil amendments.</p>
      
      <h4>3. Seed and Planting Stock</h4>
      <p>Guidelines for organic seed sourcing, allowed exceptions, and documentation requirements.</p>
      
      <h4>4. Pest, Weed, and Disease Management</h4>
      <p>Approved prevention and control methods, prohibited substances, and emergency management protocols.</p>
      
      <h4>5. Livestock Integration</h4>
      <p>Requirements for incorporating livestock into organic crop systems, including feed, housing, and healthcare standards.</p>
      
      <h4>6. Processing and Handling</h4>
      <p>Standards for processing organic products, maintaining organic integrity, and preventing commingling with non-organic materials.</p>
    `
  },
  {
    id: 2,
    title: "Seasonal Crop Planning Spreadsheet",
    description: "An Excel template to help plan your seasonal crops with built-in formulas for calculating expenses, expected yield, and profitability.",
    author: "FarmWise Analytics Team",
    date: "March 22, 2023",
    category: "Planning",
    fileType: "xlsx",
    fileSize: "1.8 MB",
    downloads: 876,
    downloadUrl: "https://farmextension.org/resources/crop-planning-template.xlsx",
    previewContent: `
      <h2>FarmWise Seasonal Crop Planning Tool</h2>
      <p>This Excel-based planning tool helps farmers make data-driven decisions about crop selection, rotation planning, and profitability projections. The spreadsheet includes:</p>
      
      <h3>Key Features:</h3>
      
      <h4>1. Crop Calendar</h4>
      <p>Visual planting and harvesting timeline that automatically adjusts based on your climate zone, with customizable fields for:</p>
      <ul>
        <li>Seeding dates (indoor and direct)</li>
        <li>Transplanting windows</li>
        <li>Expected harvest periods</li>
        <li>Succession planting schedules</li>
      </ul>
      
      <h4>2. Field Planning Module</h4>
      <p>Optimize space utilization with tools for:</p>
      <ul>
        <li>Bed layout and crop allocation</li>
        <li>Crop rotation tracking across seasons</li>
        <li>Plant spacing and population calculations</li>
        <li>Irrigation needs estimation</li>
      </ul>
      
      <h4>3. Financial Projections</h4>
      <p>Comprehensive financial planning tools including:</p>
      <ul>
        <li>Detailed input cost tracking (seeds, amendments, labor, etc.)</li>
        <li>Yield projections based on historical data</li>
        <li>Market price scenarios</li>
        <li>Profit margin calculations by crop and field</li>
        <li>Break-even analysis</li>
      </ul>
      
      <h4>4. Resource Management</h4>
      <p>Plan and track resource needs throughout the season:</p>
      <ul>
        <li>Seed ordering calculator</li>
        <li>Fertilizer and amendment application schedules</li>
        <li>Labor hour projections by week</li>
        <li>Equipment utilization planning</li>
      </ul>
      
      <h4>5. Record Keeping</h4>
      <p>Integrated systems for maintaining:</p>
      <ul>
        <li>Planting records for certification</li>
        <li>Harvest logs</li>
        <li>Input application documentation</li>
        <li>Weather data correlation</li>
      </ul>
      
      <p>The spreadsheet comes with sample data that can be easily replaced with your farm's information, and includes video tutorials on how to customize the templates for your specific operation.</p>
    `
  },
  {
    id: 3,
    title: "Pest Identification Image Pack",
    description: "A collection of high-resolution images to help identify common agricultural pests and the damage they cause.",
    author: "Cornell University",
    date: "May 15, 2023",
    category: "Pest Management",
    fileType: "zip",
    fileSize: "45.2 MB",
    downloads: 659,
    downloadUrl: "https://www.cornell.edu/insect-diagnostic-lab/resources.html",
    previewContent: `
      <h2>Cornell Agricultural Pest Identification Collection</h2>
      <p>This comprehensive image library contains over 500 high-resolution photographs of common agricultural pests and the damage patterns they create. The collection is designed to help farmers accurately identify pest issues in the field.</p>
      
      <h3>Contents Include:</h3>
      
      <h4>1. Insect Pest Galleries</h4>
      <p>Organized by crop type with detailed images of:</p>
      <ul>
        <li>Adult insects in various life stages</li>
        <li>Eggs and larval forms</li>
        <li>Characteristic damage patterns</li>
        <li>Look-alike beneficial insects for comparison</li>
      </ul>
      
      <h4>2. Disease Symptom Database</h4>
      <p>Visual reference for identifying plant diseases including:</p>
      <ul>
        <li>Early symptom identification</li>
        <li>Disease progression photographs</li>
        <li>Microscope images of pathogens where applicable</li>
        <li>Comparison of similar-looking diseases</li>
      </ul>
      
      <h4>3. Weed Identification Section</h4>
      <p>Comprehensive weed reference including:</p>
      <ul>
        <li>Images at various growth stages</li>
        <li>Seedling identification guides</li>
        <li>Root structure photographs</li>
        <li>Flower and seed characteristics</li>
      </ul>
      
      <h4>4. Reference Materials</h4>
      <p>Supporting documentation including:</p>
      <ul>
        <li>Identification keys</li>
        <li>Scientific and common name index</li>
        <li>Seasonal appearance timeline</li>
        <li>Host crop susceptibility charts</li>
      </ul>
      
      <p>All images are cataloged with metadata including the pest name, affected crop, geographic region, and severity level. The collection is organized in folders by pest type and crop family for easy navigation.</p>
      
      <p>This resource is particularly valuable for new farmers developing their pest identification skills and as a training tool for farm workers.</p>
    `
  },
  {
    id: 4,
    title: "Introduction to Regenerative Agriculture",
    description: "A video course introducing the principles and practices of regenerative agriculture for beginners.",
    author: "Regenerative Farming Institute",
    date: "June 5, 2023",
    category: "Education",
    fileType: "mp4",
    fileSize: "156.7 MB",
    downloads: 421,
    downloadUrl: "https://regenerativeagriculturefoundation.org/resources/intro-course.mp4",
    previewContent: `
      <h2>Regenerative Agriculture Fundamentals Video Course</h2>
      <p>This comprehensive video course provides farmers with a practical introduction to regenerative agriculture principles and implementation strategies. The course is designed for those new to regenerative methods but contains valuable information for experienced farmers transitioning from conventional practices.</p>
      
      <h3>Course Modules:</h3>
      
      <h4>Module 1: Core Principles (23 minutes)</h4>
      <ul>
        <li>The five principles of soil health</li>
        <li>Understanding carbon cycling in agricultural systems</li>
        <li>Water cycle enhancement</li>
        <li>Biodiversity as a farming tool</li>
        <li>Context-based decision making</li>
      </ul>
      
      <h4>Module 2: Soil Biology Fundamentals (27 minutes)</h4>
      <ul>
        <li>The soil food web explained</li>
        <li>Beneficial microorganisms and their functions</li>
        <li>Mycorrhizal fungi partnerships</li>
        <li>Creating conditions for biological abundance</li>
        <li>Simple soil biology assessments for farmers</li>
      </ul>
      
      <h4>Module 3: Cropping System Design (31 minutes)</h4>
      <ul>
        <li>Diverse crop rotations</li>
        <li>Cover cropping strategies for different regions</li>
        <li>Intercropping and companion planting</li>
        <li>Integrating perennials into annual systems</li>
        <li>Transition planning for conventional operations</li>
      </ul>
      
      <h4>Module 4: Livestock Integration (25 minutes)</h4>
      <ul>
        <li>Principles of adaptive grazing management</li>
        <li>Multi-species grazing systems</li>
        <li>Designing portable infrastructure</li>
        <li>Soil-building with proper grazing</li>
        <li>Winter grazing strategies</li>
      </ul>
      
      <h4>Module 5: Economic Considerations (19 minutes)</h4>
      <ul>
        <li>Transitional challenges and solutions</li>
        <li>Input reduction strategies</li>
        <li>New revenue opportunities</li>
        <li>Marketing regenerative products</li>
        <li>Measuring financial resilience</li>
      </ul>
      
      <h4>Module 6: Case Studies (38 minutes)</h4>
      <ul>
        <li>Small-scale market garden (2 acres)</li>
        <li>Mid-sized diverse farm (80 acres)</li>
        <li>Large-scale grain operation (1,200 acres)</li>
        <li>Livestock ranch (3,000 acres)</li>
        <li>Analysis of challenges and successes</li>
      </ul>
      
      <p>Each module includes practical demonstrations, farmer interviews, and clear explanations of biological processes. The course comes with a companion PDF guide containing checklists, resource lists, and implementation timelines.</p>
    `
  },
  {
    id: 5,
    title: "Farm Business Plan Template",
    description: "A customizable business plan template specifically designed for farm operations, including financial projections.",
    author: "Agricultural Finance Center",
    date: "February 18, 2023",
    category: "Business",
    fileType: "docx",
    fileSize: "3.2 MB",
    downloads: 1089,
    downloadUrl: "https://agfinance.org/templates/farm-business-plan-2023.docx",
    previewContent: `
      <h2>Comprehensive Farm Business Plan Template</h2>
      <p>This professionally designed business plan template is specifically created for agricultural enterprises. It provides a complete framework for developing a robust business plan that can be used for internal planning, loan applications, grant proposals, or investor presentations.</p>
      
      <h3>Template Sections:</h3>
      
      <h4>1. Executive Summary Template</h4>
      <p>Guidelines for creating a compelling overview of your farm business, including:</p>
      <ul>
        <li>Mission and vision statement frameworks</li>
        <li>Business concept articulation</li>
        <li>Key success factor identification</li>
        <li>Summary financial projection tables</li>
      </ul>
      
      <h4>2. Farm Description and Strategy</h4>
      <p>Detailed sections for defining your operation:</p>
      <ul>
        <li>Farm history and background</li>
        <li>Land resources and infrastructure inventory</li>
        <li>Production systems description</li>
        <li>Sustainability practices documentation</li>
        <li>Competitive advantage analysis</li>
      </ul>
      
      <h4>3. Market Analysis Framework</h4>
      <p>Templates for conducting thorough market research:</p>
      <ul>
        <li>Target market identification worksheets</li>
        <li>Competitor analysis matrices</li>
        <li>Market size and trends research guidance</li>
        <li>Pricing strategy development</li>
        <li>SWOT analysis templates</li>
      </ul>
      
      <h4>4. Marketing and Sales Strategies</h4>
      <p>Sections for developing your marketing approach:</p>
      <ul>
        <li>Brand positioning worksheet</li>
        <li>Marketing channel evaluation tools</li>
        <li>Customer acquisition strategy templates</li>
        <li>Relationship marketing planning</li>
        <li>Value-added opportunity assessment</li>
      </ul>
      
      <h4>5. Operation Plans</h4>
      <p>Frameworks for documenting your production systems:</p>
      <ul>
        <li>Production calendar templates</li>
        <li>Workflow optimization guides</li>
        <li>Equipment and infrastructure planning</li>
        <li>Supply chain management</li>
        <li>Risk assessment and mitigation planning</li>
      </ul>
      
      <h4>6. Comprehensive Financial Templates</h4>
      <p>Ready-to-use financial planning tools including:</p>
      <ul>
        <li>Start-up cost calculator</li>
        <li>5-year cash flow projections</li>
        <li>Enterprise budgets for multiple farm activities</li>
        <li>Break-even analysis worksheets</li>
        <li>Balance sheet and income statement templates</li>
        <li>Key financial ratio calculators</li>
      </ul>
      
      <h4>7. Management and Personnel Planning</h4>
      <p>Tools for addressing the human side of farming:</p>
      <ul>
        <li>Organizational structure templates</li>
        <li>Job description frameworks</li>
        <li>Compensation planning guides</li>
        <li>Training and development planning</li>
        <li>Succession planning considerations</li>
      </ul>
      
      <h4>8. Funding Request and Use of Funds</h4>
      <p>Templates for seeking external financing:</p>
      <ul>
        <li>Capital needs assessment</li>
        <li>Funding request frameworks</li>
        <li>Use of funds documentation</li>
        <li>Investor or lender return projections</li>
      </ul>
      
      <p>Each section includes sample text, clear instructions, and examples from different types of farm operations (livestock, crop, diversified, etc.). The template also features tips from agricultural lenders on what they look for in successful business plans.</p>
    `
  },
  {
    id: 6,
    title: "Soil Health Testing Protocol",
    description: "Standard procedures for testing and interpreting soil health indicators for various farming systems.",
    author: "Soil Science Society",
    date: "April 30, 2023",
    category: "Soil Management",
    fileType: "pdf",
    fileSize: "5.6 MB",
    downloads: 732,
    downloadUrl: "https://soilhealthinstitute.org/resources/soil-health-testing-protocol.pdf",
    previewContent: `
      <h2>Comprehensive Soil Health Assessment Protocol</h2>
      <p>This detailed guide provides farmers and agricultural professionals with standardized methods for evaluating and monitoring soil health. The protocol combines field assessments with laboratory analysis to create a complete picture of soil functionality.</p>
      
      <h3>Protocol Components:</h3>
      
      <h4>1. Field Assessment Procedures</h4>
      <p>Step-by-step instructions for in-field evaluations:</p>
      <ul>
        <li>Visual Soil Assessment (VSA) methodology</li>
        <li>Infiltration testing using single and double ring infiltrometers</li>
        <li>Soil structure and aggregate stability field tests</li>
        <li>Compaction measurement using penetrometers</li>
        <li>Earthworm population assessment</li>
        <li>Root development evaluation techniques</li>
      </ul>
      
      <h4>2. Sampling Methodology</h4>
      <p>Detailed guidance for collecting representative samples:</p>
      <ul>
        <li>Determining appropriate sampling density</li>
        <li>Proper sample timing for different indicators</li>
        <li>Depth considerations for various parameters</li>
        <li>Sample handling and storage procedures</li>
        <li>Chain of custody documentation</li>
      </ul>
      
      <h4>3. Core Laboratory Analyses</h4>
      <p>Specifications for essential soil health measurements:</p>
      <ul>
        <li>Soil organic matter determination methods</li>
        <li>Active carbon testing procedures</li>
        <li>Potentially mineralizable nitrogen assessment</li>
        <li>Soil respiration measurement</li>
        <li>Soil protein content analysis</li>
        <li>Aggregate stability testing protocols</li>
        <li>Available water capacity determination</li>
      </ul>
      
      <h4>4. Supplemental Analyses</h4>
      <p>Additional tests for comprehensive assessment:</p>
      <ul>
        <li>Soil microbial biomass measurement</li>
        <li>Enzyme activity assays</li>
        <li>Phospholipid fatty acid analysis (PLFA)</li>
        <li>Nematode community assessment</li>
        <li>Micronutrient availability testing</li>
      </ul>
      
      <h4>5. Data Interpretation Framework</h4>
      <p>Tools for making sense of soil health data:</p>
      <ul>
        <li>Regional reference values for different soil types</li>
        <li>Scoring functions for individual indicators</li>
        <li>Integrated soil health index calculation</li>
        <li>Management practice correlation guidelines</li>
        <li>Temporal trend analysis methods</li>
      </ul>
      
      <h4>6. Management Response Guidelines</h4>
      <p>Decision support for improving identified issues:</p>
      <ul>
        <li>Interpretation matrices linking indicators to management practices</li>
        <li>Threshold values for intervention</li>
        <li>Cover crop selection based on soil health constraints</li>
        <li>Amendment recommendations for different indicators</li>
        <li>Tillage modification decision trees</li>
        <li>Crop rotation design for soil health improvement</li>
      </ul>
      
      <p>The protocol includes detailed appendices with equipment specifications, laboratory method references, regional adjustment factors, and case studies demonstrating how the assessment results can inform management decisions. All procedures are consistent with standards developed by the Soil Health Institute and USDA-NRCS.</p>
    `
  },
];

// Function to get the appropriate icon based on file type
const getFileIcon = (fileType: string) => {
  switch (fileType) {
    case "pdf":
      return <File className="h-5 w-5 text-red-500" />;
    case "xlsx":
    case "csv":
      return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
    case "docx":
    case "doc":
      return <FileText className="h-5 w-5 text-blue-500" />;
    case "jpg":
    case "png":
    case "zip":
      return <FileImage className="h-5 w-5 text-purple-500" />;
    case "mp3":
    case "wav":
      return <FileAudio className="h-5 w-5 text-yellow-500" />;
    case "mp4":
    case "avi":
      return <FileVideo className="h-5 w-5 text-pink-500" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
};

export function ResourcesList() {
  const [resources, setResources] = useState(resourceData);
  const [selectedResource, setSelectedResource] = useState<typeof resourceData[0] | null>(null);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const { toast } = useToast();
  
  const handleDownload = (resource: typeof resourceData[0]) => {
    // Open the actual download URL in a new tab
    window.open(resource.downloadUrl, '_blank');
    
    // Show download toast notification
    toast({
      title: "Download Started",
      description: `Downloading ${resource.title} (${resource.fileSize})`,
    });
    
    // Increment the download count
    setResources(prevResources => 
      prevResources.map(r => 
        r.id === resource.id ? { ...r, downloads: r.downloads + 1 } : r
      )
    );
  };
  
  const handlePreview = (resource: typeof resourceData[0]) => {
    setSelectedResource(resource);
    setShowResourceModal(true);
  };
  
  return (
    <>
      <div className="space-y-4">
        {resources.map((resource) => (
          <Card key={resource.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  {getFileIcon(resource.fileType)}
                  <Badge variant="outline" className="bg-accent/50">
                    {resource.category}
                  </Badge>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  {resource.date}
                </div>
              </div>
              <CardTitle 
                className="text-lg mt-2 cursor-pointer hover:text-primary"
                onClick={() => handlePreview(resource)}
              >
                {resource.title}
              </CardTitle>
              <div className="flex items-center text-sm text-muted-foreground">
                <User2 className="h-3 w-3 mr-1" />
                {resource.author}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                {resource.description}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4 text-sm">
              <div className="flex items-center text-muted-foreground">
                <span className="uppercase mr-3">{resource.fileType}</span>
                <span>{resource.fileSize}</span>
                <span className="mx-3">•</span>
                <span>{resource.downloads} downloads</span>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => handlePreview(resource)}
                >
                  <FileText className="h-4 w-4" />
                  Preview
                </Button>
                <Button 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => handleDownload(resource)}
                >
                  <ArrowDownToLine className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Resource Preview Modal */}
      {selectedResource && (
        <Dialog open={showResourceModal} onOpenChange={setShowResourceModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <div className="flex items-center gap-2">
                {getFileIcon(selectedResource.fileType)}
                <DialogTitle>{selectedResource.title}</DialogTitle>
              </div>
              <DialogDescription className="flex justify-between items-center">
                <span>
                  By {selectedResource.author} • {selectedResource.date}
                </span>
                <Badge variant="outline">{selectedResource.category}</Badge>
              </DialogDescription>
            </DialogHeader>
            
            <ScrollArea className="h-[calc(100vh-200px)] mt-4">
              <div 
                className="prose prose-stone max-w-none px-1"
                dangerouslySetInnerHTML={{ __html: selectedResource.previewContent }}
              />
              
              <div className="mt-8 flex justify-between items-center border-t pt-6">
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center gap-1 mb-1">
                    <FileText className="h-4 w-4" />
                    {selectedResource.fileType.toUpperCase()} • {selectedResource.fileSize}
                  </div>
                  <div>
                    {selectedResource.downloads} downloads
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button 
                    variant="outline"
                    onClick={() => setShowResourceModal(false)}
                  >
                    Close Preview
                  </Button>
                  <Button 
                    className="flex items-center gap-1"
                    onClick={() => {
                      handleDownload(selectedResource);
                      setShowResourceModal(false);
                    }}
                  >
                    <ArrowDownToLine className="h-4 w-4" />
                    Download File
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
