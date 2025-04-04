
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User2 } from "lucide-react";
import { Article } from "./data/articlesData";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ArticlesListProps {
  articles: Article[];
}

export function ArticlesList({ articles }: ArticlesListProps) {
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);
  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleReadMore = (articleId: string) => {
    setExpandedArticle(articleId === expandedArticle ? null : articleId);
  };

  const handleSaveArticle = (article: Article) => {
    toast({
      title: "Article saved",
      description: `"${article.title}" has been added to your saved items.`
    });
  };
  
  const handleShare = (article: Article) => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(`Check out this article: ${article.title}`);
    toast({
      title: "Link copied to clipboard",
      description: "You can now paste the link to share this article."
    });
  };

  if (articles.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-lg">
        <h3 className="text-lg font-medium">No articles found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <Card key={article.id} className="overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/4 bg-muted">
              <img 
                src={article.image} 
                alt={article.title} 
                className="h-full w-full object-cover" 
                style={{ minHeight: '200px' }}
              />
            </div>
            <div className="md:w-3/4">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant="outline" className="mb-2">
                      {article.category}
                    </Badge>
                    <CardTitle className="text-xl">{article.title}</CardTitle>
                  </div>
                  <Badge variant="secondary">{article.readTime} min read</Badge>
                </div>
                <CardDescription className="flex items-center gap-6 text-sm">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {formatDate(article.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <User2 className="h-3 w-3" /> {article.author}
                  </span>
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {expandedArticle === article.id ? (
                  <div className="text-sm space-y-4">
                    <p>{article.content}</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">{article.excerpt}</p>
                )}
                
                <div className="flex flex-wrap gap-1 mt-4">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between pt-0">
                <Button 
                  variant="link" 
                  className="px-0"
                  onClick={() => handleReadMore(article.id)}
                >
                  {expandedArticle === article.id ? "Show Less" : "Read More"}
                </Button>
                <div className="space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleSaveArticle(article)}
                  >
                    Save
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleShare(article)}
                  >
                    Share
                  </Button>
                </div>
              </CardFooter>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
