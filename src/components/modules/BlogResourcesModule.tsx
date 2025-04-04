
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus } from "lucide-react";
import { ArticlesList } from "./blog-resources/ArticlesList";
import { ResourcesList } from "./blog-resources/ResourcesList";
import { CreatePostModal, PostFormData } from "./blog-resources/CreatePostModal";
import { useToast } from "@/hooks/use-toast";

// Mock data for articles and resources
import { articles as initialArticles } from "./blog-resources/data/articlesData";
import { resources as initialResources } from "./blog-resources/data/resourcesData";

export function BlogResourcesModule() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("articles");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [articles, setArticles] = useState(initialArticles);
  const [resources, setResources] = useState(initialResources);
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [filteredResources, setFilteredResources] = useState(resources);
  const { toast } = useToast();

  // Filter function for both articles and resources
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredArticles(articles);
      setFilteredResources(resources);
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    
    // Filter articles
    const matchedArticles = articles.filter(article => 
      article.title.toLowerCase().includes(lowerCaseQuery) ||
      article.excerpt.toLowerCase().includes(lowerCaseQuery) ||
      article.author.toLowerCase().includes(lowerCaseQuery) ||
      article.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
    );
    setFilteredArticles(matchedArticles);
    
    // Filter resources
    const matchedResources = resources.filter(resource => 
      resource.title.toLowerCase().includes(lowerCaseQuery) ||
      resource.description.toLowerCase().includes(lowerCaseQuery) ||
      resource.type.toLowerCase().includes(lowerCaseQuery) ||
      (resource.tags && resource.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery)))
    );
    setFilteredResources(matchedResources);
    
  }, [searchQuery, articles, resources]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search is already handled by the useEffect above
    toast({
      title: "Search results",
      description: `Found ${activeTab === "articles" ? filteredArticles.length : filteredResources.length} items matching "${searchQuery}"`,
    });
  };

  const handlePostCreated = (newPost: PostFormData) => {
    const currentDate = new Date().toISOString();
    
    if (newPost.postType === "article") {
      const newArticle = {
        id: `article-${articles.length + 1}`,
        title: newPost.title,
        excerpt: newPost.content.substring(0, 150) + (newPost.content.length > 150 ? "..." : ""),
        content: newPost.content,
        author: "You", // In a real app, this would be the logged-in user
        date: currentDate,
        category: newPost.category,
        tags: newPost.tags ? newPost.tags.split(",").map(tag => tag.trim()) : [],
        image: "/placeholder.svg", // Default image
        readTime: Math.ceil(newPost.content.split(" ").length / 200) // Rough estimate of read time
      };
      
      setArticles([newArticle, ...articles]);
      setActiveTab("articles"); // Switch to articles tab
    } else {
      // Handle resource creation
      const newResource = {
        id: `resource-${resources.length + 1}`,
        title: newPost.title,
        description: newPost.content,
        type: newPost.category,
        uploadDate: currentDate,
        fileSize: "0.5 MB", // Placeholder
        downloadCount: 0,
        rating: 0,
        format: newPost.file?.type.split("/")[1] || "pdf", // Extract format from file type
        tags: newPost.tags ? newPost.tags.split(",").map(tag => tag.trim()) : [],
        url: "#" // In a real app, this would be the uploaded file URL
      };
      
      setResources([newResource, ...resources]);
      setActiveTab("resources"); // Switch to resources tab
    }
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Blog & Resources</h1>
          <p className="text-muted-foreground mt-1">
            Stay informed about the latest agricultural trends and access helpful resources
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowCreateModal(true)} 
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Post
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles and resources..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-muted" : ""}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {showFilters && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* These filters would be functional in a real app but are basic for now */}
              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <Input placeholder="Filter by category" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Date Range</label>
                <Input placeholder="Select date range" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Author</label>
                <Input placeholder="Filter by author" />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="outline" size="sm">Clear Filters</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="articles" className="flex items-center gap-2">
            Articles
            {filteredArticles.length > 0 && (
              <span className="bg-muted rounded-full px-2 text-xs">
                {filteredArticles.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            Resources
            {filteredResources.length > 0 && (
              <span className="bg-muted rounded-full px-2 text-xs">
                {filteredResources.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="articles" className="space-y-4">
          <ArticlesList articles={filteredArticles} />
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-4">
          <ResourcesList resources={filteredResources} />
        </TabsContent>
      </Tabs>
      
      {showCreateModal && (
        <CreatePostModal 
          isOpen={showCreateModal} 
          onClose={() => setShowCreateModal(false)} 
          onPostCreated={handlePostCreated}
        />
      )}
    </div>
  );
}
