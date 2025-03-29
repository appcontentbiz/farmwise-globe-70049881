
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { 
  Line, 
  LineChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Tooltip 
} from "recharts";

const data = [
  { month: "Jan", Brazil: 105, Russia: 95, India: 110, China: 125, SouthAfrica: 85 },
  { month: "Feb", Brazil: 108, Russia: 98, India: 112, China: 128, SouthAfrica: 88 },
  { month: "Mar", Brazil: 112, Russia: 102, India: 115, China: 130, SouthAfrica: 90 },
  { month: "Apr", Brazil: 115, Russia: 105, India: 118, China: 132, SouthAfrica: 93 },
  { month: "May", Brazil: 118, Russia: 108, India: 120, China: 135, SouthAfrica: 95 },
  { month: "Jun", Brazil: 122, Russia: 112, India: 125, China: 138, SouthAfrica: 98 },
  { month: "Jul", Brazil: 125, Russia: 115, India: 128, China: 140, SouthAfrica: 100 },
  { month: "Aug", Brazil: 128, Russia: 118, India: 130, China: 142, SouthAfrica: 102 },
  { month: "Sep", Brazil: 130, Russia: 120, India: 132, China: 145, SouthAfrica: 105 },
  { month: "Oct", Brazil: 132, Russia: 122, India: 135, China: 148, SouthAfrica: 108 },
  { month: "Nov", Brazil: 135, Russia: 125, India: 138, China: 150, SouthAfrica: 110 },
  { month: "Dec", Brazil: 138, Russia: 128, India: 140, China: 152, SouthAfrica: 112 },
];

// Define config for the chart colors
const chartConfig = {
  Brazil: {
    label: "Brazil",
    color: "#22c55e"  // green
  },
  Russia: {
    label: "Russia",
    color: "#3b82f6"  // blue
  },
  India: {
    label: "India",
    color: "#f97316"  // orange
  },
  China: {
    label: "China",
    color: "#ef4444"  // red
  },
  SouthAfrica: {
    label: "South Africa",
    color: "#a855f7"  // purple
  }
};

export function AgriculturalIndexChart() {
  return (
    <div className="w-full h-[300px]">
      <ChartContainer
        className="h-full"
        config={chartConfig}
      >
        <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            domain={[80, 160]}
            allowDecimals={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line 
            type="monotone" 
            dataKey="Brazil" 
            stroke={chartConfig.Brazil.color} 
            strokeWidth={2}
            dot={{ r: 0 }}
            activeDot={{ r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="Russia" 
            stroke={chartConfig.Russia.color} 
            strokeWidth={2}
            dot={{ r: 0 }}
            activeDot={{ r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="India" 
            stroke={chartConfig.India.color} 
            strokeWidth={2}
            dot={{ r: 0 }}
            activeDot={{ r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="China" 
            stroke={chartConfig.China.color} 
            strokeWidth={2}
            dot={{ r: 0 }}
            activeDot={{ r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="SouthAfrica" 
            stroke={chartConfig.SouthAfrica.color} 
            strokeWidth={2}
            dot={{ r: 0 }}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ChartContainer>
      <div className="mt-2">
        <ChartLegend>
          <ChartLegendContent />
        </ChartLegend>
      </div>
    </div>
  );
}
