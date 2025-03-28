
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  className = ""
}: StatCardProps) {
  return (
    <Card className={`card-stats ${className}`}>
      <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <Icon className="h-5 w-5 text-farm-green" />
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="text-2xl font-bold">{value}</div>
        <CardDescription className="text-xs">
          {description}
          {trend && (
            <span className={`ml-1 font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>
          )}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
