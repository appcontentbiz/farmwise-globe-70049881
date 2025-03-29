
import { 
  Leaf, 
  Sprout, 
  Flower, 
  Droplets, 
  Sun, 
  Fish, 
  Warehouse,
  Building,
  Bug
} from "lucide-react";

// Interface for farming type data
export interface FarmingTypeData {
  id: string;
  title: string;
  icon: JSX.Element;
  description: string;
  expertise: number;
  initialCost: number;
  benefits: string[];
  challenges: string[];
  startingSteps: string[];
  resources: {
    title: string;
    url?: string;
    description: string;
  }[];
}

// Define the farming types data
export const farmingTypesData: FarmingTypeData[] = [
  {
    id: "market-gardening",
    title: "Market Gardening",
    icon: <Leaf className="h-5 w-5 text-farm-green" />,
    description: "Small-scale intensive cultivation of vegetables, fruits, and flowers for direct sale to consumers, restaurants, or local markets.",
    expertise: 2,
    initialCost: 3,
    benefits: [
      "Low startup costs compared to larger-scale farming",
      "Can be profitable on small acreage (1-2 acres)",
      "Direct marketing creates higher profit margins",
      "Can be managed by an individual or small family",
      "Flexible growing practices and crop selection"
    ],
    challenges: [
      "Labor intensive with significant time commitment",
      "Requires season extension for year-round income",
      "Multiple marketing channels need to be developed",
      "Competitive in popular markets",
      "Weather and pest risks"
    ],
    startingSteps: [
      "Assess your land for growing conditions and size requirements",
      "Select 3-5 high-value crops to focus on initially",
      "Invest in essential tools: broadfork, wheel hoe, precision seeder",
      "Develop a simple crop plan and rotation schedule",
      "Research local markets and establish selling points",
      "Set up basic irrigation systems",
      "Plan for post-harvest handling and storage"
    ],
    resources: [
      {
        title: "The Market Gardener's Masterclass",
        url: "https://www.themarketgardener.com/masterclass",
        description: "Comprehensive online course by Jean-Martin Fortier"
      },
      {
        title: "ATTRA's Market Gardening Guide",
        url: "https://attra.ncat.org/product/market-gardening-a-start-up-guide/",
        description: "Free downloadable guide for beginning market gardeners"
      },
      {
        title: "Extension Office Services",
        url: "https://www.nifa.usda.gov/about-nifa/how-we-work/extension",
        description: "Find your local agricultural extension for soil testing and advice"
      }
    ]
  },
  {
    id: "microgreens-production",
    title: "Microgreens Production",
    icon: <Sprout className="h-5 w-5 text-farm-green" />,
    description: "Growing vegetable, herb or grain seedlings that are harvested when they develop their first true leaves. Typically sold to restaurants and at farmers' markets.",
    expertise: 1,
    initialCost: 2,
    benefits: [
      "Can be started with minimal space (even indoors)",
      "Quick crop cycles (7-21 days) for rapid income",
      "High-value crop with strong profit margins",
      "Year-round production possible",
      "Minimal equipment needed to start"
    ],
    challenges: [
      "Requires consistent daily attention",
      "Market development needed for steady sales",
      "Perishable product with short shelf life",
      "Quality control is critical",
      "Scaling can require significant investment"
    ],
    startingSteps: [
      "Set up a small growing area with good lighting",
      "Invest in quality seed varieties suited for microgreens",
      "Acquire growing trays, organic potting soil or growing mats",
      "Establish a sanitation protocol for food safety",
      "Test growth cycles of different microgreen varieties",
      "Develop packaging that maintains freshness",
      "Contact potential customers (chefs, market managers)"
    ],
    resources: [
      {
        title: "Microgreens: A Guide to Growing Nutrient-Packed Greens",
        url: "https://extension.umn.edu/growing-vegetables/growing-microgreens",
        description: "University of Minnesota Extension guide to microgreens production"
      },
      {
        title: "Profitable Microgreens Farm",
        url: "https://www.profitablemicrogreens.com",
        description: "Training and resources for commercial microgreens growers"
      },
      {
        title: "Johnny's Selected Seeds - Microgreens",
        url: "https://www.johnnyseeds.com/growers-library/vegetables/microgreens-key-growing-information.html",
        description: "Growing information and specialized seeds for microgreens"
      }
    ]
  },
  {
    id: "cut-flower-farm",
    title: "Cut Flower Farm",
    icon: <Flower className="h-5 w-5 text-farm-green" />,
    description: "Growing and selling fresh-cut flowers to florists, through CSA subscriptions, at farmers' markets, or for events and weddings.",
    expertise: 2,
    initialCost: 3,
    benefits: [
      "High-value crop with strong aesthetic appeal",
      "Diverse market channels (CSA, weddings, florists)",
      "Many varieties can be grown on small acreage",
      "Potential for value-added products (wreaths, dried flowers)",
      "Brings beauty and joy to your farm work"
    ],
    challenges: [
      "Steep learning curve for harvest timing and conditioning",
      "Weather-dependent and seasonal in most climates",
      "Requires careful post-harvest handling",
      "Competition from imported flowers",
      "Labor intensive during peak season"
    ],
    startingSteps: [
      "Research flower varieties suited to your climate",
      "Start with 10-15 reliable, productive varieties",
      "Prepare growing beds with good weed suppression",
      "Set up irrigation systems (drip recommended)",
      "Create a harvest and post-harvest station",
      "Acquire appropriate buckets and cooler space",
      "Begin marketing 3-4 months before first harvest"
    ],
    resources: [
      {
        title: "The Flower Farmer",
        url: "https://www.flowerfarmer.com",
        description: "Lynn Byczynski's essential guide to growing and selling cut flowers"
      },
      {
        title: "Association of Specialty Cut Flower Growers",
        url: "https://www.ascfg.org",
        description: "Membership organization with extensive resources and community"
      },
      {
        title: "Floret Flower Farm Workshops",
        url: "https://www.floretflowers.com/online-workshops",
        description: "Online courses from a leading cut flower farm"
      }
    ]
  },
  {
    id: "small-scale-hydroponics",
    title: "Small-Scale Hydroponics",
    icon: <Droplets className="h-5 w-5 text-farm-green" />,
    description: "Growing plants without soil using nutrient-rich water solutions, typically in a greenhouse or indoor environment.",
    expertise: 4,
    initialCost: 4,
    benefits: [
      "Higher yields in smaller spaces compared to soil",
      "Reduced water usage (up to 90% less than conventional)",
      "Year-round production capability",
      "Faster growth rates and more crop cycles",
      "Fewer pest and disease issues than soil cultivation"
    ],
    challenges: [
      "High initial setup costs for systems",
      "Technical knowledge required for nutrients and pH",
      "Dependent on reliable electricity and water",
      "System failures can cause rapid crop loss",
      "Ongoing costs for nutrients and growing media"
    ],
    startingSteps: [
      "Start with a small, simple system (like NFT or DWC)",
      "Research crops with proven hydroponic success",
      "Set up reliable electrical and water systems",
      "Learn about nutrient solutions and pH management",
      "Establish environmental controls for temperature",
      "Plan for backup systems in case of power failure",
      "Identify markets for premium hydroponic produce"
    ],
    resources: [
      {
        title: "Upstart University",
        url: "https://university.upstartfarmers.com",
        description: "Online courses specifically for hydroponic farmers"
      },
      {
        title: "Cornell CEA Hydroponic Handbook",
        url: "https://cea.cals.cornell.edu/learning-resources",
        description: "Research-based resources from Cornell University"
      },
      {
        title: "Hydroponic Food Production",
        url: "https://www.hydroponicssimplified.com/hydroponic-food-production",
        description: "Howard Resh's comprehensive book on hydroponic systems"
      }
    ]
  },
  {
    id: "pastured-livestock",
    title: "Pastured Livestock",
    icon: <Sun className="h-5 w-5 text-farm-green" />,
    description: "Raising animals on pasture using rotational grazing, including chickens (eggs/meat), sheep, goats, or cattle on a small scale.",
    expertise: 3,
    initialCost: 3,
    benefits: [
      "Animals do much of the work through grazing",
      "Can utilize marginal land unsuitable for crops",
      "Multiple revenue streams possible (meat, eggs, breeding stock)",
      "Improves soil fertility through managed grazing",
      "Often commands premium prices from consumers"
    ],
    challenges: [
      "Daily animal care requirements (no days off)",
      "Predator protection needed",
      "Processing logistics and regulations",
      "Seasonal production cycles",
      "Marketing challenges for meat products"
    ],
    startingSteps: [
      "Start with one species appropriate for your land",
      "Set up secure fencing and shelter systems",
      "Develop a rotational grazing plan",
      "Research local regulations for livestock",
      "Identify processing facilities in your area",
      "Establish reliable water sources in all pastures",
      "Create a simple record-keeping system for animal health"
    ],
    resources: [
      {
        title: "Polyface Farm Resources",
        url: "https://www.polyfacefarms.com/resources",
        description: "Joel Salatin's pioneering farm resources and videos"
      },
      {
        title: "NCAT Livestock Resources",
        url: "https://attra.ncat.org/topics/livestock-and-pasture",
        description: "Free technical resources for pasture-based production"
      },
      {
        title: "American Pastured Poultry Producers Association",
        url: "https://www.apppa.org",
        description: "Support organization for pastured poultry farmers"
      }
    ]
  },
  {
    id: "aquaponics",
    title: "Aquaponics",
    icon: <Fish className="h-5 w-5 text-farm-green" />,
    description: "Integrated system that combines aquaculture (raising fish) with hydroponics (growing plants in water) in a symbiotic environment.",
    expertise: 5,
    initialCost: 5,
    benefits: [
      "Produces both fish and plants as harvested crops",
      "Closed-loop system conserves water",
      "Eliminates need for chemical fertilizers",
      "Can be very productive in limited space",
      "Year-round production potential"
    ],
    challenges: [
      "Complex system requiring specialized knowledge",
      "High startup costs",
      "Fish and plants have different optimal conditions",
      "System failures can be catastrophic",
      "Energy dependent for pumps and aeration"
    ],
    startingSteps: [
      "Take courses specific to aquaponic system design",
      "Start with a small pilot system to learn",
      "Research fish species appropriate for your climate",
      "Select plant crops compatible with aquaponics",
      "Set up robust water testing protocols",
      "Install backup systems for power and aeration",
      "Understand regulations for selling fish products"
    ],
    resources: [
      {
        title: "Aquaponic Gardening Community",
        url: "https://community.aquaponicgardening.com",
        description: "Active forum for aquaponic growers of all levels"
      },
      {
        title: "Nelson and Pade Aquaponics",
        url: "https://aquaponics.com/educational-resources",
        description: "Training and system design resources"
      },
      {
        title: "The Aquaponic Farmer",
        url: "https://www.theaquaponicfarmer.com",
        description: "Practical guide for commercial aquaponics"
      }
    ]
  },
  {
    id: "mushroom-cultivation",
    title: "Mushroom Cultivation",
    icon: <Warehouse className="h-5 w-5 text-farm-green" />,
    description: "Growing specialty mushrooms like oyster, shiitake, and lion's mane, either in a climate-controlled indoor environment or on logs outdoors.",
    expertise: 3,
    initialCost: 2,
    benefits: [
      "Can be grown in spaces unsuitable for other crops",
      "Quick production cycles for some varieties",
      "High-value specialty crop with growing demand",
      "Low water and energy requirements",
      "Can utilize waste products (coffee grounds, sawdust)"
    ],
    challenges: [
      "Contamination control is critical",
      "Requires careful temperature and humidity management",
      "Some varieties have longer time to fruiting",
      "Specialized knowledge of mycology helpful",
      "Marketing requires consumer education"
    ],
    startingSteps: [
      "Start with easier varieties like oyster mushrooms",
      "Create a clean workspace for inoculation",
      "Learn sterile techniques to prevent contamination",
      "Set up a dedicated fruiting room or environment",
      "Source quality spawn from reputable suppliers",
      "Experiment with different substrate formulations",
      "Establish consistent harvesting and handling practices"
    ],
    resources: [
      {
        title: "Growing Gourmet and Medicinal Mushrooms",
        url: "https://fungi.com/products/growing-gourmet-and-medicinal-mushrooms",
        description: "Paul Stamets' comprehensive guide to mushroom cultivation"
      },
      {
        title: "North American Mycological Association",
        url: "https://namyco.org/cultivation.php",
        description: "Resources and community for mushroom growers"
      },
      {
        title: "MushroomCompany.com Cultivation Guides",
        url: "https://www.mushroomcompany.com/resources/howto",
        description: "Free guides for different cultivation methods"
      }
    ]
  },
  {
    id: "vertical-farming",
    title: "Vertical Farming",
    icon: <Building className="h-5 w-5 text-farm-green" />,
    description: "Growing crops in vertically stacked layers, often incorporating controlled-environment agriculture technology and optimized for space efficiency.",
    expertise: 5,
    initialCost: 5,
    benefits: [
      "Maximizes production in minimal space",
      "Can be located in urban environments near consumers",
      "Protected from weather extremes and pests",
      "Precise control over growing conditions",
      "Year-round production capability"
    ],
    challenges: [
      "Very high startup costs for equipment",
      "Energy intensive for lighting and climate control",
      "Technical expertise required",
      "Limited crop selection (mostly greens and herbs)",
      "Maintenance of complex systems"
    ],
    startingSteps: [
      "Visit existing vertical farms for insights",
      "Start with a small-scale system as proof of concept",
      "Focus on high-value, quick-turnover crops",
      "Optimize lighting and space utilization",
      "Develop automated monitoring systems",
      "Secure contracts with buyers before scaling",
      "Create efficient workflow processes for harvesting"
    ],
    resources: [
      {
        title: "Association for Vertical Farming",
        url: "https://vertical-farming.net/resources",
        description: "Industry association with educational resources"
      },
      {
        title: "Upstart University",
        url: "https://university.upstartfarmers.com/courses",
        description: "Online courses for vertical and controlled environment farming"
      },
      {
        title: "The Vertical Farm by Dr. Dickson Despommier",
        url: "https://www.verticalfarm.com/the-vertical-essay",
        description: "Foundational book on vertical farming concepts"
      }
    ]
  },
  {
    id: "permaculture",
    title: "Permaculture",
    icon: <Bug className="h-5 w-5 text-farm-green" />,
    description: "Agricultural ecosystem designed to be sustainable and self-sufficient, mimicking patterns observed in natural ecosystems.",
    expertise: 3,
    initialCost: 2,
    benefits: [
      "Reduces ongoing inputs once established",
      "Creates resilient, diverse ecosystems",
      "Can regenerate degraded land over time",
      "Multiple yields from the same system",
      "Reduced pest pressures through biodiversity"
    ],
    challenges: [
      "Longer establishment period before full production",
      "Complex design requires good planning",
      "Knowledge-intensive approach",
      "Marketing diverse, seasonal products",
      "May not fit conventional agricultural models"
    ],
    startingSteps: [
      "Complete a Permaculture Design Certificate course",
      "Observe your land through all seasons before major changes",
      "Create a detailed property map and sector analysis",
      "Start with small-scale permaculture techniques",
      "Establish water management systems early",
      "Plant perennial crops strategically",
      "Connect with local permaculture community"
    ],
    resources: [
      {
        title: "Permaculture Research Institute",
        url: "https://permaculturenews.org",
        description: "Articles, courses and resources on permaculture practices"
      },
      {
        title: "Midwest Permaculture",
        url: "https://midwestpermaculture.com/resources",
        description: "Practical permaculture resources for temperate climates"
      },
      {
        title: "Restoration Agriculture by Mark Shepard",
        url: "https://newforestfarm.us/restoration-agriculture",
        description: "Book on large-scale permaculture farming systems"
      }
    ]
  }
];
