
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  ExternalLink, 
  GraduationCap, 
  Link, 
  UserPlus, 
  Video,
  Carrot,
  Sprout,
  Apple,
  Leaf,
  Wheat,
  CloudRain,
  Sun,
  Tractor
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export function ResourcesContent() {
  const { toast } = useToast();
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [showFarmingTypeInfo, setShowFarmingTypeInfo] = useState(false);
  const [selectedFarmingType, setSelectedFarmingType] = useState<FarmingType | null>(null);

  // Handle resource interaction
  const handleResourceClick = (resource: string) => {
    const resourceUrls: Record<string, string> = {
      "usda": "https://www.farmers.gov/your-business/beginning-farmers",
      "videos": "https://www.youtube.com/playlist?list=PLhQpDGfX5e7AgV_6jpvKJeVU5T1F0BAgJ",
      "extension": "https://nifa.usda.gov/extension",
      "mentor": "https://www.farmcommons.org/farm-interns-and-apprentices"
    };

    if (resourceUrls[resource]) {
      window.open(resourceUrls[resource], '_blank');
    } else {
      toast({
        title: "Resource Access",
        description: `${resource} resources are being prepared. Check back soon!`,
      });
    }
  };

  // Farming type information
  interface FarmingType {
    id: string;
    title: string;
    icon: React.ReactNode;
    description: string;
    benefits: string[];
    challenges: string[];
    startingSteps: string[];
    resources: {
      title: string;
      url?: string;
      description: string;
    }[];
  }

  const farmingTypes: FarmingType[] = [
    {
      id: "market-gardening",
      title: "Market Gardening",
      icon: <Carrot className="h-6 w-6 text-farm-green" />,
      description: "Small-scale intensive cultivation of vegetables, fruits, and flowers for direct marketing to customers.",
      benefits: [
        "Low startup costs compared to other farming types",
        "Can be profitable on small acreage (1-2 acres)",
        "Direct marketing creates better profit margins",
        "Diverse crops reduce risk of total crop failure",
        "Can start part-time while maintaining other employment"
      ],
      challenges: [
        "Labor intensive with significant physical work",
        "Requires consistent production planning",
        "Marketing and customer relations take significant time",
        "Weather variability affects production",
        "Seasonal income fluctuations"
      ],
      startingSteps: [
        "Start with ¼ to ½ acre and expand as you gain experience",
        "Focus on high-value, quick-growing crops initially",
        "Establish irrigation, basic storage, and season extension",
        "Research farmers markets, CSAs, and restaurant sales",
        "Create detailed growing schedule for succession planting"
      ],
      resources: [
        {
          title: "The Market Gardener by Jean-Martin Fortier",
          url: "https://www.themarketgardener.com/book",
          description: "Essential book on small-scale organic vegetable production"
        },
        {
          title: "ATTRA's Market Gardening Guide",
          url: "https://attra.ncat.org/product/market-gardening-a-start-up-guide/",
          description: "Free online resource with production and marketing guidance"
        },
        {
          title: "Curtis Stone YouTube Channel",
          url: "https://www.youtube.com/c/UrbanFarmerCurtisStone",
          description: "Practical videos on urban market gardening"
        }
      ]
    },
    {
      id: "backyard-homesteading",
      title: "Backyard Homesteading",
      icon: <Sprout className="h-6 w-6 text-farm-green" />,
      description: "Self-sufficient living combining vegetable gardening, small livestock, and food preservation on residential property.",
      benefits: [
        "Can be started on typical residential lot",
        "Reduces household food expenses",
        "Provides food security and self-reliance",
        "Low financial risk as it's primarily for home use",
        "Educational opportunity for families"
      ],
      challenges: [
        "Local zoning may restrict livestock",
        "Limited space requires careful planning",
        "Daily animal care requirements",
        "Learning multiple skills simultaneously",
        "May not generate significant income"
      ],
      startingSteps: [
        "Research zoning laws regarding livestock and structures",
        "Start with a vegetable garden of foods your family eats",
        "Add easy livestock like chickens or rabbits first",
        "Learn food preservation techniques (canning, freezing, dehydrating)",
        "Connect with local homesteaders for advice and community"
      ],
      resources: [
        {
          title: "The Backyard Homestead by Carleen Madigan",
          url: "https://www.amazon.com/Backyard-Homestead-Produce-food-quarter/dp/1603421386",
          description: "Comprehensive guide to producing food on a quarter acre"
        },
        {
          title: "Mother Earth News",
          url: "https://www.motherearthnews.com/",
          description: "Magazine with extensive homesteading articles and advice"
        },
        {
          title: "Homesteading Forum",
          url: "https://www.homesteadingtoday.com/",
          description: "Active online community for homesteading support"
        }
      ]
    },
    {
      id: "u-pick-operation",
      title: "U-Pick Operation",
      icon: <Apple className="h-6 w-6 text-red-500" />,
      description: "Fruit or vegetable farm where customers harvest their own produce, creating an agritourism experience.",
      benefits: [
        "Reduced labor costs as customers harvest crops",
        "Creates direct connection with customers",
        "Higher profit margins than wholesale",
        "Potential for additional revenue through value-added products",
        "Seasonal operation with concentrated work periods"
      ],
      challenges: [
        "Liability insurance requirements",
        "Need for parking and facilities for visitors",
        "Weather-dependent customer traffic",
        "Marketing and customer experience management",
        "Crop timing and availability management"
      ],
      startingSteps: [
        "Choose crops that harvest well by inexperienced pickers",
        "Develop infrastructure for parking, restrooms, and checkout",
        "Establish clear policies for pricing and harvesting guidelines",
        "Use social media to announce harvest availability",
        "Consider complementary products for additional sales"
      ],
      resources: [
        {
          title: "North American Farm Direct Marketing Association",
          url: "https://nafdma.com/",
          description: "Resources for agritourism and U-Pick operations"
        },
        {
          title: "Starting a U-Pick Enterprise Guide",
          url: "https://extension.psu.edu/starting-a-pick-your-own-operation",
          description: "University extension guide to U-Pick businesses"
        },
        {
          title: "Farm liability insurance providers",
          description: "Essential for protecting your operation"
        }
      ]
    },
    {
      id: "microgreens",
      title: "Microgreens Production",
      icon: <Leaf className="h-6 w-6 text-green-600" />,
      description: "Growing nutrient-dense seedlings harvested at an early stage for high-value culinary uses.",
      benefits: [
        "Can be grown indoors year-round in small spaces",
        "Quick growing cycle (7-14 days) enables fast cash flow",
        "High-value crop with strong profit margins",
        "No special equipment needed to start small",
        "Minimal pest and disease issues"
      ],
      challenges: [
        "Requires consistent daily attention",
        "Limited shelf life requires timely delivery",
        "Need to develop consistent restaurant clientele",
        "Scaling up requires efficient systems",
        "Market education sometimes necessary"
      ],
      startingSteps: [
        "Create clean, temperature-controlled space with good lighting",
        "Begin with popular varieties like sunflower, pea, radish, and broccoli",
        "Develop systems for seeding, watering, and harvesting",
        "Approach high-end restaurants and farmers markets",
        "Increase production as you secure reliable customers"
      ],
      resources: [
        {
          title: "Microgreens: A Guide to Growing Nutrient-Packed Greens",
          url: "https://www.amazon.com/Microgreens-Growing-Nutrient-Packed-Greens-Countertop/dp/1423640217",
          description: "Comprehensive book on production techniques"
        },
        {
          title: "Johnny's Selected Seeds",
          url: "https://www.johnnyseeds.com/growers-library/vegetables/microgreens-guide.html",
          description: "Quality microgreen seed supplier with educational resources"
        },
        {
          title: "On The Grow YouTube Channel",
          url: "https://www.youtube.com/c/onthegrow",
          description: "Visual learning resources for setup and techniques"
        }
      ]
    },
    {
      id: "pastured-poultry",
      title: "Pastured Poultry",
      icon: <Wheat className="h-6 w-6 text-amber-600" />,
      description: "Raising chickens, turkeys or other poultry on pasture using movable housing for eggs or meat production.",
      benefits: [
        "Relatively quick return on investment",
        "Can start small and scale up gradually",
        "Strong demand for pasture-raised poultry products",
        "Improves soil fertility as birds fertilize pasture",
        "Multiple revenue streams possible (meat, eggs)"
      ],
      challenges: [
        "Daily management required for moving pens",
        "Predator protection essential",
        "Processing regulations can be complex",
        "Seasonal production in cold climates",
        "Feed costs can affect profitability"
      ],
      startingSteps: [
        "Understand local regulations regarding poultry production and processing",
        "Create or purchase movable chicken tractors or day-range systems",
        "Begin with 50-100 birds to learn management techniques",
        "Build customer base through farmers markets or direct marketing",
        "Explore options like bone broth or pre-made meals for additional revenue"
      ],
      resources: [
        {
          title: "Pastured Poultry Profit$ by Joel Salatin",
          url: "https://www.amazon.com/Pastured-Poultry-Profit-Salatin-Polyface/dp/0963810936",
          description: "Essential guide to pastured poultry systems"
        },
        {
          title: "American Pastured Poultry Producers Association",
          url: "https://apppa.org/",
          description: "Industry organization with extensive resources"
        },
        {
          title: "Poultrykeeper.com",
          url: "https://poultrykeeper.com/",
          description: "Practical information on chicken keeping and health"
        }
      ]
    },
    {
      id: "mushroom-farming",
      title: "Mushroom Farming",
      icon: <CloudRain className="h-6 w-6 text-blue-500" />,
      description: "Indoor or outdoor cultivation of gourmet and medicinal mushrooms for local markets.",
      benefits: [
        "Can be grown indoors year-round in small spaces",
        "Uses agricultural waste products as growing medium",
        "High value crop with good profit potential",
        "Multiple markets available (restaurants, farmers markets, medicinal)",
        "Can be combined with forest farming for outdoor varieties"
      ],
      challenges: [
        "Requires careful attention to sterile procedures",
        "Temperature and humidity control critical",
        "Learning curve for cultivation techniques",
        "Limited shelf life requires good timing",
        "Market education sometimes necessary"
      ],
      startingSteps: [
        "Start with easier varieties like oyster mushrooms",
        "Create clean space with temperature and humidity control",
        "Master the basics of sterile cultivation to prevent contamination",
        "Begin with pre-made spawn before attempting full cultivation",
        "Connect with chefs, farmers markets, and health food stores"
      ],
      resources: [
        {
          title: "Growing Gourmet and Medicinal Mushrooms by Paul Stamets",
          url: "https://www.amazon.com/Growing-Gourmet-Medicinal-Mushrooms-Stamets/dp/1580081754",
          description: "Comprehensive guide to mushroom cultivation"
        },
        {
          title: "North American Mycological Association",
          url: "https://namyco.org/",
          description: "Educational resources and community connections"
        },
        {
          title: "Field & Forest Products",
          url: "https://www.fieldforest.net/",
          description: "Quality supplier of mushroom spawn and equipment"
        }
      ]
    },
    {
      id: "herb-farming",
      title: "Herb Farming",
      icon: <Leaf className="h-6 w-6 text-green-700" />,
      description: "Growing culinary, medicinal, or aromatic herbs for fresh and value-added markets.",
      benefits: [
        "High value crops can be grown in small spaces",
        "Multiple market channels (fresh, dried, value-added)",
        "Many perennial options require less annual planting",
        "Extended season possible with simple protection",
        "Potential for agritourism and education"
      ],
      challenges: [
        "Labor intensive for harvest and processing",
        "Specialized knowledge for medicinal herbs",
        "Post-harvest handling critical for quality",
        "Certifications important for medicinal markets",
        "Competition from imported products"
      ],
      startingSteps: [
        "Identify local demand for specific herbs and products",
        "Begin with familiar herbs that have established markets",
        "Create space for drying, processing, and packaging",
        "Consider teas, salves, or seasonings for additional revenue",
        "Connect with chefs, herbalists, and health food stores"
      ],
      resources: [
        {
          title: "The Organic Medicinal Herb Farmer",
          url: "https://www.amazon.com/Organic-Medicinal-Herb-Farmer-Successful/dp/1603585737",
          description: "Practical guide to commercial herb production"
        },
        {
          title: "American Herb Association",
          url: "https://www.ahaherb.com/",
          description: "Industry information and networking opportunities"
        },
        {
          title: "Richters Herbs",
          url: "https://www.richters.com/",
          description: "Quality supplier with extensive cultivar selection"
        }
      ]
    },
    {
      id: "cut-flowers",
      title: "Cut Flower Farming",
      icon: <Sun className="h-6 w-6 text-yellow-500" />,
      description: "Growing annual and perennial flowers for fresh bouquets, florists, and event markets.",
      benefits: [
        "High-value crop with strong profit potential",
        "Can be productive on small acreage (1 acre or less)",
        "Different market channels available (direct, wholesale, weddings)",
        "Creative and aesthetically rewarding",
        "Growing local flower movement provides market support"
      ],
      challenges: [
        "Highly seasonal in most climates",
        "Labor intensive for planting, harvesting, and arranging",
        "Post-harvest handling critical for quality",
        "Requires succession planting for continuous bloom",
        "Competition from imported flowers"
      ],
      startingSteps: [
        "Identify flowers with good vase life and market demand",
        "Begin with 1/4 acre and focus on season-long production",
        "Create efficient harvest, processing, and cooling systems",
        "Connect with florists, farmers markets, and event planners",
        "Explore wedding and event work for additional revenue"
      ],
      resources: [
        {
          title: "The Flower Farmer by Lynn Byczynski",
          url: "https://www.amazon.com/Flower-Farmer-Organic-Business-Gardeners/dp/1933392657",
          description: "Classic guide to small-scale cut flower production"
        },
        {
          title: "Association of Specialty Cut Flower Growers",
          url: "https://www.ascfg.org/",
          description: "Industry organization with extensive resources"
        },
        {
          title: "Floret Farm's resources",
          url: "https://www.floretflowers.com/resources/",
          description: "Educational materials from leading flower farmers"
        }
      ]
    },
    {
      id: "grass-fed-beef",
      title: "Small-Scale Grass-Fed Beef",
      icon: <Tractor className="h-6 w-6 text-farm-wheat-dark" />,
      description: "Raising cattle on pasture without grain finishing for direct marketing of premium beef.",
      benefits: [
        "Premium pricing for grass-fed beef",
        "Lower daily labor than many other farm enterprises",
        "Improves soil through proper grazing management",
        "Converts marginal land into productive acreage",
        "Can be managed part-time with proper setup"
      ],
      challenges: [
        "Significant land requirement (minimum 10+ acres)",
        "Higher initial investment for livestock purchase",
        "Longer time to first revenue (1-2 years)",
        "Processing logistics and regulations",
        "Marketing larger quantity of product at once"
      ],
      startingSteps: [
        "Set up fencing, water systems, and handling facilities",
        "Enhance pasture diversity before adding animals",
        "Begin with 3-5 animals to learn management techniques",
        "Research USDA-inspected processors in your area",
        "Build customer base for bulk beef purchases"
      ],
      resources: [
        {
          title: "Grass-Fed Cattle by Julius Ruechel",
          url: "https://www.amazon.com/Grass-Fed-Cattle-Produce-Market-Natural/dp/1580176054",
          description: "Comprehensive guide to raising grass-fed beef"
        },
        {
          title: "American Grassfed Association",
          url: "https://www.americangrassfed.org/",
          description: "Industry standards and marketing support"
        },
        {
          title: "Graze Magazine",
          url: "https://www.grazeonline.com/",
          description: "Publication focused on grass-based livestock production"
        }
      ]
    },
    {
      id: "aquaponics",
      title: "Aquaponics",
      icon: <CloudRain className="h-6 w-6 text-blue-400" />,
      description: "Integrated system that combines fish farming with hydroponic plant production in a symbiotic environment.",
      benefits: [
        "Produces both fish and vegetables from one system",
        "Can be operated in non-traditional spaces (warehouses, etc.)",
        "Water-efficient compared to traditional agriculture",
        "Year-round production possible with climate control",
        "Growing interest provides marketing storytelling opportunities"
      ],
      challenges: [
        "Complex system requires technical knowledge",
        "Higher startup costs for infrastructure",
        "Requires consistent monitoring and backup systems",
        "Energy costs for pumps and climate control",
        "Steep learning curve for balancing ecosystem"
      ],
      startingSteps: [
        "Begin with a demo system to learn fundamental principles",
        "Understand fish farming regulations in your area",
        "Create system with backup power and minimize energy use",
        "Select fish and plants that thrive in similar conditions",
        "Identify premium markets for both fish and produce"
      ],
      resources: [
        {
          title: "Aquaponic Gardening by Sylvia Bernstein",
          url: "https://www.amazon.com/Aquaponic-Gardening-Step-By-Step-Vegetables-Together/dp/086571701X",
          description: "Foundational guide to small-scale aquaponics"
        },
        {
          title: "Aquaponic Association",
          url: "https://aquaponicsassociation.org/",
          description: "Industry organization with training and resources"
        },
        {
          title: "Friendly Aquaponics",
          url: "https://www.friendlyaquaponics.com/",
          description: "Commercial-scale system designs and training"
        }
      ]
    }
  ];

  // Handle farming type selection
  const handleFarmingTypeClick = (farmingType: FarmingType) => {
    setSelectedFarmingType(farmingType);
    setShowFarmingTypeInfo(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium">Learning Resources for New Farmers</h4>
        <p className="text-sm text-muted-foreground">Curated educational materials to help you succeed</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => handleResourceClick("usda")}>
          <div className="flex items-start">
            <BookOpen className="h-8 w-8 text-farm-green mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium">USDA Beginning Farmer Resources</h4>
              <p className="text-sm text-muted-foreground mt-1">Comprehensive guides, programs and financial assistance specifically for new farmers.</p>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="text-xs">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Visit Website
                </Button>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => handleResourceClick("videos")}>
          <div className="flex items-start">
            <Video className="h-8 w-8 text-farm-green mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium">Video Tutorial Library</h4>
              <p className="text-sm text-muted-foreground mt-1">Step-by-step video guides covering essential farming practices and techniques.</p>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="text-xs">
                  <Link className="h-3 w-3 mr-1" />
                  Access Videos
                </Button>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => handleResourceClick("extension")}>
          <div className="flex items-start">
            <GraduationCap className="h-8 w-8 text-farm-green mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium">Extension Office Programs</h4>
              <p className="text-sm text-muted-foreground mt-1">Local agricultural extension offices provide education and support for farmers in your area.</p>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="text-xs">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Find Your Office
                </Button>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => handleResourceClick("mentor")}>
          <div className="flex items-start">
            <UserPlus className="h-8 w-8 text-farm-green mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium">Mentorship Network</h4>
              <p className="text-sm text-muted-foreground mt-1">Connect with experienced farmers who can provide guidance and practical advice.</p>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="text-xs">
                  <Link className="h-3 w-3 mr-1" />
                  Find a Mentor
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <div>
        <h4 className="font-medium mb-3">Beginner Farming Types</h4>
        <p className="text-sm text-muted-foreground mb-4">Explore different farming approaches suitable for beginners</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {farmingTypes.map((type) => (
            <Card 
              key={type.id}
              className="p-4 hover:bg-muted/20 transition-colors cursor-pointer"
              onClick={() => handleFarmingTypeClick(type)}
            >
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-farm-green/10 flex items-center justify-center mb-3">
                  {type.icon}
                </div>
                <h4 className="font-medium">{type.title}</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{type.description}</p>
                <Button variant="ghost" size="sm" className="mt-2 text-xs">
                  Learn More
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="bg-farm-green/10 p-4 rounded-lg mt-6">
        <h4 className="font-medium mb-2">Recommended Learning Path</h4>
        <ol className="text-sm space-y-3 ml-4 list-decimal">
          <li className="pl-1">
            <span className="font-medium">Introduction to Sustainable Farming (2 hours)</span>
            <p className="text-muted-foreground mt-1">Overview of sustainable farming principles and practices</p>
          </li>
          <li className="pl-1">
            <span className="font-medium">Farm Business Planning (3 hours)</span>
            <p className="text-muted-foreground mt-1">Developing a business plan and financial projections</p>
          </li>
          <li className="pl-1">
            <span className="font-medium">Soil Health Management (4 hours)</span>
            <p className="text-muted-foreground mt-1">Understanding soil testing, amendments, and conservation</p>
          </li>
          <li className="pl-1">
            <span className="font-medium">Crop Planning & Rotation (2 hours)</span>
            <p className="text-muted-foreground mt-1">Planning seasonal crops and effective rotation strategies</p>
          </li>
        </ol>
      </div>

      {/* Farming Type Info Dialog */}
      <Dialog open={showFarmingTypeInfo} onOpenChange={setShowFarmingTypeInfo}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedFarmingType?.icon}
              {selectedFarmingType?.title}
            </DialogTitle>
            <DialogDescription>{selectedFarmingType?.description}</DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-6 p-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Benefits</h3>
                  <ul className="space-y-2">
                    {selectedFarmingType?.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Sprout className="h-4 w-4 text-farm-green mt-1" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Challenges</h3>
                  <ul className="space-y-2">
                    {selectedFarmingType?.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Sprout className="h-4 w-4 text-amber-500 mt-1" />
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Getting Started</h3>
                <ol className="space-y-3 list-decimal pl-5">
                  {selectedFarmingType?.startingSteps.map((step, index) => (
                    <li key={index} className="pl-1">
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Key Resources</h3>
                <div className="space-y-4">
                  {selectedFarmingType?.resources.map((resource, index) => (
                    <div key={index} className="border p-3 rounded-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{resource.title}</h4>
                          <p className="text-sm text-muted-foreground">{resource.description}</p>
                        </div>
                        {resource.url && (
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Access
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Suitability for Beginners</h3>
                  <Badge className="bg-farm-green">Beginner Friendly</Badge>
                </div>
                <p className="mt-2">
                  {selectedFarmingType?.title} is generally considered accessible for beginning farmers, 
                  particularly if you start small and scale up gradually as you build experience. 
                  The key is to start with proper education, have realistic expectations, and connect 
                  with experienced mentors in this farming type.
                </p>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
