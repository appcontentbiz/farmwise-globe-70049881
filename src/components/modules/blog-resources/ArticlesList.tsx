
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User2, MessageSquare, ThumbsUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Enhanced article data with full content
const articleData = [
  {
    id: 1,
    title: "Sustainable Farming Practices for the Modern Age",
    excerpt: "Learn how to implement sustainable farming practices that can increase yield while protecting the environment for future generations.",
    author: "Maria Johnson",
    date: "June 15, 2023",
    category: "Sustainability",
    tags: ["organic", "sustainability", "best-practices"],
    likes: 156,
    comments: 42,
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
    fullContent: `
      <h2>Implementing Sustainable Farming Practices</h2>
      
      <p>Sustainable agriculture is not just a trend; it's a necessary evolution in farming practices that addresses environmental concerns while meeting the world's growing food needs. This article explores practical sustainable farming techniques that have been proven to increase yields while protecting our natural resources.</p>
      
      <h3>Key Principles of Sustainable Farming</h3>
      
      <p>Sustainable farming rests on three fundamental pillars:</p>
      
      <ul>
        <li><strong>Environmental Health:</strong> Practices that maintain or improve soil, water, and air quality while reducing dependence on non-renewable resources.</li>
        <li><strong>Economic Profitability:</strong> Farming methods that increase productivity and reduce costs to ensure long-term financial viability.</li>
        <li><strong>Social and Economic Equity:</strong> Approaches that improve quality of life for farmers, workers, and communities.</li>
      </ul>
      
      <h3>Proven Techniques</h3>
      
      <h4>1. Crop Rotation</h4>
      
      <p>Research from the Rodale Institute's 30-year Farming Systems Trial shows that complex crop rotations can increase yields by up to 15% while reducing the need for synthetic inputs. An effective crop rotation might include:</p>
      
      <ul>
        <li>Year 1: Corn (high nitrogen demanding crop)</li>
        <li>Year 2: Soybeans or other legumes (nitrogen-fixing)</li>
        <li>Year 3: Small grains like wheat or barley</li>
        <li>Year 4: Cover crops or forage</li>
      </ul>
      
      <p>This pattern disrupts pest cycles, improves soil structure, and balances nutrient demands.</p>
      
      <h4>2. Integrated Pest Management (IPM)</h4>
      
      <p>IPM strategies focus on long-term prevention through a combination of techniques:</p>
      
      <ul>
        <li><strong>Biological controls:</strong> Using beneficial insects to control pests</li>
        <li><strong>Cultural practices:</strong> Adjusting planting schedules to avoid pest cycles</li>
        <li><strong>Mechanical controls:</strong> Using traps, barriers, or tillage</li>
        <li><strong>Responsible chemical use:</strong> Applying targeted pesticides only when necessary</li>
      </ul>
      
      <p>The University of California's Agricultural IPM Program demonstrated that these approaches can reduce pesticide use by 50-90% while maintaining or improving yields.</p>
      
      <h4>3. Conservation Tillage</h4>
      
      <p>Reducing tillage intensity protects soil from erosion and improves its structure. No-till and reduced tillage systems have been shown to:</p>
      
      <ul>
        <li>Reduce soil erosion by up to 90%</li>
        <li>Increase soil organic matter by 0.1-1% per year</li>
        <li>Improve water infiltration and retention</li>
        <li>Reduce fuel costs by 50-80%</li>
      </ul>
      
      <p>The USDA Natural Resources Conservation Service has documented numerous case studies of farms that have successfully transitioned to conservation tillage practices.</p>
      
      <h4>4. Precision Agriculture</h4>
      
      <p>Using technology to make farming more accurate and controlled:</p>
      
      <ul>
        <li><strong>GPS guidance systems:</strong> Reduce overlap in field operations</li>
        <li><strong>Variable rate technology:</strong> Apply inputs precisely where needed</li>
        <li><strong>Soil sampling and mapping:</strong> Identify variations in soil nutrients</li>
        <li><strong>Remote sensing:</strong> Monitor crop health and stress</li>
      </ul>
      
      <p>A 2019 study published in Agricultural Systems found that precision agriculture can reduce fertilizer use by 10-15% while maintaining or increasing yields.</p>
      
      <h3>Economic Benefits</h3>
      
      <p>While sustainable practices may require initial investments in knowledge, equipment, or transition periods, the long-term economic benefits are substantial:</p>
      
      <ul>
        <li>Reduced input costs for fertilizers, pesticides, and fuel</li>
        <li>Premium prices for certified organic or sustainably grown products</li>
        <li>Increased resilience to weather extremes and market fluctuations</li>
        <li>Access to emerging carbon markets and ecosystem service payments</li>
      </ul>
      
      <p>A comprehensive analysis by Washington State University found that sustainable farming systems were more profitable than conventional systems in 22 out of 25 cases studied.</p>
      
      <h3>Implementation Strategy</h3>
      
      <p>Transitioning to sustainable farming practices is best approached incrementally:</p>
      
      <ol>
        <li>Start with a soil health assessment to establish a baseline</li>
        <li>Implement one or two practices on a portion of your farm</li>
        <li>Document results and make adjustments as needed</li>
        <li>Gradually expand successful practices across your operation</li>
        <li>Connect with extension services and farmer networks for support</li>
      </ol>
      
      <p>Remember that sustainable farming is context-specific—what works on one farm may not work on another. Experimentation and adaptation are essential components of success.</p>
      
      <h3>Conclusion</h3>
      
      <p>Sustainable farming practices offer a path forward that balances productivity with environmental stewardship. By adopting these evidence-based approaches, farmers can build resilient operations that remain profitable for generations to come while protecting our shared natural resources.</p>
    `
  },
  {
    id: 2,
    title: "Weather Prediction Tools Every Farmer Should Use",
    excerpt: "Accurate weather forecasting can make or break a farming season. Discover the latest tools and technologies that help farmers predict and prepare for weather changes.",
    author: "Thomas Chen",
    date: "May 28, 2023",
    category: "Technology",
    tags: ["weather", "technology", "planning"],
    likes: 98,
    comments: 23,
    imageUrl: "https://images.unsplash.com/photo-1561583533-beaf7d12087d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    fullContent: `
      <h2>Essential Weather Prediction Tools for Modern Farmers</h2>
      
      <p>Weather has always been a farmer's greatest ally and most formidable adversary. In today's agricultural landscape, having access to accurate, timely weather information can mean the difference between a successful harvest and significant losses. This article examines the most effective weather prediction tools available to farmers, from free resources to advanced technological solutions.</p>
      
      <h3>Why Weather Forecasting Matters</h3>
      
      <p>According to research from the USDA Economic Research Service, weather variability accounts for an estimated 70% of the fluctuation in crop yields. With climate change increasing weather unpredictability, the value of accurate forecasting has never been higher. Modern weather tools help farmers:</p>
      
      <ul>
        <li>Optimize planting and harvesting schedules</li>
        <li>Time fertilizer and pesticide applications for maximum efficacy</li>
        <li>Manage irrigation more efficiently</li>
        <li>Prepare for extreme weather events</li>
        <li>Make informed marketing decisions</li>
      </ul>
      
      <h3>Essential Weather Tools</h3>
      
      <h4>1. Mobile Weather Applications</h4>
      
      <p>Several mobile applications provide farmer-specific weather data:</p>
      
      <ul>
        <li><strong>FarmLogs Weather:</strong> Offers field-specific forecasts with precipitation tracking and historical weather data comparisons. The platform's soil moisture models help predict field workability.</li>
        <li><strong>Climate FieldView:</strong> Provides localized, hourly forecasts with precipitation tracking and field-level weather history. Its integration with other farm management features makes it particularly valuable.</li>
        <li><strong>AccuWeather for Agriculture:</strong> Features minute-by-minute precipitation forecasts and long-range seasonal outlooks specifically calibrated for agricultural needs.</li>
      </ul>
      
      <p>A Cornell University study found that farmers using specialized agricultural weather apps made more timely management decisions than those relying on general weather services.</p>
      
      <h4>2. On-Farm Weather Stations</h4>
      
      <p>Installing weather monitoring equipment directly on your farm provides the most accurate local data:</p>
      
      <ul>
        <li><strong>Davis Instruments Vantage Pro2:</strong> Measures temperature, humidity, rainfall, wind speed/direction, and barometric pressure. Optional sensors can monitor soil moisture, leaf wetness, and solar radiation.</li>
        <li><strong>RainWise MK-III:</strong> Offers wireless connectivity and solar power options with comprehensive data logging capabilities.</li>
        <li><strong>Onset HOBO RX3000:</strong> Provides research-grade measurements with extensive customization options for different agricultural applications.</li>
      </ul>
      
      <p>The University of Nebraska-Lincoln found that on-farm weather stations improved irrigation scheduling accuracy by 30% compared to relying on regional weather data.</p>
      
      <h4>3. Weather Radar Systems</h4>
      
      <p>Real-time precipitation tracking is crucial for timing field operations:</p>
      
      <ul>
        <li><strong>RadarScope:</strong> Professional-grade radar data with high-resolution reflectivity, velocity, and dual-polarization products.</li>
        <li><strong>MyRadar:</strong> User-friendly interface with customizable alerts for approaching precipitation.</li>
        <li><strong>National Weather Service Radar:</strong> Free resource with reliable coverage across the United States.</li>
      </ul>
      
      <p>A 2020 study in the Journal of Hydrology found that high-resolution radar data improved rainfall estimates by 15-25% over traditional rain gauge networks.</p>
      
      <h4>4. Predictive Modeling Tools</h4>
      
      <p>Advanced systems that integrate multiple data sources for comprehensive forecasting:</p>
      
      <ul>
        <li><strong>Farmers Edge Weather Network:</strong> Combines satellite imagery, on-farm weather stations, and predictive models to forecast field-specific conditions.</li>
        <li><strong>aWhere:</strong> Uses machine learning and historical data to provide agricultural intelligence with 5-15 day forecasts at a 9km resolution.</li>
        <li><strong>IBM's Watson Decision Platform for Agriculture:</strong> Integrates AI with weather data to predict crop development stages and potential risks.</li>
      </ul>
      
      <p>Research from the University of Illinois found that farms using predictive modeling tools reduced weather-related losses by 20-30% compared to those using standard forecasting methods.</p>
      
      <h4>5. Lightning Detection Systems</h4>
      
      <p>Critical for protecting field workers and equipment:</p>
      
      <ul>
        <li><strong>Strike Guard:</strong> Detects lightning up to 20 miles away with automated alerts.</li>
        <li><strong>WeatherBug Spark:</strong> Provides minute-by-minute lightning alerts based on your GPS location.</li>
        <li><strong>Earth Networks Total Lightning Network:</strong> Monitors both cloud-to-ground and in-cloud lightning for advanced warning.</li>
      </ul>
      
      <h4>6. Government Resources</h4>
      
      <p>Free, reliable weather information from public agencies:</p>
      
      <ul>
        <li><strong>NOAA Climate Prediction Center:</strong> Offers 6-10 day, 8-14 day, and seasonal outlooks.</li>
        <li><strong>USDA Weekly Weather and Crop Bulletin:</strong> Provides integrated weather and crop information.</li>
        <li><strong>State Mesonet Systems:</strong> Many states operate networks of automated weather stations providing high-quality local data.</li>
      </ul>
      
      <h3>Integrating Weather Data into Farm Management</h3>
      
      <p>Having access to weather data is only valuable if it informs decision-making. Consider these integration strategies:</p>
      
      <ul>
        <li><strong>Connect weather tools with farm management software</strong> to automate record-keeping and decision support.</li>
        <li><strong>Establish weather thresholds</strong> for different operations (e.g., minimum soil temperature for planting, wind speed limits for spraying).</li>
        <li><strong>Create standard operating procedures</strong> for different weather scenarios to ensure consistent response.</li>
        <li><strong>Train farm personnel</strong> to interpret weather data and understand its implications for daily operations.</li>
      </ul>
      
      <h3>Cost-Benefit Considerations</h3>
      
      <p>Weather tools range from free public resources to sophisticated systems costing thousands of dollars. When evaluating options, consider:</p>
      
      <ul>
        <li>The economic impact of weather-related decisions on your specific crops</li>
        <li>The size and geographical diversity of your operation</li>
        <li>The historical weather challenges in your region</li>
        <li>Your comfort level with technology and data analysis</li>
      </ul>
      
      <p>A study by Mississippi State University found that even basic weather monitoring systems provided a return on investment within 1-2 growing seasons for most commercial farming operations.</p>
      
      <h3>Conclusion</h3>
      
      <p>As weather patterns become increasingly variable, investing in quality forecasting tools is no longer optional for serious agricultural operations. By selecting the right combination of weather prediction resources for your specific needs, you can make more informed decisions, reduce risk, and ultimately increase profitability. Remember that the most sophisticated technology is only as good as your ability to interpret and apply the information it provides to your unique farming context.</p>
    `
  },
  {
    id: 3,
    title: "Understanding Soil Health Indicators",
    excerpt: "Soil health is the foundation of productive farming. This comprehensive guide explains key indicators that can help you assess and improve your soil health.",
    author: "Sarah Williams",
    date: "July 3, 2023",
    category: "Soil Health",
    tags: ["soil", "nutrients", "testing"],
    likes: 204,
    comments: 56,
    imageUrl: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    fullContent: `
      <h2>A Farmer's Guide to Soil Health Indicators</h2>
      
      <p>The foundation of successful farming starts beneath our feet. Healthy soil does far more than just hold plants upright—it's a complex, living ecosystem that drives productivity, resilience, and sustainability. This comprehensive guide explores the key indicators of soil health and provides practical methods to assess and improve your soil.</p>
      
      <h3>Why Soil Health Matters</h3>
      
      <p>Healthy soil delivers multiple benefits:</p>
      
      <ul>
        <li>Increased crop yields and quality</li>
        <li>Improved water infiltration and retention</li>
        <li>Enhanced nutrient cycling and availability</li>
        <li>Greater disease and pest suppression</li>
        <li>Reduced erosion and runoff</li>
        <li>Increased carbon sequestration</li>
      </ul>
      
      <p>Research from the Soil Health Institute indicates that for every 1% increase in soil organic matter, the soil can hold approximately 20,000 more gallons of water per acre.</p>
      
      <h3>Physical Indicators</h3>
      
      <h4>1. Soil Structure and Aggregation</h4>
      
      <p>Well-structured soil has stable aggregates that allow for proper aeration, water infiltration, and root growth. To assess soil structure:</p>
      
      <ul>
        <li><strong>Slake Test:</strong> Place a dry soil clump in water and observe how quickly it falls apart. Stable aggregates resist disintegration.</li>
        <li><strong>Visual Assessment:</strong> Examine a shovelful of soil for granular structure (resembling coffee grounds or cottage cheese) which indicates good aggregation.</li>
      </ul>
      
      <p>A 2019 study in Soil Science Society of America Journal found that soils with strong aggregation had 30-45% higher yields during drought years compared to poorly aggregated soils.</p>
      
      <h4>2. Compaction</h4>
      
      <p>Compacted soil restricts root growth and water movement. Evaluate compaction using:</p>
      
      <ul>
        <li><strong>Penetrometer:</strong> This tool measures the resistance a probe meets as it's pushed into soil. Readings above 300 psi indicate problematic compaction for most crops.</li>
        <li><strong>Shovel Test:</strong> The effort required to push a shovel into soil provides a simple indication of compaction.</li>
        <li><strong>Wire Flag Method:</strong> Push a thick wire flag into the soil; it will bend when it hits compacted layers.</li>
      </ul>
      
      <p>Ohio State University research demonstrates that soil compaction can reduce yields by 10-20% in the year it occurs, with effects potentially lasting 3-5 years.</p>
      
      <h4>3. Infiltration and Water Holding Capacity</h4>
      
      <p>These properties determine how soil captures and stores water:</p>
      
      <ul>
        <li><strong>Infiltration Test:</strong> Push a 6-inch diameter ring 3 inches into the soil and pour in 1 inch of water. Measure how long it takes to completely infiltrate. Less than 3 minutes is excellent; more than 30 minutes indicates poor infiltration.</li>
        <li><strong>Field Moisture Assessment:</strong> Squeeze a handful of soil—it should form a ball that breaks into crumbs when gently disturbed. If it's powdery or forms a tight ball, water management may be an issue.</li>
      </ul>
      
      <h3>Biological Indicators</h3>
      
      <h4>1. Organic Matter Content</h4>
      
      <p>Soil organic matter (SOM) drives biological activity and influences numerous soil functions:</p>
      
      <ul>
        <li><strong>Laboratory Testing:</strong> Standard soil tests can measure total organic matter percentage. Most agricultural soils contain 1-6% SOM, with higher values generally indicating better soil health.</li>
        <li><strong>Color Assessment:</strong> Darker soils typically contain more organic matter. Compare topsoil with subsoil to evaluate SOM accumulation.</li>
      </ul>
      
      <p>The USDA Natural Resources Conservation Service estimates that each 1% increase in soil organic matter helps soil hold 25,000 gallons more water per acre.</p>
      
      <h4>2. Soil Biological Activity</h4>
      
      <p>Active soil life indicates a functioning soil ecosystem:</p>
      
      <ul>
        <li><strong>Earthworm Counts:</strong> Dig a 1-foot cube of soil and count the earthworms. Finding 10+ earthworms suggests good biological activity.</li>
        <li><strong>Residue Decomposition:</strong> Place mesh bags containing crop residue in soil and check decomposition after 60 days. Faster breakdown indicates higher biological activity.</li>
        <li><strong>CO2 Respiration Tests:</strong> Commercial test kits measure microbial respiration rates, which reflect overall biological activity.</li>
      </ul>
      
      <p>Research published in Applied Soil Ecology found that soils with high biological activity suppressed certain plant pathogens by 40-80% through competitive exclusion and antagonism.</p>
      
      <h4>3. Root Development</h4>
      
      <p>Healthy roots indicate suitable physical, chemical, and biological soil conditions:</p>
      
      <ul>
        <li><strong>Root Depth:</strong> Dig plants and measure root depth. Restricted rooting often indicates compaction, pH problems, or poor structure.</li>
        <li><strong>Root Health Assessment:</strong> Examine roots for color, branching, and nodulation (in legumes). White, extensively branched roots with abundant nodules indicate good soil health.</li>
      </ul>
      
      <h3>Chemical Indicators</h3>
      
      <h4>1. pH</h4>
      
      <p>Soil pH affects nutrient availability and biological activity:</p>
      
      <ul>
        <li><strong>Laboratory Testing:</strong> Standard soil tests include pH measurement. Most crops perform best in soils with pH between 6.0 and 7.0.</li>
        <li><strong>Field pH Kits:</strong> These provide quick, though less precise, pH readings for soil monitoring.</li>
      </ul>
      
      <p>University of Minnesota research shows that crop availability of phosphorus can be reduced by up to 30% in acidic soils (pH &lt; 5.5) and by up to 50% in alkaline soils (pH &gt; 7.5).</p>
      
      <h4>2. Nutrient Balance and Availability</h4>
      
      <p>Beyond total nutrient content, balanced availability is crucial:</p>
      
      <ul>
        <li><strong>Standard Soil Tests:</strong> Measure macronutrients (N, P, K, Ca, Mg, S) and some micronutrients.</li>
        <li><strong>Base Saturation:</strong> The proportion of exchange sites occupied by basic cations (Ca, Mg, K, Na). Ideal ranges vary by soil type but generally aim for 65-75% Ca, 10-15% Mg, and 2-5% K.</li>
        <li><strong>Cation Exchange Capacity (CEC):</strong> Indicates soil's ability to hold nutrients. Higher CEC (>10 meq/100g) generally means better nutrient retention.</li>
      </ul>
      
      <h4>3. Salinity and Sodium</h4>
      
      <p>Excessive salts or sodium damage soil structure and plant growth:</p>
      
      <ul>
        <li><strong>Electrical Conductivity (EC):</strong> Measures total soluble salts. Values above 4 dS/m can impact sensitive crops.</li>
        <li><strong>Sodium Adsorption Ratio (SAR):</strong> Indicates potential sodium problems. Values above 13 typically cause structural degradation.</li>
      </ul>
      
      <h3>Integrated Assessment Tools</h3>
      
      <p>Several standardized protocols combine multiple indicators for comprehensive assessment:</p>
      
      <ul>
        <li><strong>USDA Soil Health Test Kit:</strong> Includes 12 measurements covering physical, chemical, and biological properties.</li>
        <li><strong>Cornell Comprehensive Assessment of Soil Health:</strong> Provides standardized measurements with interpretations and management suggestions.</li>
        <li><strong>Haney Soil Health Test:</strong> Evaluates soil health through biological activity and nutrient cycling measurements.</li>
      </ul>
      
      <h3>Improving Soil Health</h3>
      
      <p>Once you've identified soil health issues, consider these improvement strategies:</p>
      
      <h4>Physical Properties</h4>
      
      <ul>
        <li>Minimize tillage to protect soil structure</li>
        <li>Use controlled traffic patterns to reduce compaction</li>
        <li>Incorporate cover crops with diverse root systems</li>
        <li>Add organic amendments like compost or manure</li>
      </ul>
      
      <h4>Biological Properties</h4>
      
      <ul>
        <li>Implement diverse crop rotations</li>
        <li>Maintain living roots throughout the year</li>
        <li>Apply biological inoculants when appropriate</li>
        <li>Reduce synthetic pesticide use that may harm beneficial organisms</li>
      </ul>
      
      <h4>Chemical Properties</h4>
      
      <ul>
        <li>Apply lime or sulfur to adjust pH as needed</li>
        <li>Use precision agriculture for targeted nutrient application</li>
        <li>Consider slow-release nutrient sources</li>
        <li>Address drainage issues in saline soils</li>
      </ul>
      
      <h3>Monitoring Changes</h3>
      
      <p>Soil health improvements often develop gradually. Establish a monitoring program that:</p>
      
      <ul>
        <li>Tests the same locations at the same time of year</li>
        <li>Tracks changes over multiple years</li>
        <li>Compares managed fields with undisturbed areas (fence rows, woodlots) as reference points</li>
        <li>Documents management changes alongside soil measurements</li>
      </ul>
      
      <p>Research from the Soil Health Institute's North American Project to Evaluate Soil Health Measurements found that most soil health indicators take 3-5 years of consistent management to show significant improvement.</p>
      
      <h3>Conclusion</h3>
      
      <p>Soil health assessment should be viewed as an ongoing journey rather than a one-time evaluation. By regularly monitoring key indicators and adjusting management practices accordingly, farmers can build soils that are more productive, efficient, and resilient. Remember that soil health strategies must be adapted to your specific soil types, climate, and production systems. Work with local extension specialists, conservation professionals, and soil testing laboratories to develop a soil health plan tailored to your operation's unique context.</p>
    `
  },
  {
    id: 4,
    title: "Market Trends: What to Plant Next Season",
    excerpt: "An analysis of current agricultural market trends and projections for the coming season to help inform your crop planning decisions.",
    author: "Michael Roberts",
    date: "July 10, 2023",
    category: "Market Analysis",
    tags: ["markets", "planning", "crops"],
    likes: 87,
    comments: 31,
    imageUrl: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    fullContent: `
      <h2>Market Outlook: Strategic Crop Selection for the Coming Season</h2>
      
      <p>Making informed planting decisions is increasingly critical in today's volatile agricultural markets. This analysis examines current market trends, emerging opportunities, and factors influencing crop profitability to help producers develop strategic planting plans for the upcoming season.</p>
      
      <h3>Global Market Overview</h3>
      
      <p>Several macroeconomic factors are shaping agricultural markets:</p>
      
      <ul>
        <li><strong>Supply Chain Stabilization:</strong> While still recovering from pandemic disruptions, most agricultural supply chains have improved, leading to more predictable distribution systems.</li>
        <li><strong>Inflation Pressures:</strong> Input costs remain elevated, though the rate of increase has slowed. The USDA Economic Research Service reports that farm production expenses are projected to rise 4.1% this year, compared to 9.3% last year.</li>
        <li><strong>International Trade:</strong> Ongoing geopolitical tensions continue to impact global grain trade, with Black Sea exports facing particular uncertainty.</li>
        <li><strong>Climate Volatility:</strong> Increasing weather extremes affect production and price volatility, creating both risks and opportunities.</li>
      </ul>
      
      <p>The United Nations Food and Agriculture Organization (FAO) Food Price Index shows agricultural commodity prices trending 10-15% lower than last year's peaks but still historically high compared to pre-pandemic levels.</p>
      
      <h3>Commodity Crop Outlook</h3>
      
      <h4>Corn</h4>
      
      <p><strong>Market Signals:</strong> Current futures prices show modest strength, with December contracts trading in the $5.30-5.90 per bushel range. Market analysts from the University of Illinois project a potential 5-10% contraction in planted acreage nationally due to elevated input costs.</p>
      
      <p><strong>Key Factors to Watch:</strong></p>
      <ul>
        <li>Ethanol demand, which has stabilized but faces long-term uncertainty with EV adoption</li>
        <li>South American production, where Brazil continues to expand output</li>
        <li>Chinese import policies, as recent purchasing patterns have shown inconsistency</li>
      </ul>
      
      <p><strong>Strategic Considerations:</strong> Producers with strong yield histories may still find corn profitable, especially with aggressive cost management. Consider fertilizer pre-purchasing programs and robust forward contracting to lock in profitable price points.</p>
      
      <h4>Soybeans</h4>
      
      <p><strong>Market Signals:</strong> November futures have shown strength, trading in the $12.50-13.00 per bushel range. The global vegetable oil market remains tight, supporting crush demand.</p>
      
      <p><strong>Key Factors to Watch:</strong></p>
      <ul>
        <li>Chinese import levels, which account for approximately 60% of global soybean trade</li>
        <li>Renewable diesel expansion, creating additional demand for soybean oil</li>
        <li>South American production recovery after drought-affected harvests</li>
      </ul>
      
      <p><strong>Strategic Considerations:</strong> Lower input requirements compared to corn make soybeans attractive in the current high-cost environment. The soybean-to-corn price ratio currently favors soybeans in many regions. Consider specialty contracts for high-protein or non-GMO varieties for premium opportunities.</p>
      
      <h4>Wheat</h4>
      
      <p><strong>Market Signals:</strong> Wheat markets remain volatile with weather concerns in key growing regions and ongoing export disruptions from the Black Sea region. Chicago, Kansas City, and Minneapolis wheat futures indicate regional variations in market outlook.</p>
      
      <p><strong>Key Factors to Watch:</strong></p>
      <ul>
        <li>Black Sea export corridor stability</li>
        <li>Drought conditions in key global production areas</li>
        <li>Quality spreads, which have widened due to supply constraints in premium wheat classes</li>
      </ul>
      
      <p><strong>Strategic Considerations:</strong> Consider variety selection carefully, as quality premiums have increased. For winter wheat producers, split nitrogen applications may optimize input efficiency while allowing flexibility based on developing market conditions.</p>
      
      <h3>Specialty and Alternative Crop Opportunities</h3>
      
      <h4>Pulses (Lentils, Chickpeas, Dry Peas)</h4>
      
      <p><strong>Market Potential:</strong> Global pulse demand continues to grow at 3-5% annually, driven by plant-protein trends and developing world dietary shifts. Current prices are 15-20% above five-year averages.</p>
      
      <p><strong>Production Considerations:</strong> Pulses offer nitrogen-fixing benefits in rotation and generally lower input costs. However, they require specialized harvesting equipment and careful quality management.</p>
      
      <p><strong>Best Positioned For:</strong> Producers in semi-arid regions with established relationships with pulse processors or co-ops. Contract production is strongly recommended.</p>
      
      <h4>Specialty Oilseeds</h4>
      
      <p><strong>Market Potential:</strong> Canola, sunflower, and safflower markets show strength, with prices 10-30% above historical averages depending on the crop and quality factors.</p>
      
      <ul>
        <li><strong>Canola:</strong> Expansion of crush capacity in North America is creating additional demand, with high-oleic varieties commanding premiums.</li>
        <li><strong>Sunflowers:</strong> Both oil and confection types show strong demand, with confection varieties offering higher profit potential but requiring more management.</li>
        <li><strong>Specialty Varieties:</strong> High-oleic versions of these crops typically command $1.00-2.50 per bushel premiums but require identity preservation and contract production.</li>
      </ul>
      
      <p><strong>Best Positioned For:</strong> Producers with moderate precipitation or irrigation and good contracts with specialty processors.</p>
      
      <h4>Hemp</h4>
      
      <p><strong>Market Potential:</strong> After the initial boom-bust cycle, the hemp market is showing signs of maturation. CBD oversupply has depressed that segment, but fiber and grain markets are developing more sustainable structures.</p>
      
      <p><strong>Production Considerations:</strong> Regulatory complexity continues, though it has improved. Specialized harvesting equipment and immediate processing access are critical success factors.</p>
      
      <p><strong>Best Positioned For:</strong> Risk-tolerant producers within 50 miles of a processor and with diversified income streams. Absolutely requires contract production with established buyers.</p>
      
      <h3>Horticultural Crop Trends</h3>
      
      <p>For producers with appropriate land, labor, and market access, several horticultural segments show promise:</p>
      
      <h4>Fresh Market Vegetables</h4>
      
      <p><strong>Market Potential:</strong> Local and regional fresh vegetable markets remain strong, with a premium for organic and locally grown produce. USDA data shows farm-to-retail price spreads creating opportunity for direct marketing.</p>
      
      <p><strong>Trending Crops:</strong> Leafy greens, heirloom tomatoes, specialty peppers, and garlic continue to command strong prices. Cold-hardy crops extending the season at both ends show particularly strong returns in northern regions.</p>
      
      <p><strong>Best Positioned For:</strong> Producers near population centers with direct marketing capabilities or established wholesale relationships. Season extension infrastructure (high tunnels, greenhouses) significantly increases profit potential.</p>
      
      <h4>Berries</h4>
      
      <p><strong>Market Potential:</strong> Berry consumption continues to grow at 5-7% annually according to the North American Blueberry Council, with blueberries, blackberries, and raspberries showing particular strength.</p>
      
      <p><strong>Production Considerations:</strong> High establishment costs and labor requirements are offset by strong pricing. Bird pressure, labor availability, and cold damage present significant risks.</p>
      
      <p><strong>Best Positioned For:</strong> Producers with appropriate soils, water availability, and either strong U-pick markets or premium wholesale outlets. Consider cooperatives for processing grade berries.</p>
      
      <h3>Livestock Feed Crop Considerations</h3>
      
      <p>For integrated crop-livestock operations:</p>
      
      <h4>Forage Crops</h4>
      
      <p><strong>Market Signals:</strong> Quality hay prices remain strong in most regions due to persistent drought conditions in key production areas. The USDA reports premium alfalfa hay prices 15-25% above five-year averages in most markets.</p>
      
      <p><strong>Considerations:</strong> Improved varieties with higher yields and better digestibility characteristics offer significant advantages. Multi-species cover crop mixes for grazing provide both soil benefits and flexible feed options.</p>
      
      <h4>Silage Crops</h4>
      
      <p><strong>Market Signals:</strong> Specialized varieties for silage production often offer better returns than grain varieties when used in integrated operations. Brown midrib corn and sorghum varieties command premiums in dairy regions.</p>
      
      <p><strong>Considerations:</strong> Carefully evaluate moisture management systems and storage capacity before expanding silage production.</p>
      
      <h3>Risk Management Strategies</h3>
      
      <p>Given market volatility, robust risk management is essential:</p>
      
      <ul>
        <li><strong>Diversified Crop Mix:</strong> Consider allocating acreage across 3-5 crops with different market drivers to spread risk.</li>
        <li><strong>Forward Contracting:</strong> Secure pricing for 40-60% of expected production when profitable margins are available.</li>
        <li><strong>Crop Insurance:</strong> Revenue protection policies provide essential downside protection. Consider supplemental coverage options in high-value crops.</li>
        <li><strong>Cost Control:</strong> Aggressive input management can preserve margins in volatile markets. Consider soil testing for precise fertilizer application and variable rate technology.</li>
      </ul>
      
      <h3>Decision Framework</h3>
      
      <p>Consider these steps when making crop selection decisions:</p>
      
      <ol>
        <li>Evaluate your operation's agronomic capabilities, equipment, and expertise</li>
        <li>Calculate detailed cost of production estimates for potential crops</li>
        <li>Assess realistic yield expectations based on soil types and historical performance</li>
        <li>Determine marketing options and distance to processors or markets</li>
        <li>Analyze crop insurance availability and effectiveness for each option</li>
        <li>Consider rotation benefits and whole-farm impacts beyond single-season returns</li>
      </ol>
      
      <h3>Conclusion</h3>
      
      <p>While traditional commodity crops continue to form the backbone of most farming operations, strategic diversification into specialty markets offers significant opportunities for enhanced profitability. The optimal crop mix will vary based on your operation's specific circumstances, risk tolerance, and marketing capabilities.</p>
      
      <p>Remember that successful crop selection involves balancing market opportunity with your operation's production capabilities and constraints. Developing relationships with buyers before planting, especially for specialty crops, remains essential for success. By carefully analyzing market signals and aligning them with your farm's capabilities, you can position your operation for both short-term profitability and long-term sustainability.</p>
    `
  },
];

export function ArticlesList() {
  const [articles, setArticles] = useState(articleData);
  const [selectedArticle, setSelectedArticle] = useState<typeof articleData[0] | null>(null);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const { toast } = useToast();
  
  // Handle article click/interaction
  const handleReadMore = (article: typeof articleData[0]) => {
    setSelectedArticle(article);
    setShowArticleModal(true);
    
    // Increment the like count when clicking "Read More"
    setArticles(prevArticles => 
      prevArticles.map(a => 
        a.id === article.id ? { ...a, likes: a.likes + 1 } : a
      )
    );
    
    toast({
      title: "Article Opened",
      description: `Reading: ${article.title}`,
    });
  };
  
  // Handle article title click
  const handleTitleClick = (article: typeof articleData[0]) => {
    handleReadMore(article);
  };
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-video w-full overflow-hidden bg-muted">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="h-full w-full object-cover"
              />
            </div>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="bg-accent/50">
                  {article.category}
                </Badge>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  {article.date}
                </div>
              </div>
              <CardTitle 
                className="text-xl line-clamp-2 hover:text-primary cursor-pointer"
                onClick={() => handleTitleClick(article)}
              >
                {article.title}
              </CardTitle>
              <div className="flex items-center text-sm text-muted-foreground">
                <User2 className="h-3 w-3 mr-1" />
                {article.author}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3">
                {article.excerpt}
              </p>
              <div className="flex flex-wrap gap-1 mt-3">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="flex gap-4 text-muted-foreground text-sm">
                <div className="flex items-center">
                  <ThumbsUp className="h-3 w-3 mr-1" />
                  {article.likes}
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  {article.comments}
                </div>
              </div>
              <Button 
                size="sm"
                onClick={() => handleReadMore(article)}
              >
                Read More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Article Modal */}
      {selectedArticle && (
        <Dialog open={showArticleModal} onOpenChange={setShowArticleModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedArticle.title}</DialogTitle>
              <DialogDescription className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{selectedArticle.category}</Badge>
                  <span className="text-sm text-muted-foreground">
                    <User2 className="h-3 w-3 inline mr-1" />
                    {selectedArticle.author}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3 inline mr-1" />
                  {selectedArticle.date}
                </span>
              </DialogDescription>
            </DialogHeader>
            
            <ScrollArea className="h-[calc(100vh-200px)] mt-4">
              <div className="aspect-video w-full overflow-hidden bg-muted mb-6">
                <img
                  src={selectedArticle.imageUrl}
                  alt={selectedArticle.title}
                  className="h-full w-full object-cover"
                />
              </div>
              
              <div 
                className="prose prose-stone max-w-none px-1"
                dangerouslySetInnerHTML={{ __html: selectedArticle.fullContent }}
              />
              
              <div className="flex flex-wrap gap-2 mt-8 mb-4">
                {selectedArticle.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between items-center">
                <div className="flex gap-4 text-muted-foreground">
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {selectedArticle.likes} likes
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {selectedArticle.comments} comments
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowArticleModal(false)}
                >
                  Close
                </Button>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
