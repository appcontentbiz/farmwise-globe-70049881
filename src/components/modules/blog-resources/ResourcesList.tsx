
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Download,
  FileText,
  FilePdf,
  FileImage,
  FileSpreadsheet,
  FileAudio,
  FileVideo,
  Calendar,
  User2,
  ArrowDownToLine
} from "lucide-react";

// Sample resource data
const resourceData = [
  {
    id: 1,
    title: "Complete Guide to Organic Certification",
    description: "A comprehensive manual covering all aspects of organic certification including requirements, application process, and maintenance.",
    author: "USDA Organic Program",
    date: "January 10, 2023",
    category: "Certification",
    fileType: "pdf",
    fileSize: "2.4 MB",
    downloads: 1245,
  },
  {
    id: 2,
    title: "Seasonal Crop Planning Spreadsheet",
    description: "An Excel template to help plan your seasonal crops with built-in formulas for calculating expenses, expected yield, and profitability.",
    author: "FarmWise Analytics Team",
    date: "March 22, 2023",
    category: "Planning",
    fileType: "xlsx",
    fileSize: "1.8 MB",
    downloads: 876,
  },
  {
    id: 3,
    title: "Pest Identification Image Pack",
    description: "A collection of high-resolution images to help identify common agricultural pests and the damage they cause.",
    author: "Cornell University",
    date: "May 15, 2023",
    category: "Pest Management",
    fileType: "zip",
    fileSize: "45.2 MB",
    downloads: 659,
  },
  {
    id: 4,
    title: "Introduction to Regenerative Agriculture",
    description: "A video course introducing the principles and practices of regenerative agriculture for beginners.",
    author: "Regenerative Farming Institute",
    date: "June 5, 2023",
    category: "Education",
    fileType: "mp4",
    fileSize: "156.7 MB",
    downloads: 421,
  },
  {
    id: 5,
    title: "Farm Business Plan Template",
    description: "A customizable business plan template specifically designed for farm operations, including financial projections.",
    author: "Agricultural Finance Center",
    date: "February 18, 2023",
    category: "Business",
    fileType: "docx",
    fileSize: "3.2 MB",
    downloads: 1089,
  },
  {
    id: 6,
    title: "Soil Health Testing Protocol",
    description: "Standard procedures for testing and interpreting soil health indicators for various farming systems.",
    author: "Soil Science Society",
    date: "April 30, 2023",
    category: "Soil Management",
    fileType: "pdf",
    fileSize: "5.6 MB",
    downloads: 732,
  },
];

// Function to get the appropriate icon based on file type
const getFileIcon = (fileType: string) => {
  switch (fileType) {
    case "pdf":
      return <FilePdf className="h-5 w-5 text-red-500" />;
    case "xlsx":
    case "csv":
      return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
    case "docx":
    case "doc":
      return <FileText className="h-5 w-5 text-blue-500" />;
    case "jpg":
    case "png":
    case "zip":
      return <FileImage className="h-5 w-5 text-purple-500" />;
    case "mp3":
    case "wav":
      return <FileAudio className="h-5 w-5 text-yellow-500" />;
    case "mp4":
    case "avi":
      return <FileVideo className="h-5 w-5 text-pink-500" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
};

export function ResourcesList() {
  const [resources, setResources] = useState(resourceData);
  
  return (
    <div className="space-y-4">
      {resources.map((resource) => (
        <Card key={resource.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                {getFileIcon(resource.fileType)}
                <Badge variant="outline" className="bg-accent/50">
                  {resource.category}
                </Badge>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                {resource.date}
              </div>
            </div>
            <CardTitle className="text-lg mt-2">{resource.title}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <User2 className="h-3 w-3 mr-1" />
              {resource.author}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              {resource.description}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4 text-sm">
            <div className="flex items-center text-muted-foreground">
              <span className="uppercase mr-3">{resource.fileType}</span>
              <span>{resource.fileSize}</span>
              <span className="mx-3">•</span>
              <span>{resource.downloads} downloads</span>
            </div>
            <Button size="sm" className="flex items-center gap-1">
              <ArrowDownToLine className="h-4 w-4" />
              Download
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
