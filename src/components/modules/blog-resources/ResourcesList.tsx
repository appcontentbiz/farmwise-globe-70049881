
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Star, Calendar } from "lucide-react";
import { Resource } from "./data/resourcesData";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ResourcesListProps {
  resources: Resource[];
}

export function ResourcesList({ resources }: ResourcesListProps) {
  const { toast } = useToast();
  const [downloadCounts, setDownloadCounts] = useState<Record<string, number>>(
    Object.fromEntries(resources.map(r => [r.id, r.downloadCount]))
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getFileIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case 'pdf':
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">PDF</Badge>;
      case 'xlsx':
      case 'xls':
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Excel</Badge>;
      case 'docx':
      case 'doc':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Word</Badge>;
      case 'mp4':
      case 'mov':
        return <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">Video</Badge>;
      case 'zip':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">ZIP</Badge>;
      default:
        return <Badge variant="outline">{format.toUpperCase()}</Badge>;
    }
  };

  const handleDownload = (resource: Resource) => {
    // In a real app, this would trigger the actual download
    setDownloadCounts(prev => ({
      ...prev,
      [resource.id]: (prev[resource.id] || 0) + 1
    }));
    
    toast({
      title: "Download started",
      description: `${resource.title} (${resource.fileSize}) will begin downloading shortly.`
    });
  };
  
  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
        <span className="ml-1 text-sm text-muted-foreground">{rating.toFixed(1)}</span>
      </div>
    );
  };

  if (resources.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-lg">
        <h3 className="text-lg font-medium">No resources found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {resources.map((resource) => (
        <Card key={resource.id} className="flex flex-col h-full">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex gap-2 items-center">
                {getFileIcon(resource.format)}
                <Badge>{resource.type}</Badge>
              </div>
              <div className="text-xs text-muted-foreground flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(resource.uploadDate)}
              </div>
            </div>
            <CardTitle className="text-lg mt-2">{resource.title}</CardTitle>
          </CardHeader>
          
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground mb-4">
              {resource.description}
            </p>
            
            {resource.tags && (
              <div className="flex flex-wrap gap-1 mb-4">
                {resource.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            <div className="flex justify-between items-center mt-auto pt-4">
              <div>
                {renderStarRating(resource.rating)}
                <p className="text-xs text-muted-foreground mt-1">
                  {downloadCounts[resource.id].toLocaleString()} downloads • {resource.fileSize}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3" /> Preview
                </Button>
                <Button 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => handleDownload(resource)}
                >
                  <Download className="h-3 w-3" /> Download
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
