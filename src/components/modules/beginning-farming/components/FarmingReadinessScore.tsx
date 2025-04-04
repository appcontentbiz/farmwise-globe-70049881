
import React from "react";

export function FarmingReadinessScore() {
  return (
    <div className="mb-6">
      <h4 className="text-sm font-medium mb-2">Farming Readiness Score</h4>
      <div className="flex items-center justify-center">
        <div className="relative flex items-center justify-center">
          <svg className="w-32 h-32">
            <circle
              className="text-muted/20"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="56"
              cx="64"
              cy="64"
            />
            <circle
              className="text-farm-green"
              strokeWidth="8"
              strokeDasharray={356}
              strokeDashoffset={356 - (356 * 65) / 100}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="56"
              cx="64"
              cy="64"
            />
          </svg>
          <span className="absolute text-2xl font-bold">65%</span>
        </div>
      </div>
      <p className="text-center text-sm text-muted-foreground mt-2">Overall Readiness Score</p>
    </div>
  );
}
