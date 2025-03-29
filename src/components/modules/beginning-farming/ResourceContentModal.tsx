
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";
import { FarmResource, downloadResource } from "./utils/guidanceResources";
import ReactMarkdown from 'react-markdown';
import { ScrollArea } from "@/components/ui/scroll-area";

interface ResourceContentModalProps {
  resource: FarmResource | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ResourceContentModal({ 
  resource, 
  isOpen, 
  onClose 
}: ResourceContentModalProps) {
  if (!resource) return null;
  
  const handleDownload = () => {
    downloadResource(resource);
  };
  
  const handleExternalLink = () => {
    if (resource.externalUrl) {
      window.open(resource.externalUrl, '_blank');
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{resource.title}</DialogTitle>
          <DialogDescription>{resource.description}</DialogDescription>
        </DialogHeader>
        
        <div className="flex gap-2 my-2">
          {resource.content && (
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          )}
          
          {resource.externalUrl && (
            <Button variant="outline" size="sm" onClick={handleExternalLink}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Open External Link
            </Button>
          )}
        </div>
        
        <ScrollArea className="flex-1 p-4 border rounded-md">
          {resource.content && (
            <ReactMarkdown className="prose prose-sm max-w-none dark:prose-invert">
              {resource.content}
            </ReactMarkdown>
          )}
          
          {!resource.content && resource.externalUrl && (
            <div className="text-center p-6">
              <p className="mb-4">This resource is available at an external link.</p>
              <Button onClick={handleExternalLink}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Resource
              </Button>
            </div>
          )}
          
          {!resource.content && !resource.externalUrl && (
            <div className="text-center p-6">
              <p>Content is being prepared. Please check back later.</p>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
