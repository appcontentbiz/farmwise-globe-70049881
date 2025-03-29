
import { startOfMonth, addMonths, format } from "date-fns";

export interface TrackingEvent {
  id: string;
  title: string;
  date: string;
  notes: string;
  category: "past" | "present" | "future";
}

export type PredictionType = {
  title: string;
  predictedDate: string;
  confidence: number;
  basedOn: string[];
  description: string;
}

/**
 * Analyzes past events and makes predictions for future events
 */
export function generatePredictions(events: TrackingEvent[], moduleType: string): PredictionType[] {
  // Filter to only include past and present events
  const pastEvents = events.filter(e => e.category === "past" || e.category === "present")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
  if (pastEvents.length < 2) {
    return [{
      title: "Not enough data",
      predictedDate: format(addMonths(new Date(), 1), "yyyy-MM-dd"),
      confidence: 30,
      basedOn: [],
      description: "Add more past events to enable accurate predictions"
    }];
  }

  // Find patterns in the data based on keywords in titles
  const keywordMap: Record<string, { dates: Date[], titles: string[] }> = {};
  
  pastEvents.forEach(event => {
    const keywords = extractKeywords(event.title, moduleType);
    keywords.forEach(keyword => {
      if (!keywordMap[keyword]) {
        keywordMap[keyword] = { dates: [], titles: [] };
      }
      keywordMap[keyword].dates.push(new Date(event.date));
      keywordMap[keyword].titles.push(event.title);
    });
  });

  // Generate predictions based on patterns
  const predictions: PredictionType[] = [];

  Object.entries(keywordMap).forEach(([keyword, data]) => {
    if (data.dates.length >= 2) {
      // Calculate average time between events
      let totalDays = 0;
      for (let i = 1; i < data.dates.length; i++) {
        totalDays += (data.dates[i].getTime() - data.dates[i-1].getTime()) / (1000 * 60 * 60 * 24);
      }
      const avgDays = Math.round(totalDays / (data.dates.length - 1));
      
      // If we have a reasonable average (between 15 and 365 days)
      if (avgDays >= 15 && avgDays <= 365) {
        const latestDate = data.dates[data.dates.length - 1];
        const nextPredictedDate = new Date(latestDate);
        nextPredictedDate.setDate(latestDate.getDate() + avgDays);
        
        // Calculate confidence based on consistency and sample size
        const consistency = 100 - (calculateStandardDeviation(data.dates) / avgDays * 100);
        const sampleSizeBonus = Math.min(data.dates.length * 5, 20);
        const confidence = Math.min(Math.max(Math.round(consistency + sampleSizeBonus), 30), 95);
        
        const prediction: PredictionType = {
          title: `${capitalizeFirstLetter(keyword)} update needed`,
          predictedDate: format(nextPredictedDate, "yyyy-MM-dd"),
          confidence,
          basedOn: [...new Set(data.titles)].slice(0, 3),
          description: generateDescription(keyword, avgDays, moduleType)
        };
        
        predictions.push(prediction);
      }
    }
  });

  // Sort by confidence (highest first)
  predictions.sort((a, b) => b.confidence - a.confidence);
  
  // If we don't have any predictions, add a default one
  if (predictions.length === 0) {
    const nextMonth = addMonths(startOfMonth(new Date()), 1);
    predictions.push({
      title: `${moduleType} review recommended`,
      predictedDate: format(nextMonth, "yyyy-MM-dd"),
      confidence: 40,
      basedOn: pastEvents.slice(0, 3).map(e => e.title),
      description: `Based on your tracking history, we recommend reviewing your ${moduleType.toLowerCase()} strategy next month.`
    });
  }
  
  // Return at most 3 predictions
  return predictions.slice(0, 3);
}

// Helper functions
function extractKeywords(title: string, moduleType: string): string[] {
  title = title.toLowerCase();
  const keywords: string[] = [];
  
  // Module specific keywords to look for
  const keywordsByType: Record<string, string[]> = {
    "Tech & Innovation": ["software", "technology", "app", "system", "sensor", "upgrade", "install", "implement", "integration", "automation"],
    "Climate & Sustainability": ["soil", "water", "carbon", "emission", "conservation", "sustainability", "weather", "climate", "organic"],
    "Economic & Markets": ["market", "price", "cost", "revenue", "profit", "finance", "budget", "invest", "expense", "income", "sell"]
  };
  
  const moduleKeywords = keywordsByType[moduleType] || [];
  
  moduleKeywords.forEach(keyword => {
    if (title.includes(keyword)) {
      keywords.push(keyword);
    }
  });
  
  // If no specific keywords found, return a generic one
  if (keywords.length === 0) {
    const firstWord = title.split(' ')[0];
    if (firstWord && firstWord.length > 3) {
      keywords.push(firstWord);
    } else {
      keywords.push(moduleType.toLowerCase().split('&')[0].trim());
    }
  }
  
  return keywords;
}

function calculateStandardDeviation(dates: Date[]): number {
  if (dates.length < 2) return 0;
  
  const intervals: number[] = [];
  for (let i = 1; i < dates.length; i++) {
    intervals.push((dates[i].getTime() - dates[i-1].getTime()) / (1000 * 60 * 60 * 24));
  }
  
  const mean = intervals.reduce((sum, val) => sum + val, 0) / intervals.length;
  const squareDiffs = intervals.map(val => (val - mean) ** 2);
  const variance = squareDiffs.reduce((sum, val) => sum + val, 0) / intervals.length;
  
  return Math.sqrt(variance);
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function generateDescription(keyword: string, avgDays: number, moduleType: string): string {
  let timeframe = "regularly";
  if (avgDays < 45) timeframe = "monthly";
  else if (avgDays < 100) timeframe = "quarterly";
  else if (avgDays < 200) timeframe = "biannually";
  else timeframe = "annually";
  
  const moduleDescriptions: Record<string, Record<string, string>> = {
    "Tech & Innovation": {
      software: "Software updates are crucial for security and performance. Based on your tracking history, you may need to update your software",
      technology: "Technology advances quickly. Your farm may benefit from evaluating new technology options",
      system: "System maintenance is important for operational efficiency",
      default: "Technology adoption requires regular assessment and updates"
    },
    "Climate & Sustainability": {
      soil: "Soil health monitoring should be performed",
      water: "Water management practices should be reviewed",
      carbon: "Carbon footprint assessment should be conducted",
      default: "Sustainability practices should be evaluated"
    },
    "Economic & Markets": {
      market: "Market conditions analysis should be performed",
      price: "Price trend analysis may reveal new opportunities",
      budget: "Budget review will help maintain financial health",
      default: "Financial performance review is recommended"
    }
  };
  
  const descriptions = moduleDescriptions[moduleType] || { default: `Regular ${moduleType} review is recommended` };
  return (descriptions[keyword] || descriptions.default) + ` ${timeframe}.`;
}
