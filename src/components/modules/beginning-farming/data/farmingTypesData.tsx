
import React from "react";
import { Carrot, Sprout, Apple, Leaf, Wheat, CloudRain, Sun, Tractor } from "lucide-react";
import { FarmingType } from "../types/farmingTypes";

export const farmingTypesData: FarmingType[] = [
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
