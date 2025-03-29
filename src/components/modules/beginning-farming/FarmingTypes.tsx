
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Leaf, 
  Tractor, 
  Sprout, 
  Carrot,
  Apple,
  Sun,
  CloudRain,
  Wheat,
  Download,
  Share2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useMobile } from "@/hooks/use-mobile";

interface FarmingTypeDetail {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  expertise: number; // 1-5 scale
  initialCost: number; // 1-5 scale
  profitPotential: number; // 1-5 scale
  timeCommitment: number; // 1-5 scale
  landRequired: number; // 1-5 scale
  benefits: string[];
  challenges: string[];
  bestFor: string[];
  keyResources: {
    title: string;
    url?: string;
    description: string;
  }[];
  steps: {
    title: string;
    description: string;
  }[];
}

export function FarmingTypes() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [userInterest, setUserInterest] = useState<Record<string, number>>({});
  const [savedNotes, setSavedNotes] = useState<Record<string, string>>({});
  const [currentNote, setCurrentNote] = useState("");
  const [isNoteSheetOpen, setIsNoteSheetOpen] = useState(false);
  const [isResourceOpen, setIsResourceOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [showCompare, setShowCompare] = useState(false);
  const [compareTypes, setCompareTypes] = useState<string[]>([]);
  const isMobile = useMobile();
  const { toast } = useToast();

  // Load saved user data from localStorage on component mount
  useEffect(() => {
    const savedInterest = localStorage.getItem('farmingTypesInterest');
    const savedUserNotes = localStorage.getItem('farmingTypesNotes');
    
    if (savedInterest) {
      setUserInterest(JSON.parse(savedInterest));
    }
    
    if (savedUserNotes) {
      setSavedNotes(JSON.parse(savedUserNotes));
    }
  }, []);

  // Save user interest to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(userInterest).length > 0) {
      localStorage.setItem('farmingTypesInterest', JSON.stringify(userInterest));
    }
  }, [userInterest]);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(savedNotes).length > 0) {
      localStorage.setItem('farmingTypesNotes', JSON.stringify(savedNotes));
    }
  }, [savedNotes]);

  const farmingTypes: FarmingTypeDetail[] = [
    {
      id: "market-gardening",
      title: "Market Gardening",
      description: "Small-scale intensive cultivation of vegetables, fruits, and flowers for direct marketing to customers.",
      icon: <Carrot className="h-6 w-6 text-farm-green" />,
      expertise: 2,
      initialCost: 2,
      profitPotential: 3,
      timeCommitment: 4,
      landRequired: 2,
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
      bestFor: [
        "Beginning farmers with limited land",
        "Urban or peri-urban farmers",
        "Those interested in sustainable growing methods",
        "People with strong customer service skills"
      ],
      keyResources: [
        {
          title: "The Market Gardener by Jean-Martin Fortier",
          description: "Essential book on small-scale organic vegetable production"
        },
        {
          title: "ATTRA's Market Gardening Guide",
          description: "Free online resource with production and marketing guidance"
        },
        {
          title: "Local Extension Office",
          description: "Connect for region-specific growing information"
        }
      ],
      steps: [
        {
          title: "Start Small",
          description: "Begin with ¼ to ½ acre and expand as you gain experience"
        },
        {
          title: "Choose Strategic Crops",
          description: "Focus on high-value, quick-growing crops initially"
        },
        {
          title: "Set Up Simple Infrastructure",
          description: "Establish irrigation, basic storage, and season extension"
        },
        {
          title: "Find Direct Markets",
          description: "Research farmers markets, CSAs, and restaurant sales"
        },
        {
          title: "Create Growing Schedule",
          description: "Plan succession planting for continuous harvests"
        }
      ]
    },
    {
      id: "backyard-homesteading",
      title: "Backyard Homesteading",
      description: "Self-sufficient living combining vegetable gardening, small livestock, and food preservation on residential property.",
      icon: <Sprout className="h-6 w-6 text-farm-green" />,
      expertise: 2,
      initialCost: 2,
      profitPotential: 1,
      timeCommitment: 3,
      landRequired: 1,
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
      bestFor: [
        "Families wanting to reduce food expenses",
        "Those passionate about food quality and self-sufficiency",
        "Beginning farmers testing their interest before scaling up",
        "People with day jobs wanting to farm part-time"
      ],
      keyResources: [
        {
          title: "The Backyard Homestead by Carleen Madigan",
          description: "Comprehensive guide to producing food on a quarter acre"
        },
        {
          title: "Mother Earth News",
          description: "Magazine with extensive homesteading articles and advice"
        },
        {
          title: "County Extension Office",
          description: "Information on local regulations and growing conditions"
        }
      ],
      steps: [
        {
          title: "Check Local Regulations",
          description: "Research zoning laws regarding livestock and structures"
        },
        {
          title: "Start a Garden",
          description: "Begin with vegetables your family eats regularly"
        },
        {
          title: "Add Easy Livestock",
          description: "Consider chickens or rabbits as first animals"
        },
        {
          title: "Learn Preservation",
          description: "Develop canning, freezing, and dehydrating skills"
        },
        {
          title: "Build Support Network",
          description: "Connect with local homesteaders for advice and community"
        }
      ]
    },
    {
      id: "u-pick-operation",
      title: "U-Pick Operation",
      description: "Fruit or vegetable farm where customers harvest their own produce, creating an agritourism experience.",
      icon: <Apple className="h-6 w-6 text-red-500" />,
      expertise: 3,
      initialCost: 3,
      profitPotential: 3,
      timeCommitment: 3,
      landRequired: 3,
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
      bestFor: [
        "Farmers with good location near population centers",
        "People who enjoy customer interaction",
        "Those with perennial fruit crops like berries or tree fruits",
        "Farmers interested in agritourism opportunities"
      ],
      keyResources: [
        {
          title: "North American Berry Growers Association",
          description: "Information specific to berry U-Pick operations"
        },
        {
          title: "Farm liability insurance providers",
          description: "Essential for protecting your operation"
        },
        {
          title: "Local tourism office",
          description: "Can help with marketing and visibility"
        }
      ],
      steps: [
        {
          title: "Choose the Right Crops",
          description: "Select crops that harvest well by inexperienced pickers"
        },
        {
          title: "Create Infrastructure",
          description: "Develop parking, restrooms, and checkout facilities"
        },
        {
          title: "Establish Clear Policies",
          description: "Set pricing, containers, and harvesting guidelines"
        },
        {
          title: "Develop Marketing Strategy",
          description: "Use social media to announce harvest availability"
        },
        {
          title: "Consider Complementary Products",
          description: "Add jams, baked goods, or other items for additional sales"
        }
      ]
    },
    {
      id: "microgreens",
      title: "Microgreens Production",
      description: "Growing nutrient-dense seedlings harvested at an early stage for high-value culinary uses.",
      icon: <Leaf className="h-6 w-6 text-green-600" />,
      expertise: 2,
      initialCost: 1,
      profitPotential: 4,
      timeCommitment: 3,
      landRequired: 1,
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
      bestFor: [
        "Urban farmers with limited space",
        "First-time farmers looking for low-risk entry",
        "Part-time farmers with day jobs",
        "Farmers in climates with harsh outdoor conditions"
      ],
      keyResources: [
        {
          title: "Microgreens: A Guide to Growing Nutrient-Packed Greens",
          description: "Comprehensive book on production techniques"
        },
        {
          title: "Johnny's Selected Seeds",
          description: "Quality microgreen seed supplier with educational resources"
        },
        {
          title: "YouTube channels on microgreen production",
          description: "Visual learning resources for setup and techniques"
        }
      ],
      steps: [
        {
          title: "Set Up Growing Area",
          description: "Create clean, temperature-controlled space with good lighting"
        },
        {
          title: "Start with Popular Varieties",
          description: "Begin with sunflower, pea, radish, and broccoli microgreens"
        },
        {
          title: "Develop Standard Procedures",
          description: "Create systems for seeding, watering, and harvesting"
        },
        {
          title: "Find Initial Customers",
          description: "Approach high-end restaurants and farmers markets"
        },
        {
          title: "Scale Gradually",
          description: "Increase production as you secure reliable customers"
        }
      ]
    },
    {
      id: "pastured-poultry",
      title: "Pastured Poultry",
      description: "Raising chickens, turkeys or other poultry on pasture using movable housing for eggs or meat production.",
      icon: <Wheat className="h-6 w-6 text-amber-600" />,
      expertise: 2,
      initialCost: 2,
      profitPotential: 3,
      timeCommitment: 3,
      landRequired: 2,
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
      bestFor: [
        "Beginning farmers with some outdoor space",
        "Those interested in regenerative agriculture",
        "Farmers wanting to diversify existing operations",
        "People comfortable working with animals"
      ],
      keyResources: [
        {
          title: "Pastured Poultry Profit$ by Joel Salatin",
          description: "Essential guide to pastured poultry systems"
        },
        {
          title: "APPPA (American Pastured Poultry Producers Association)",
          description: "Industry organization with extensive resources"
        },
        {
          title: "Local poultry extension specialist",
          description: "Information on regulations and best practices"
        }
      ],
      steps: [
        {
          title: "Research Regulations",
          description: "Understand local regulations regarding poultry production and processing"
        },
        {
          title: "Build Simple Infrastructure",
          description: "Create or purchase movable chicken tractors or day-range systems"
        },
        {
          title: "Start Small",
          description: "Begin with 50-100 birds to learn management techniques"
        },
        {
          title: "Develop Marketing Channels",
          description: "Build customer base through farmers markets or direct marketing"
        },
        {
          title: "Consider Value-Added Products",
          description: "Explore options like bone broth or pre-made meals for additional revenue"
        }
      ]
    },
    {
      id: "mushroom-farming",
      title: "Mushroom Farming",
      description: "Indoor or outdoor cultivation of gourmet and medicinal mushrooms for local markets.",
      icon: <CloudRain className="h-6 w-6 text-blue-500" />,
      expertise: 3,
      initialCost: 2,
      profitPotential: 3,
      timeCommitment: 3,
      landRequired: 1,
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
      bestFor: [
        "Indoor or urban farmers with limited outdoor space",
        "Detail-oriented beginners willing to learn technical skills",
        "Woodland owners interested in forest farming",
        "Farmers looking for unique high-value products"
      ],
      keyResources: [
        {
          title: "Growing Gourmet and Medicinal Mushrooms by Paul Stamets",
          description: "Comprehensive guide to mushroom cultivation"
        },
        {
          title: "North American Mycological Association",
          description: "Educational resources and community connections"
        },
        {
          title: "Field & Forest Products",
          description: "Quality supplier of mushroom spawn and equipment"
        }
      ],
      steps: [
        {
          title: "Choose Your Species",
          description: "Start with easier varieties like oyster mushrooms"
        },
        {
          title: "Set Up Growing Area",
          description: "Create clean space with temperature and humidity control"
        },
        {
          title: "Learn Sterile Technique",
          description: "Master the basics of clean cultivation to prevent contamination"
        },
        {
          title: "Start Small",
          description: "Begin with pre-made spawn before attempting full cultivation"
        },
        {
          title: "Develop Marketing Channels",
          description: "Connect with chefs, farmers markets, and health food stores"
        }
      ]
    },
    {
      id: "herb-farming",
      title: "Herb Farming",
      description: "Growing culinary, medicinal, or aromatic herbs for fresh and value-added markets.",
      icon: <Leaf className="h-6 w-6 text-green-700" />,
      expertise: 2,
      initialCost: 2,
      profitPotential: 3,
      timeCommitment: 3,
      landRequired: 2,
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
      bestFor: [
        "Gardeners transitioning to commercial production",
        "Those interested in plant medicine and traditional knowledge",
        "Farmers looking for high-value specialty crops",
        "People with interest in value-added production"
      ],
      keyResources: [
        {
          title: "The Organic Medicinal Herb Farmer",
          description: "Practical guide to commercial herb production"
        },
        {
          title: "American Herb Association",
          description: "Industry information and networking opportunities"
        },
        {
          title: "Richters Herbs",
          description: "Quality supplier with extensive cultivar selection"
        }
      ],
      steps: [
        {
          title: "Research Market Opportunities",
          description: "Identify local demand for specific herbs and products"
        },
        {
          title: "Start with Culinary Herbs",
          description: "Begin with familiar herbs that have established markets"
        },
        {
          title: "Set Up Efficient Systems",
          description: "Create space for drying, processing, and packaging"
        },
        {
          title: "Develop Value-Added Products",
          description: "Consider teas, salves, or seasonings for additional revenue"
        },
        {
          title: "Build Relationships",
          description: "Connect with chefs, herbalists, and health food stores"
        }
      ]
    },
    {
      id: "cut-flowers",
      title: "Cut Flower Farming",
      description: "Growing annual and perennial flowers for fresh bouquets, florists, and event markets.",
      icon: <Sun className="h-6 w-6 text-yellow-500" />,
      expertise: 2,
      initialCost: 2,
      profitPotential: 3,
      timeCommitment: 4,
      landRequired: 2,
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
      bestFor: [
        "Gardeners with design interest transitioning to farming",
        "Those seeking aesthetic satisfaction alongside profit",
        "Farmers with existing direct marketing channels",
        "People with some experience growing ornamentals"
      ],
      keyResources: [
        {
          title: "The Flower Farmer by Lynn Byczynski",
          description: "Classic guide to small-scale cut flower production"
        },
        {
          title: "Association of Specialty Cut Flower Growers",
          description: "Industry organization with extensive resources"
        },
        {
          title: "Floret Farm's resources",
          description: "Educational materials from leading flower farmers"
        }
      ],
      steps: [
        {
          title: "Research Profitable Varieties",
          description: "Identify flowers with good vase life and market demand"
        },
        {
          title: "Start Small",
          description: "Begin with 1/4 acre and focus on season-long production"
        },
        {
          title: "Develop Infrastructure",
          description: "Create efficient harvest, processing, and cooling systems"
        },
        {
          title: "Build Market Channels",
          description: "Connect with florists, farmers markets, and event planners"
        },
        {
          title: "Consider Design Services",
          description: "Explore wedding and event work for additional revenue"
        }
      ]
    },
    {
      id: "grass-fed-beef",
      title: "Small-Scale Grass-Fed Beef",
      description: "Raising cattle on pasture without grain finishing for direct marketing of premium beef.",
      icon: <Tractor className="h-6 w-6 text-farm-wheat-dark" />,
      expertise: 3,
      initialCost: 4,
      profitPotential: 3,
      timeCommitment: 3,
      landRequired: 4,
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
      bestFor: [
        "Beginning farmers with existing pasture land",
        "Those interested in regenerative agriculture",
        "Farmers with off-farm income during startup phase",
        "People comfortable with larger livestock"
      ],
      keyResources: [
        {
          title: "Grass-Fed Cattle by Julius Ruechel",
          description: "Comprehensive guide to raising grass-fed beef"
        },
        {
          title: "American Grassfed Association",
          description: "Industry standards and marketing support"
        },
        {
          title: "Local grazing networks and extension services",
          description: "Regional expertise on pasture management"
        }
      ],
      steps: [
        {
          title: "Develop Grazing Infrastructure",
          description: "Set up fencing, water systems, and handling facilities"
        },
        {
          title: "Improve Pasture Quality",
          description: "Enhance pasture diversity before adding animals"
        },
        {
          title: "Start Small",
          description: "Begin with 3-5 animals to learn management techniques"
        },
        {
          title: "Find Processing Options",
          description: "Research USDA-inspected processors in your area"
        },
        {
          title: "Develop Pre-Order System",
          description: "Build customer base for bulk beef purchases"
        }
      ]
    },
    {
      id: "aquaponics",
      title: "Aquaponics",
      description: "Integrated system that combines fish farming with hydroponic plant production in a symbiotic environment.",
      icon: <CloudRain className="h-6 w-6 text-blue-400" />,
      expertise: 4,
      initialCost: 4,
      profitPotential: 3,
      timeCommitment: 4,
      landRequired: 1,
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
      bestFor: [
        "Technically-inclined beginners with some capital",
        "Urban farmers with access to indoor space",
        "Those interested in sustainable food systems",
        "People with mechanical and biological aptitude"
      ],
      keyResources: [
        {
          title: "Aquaponic Gardening by Sylvia Bernstein",
          description: "Foundational guide to small-scale aquaponics"
        },
        {
          title: "Aquaponic Association",
          description: "Industry organization with training and resources"
        },
        {
          title: "Local aquaponic farms",
          description: "Arrange visits to see systems in operation"
        }
      ],
      steps: [
        {
          title: "Start Small",
          description: "Begin with a demo system to learn fundamental principles"
        },
        {
          title: "Research Regulations",
          description: "Understand fish farming regulations in your area"
        },
        {
          title: "Design Energy-Efficient System",
          description: "Create system with backup power and minimize energy use"
        },
        {
          title: "Choose Complementary Species",
          description: "Select fish and plants that thrive in similar conditions"
        },
        {
          title: "Develop Marketing Strategy",
          description: "Identify premium markets for both fish and produce"
        }
      ]
    }
  ];

  const handleFarmingTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    setSelectedTab("overview");
    setCurrentNote(savedNotes[typeId] || "");
  };

  const handleInterestRating = (typeId: string, rating: number) => {
    setUserInterest({
      ...userInterest,
      [typeId]: rating
    });
    
    toast({
      title: "Interest Saved",
      description: `Your interest in ${farmingTypes.find(t => t.id === typeId)?.title} has been saved.`,
    });
  };

  const handleSaveNote = () => {
    if (selectedType) {
      setSavedNotes({
        ...savedNotes,
        [selectedType]: currentNote
      });
      
      toast({
        title: "Notes Saved",
        description: "Your notes have been saved successfully.",
      });
      
      setIsNoteSheetOpen(false);
    }
  };

  const handleResourceSelect = (resource: any) => {
    setSelectedResource(resource);
    setIsResourceOpen(true);
  };

  const handleToggleCompareType = (typeId: string) => {
    if (compareTypes.includes(typeId)) {
      setCompareTypes(compareTypes.filter(id => id !== typeId));
    } else {
      if (compareTypes.length < 3) {
        setCompareTypes([...compareTypes, typeId]);
      } else {
        toast({
          title: "Comparison Limit",
          description: "You can compare up to 3 farming types at once.",
        });
      }
    }
  };

  const handleDownloadInfo = (typeId: string) => {
    const farmType = farmingTypes.find(t => t.id === typeId);
    
    if (farmType) {
      let content = `# ${farmType.title}\n\n`;
      content += `${farmType.description}\n\n`;
      
      content += `## Key Metrics\n`;
      content += `- Expertise Required: ${farmType.expertise}/5\n`;
      content += `- Initial Investment: ${farmType.initialCost}/5\n`;
      content += `- Profit Potential: ${farmType.profitPotential}/5\n`;
      content += `- Time Commitment: ${farmType.timeCommitment}/5\n`;
      content += `- Land Required: ${farmType.landRequired}/5\n\n`;
      
      content += `## Benefits\n`;
      farmType.benefits.forEach(benefit => {
        content += `- ${benefit}\n`;
      });
      content += '\n';
      
      content += `## Challenges\n`;
      farmType.challenges.forEach(challenge => {
        content += `- ${challenge}\n`;
      });
      content += '\n';
      
      content += `## Best For\n`;
      farmType.bestFor.forEach(item => {
        content += `- ${item}\n`;
      });
      content += '\n';
      
      content += `## Getting Started Steps\n`;
      farmType.steps.forEach((step, index) => {
        content += `${index + 1}. ${step.title}: ${step.description}\n`;
      });
      content += '\n';
      
      content += `## Key Resources\n`;
      farmType.keyResources.forEach(resource => {
        content += `- ${resource.title}: ${resource.description}\n`;
      });
      
      // User notes if available
      if (savedNotes[typeId]) {
        content += `\n## My Notes\n${savedNotes[typeId]}\n`;
      }
      
      // Create the file for download
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${farmType.title.replace(/\s+/g, '-').toLowerCase()}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Info Downloaded",
        description: `Information about ${farmType.title} has been downloaded.`,
      });
    }
  };

  const renderProgressBar = (value: number, max: number = 5) => {
    const percentage = (value / max) * 100;
    return (
      <div className="flex items-center gap-2">
        <Progress value={percentage} className="h-2" />
        <span className="text-xs font-medium">{value}/{max}</span>
      </div>
    );
  };

  const renderFarmingTypeCard = (type: FarmingTypeDetail) => {
    const isSelected = selectedType === type.id;
    const isCompareSelected = compareTypes.includes(type.id);
    
    return (
      <Card 
        key={type.id} 
        className={`cursor-pointer transition-all ${isSelected ? 'border-farm-green ring-1 ring-farm-green' : 'hover:border-farm-green/50'} ${isCompareSelected ? 'bg-farm-green/5' : ''}`}
        onClick={() => !showCompare && handleFarmingTypeSelect(type.id)}
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              {type.icon}
              <CardTitle className="text-base">{type.title}</CardTitle>
            </div>
            {showCompare ? (
              <Badge 
                variant={isCompareSelected ? "default" : "outline"} 
                className={`cursor-pointer ${isCompareSelected ? 'bg-farm-green' : 'hover:bg-farm-green/10'}`}
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleToggleCompareType(type.id);
                }}
              >
                {isCompareSelected ? "Selected" : "Compare"}
              </Badge>
            ) : (
              userInterest[type.id] && (
                <Badge variant="outline" className="bg-farm-green/10 text-farm-green">
                  Interest: {userInterest[type.id]}/5
                </Badge>
              )
            )}
          </div>
          <CardDescription className="line-clamp-2">{type.description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-3 pt-0">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Expertise Needed</p>
              {renderProgressBar(type.expertise)}
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Initial Cost</p>
              {renderProgressBar(type.initialCost)}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const getSelectedFarmType = () => {
    return selectedType ? farmingTypes.find(t => t.id === selectedType) : null;
  };

  const renderComparisonTable = () => {
    if (compareTypes.length === 0) {
      return (
        <div className="text-center p-6">
          <p>Select farming types above to compare them.</p>
        </div>
      );
    }

    const selectedTypes = farmingTypes.filter(type => compareTypes.includes(type.id));

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Characteristic</th>
              {selectedTypes.map(type => (
                <th key={type.id} className="text-left p-2">{type.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2 font-medium">Description</td>
              {selectedTypes.map(type => (
                <td key={type.id} className="p-2">{type.description}</td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-2 font-medium">Expertise Required</td>
              {selectedTypes.map(type => (
                <td key={type.id} className="p-2">{type.expertise}/5</td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-2 font-medium">Initial Cost</td>
              {selectedTypes.map(type => (
                <td key={type.id} className="p-2">{type.initialCost}/5</td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-2 font-medium">Profit Potential</td>
              {selectedTypes.map(type => (
                <td key={type.id} className="p-2">{type.profitPotential}/5</td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-2 font-medium">Time Commitment</td>
              {selectedTypes.map(type => (
                <td key={type.id} className="p-2">{type.timeCommitment}/5</td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-2 font-medium">Land Required</td>
              {selectedTypes.map(type => (
                <td key={type.id} className="p-2">{type.landRequired}/5</td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-2 font-medium">Top Benefits</td>
              {selectedTypes.map(type => (
                <td key={type.id} className="p-2">
                  <ul className="list-disc pl-5 space-y-1">
                    {type.benefits.slice(0, 3).map((benefit, i) => (
                      <li key={i} className="text-sm">{benefit}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-2 font-medium">Top Challenges</td>
              {selectedTypes.map(type => (
                <td key={type.id} className="p-2">
                  <ul className="list-disc pl-5 space-y-1">
                    {type.challenges.slice(0, 3).map((challenge, i) => (
                      <li key={i} className="text-sm">{challenge}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-2 font-medium">Actions</td>
              {selectedTypes.map(type => (
                <td key={type.id} className="p-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleFarmingTypeSelect(type.id)}
                    className="mr-2"
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownloadInfo(type.id)}
                  >
                    <Download className="h-3.5 w-3.5 mr-1" />
                    Download
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  // Component for the notes feature - adapts to mobile vs desktop
  const NotesComponent = () => {
    const NoteContent = (
      <div className="space-y-4">
        <h3 className="font-medium">My Notes for {getSelectedFarmType()?.title}</h3>
        <textarea 
          className="w-full min-h-[200px] p-3 border rounded-md" 
          placeholder="Add your notes, questions, and thoughts about this farming type..."
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsNoteSheetOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveNote}>
            Save Notes
          </Button>
        </div>
      </div>
    );

    return isMobile ? (
      <Drawer open={isNoteSheetOpen} onOpenChange={setIsNoteSheetOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>My Notes</DrawerTitle>
            <DrawerDescription>
              Keep track of your thoughts on this farming type
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            {NoteContent}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    ) : (
      <Sheet open={isNoteSheetOpen} onOpenChange={setIsNoteSheetOpen}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>My Notes</SheetTitle>
            <SheetDescription>
              Keep track of your thoughts on this farming type
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            {NoteContent}
          </div>
        </SheetContent>
      </Sheet>
    );
  };

  // Resource dialog component
  const ResourceDialog = () => {
    if (!selectedResource) return null;
    
    return (
      <Dialog open={isResourceOpen} onOpenChange={setIsResourceOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedResource.title}</DialogTitle>
            <DialogDescription>{selectedResource.description}</DialogDescription>
          </DialogHeader>
          <div className="py-4 max-h-[60vh] overflow-y-auto">
            <p className="mb-4">This is a placeholder for the resource content. In a complete implementation, this would display the actual resource information or connect to external resources.</p>
            
            <p className="text-sm text-muted-foreground">If this were a real implementation, you would be able to access:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-sm">
              <li>Detailed guides about {selectedResource.title}</li>
              <li>Practical tools and templates</li>
              <li>Expert advice and recommendations</li>
              <li>Connections to learning resources</li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Sprout className="h-5 w-5 text-farm-green" />
              Beginner Farming Types
            </CardTitle>
            <CardDescription>
              Explore different farming approaches suitable for beginners
            </CardDescription>
          </div>
          <div>
            <Button 
              variant={showCompare ? "default" : "outline"} 
              size="sm"
              onClick={() => {
                setShowCompare(!showCompare);
                if (!showCompare) {
                  setCompareTypes([]);
                }
              }}
            >
              <Share2 className="h-4 w-4 mr-2" />
              {showCompare ? "Exit Compare" : "Compare Types"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {farmingTypes.map(renderFarmingTypeCard)}
          </div>

          {showCompare && (
            <Card className="mt-4 border-farm-green/20">
              <CardHeader>
                <CardTitle>Farming Types Comparison</CardTitle>
                <CardDescription>
                  {compareTypes.length > 0 
                    ? `Comparing ${compareTypes.length} farming type${compareTypes.length > 1 ? 's' : ''}` 
                    : 'Select up to 3 farming types above to compare'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderComparisonTable()}
              </CardContent>
            </Card>
          )}

          {selectedType && !showCompare && (
            <Card className="mt-8 border-farm-green/20">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {farmingTypes.find(t => t.id === selectedType)?.icon}
                    <CardTitle>{farmingTypes.find(t => t.id === selectedType)?.title}</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsNoteSheetOpen(true)}
                    >
                      Add Notes
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownloadInfo(selectedType)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Info
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="steps">Getting Started</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview">
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        {farmingTypes.find(t => t.id === selectedType)?.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-medium text-sm mb-2">Key Metrics</h3>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Expertise Required</span>
                                <span className="font-medium">{farmingTypes.find(t => t.id === selectedType)?.expertise}/5</span>
                              </div>
                              {renderProgressBar(farmingTypes.find(t => t.id === selectedType)?.expertise || 0)}
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Initial Investment</span>
                                <span className="font-medium">{farmingTypes.find(t => t.id === selectedType)?.initialCost}/5</span>
                              </div>
                              {renderProgressBar(farmingTypes.find(t => t.id === selectedType)?.initialCost || 0)}
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Profit Potential</span>
                                <span className="font-medium">{farmingTypes.find(t => t.id === selectedType)?.profitPotential}/5</span>
                              </div>
                              {renderProgressBar(farmingTypes.find(t => t.id === selectedType)?.profitPotential || 0)}
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Time Commitment</span>
                                <span className="font-medium">{farmingTypes.find(t => t.id === selectedType)?.timeCommitment}/5</span>
                              </div>
                              {renderProgressBar(farmingTypes.find(t => t.id === selectedType)?.timeCommitment || 0)}
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Land Required</span>
                                <span className="font-medium">{farmingTypes.find(t => t.id === selectedType)?.landRequired}/5</span>
                              </div>
                              {renderProgressBar(farmingTypes.find(t => t.id === selectedType)?.landRequired || 0)}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium text-sm mb-2">Best Suited For</h3>
                          <ul className="space-y-2">
                            {farmingTypes.find(t => t.id === selectedType)?.bestFor.map((item, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Sprout className="h-4 w-4 text-farm-green mt-0.5" />
                                <span className="text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {savedNotes[selectedType] && (
                        <div className="bg-muted/30 p-4 rounded-lg mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-sm">My Notes</h3>
                            <Button variant="ghost" size="sm" onClick={() => setIsNoteSheetOpen(true)}>
                              Edit
                            </Button>
                          </div>
                          <p className="text-sm whitespace-pre-line">{savedNotes[selectedType]}</p>
                        </div>
                      )}

                      <div className="pt-4 border-t">
                        <h3 className="font-medium text-sm mb-3">Your Interest Level</h3>
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Rate your interest in this farming type:</p>
                          <RadioGroup 
                            value={userInterest[selectedType]?.toString() || ""} 
                            onValueChange={(value) => handleInterestRating(selectedType, parseInt(value))}
                          >
                            <div className="flex items-center space-x-6">
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <div key={rating} className="flex items-center space-x-2">
                                  <RadioGroupItem value={rating.toString()} id={`rating-${selectedType}-${rating}`} />
                                  <Label htmlFor={`rating-${selectedType}-${rating}`}>{rating}</Label>
                                </div>
                              ))}
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="details">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-2">Benefits</h3>
                        <ul className="space-y-2">
                          {farmingTypes.find(t => t.id === selectedType)?.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Sprout className="h-4 w-4 text-farm-green mt-0.5" />
                              <span className="text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Challenges</h3>
                        <ul className="space-y-2">
                          {farmingTypes.find(t => t.id === selectedType)?.challenges.map((challenge, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Sprout className="h-4 w-4 text-amber-500 mt-0.5" />
                              <span className="text-sm">{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="steps">
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground mb-4">
                        Follow these steps to get started with {farmingTypes.find(t => t.id === selectedType)?.title}:
                      </p>

                      <Accordion type="single" collapsible className="w-full">
                        {farmingTypes.find(t => t.id === selectedType)?.steps.map((step, index) => (
                          <AccordionItem key={index} value={`step-${index}`}>
                            <AccordionTrigger className="text-sm">
                              <span className="font-medium">{index + 1}. {step.title}</span>
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="text-sm">{step.description}</p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </TabsContent>

                  <TabsContent value="resources">
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        Recommended resources for learning more about {farmingTypes.find(t => t.id === selectedType)?.title}:
                      </p>

                      <div className="space-y-3">
                        {farmingTypes.find(t => t.id === selectedType)?.keyResources.map((resource, index) => (
                          <div key={index} className="border rounded-lg p-3">
                            <h4 className="font-medium text-sm">{resource.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                            <div className="mt-2">
                              {resource.url ? (
                                <a 
                                  href={resource.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-sm text-farm-green hover:underline inline-flex items-center"
                                >
                                  View Resource <ExternalLink className="h-3.5 w-3.5 ml-1" />
                                </a>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleResourceSelect(resource)}
                                >
                                  View Resource
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" onClick={() => setSelectedType(null)}>
                  Back to All Farming Types
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </CardContent>

      {/* Notes Sheet/Drawer */}
      <NotesComponent />

      {/* Resource Dialog */}
      <ResourceDialog />
    </Card>
  );
}
