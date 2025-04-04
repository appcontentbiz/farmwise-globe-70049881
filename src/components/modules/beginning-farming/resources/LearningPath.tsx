
import React from "react";

export function LearningPath() {
  return (
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
  );
}
