
export interface FarmingResource {
  title: string;
  url?: string;
  description: string;
}

export interface FarmingType {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  benefits: string[];
  challenges: string[];
  startingSteps: string[];
  resources: FarmingResource[];
  expertise: number;
  initialCost: number;
}
