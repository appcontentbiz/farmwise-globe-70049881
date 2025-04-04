
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  readTime: number;
}

export const articles: Article[] = [
  {
    id: "article-1",
    title: "Sustainable Farming Practices for Modern Agriculture",
    excerpt: "Discover how sustainable farming practices can improve soil health, reduce environmental impact, and increase long-term profitability for modern farms.",
    content: "Sustainable farming practices are becoming increasingly important in modern agriculture as farmers face challenges related to climate change, resource scarcity, and environmental regulations. This article explores various sustainable techniques including crop rotation, cover cropping, integrated pest management, and precision agriculture. By adopting these practices, farmers can improve soil health, conserve water, reduce chemical inputs, and ultimately build more resilient agricultural systems that benefit both the environment and their bottom line.",
    author: "Dr. Emma Rodriguez",
    date: "2025-03-15T08:30:00Z",
    category: "Sustainability",
    tags: ["sustainable", "organic", "soil health", "regenerative"],
    image: "/placeholder.svg",
    readTime: 8
  },
  {
    id: "article-2",
    title: "The Rise of Smart Irrigation Systems",
    excerpt: "How modern IoT-based irrigation systems are revolutionizing water management on farms and improving crop yields while conserving resources.",
    content: "Smart irrigation systems represent one of the most significant technological advancements in modern agriculture. By integrating IoT sensors, weather data, and automated controls, these systems can precisely deliver water when and where crops need it most. This article examines how smart irrigation technology works, the potential water savings of 30-50% compared to traditional methods, and the resulting improvements in crop quality and yield. Additionally, we discuss the return on investment farmers can expect when implementing these systems and the available subsidies for water conservation technologies.",
    author: "Michael Zhang",
    date: "2025-03-10T14:45:00Z",
    category: "Technology",
    tags: ["irrigation", "water conservation", "IoT", "technology"],
    image: "/placeholder.svg",
    readTime: 10
  },
  {
    id: "article-3",
    title: "Understanding Carbon Credits for Farmers",
    excerpt: "A comprehensive guide to carbon credit programs for agricultural producers, including eligibility requirements and potential financial benefits.",
    content: "As carbon markets expand globally, farmers are discovering new revenue opportunities through agricultural carbon credit programs. This article provides a step-by-step explanation of how these programs work, the practices that qualify (such as no-till farming, cover crops, and agroforestry), and the verification process required. We analyze the current market rates for agricultural carbon credits and profile several farmers who have successfully participated in these programs. The piece concludes with practical advice on how to assess whether carbon credit participation makes financial sense for different types of farming operations.",
    author: "Sarah Johnson",
    date: "2025-03-05T10:15:00Z",
    category: "Economics",
    tags: ["carbon credits", "climate", "sustainability", "finance"],
    image: "/placeholder.svg",
    readTime: 12
  },
  {
    id: "article-4",
    title: "Pest Management Strategies for Organic Crops",
    excerpt: "Effective approaches to managing pests in organic cropping systems without synthetic chemicals, focusing on prevention and biological controls.",
    content: "Organic pest management requires a fundamentally different approach than conventional agriculture, emphasizing ecosystem balance rather than chemical interventions. This comprehensive guide covers the principles of integrated pest management in organic systems, including crop rotation planning, beneficial insect habitat creation, physical barriers, trap crops, and approved biological controls. We provide specific strategies for major crop categories and common pest challenges, along with monitoring techniques to identify problems before they become severe. Real-world case studies demonstrate successful implementation of these techniques across diverse farming operations.",
    author: "Dr. Luis Mendez",
    date: "2025-02-28T09:20:00Z",
    category: "Organic Farming",
    tags: ["organic", "pest control", "beneficial insects", "IPM"],
    image: "/placeholder.svg",
    readTime: 9
  },
  {
    id: "article-5",
    title: "Navigating Agricultural Market Volatility",
    excerpt: "Strategies for farmers to manage risk and maximize profits in increasingly unpredictable agricultural commodity markets.",
    content: "Market volatility presents one of the greatest challenges to farm profitability, with factors ranging from geopolitical tensions to extreme weather events causing rapid price fluctuations. This article presents a toolkit for farmers to navigate these uncertainties, including diversification strategies, forward contracting, options and futures trading basics, on-farm storage considerations, and direct marketing approaches. We analyze when different risk management tools are most appropriate based on farm size, commodity type, and market conditions. The piece includes insights from agricultural economists and successful farmers who have developed resilient marketing systems.",
    author: "James Wilson",
    date: "2025-02-20T16:30:00Z",
    category: "Marketing",
    tags: ["markets", "economics", "risk management", "commodity prices"],
    image: "/placeholder.svg",
    readTime: 7
  }
];
