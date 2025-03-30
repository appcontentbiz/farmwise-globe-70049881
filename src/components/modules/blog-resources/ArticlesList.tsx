
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User2, MessageSquare, ThumbsUp } from "lucide-react";

// Sample article data
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
  },
];

export function ArticlesList() {
  const [articles, setArticles] = useState(articleData);
  
  return (
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
            <CardTitle className="text-xl line-clamp-2 hover:text-primary cursor-pointer">
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
            <Button size="sm">Read More</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
