
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  ExternalLink, 
  GraduationCap, 
  Link, 
  UserPlus, 
  Video 
} from "lucide-react";
import { Card } from "@/components/ui/card";

export function ResourcesContent() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium">Learning Resources for New Farmers</h4>
        <p className="text-sm text-muted-foreground">Curated educational materials to help you succeed</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 hover:bg-muted/20 transition-colors">
          <div className="flex items-start">
            <BookOpen className="h-8 w-8 text-farm-green mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium">USDA Beginning Farmer Resources</h4>
              <p className="text-sm text-muted-foreground mt-1">Comprehensive guides, programs and financial assistance specifically for new farmers.</p>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="text-xs">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Visit Website
                </Button>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 hover:bg-muted/20 transition-colors">
          <div className="flex items-start">
            <Video className="h-8 w-8 text-farm-green mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium">Video Tutorial Library</h4>
              <p className="text-sm text-muted-foreground mt-1">Step-by-step video guides covering essential farming practices and techniques.</p>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="text-xs">
                  <Link className="h-3 w-3 mr-1" />
                  Access Videos
                </Button>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 hover:bg-muted/20 transition-colors">
          <div className="flex items-start">
            <GraduationCap className="h-8 w-8 text-farm-green mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium">Extension Office Programs</h4>
              <p className="text-sm text-muted-foreground mt-1">Local agricultural extension offices provide education and support for farmers in your area.</p>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="text-xs">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Find Your Office
                </Button>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 hover:bg-muted/20 transition-colors">
          <div className="flex items-start">
            <UserPlus className="h-8 w-8 text-farm-green mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium">Mentorship Network</h4>
              <p className="text-sm text-muted-foreground mt-1">Connect with experienced farmers who can provide guidance and practical advice.</p>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="text-xs">
                  <Link className="h-3 w-3 mr-1" />
                  Find a Mentor
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="bg-farm-green/10 p-4 rounded-lg mt-6">
        <h4 className="font-medium mb-2">Recommended Learning Path</h4>
        <ol className="text-sm space-y-3 ml-4 list-decimal">
          <li className="pl-1">
            <span className="font-medium">Introduction to Sustainable Farming (2 hours)</span>
            <p className="text-muted-foreground mt-1">Overview of sustainable farming principles and practices</p>
          </li>
          <li className="pl-1">
            <span className="font-medium">Farm Business Planning (3 hours)</span>
            <p className="text-muted-foreground mt-1">Developing a business plan and financial projections</p>
          </li>
          <li className="pl-1">
            <span className="font-medium">Soil Health Management (4 hours)</span>
            <p className="text-muted-foreground mt-1">Understanding soil testing, amendments, and conservation</p>
          </li>
          <li className="pl-1">
            <span className="font-medium">Crop Planning & Rotation (2 hours)</span>
            <p className="text-muted-foreground mt-1">Planning seasonal crops and effective rotation strategies</p>
          </li>
        </ol>
      </div>
    </div>
  );
}
