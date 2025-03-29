
// Resource types and interfaces
export interface FarmResource {
  id: string;
  title: string;
  description: string;
  content?: string;
  fileUrl?: string;
  externalUrl?: string;
  type: 'worksheet' | 'template' | 'guide' | 'calculator' | 'resource' | 'mentorship';
}

// Guidance resources
export const guidanceResources: Record<string, FarmResource> = {
  farmVision: {
    id: 'farm-vision',
    title: 'Farm Vision Worksheet',
    description: 'A structured worksheet to help define your farm vision and goals',
    content: `# Farm Vision Worksheet

## 1. Your Farm's Purpose
- What motivates you to farm?
- What problems do you want to solve through farming?
- What values do you want your farm to embody?

## 2. Core Farm Identity
- In one sentence, describe what your farm will be:
- What makes your approach unique?
- Who will your farm serve?

## 3. Long-term Vision (5-10 years)
- Describe what you want your farm to look like in 5-10 years:
- What will be growing/raised?
- What infrastructure will be in place?
- How will you interact with your community?

## 4. Goals Framework
Set SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound)

### Short-term (1 year)
1. 
2.
3.

### Medium-term (2-3 years)
1.
2.
3.

### Long-term (5+ years)
1.
2.
3.

## 5. Success Metrics
- How will you measure progress toward your vision?
- What indicators will show you're on the right path?

## 6. Values & Principles
List 3-5 core values that will guide your farm decisions:
1.
2.
3.
4.
5.

## 7. Revisit & Revise
Schedule dates to review this vision:
- 3-month check-in:
- 6-month check-in:
- Annual review:`,
    type: 'worksheet'
  },
  goalTemplate: {
    id: 'goal-template',
    title: 'Farm Goal Template',
    description: 'Template for setting and tracking specific farm goals',
    content: `# Farm Goal Planning Template

## Farm Goal Details

**Goal Title:** [Enter specific goal here]

**Goal Category:**
- [ ] Production
- [ ] Financial
- [ ] Infrastructure
- [ ] Marketing
- [ ] Education/Skills
- [ ] Other: ___________

**Timeframe:**
- [ ] Short-term (0-1 year)
- [ ] Medium-term (1-3 years)
- [ ] Long-term (3+ years)

**Target Completion Date:** ________________

## SMART Framework

**Specific** - Exactly what do you want to accomplish?
[Your answer here]

**Measurable** - How will you know when you've achieved it?
[Your answer here]

**Achievable** - Is this realistic with your resources?
[Your answer here]

**Relevant** - How does this align with your farm vision?
[Your answer here]

**Time-bound** - What are the milestone dates?
[Your answer here]

## Action Steps

1. _____________________________________________ By when? _________
2. _____________________________________________ By when? _________
3. _____________________________________________ By when? _________
4. _____________________________________________ By when? _________
5. _____________________________________________ By when? _________

## Resources Needed

**Skills/Knowledge:**
[List skills/training needed]

**Materials/Equipment:**
[List what you'll need to purchase/acquire]

**Funding:**
[Estimated costs and potential sources]

**People:**
[Who can help you achieve this goal]

## Potential Obstacles & Solutions

**Obstacle 1:** _______________________________________________
**Solution:** ________________________________________________

**Obstacle 2:** _______________________________________________
**Solution:** ________________________________________________

## Progress Tracking

Date | Progress Update | Next Steps
---- | --------------- | ----------
     |                 |
     |                 |
     |                 |

## Completion & Reflection

**Date Completed:** __________________

**What went well?**
[Your answer]

**What would you do differently?**
[Your answer]

**What did you learn?**
[Your answer]

**Follow-up goals:**
[Your answer]`,
    type: 'template'
  },
  resourceInventory: {
    id: 'resource-inventory',
    title: 'Farm Resource Inventory',
    description: 'Comprehensive inventory template for assessing your farming resources',
    content: `# Farm Resource Inventory

## Land Resources

### Property Overview
- Total acreage: ________
- Usable acreage for farming: ________
- Current land use: ________
- Ownership status: □ Own □ Lease □ Other: ________

### Soil Assessment
- Soil types present: ________
- Previous soil test results: ________
- Drainage characteristics: □ Good □ Fair □ Poor
- History of amendments: ________

### Water Resources
- Water sources: □ Well □ Municipal □ Surface water □ Other: ________
- Water rights/permits: ________
- Irrigation infrastructure: ________
- Water quality test results: ________

### Topography
- Elevation range: ________
- Slope characteristics: ________
- Sun exposure/orientation: ________
- Wind patterns: ________

### Ecological Features
- Existing vegetation: ________
- Wildlife presence: ________
- Natural habitat areas: ________
- Potential conservation areas: ________

## Infrastructure & Equipment

### Buildings
| Building | Size | Condition | Current Use | Potential Use |
|----------|------|-----------|-------------|---------------|
|          |      |           |             |               |
|          |      |           |             |               |

### Fencing
- Type: ________
- Condition: ________
- Coverage area: ________

### Equipment Inventory
| Equipment | Age | Condition | Owned/Borrowed/Needed |
|-----------|-----|-----------|------------------------|
|           |     |           |                        |
|           |     |           |                        |

### Utilities
- Electricity: □ Available □ Capacity: ________
- Internet: □ Available □ Type: ________
- Heating/cooling: ________
- Waste management: ________

## Financial Resources

### Available Capital
- Startup funds available: ________
- Emergency reserves: ________
- Annual operating budget: ________

### Potential Funding Sources
- Personal savings: ________
- Family/investor support: ________
- Loans applied for/received: ________
- Grants identified: ________

### Assets
- Value of owned land: ________
- Value of equipment: ________
- Other business assets: ________

## Human Resources

### Skills Inventory
- Your farming experience: ________
- Specialized skills: ________
- Areas needing development: ________

### Available Labor
- Hours you can commit weekly: ________
- Family labor available: ________
- Potential employees/volunteers: ________

### Support Network
- Mentors: ________
- Advisors: ________
- Farming organizations: ________
- Community connections: ________

## Market Resources

### Potential Markets
- Local farmers markets: ________
- Restaurants interested: ________
- Retail outlets: ________
- CSA potential: ________
- Online sales platforms: ________

### Competition
- Similar farms in area: ________
- Their products/services: ________
- Your potential advantages: ________

## Next Steps

### Immediate Needs (identify top 3)
1. ________
2. ________
3. ________

### Resource Development Plan
- Short-term acquisitions: ________
- Medium-term improvements: ________
- Long-term investments: ________`,
    type: 'worksheet'
  },
  marketResearch: {
    id: 'market-research',
    title: 'Market Research Guide',
    description: 'Guide to conducting effective market research for farm products',
    content: `# Farm Market Research Guide

## Market Overview Research

### Local Market Assessment

#### Demographics
- Population size within 25 miles: ________
- Income levels: □ Low □ Medium □ High □ Mixed
- Age distribution: ________
- Education levels: ________
- Cultural/ethnic composition: ________

#### Existing Market Options
- Grocery stores: ________
- Farmers markets: 
  - Location: ________
  - Days/times: ________
  - Vendor fees: ________
  - Customer volume: ________
- CSAs already operating: ________
- Farm stands: ________
- Online marketplaces: ________

#### Competition Analysis
| Farm Name | Products | Price Points | Strengths | Weaknesses | Marketing Approach |
|-----------|----------|--------------|-----------|------------|-------------------|
|           |          |              |           |            |                   |
|           |          |              |           |            |                   |

## Consumer Research

### Customer Segments to Consider
- Health-conscious consumers
- Families with children
- Chefs/restaurants
- Food co-ops/buying clubs
- Specialty food enthusiasts
- Institutions (schools, hospitals)

### For Each Segment, Research:
- Shopping habits: ________
- Price sensitivity: ________
- Quality expectations: ________
- Volume requirements: ________
- Delivery/pickup preferences: ________
- Commitment level: ________

### Customer Interview Questions
1. Where do you currently buy your [product]?
2. What factors are most important when choosing [product]?
3. How much do you typically pay for [product]?
4. What would make you switch to a local farm source?
5. What additional products would you be interested in?

## Product Research

### Product Selection Matrix
| Potential Product | Production Feasibility | Market Demand | Profit Margin | Competition Level | Decision |
|-------------------|------------------------|---------------|---------------|-------------------|----------|
|                   |                        |               |               |                   |          |
|                   |                        |               |               |                   |          |

### For Each Chosen Product:
- Production timeline: ________
- Resource requirements: ________
- Price research: ________
- Shelf life/storage needs: ________
- Value-added potential: ________

## Sales Channel Evaluation

### For Each Potential Channel:

#### Farmers Market
- Pros: ________
- Cons: ________
- Requirements: ________
- Profit potential: ________

#### CSA Program
- Pros: ________
- Cons: ________
- Requirements: ________
- Profit potential: ________

#### Restaurant Sales
- Pros: ________
- Cons: ________
- Requirements: ________
- Profit potential: ________

#### Farm Stand/Farm Store
- Pros: ________
- Cons: ________
- Requirements: ________
- Profit potential: ________

#### Wholesale
- Pros: ________
- Cons: ________
- Requirements: ________
- Profit potential: ________

#### Online Sales
- Pros: ________
- Cons: ________
- Requirements: ________
- Profit potential: ________

## Pricing Strategy

### Cost-Based Pricing
- Production costs per unit: ________
- Desired profit margin: ________
- Calculated price: ________

### Market-Based Pricing
- Competitor price range: ________
- Premium/discount position: ________
- Adjusted price: ________

### Value-Based Pricing
- Customer perceived value: ________
- Price ceiling determined: ________

## Market Testing Plan

### Small-Scale Test Methods
- Sample products at events: ________
- Pre-sales approach: ________
- Limited market trial: ________

### Feedback Methods
- Customer survey: ________
- Sales tracking: ________
- Direct customer conversations: ________

## Marketing Plan Outline

### Brand Positioning
- Unique selling proposition: ________
- Core brand values: ________
- Key messages: ________

### Marketing Channels
- Social media platforms: ________
- Email marketing: ________
- Community events: ________
- Partnerships: ________
- Traditional advertising: ________

### Budget Allocation
- Startup marketing budget: ________
- Ongoing monthly budget: ________
- Time commitment: ________

## Next Steps
1. ________
2. ________
3. ________`,
    type: 'guide'
  },
  businessPlanTemplate: {
    id: 'business-plan',
    title: 'Farm Business Plan Template',
    description: 'Comprehensive template for developing your farm business plan',
    content: `# Farm Business Plan Template

## Executive Summary
[Write this section last - a 1-page overview of your entire business plan]

## 1. Business Description

### Farm Identity
- Farm name: 
- Legal structure: □ Sole proprietorship □ LLC □ Partnership □ Corporation □ Other: ________
- Location:
- Size (acreage):
- Mission statement:
- Vision statement:

### Farm History
- Date established/planned start:
- Background/history:
- Major milestones to date:

### Products & Services
- Primary products:
- Secondary products:
- Value-added products:
- Agritourism/educational services:
- Other services:

## 2. Market Analysis

### Target Market
- Primary customer segments:
- Geographic reach:
- Customer demographics:
- Customer needs/preferences:

### Industry Analysis
- Local agricultural trends:
- Relevant market size:
- Growth potential:
- Seasonality factors:

### Competition
- Direct competitors:
- Indirect competitors:
- Your competitive advantages:
- Market positioning strategy:

## 3. Marketing Plan

### Marketing Strategy
- Brand positioning:
- Unique selling proposition:
- Pricing strategy:
- Positioning relative to competitors:

### Sales Channels
- Direct-to-consumer channels:
- Wholesale channels:
- Online sales strategy:
- Future channel development:

### Marketing Activities
- Advertising methods:
- Social media strategy:
- Community engagement:
- Relationship marketing:
- Marketing budget:

## 4. Operations Plan

### Production Methods
- Growing/raising practices:
- Production calendar:
- Certifications (organic, etc.):
- Equipment requirements:
- Production capacity:

### Land Use Plan
- Field/pasture allocation:
- Rotation schedule:
- Conservation areas:
- Future expansion areas:

### Facilities
- Current buildings/infrastructure:
- Needed improvements:
- Storage facilities:
- Processing facilities:

### Supply Chain
- Input suppliers:
- Processing partners:
- Distribution methods:

### Risk Management
- Weather contingencies:
- Pest/disease management:
- Market fluctuation plans:
- Insurance coverage:

## 5. Management & Organization

### Management Team
- Owner(s)/operators:
- Key personnel:
- Advisors/mentors:
- Professional services (accounting, legal):

### Staffing Plan
- Labor requirements:
- Hiring timeline:
- Training program:
- Compensation structure:

## 6. Financial Plan

### Startup Requirements
- Land acquisition/lease:
- Building/facilities:
- Equipment:
- Initial inventory/supplies:
- Working capital:
- Total startup costs:

### Funding Sources
- Owner investment:
- Loans:
- Grants:
- Other funding:
- Funding gap:

### Financial Projections
- 3-year income projection:
- Cash flow projection:
- Break-even analysis:
- Balance sheet projection:

### Financial Strategies
- Pricing structure:
- Cost control measures:
- Profit margin targets:
- Reinvestment strategy:

## 7. Implementation Timeline

### Development Schedule
- Land preparation:
- Infrastructure development:
- Equipment acquisition:
- Initial planting/stocking:
- First harvest/production:

### Milestones
- Key activities and completion dates:
- Growth phases:
- Expansion triggers:

## 8. Appendices
- Detailed financial worksheets
- Resumes of key team members
- Photos/maps of farm
- Market research data
- Equipment lists
- Supply lists
- Supporting documentation`,
    type: 'template'
  },
  financialCalculator: {
    id: 'financial-calculator',
    title: 'Farm Financial Calculator',
    description: 'Interactive calculator for farm financial planning',
    content: `# Farm Financial Planning Calculator

## Startup Costs Estimator

### Land
- Purchase price or annual lease: $________
- Closing costs/fees: $________
- Initial land improvements: $________
- Subtotal Land Costs: $________

### Buildings & Facilities
| Item | Cost Estimate |
|------|---------------|
|      | $             |
|      | $             |
|      | $             |
| Subtotal Buildings & Facilities: | $ |

### Equipment
| Item | New/Used | Cost Estimate |
|------|----------|---------------|
|      |          | $             |
|      |          | $             |
|      |          | $             |
| Subtotal Equipment: | | $ |

### Initial Operating Expenses (until first revenue)
- Seeds/plants/livestock: $________
- Soil amendments/feed: $________
- Utilities (6 months): $________
- Insurance (annual): $________
- Marketing/website: $________
- Certifications/permits: $________
- Labor (6 months): $________
- Professional services: $________
- Subtotal Operating Expenses: $________

### Working Capital Reserve
- Emergency fund (3-6 months expenses): $________

### TOTAL STARTUP INVESTMENT: $________

## Production Enterprise Budgets

### Enterprise: ________

#### Revenue
- Expected yield per acre/unit: ________
- Price per unit: $________
- Gross revenue per acre/unit: $________
- Total acres/units: ________
- Total gross revenue: $________

#### Variable Costs
- Seeds/plants: $________
- Fertilizer/amendments: $________
- Pest/disease control: $________
- Water/irrigation: $________
- Harvest supplies: $________
- Packaging materials: $________
- Labor: $________
- Fuel: $________
- Marketing/selling fees: $________
- Other variable costs: $________
- Total variable costs: $________

#### Fixed Costs (allocated to this enterprise)
- Equipment depreciation: $________
- Building depreciation: $________
- Insurance: $________
- Property taxes: $________
- Certifications: $________
- Loan payments: $________
- Other fixed costs: $________
- Total fixed costs: $________

#### Profitability
- Total costs: $________
- Net profit: $________
- Profit per acre/unit: $________
- Break-even price: $________
- Break-even yield: ________

## Cash Flow Planning Template

### Monthly Cash Flow Year 1
[Table with months across top, income and expense categories down left side]

### Projected Annual Cash Flow
[Table with years across top (Years 1-5), income and expense categories down left side]

## Financial Indicators

### Solvency Ratios
- Debt-to-asset ratio: ________
- Equity-to-asset ratio: ________

### Liquidity Ratios
- Current ratio: ________
- Working capital: $________

### Profitability Measures
- Net farm income: $________
- Return on assets: ________%
- Return on equity: ________%
- Operating profit margin: ________%

### Efficiency Measures
- Asset turnover ratio: ________
- Operating expense ratio: ________%

## Loan Calculator

### Loan Details
- Loan amount: $________
- Interest rate: ________%
- Term (years): ________
- Payment frequency: □ Monthly □ Quarterly □ Annual

### Calculation Results
- Payment amount: $________
- Total interest paid: $________
- Total cost of loan: $________

### Loan Comparison
[Table to compare different loan options]

## Investment Analysis

### Enterprise Comparison
[Table to compare profitability of different enterprises]

### Capital Investment Analysis
- Initial investment: $________
- Annual net cash flow: $________
- Useful life (years): ________
- Net present value: $________
- Internal rate of return: ________%
- Payback period: ________ years`,
    type: 'calculator'
  },
  trainingResources: {
    id: 'training-resources',
    title: 'Farming Training Resources',
    description: 'Comprehensive list of training resources for beginning farmers',
    content: `# Beginning Farmer Training Resources

## Online Courses

### University Extensions
- [Cornell Small Farms Program](https://smallfarms.cornell.edu/online-courses/) - Comprehensive courses on farm business planning, production techniques, and marketing.
- [Penn State Extension](https://extension.psu.edu/business-and-operations/farm-management) - Wide range of agricultural courses with certificates available.
- [University of Minnesota Extension](https://extension.umn.edu/courses-and-events) - Courses on sustainable agriculture, livestock production, and crop management.

### Non-Profit Organizations
- [Acres U.S.A. Eco-Ag University](https://www.ecofarmingdaily.com/eco-ag-university/) - Sustainable and ecological farming courses.
- [Stone Barns Center for Food and Agriculture](https://www.stonebarnscenter.org/engage/farmer-training/) - Regenerative farming techniques.
- [National Young Farmers Coalition](https://www.youngfarmers.org/resource-center/) - Business planning and advocacy for beginning farmers.

### Commercial Platforms
- [Udemy](https://www.udemy.com/topic/agriculture/) - Wide variety of agricultural courses with varying costs.
- [FarmRaise Academy](https://www.farmraise.com/farmers/academy) - Focus on funding and farm business development.
- [Upstart University](https://university.upstartfarmers.com/) - Specializing in controlled environment agriculture.

## In-Person Training Opportunities

### Farm Incubator Programs
- [Intervale Center](https://www.intervale.org/farms-program) (Vermont)
- [New Entry Sustainable Farming Project](https://nesfp.org/farmer-training) (Massachusetts)
- [Viva Farms](https://vivafarms.org/) (Washington)
- [Glynwood Center for Regional Food and Farming](https://www.glynwood.org/farmer-training) (New York)

### Apprenticeships
- [ATTRA Sustainable Farming Internships](https://attra.ncat.org/internships/)
- [WWOOF (World Wide Opportunities on Organic Farms)](https://wwoof.net/)
- [Rogue Farm Corps](https://www.roguefarmcorps.org/) (Oregon)
- [Quail Springs](https://www.quailsprings.org/programs/) (California)

### Conferences & Workshops
- [MOSES Organic Farming Conference](https://mosesorganic.org/conference/)
- [EcoFarm Conference](https://eco-farm.org/conference)
- [Young Farmers Leadership Conference](https://www.youngfarmers.org/leadership-convergence/)
- [Southern SAWG Conference](https://www.ssawg.org/)

## Government & Institutional Resources

### USDA Programs
- [Beginning Farmer and Rancher Development Program](https://www.nifa.usda.gov/grants/programs/beginning-farmer-rancher-development-program-bfrdp)
- [USDA New Farmers Website](https://newfarmers.usda.gov/)
- [USDA Service Centers](https://www.farmers.gov/working-with-us/service-center-locator)
- [Farm Service Agency Beginning Farmer Loans](https://www.fsa.usda.gov/programs-and-services/farm-loan-programs/beginning-farmers-and-ranchers-loans/index)

### Regional Resources
- [SARE (Sustainable Agriculture Research & Education)](https://www.sare.org/resources/learning-center/)
- [ATTRA (National Sustainable Agriculture Information Service)](https://attra.ncat.org/)
- [Land Grant University System](https://nifa.usda.gov/land-grant-colleges-and-universities)
- [Cooperative Extension System](https://extension.org/)

## Field-Specific Training

### Livestock Production
- [Livestock Conservancy](https://livestockconservancy.org/resources/training/)
- [Holistic Management International](https://holisticmanagement.org/hmiacademy/)
- [American Pastured Poultry Producers Association](https://apppa.org/)

### Vegetable Production
- [Johnny's Seeds Grower's Library](https://www.johnnyseeds.com/growers-library/growing-center.html)
- [Growing for Market](https://www.growingformarket.com/)
- [Organic Vegetable Growers Network](https://organicgrowersnetwork.net/)

### Specialty Crops
- [Savanna Institute](https://www.savannainstitute.org/) (Agroforestry)
- [North American Fruit Explorers](https://nafex.org/)
- [American Mushroom Institute](https://www.americanmushroom.org/)

### Business & Marketing
- [Farm Commons](https://farmcommons.org/) (Legal resources)
- [Food Animal Concerns Trust](https://foodanimalconcernstrust.org/webinars) (Fund-a-Farmer webinars)
- [MarketMaker](https://foodmarketmaker.com/) (Finding markets for products)

## Books & Publications

### Essential Beginning Farmer Books
- "The New Organic Grower" by Eliot Coleman
- "You Can Farm" by Joel Salatin
- "The Market Gardener" by Jean-Martin Fortier
- "Farms with a Future" by Rebecca Thistlethwaite
- "The Lean Farm" by Ben Hartman
- "Building a Sustainable Business" by MISA

### Magazines & Periodicals
- "Growing for Market"
- "Acres U.S.A."
- "Modern Farmer"
- "The New Farm"
- "Small Farm Today"

## Mentorship & Network Development

### Finding a Mentor
- [American Farm Bureau Young Farmers & Ranchers](https://www.fb.org/programs/young-farmers-and-ranchers/)
- [National Farmers Union Beginning Farmer Forum](https://nfu.org/education/beginning-farmer-forum/)
- Local farming organizations
- State and county farm bureaus

### Farmer-to-Farmer Networks
- [MOSES Farmer-to-Farmer Mentoring Program](https://mosesorganic.org/farming/farmer-resources/)
- [Practical Farmers of Iowa](https://practicalfarmers.org/)
- [California FarmLink](https://www.californiafarmlink.org/)
- [Farmers Guild](https://farmersguild.org/)

## Funding Your Training

### Scholarships & Grants
- [SARE Farmer Rancher Grant](https://www.sare.org/grants/farmer-rancher-grant/)
- [NRCS Environmental Quality Incentives Program](https://www.nrcs.usda.gov/programs-initiatives/eqip-environmental-quality-incentives)
- [Farm Aid's Resource Network](https://www.farmaid.org/our-work/resources-for-farmers/)
- [Beginning Farmer and Rancher Individual Development Accounts](https://www.nifa.usda.gov/grants/programs/beginningfarmerandrancher-developmental-account-program)`,
    type: 'resource'
  },
  findMentor: {
    id: 'find-mentor',
    title: 'Find a Farming Mentor',
    description: 'Guide to connecting with experienced farmers for mentorship',
    content: `# Finding a Farming Mentor

## Benefits of Having a Mentor

### Knowledge Transfer
- Access to years of practical experience
- Region-specific growing information
- Problem-solving assistance
- Learning from others' mistakes

### Skill Development
- Hands-on training opportunities
- Equipment operation guidance
- Demonstration of techniques
- Feedback on your practices

### Network Building
- Connections to other farmers
- Introductions to buyers and suppliers
- Access to community resources
- Industry relationship building

### Emotional Support
- Understanding from someone who's "been there"
- Encouragement during challenges
- Celebration of successes
- Reduced isolation

## Types of Mentoring Relationships

### Formal Mentorship Programs
- Structured with regular meetings
- Often facilitated by an organization
- May have specific learning objectives
- Typically time-limited (6-12 months)

### Informal Mentorships
- Develop organically through relationship
- Flexible meeting schedule
- Self-directed learning approach
- Often long-term and evolving

### Paid Consultations
- Fee-based expert advice
- Focused on specific issues
- Professional service orientation
- Usually short-term engagement

### Collaborative Relationships
- Mutual benefit focus
- Resource sharing
- May include equipment sharing or labor exchange
- Learning flows in multiple directions

## Where to Find a Mentor

### Local Resources
- County Extension Offices
- Soil and Water Conservation Districts
- Local farming organizations
- Farmers markets (talk with vendors)
- Farm supply stores (ask for recommendations)
- Agricultural fairs and events

### State and Regional Programs
[List of state-based mentor matching programs - contact your state department of agriculture]

### National Programs
- [SCORE](https://www.score.org/find-mentor) - Business mentors, including agricultural businesses
- [National Farmers Union Beginning Farmer Institute](https://nfu.org/education/beginning-farmer-forum/)
- [American Farm Bureau Young Farmers & Ranchers](https://www.fb.org/programs/young-farmers-and-ranchers/)
- [Veteran Farmer Coalition's Farmer Veteran Fellowship](https://farmvetco.org/fvfellowship/)

### Online Communities
- [ATTRA's Sustainable Farming Connection](https://attra.ncat.org/)
- [The Farming Forum](https://thefarmingforum.co.uk/)
- [Reddit's r/farming](https://www.reddit.com/r/farming/)
- Facebook groups for specific farming interests

## Approaching Potential Mentors

### Preparation
- Research their farm and background
- Clarify your specific learning goals
- Prepare thoughtful questions
- Respect their expertise and time

### First Contact
- Visit their farm stand or farmers market booth
- Attend their workshops or farm tours
- Request a short initial meeting
- Email with a specific, brief introduction

### What to Say
- Briefly explain your background and goals
- Express genuine interest in their operation
- Be specific about what you hope to learn
- Acknowledge the value of their time

### Offering Value
- Volunteer labor in exchange for learning
- Propose specific skills you can contribute
- Consider paying for formal consulting time
- Share relevant resources or connections

## Building a Successful Mentoring Relationship

### Setting Expectations
- Discuss ideal frequency of contact
- Agree on preferred communication methods
- Establish boundaries around time and farm access
- Be clear about what you're hoping to learn

### Being a Good Mentee
- Come prepared with specific questions
- Take notes during conversations
- Follow through on suggestions
- Show appreciation for their time

### Respecting Boundaries
- Schedule visits in advance
- Be punctual and reliable
- Avoid overwhelming with constant questions
- Recognize when busy seasons limit availability

### Growing the Relationship
- Share your progress and successes
- Ask for feedback on your plans
- Gradually increase engagement as appropriate
- Look for ways to give back

## Alternative Mentorship Arrangements

### Group Mentoring
- Farmer field schools
- Learning circles
- Mastermind groups
- Study clubs

### Peer Mentoring
- Beginning farmer networks
- Skill exchanges
- Collaborative learning
- Problem-solving partnerships

### Virtual Mentoring
- Online video consultations
- Regular email exchanges
- Social media connections
- Digital resource sharing

## Transitioning Beyond Mentorship

### Evolution of the Relationship
- From teacher/student to colleagues
- Developing mutual respect
- Finding opportunities for collaboration
- Building lasting friendship

### Becoming a Mentor Yourself
- Sharing what you've learned with newer farmers
- Participating in formal mentor programs
- Hosting farm tours or workshops
- Contributing to online communities

## Mentor Relationship Worksheet

### Potential Mentors to Contact
1. Name: __________ Farm: __________ Contact: __________
2. Name: __________ Farm: __________ Contact: __________
3. Name: __________ Farm: __________ Contact: __________

### My Learning Priorities
1. ______________________________
2. ______________________________
3. ______________________________

### What I Can Offer
1. ______________________________
2. ______________________________
3. ______________________________

### Questions for First Meeting
1. ______________________________
2. ______________________________
3. ______________________________`,
    type: 'mentorship'
  },
  printGuide: {
    id: 'print-guide',
    title: 'Complete Beginning Farming Guide',
    description: 'Comprehensive printable guide for beginning farmers',
    content: `# Complete Beginning Farming Guide

## Introduction to Farming

### Defining Your "Why"
- Connecting to your purpose
- Setting intentions for your farm journey
- Understanding your motivations
- Creating a meaningful livelihood

### Types of Farming Operations
- Market gardening and specialty crop production
- Livestock and animal husbandry
- Regenerative agriculture practices
- Value-added and agritourism opportunities
- Hybrid farm models

### Assessing Your Resources
- Land access considerations
- Financial resources and funding options
- Skills inventory and learning plan
- Time availability and lifestyle considerations
- Support networks and community resources

## Planning Your Farm

### Developing Your Farm Vision
- Creating a mission statement
- Defining core values and principles
- Setting short, medium, and long-term goals
- Envisioning your ideal farm

### Business Planning Fundamentals
- Choosing a business structure
- Registration and licensing requirements
- Farm name and branding considerations
- Building your farm team and advisors

### Financial Planning
- Startup and operating budget development
- Understanding capital investments
- Projecting income and expenses
- Record-keeping systems
- Tax planning for farm businesses

## Land and Infrastructure

### Land Assessment
- Soil evaluation and improvement
- Water resources and management
- Topography and microclimates
- Access and infrastructure needs
- Existing features assessment

### Infrastructure Development
- Essential infrastructure for different farm types
- Phased development approach
- Cost-effective building strategies
- Energy considerations
- Appropriate technology selection

### Equipment Selection
- Essential vs. optional equipment
- New, used, and rental options
- Appropriate scale considerations
- Maintenance requirements
- DIY and adaptation possibilities

## Production Planning

### Crop Planning
- Crop selection criteria
- Rotation and succession planning
- Seasonal production calendars
- Yield estimation
- Seed and plant sourcing

### Livestock Planning
- Species selection considerations
- Housing and fencing requirements
- Feed planning and sourcing
- Health management approach
- Breeding and reproduction plans

### Sustainable Production Methods
- Soil health management
- Integrated pest management
- Water conservation strategies
- Biodiversity enhancement
- Climate resilience practices

## Marketing and Sales

### Market Research
- Identifying target customers
- Analyzing local demand
- Competitor assessment
- Price point determination
- Market opportunity identification

### Sales Channel Selection
- Farmers markets considerations
- CSA program development
- Restaurant and wholesale relationships
- Farm stand operations
- Online sales platforms

### Marketing Strategies
- Brand development
- Storytelling and messaging
- Social media approach
- Customer relationship management
- Building community around your farm

## Farm Management

### Time Management
- Seasonal workflow planning
- Daily and weekly scheduling
- Balancing production and business tasks
- Creating efficient systems
- Avoiding burnout

### Record Keeping
- Production records
- Financial tracking
- Compliance documentation
- Customer and sales data
- Weather and observation logs

### Risk Management
- Insurance considerations
- Contingency planning
- Diversification strategies
- Legal risk mitigation
- Health and safety protocols

## Continuous Improvement

### Evaluating Progress
- Setting meaningful metrics
- Regular review processes
- Adjusting plans based on results
- Celebrating successes
- Learning from challenges

### Scaling Appropriately
- Signs you're ready to grow
- Incremental expansion strategies
- Maintaining quality while growing
- Infrastructure development timing
- Financial considerations for growth

### Building Farm Resilience
- Financial stability strategies
- Ecological resilience practices
- Personal and family well-being
- Community integration
- Adaptability and innovation

## Appendices

### Regional Resources
- Local extension services
- State agricultural programs
- Regional farming organizations
- Nearby educational institutions
- Local mentor opportunities

### Templates and Worksheets
- Farm vision worksheet
- Business plan template
- Crop planning calendar
- Budget spreadsheet
- Marketing plan outline

### Recommended Reading
- Beginning farmer essentials
- Technical production guides
- Business and marketing resources
- Inspirational farm stories
- Online learning platforms`,
    type: 'guide'
  }
};

// Download resources helper
export const downloadResource = (resource: FarmResource) => {
  if (!resource) return null;
  
  // Create blob from content
  const blob = new Blob([resource.content || ''], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  
  // Create download link
  const a = document.createElement('a');
  a.href = url;
  a.download = `${resource.title.replace(/\s+/g, '-').toLowerCase()}.md`;
  document.body.appendChild(a);
  a.click();
  
  // Cleanup
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
