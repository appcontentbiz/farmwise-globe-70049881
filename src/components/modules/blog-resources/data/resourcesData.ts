
export interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  uploadDate: string;
  fileSize: string;
  downloadCount: number;
  rating: number;
  format: string;
  tags?: string[];
  url: string;
}

export const resources: Resource[] = [
  {
    id: "resource-1",
    title: "Complete Soil Health Assessment Guide",
    description: "A comprehensive guide to testing and interpreting soil health indicators for optimal crop production and sustainability.",
    type: "Guide",
    uploadDate: "2025-03-12T09:00:00Z",
    fileSize: "4.2 MB",
    downloadCount: 562,
    rating: 4.8,
    format: "pdf",
    tags: ["soil health", "testing", "fertility", "biological activity"],
    url: "#"
  },
  {
    id: "resource-2",
    title: "Farm Financial Planning Spreadsheet",
    description: "Customizable Excel template for farm budgeting, cash flow projections, and enterprise analysis. Includes built-in formulas and example data.",
    type: "Template",
    uploadDate: "2025-03-05T14:30:00Z",
    fileSize: "1.8 MB",
    downloadCount: 876,
    rating: 4.6,
    format: "xlsx",
    tags: ["finance", "budgeting", "planning", "spreadsheet"],
    url: "#"
  },
  {
    id: "resource-3",
    title: "Livestock Health Monitoring Protocol",
    description: "Standard operating procedures for implementing a comprehensive livestock health monitoring system, including early disease detection.",
    type: "Protocol",
    uploadDate: "2025-02-28T11:15:00Z",
    fileSize: "3.5 MB",
    downloadCount: 345,
    rating: 4.5,
    format: "pdf",
    tags: ["livestock", "animal health", "monitoring", "disease prevention"],
    url: "#"
  },
  {
    id: "resource-4",
    title: "Drone Field Mapping Tutorial",
    description: "Step-by-step video tutorial on using affordable drones to create field maps for precision agriculture applications.",
    type: "Video",
    uploadDate: "2025-02-20T16:45:00Z",
    fileSize: "85.2 MB",
    downloadCount: 723,
    rating: 4.9,
    format: "mp4",
    tags: ["drones", "precision agriculture", "mapping", "technology"],
    url: "#"
  },
  {
    id: "resource-5",
    title: "Agricultural Market Data Analysis Tool",
    description: "Interactive tool for analyzing historical and current agricultural commodity price data to identify trends and inform marketing decisions.",
    type: "Software",
    uploadDate: "2025-02-15T09:30:00Z",
    fileSize: "12.4 MB",
    downloadCount: 489,
    rating: 4.3,
    format: "zip",
    tags: ["market analysis", "commodity prices", "data", "decision support"],
    url: "#"
  },
  {
    id: "resource-6",
    title: "Cover Crop Selection Guide by Climate Zone",
    description: "Region-specific guide for selecting appropriate cover crops based on climate conditions, soil types, and production goals.",
    type: "Guide",
    uploadDate: "2025-02-10T13:20:00Z",
    fileSize: "5.7 MB",
    downloadCount: 691,
    rating: 4.7,
    format: "pdf",
    tags: ["cover crops", "soil health", "conservation", "crop planning"],
    url: "#"
  }
];
