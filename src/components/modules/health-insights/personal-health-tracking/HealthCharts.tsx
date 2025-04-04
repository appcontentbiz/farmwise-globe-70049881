
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, BarChart3, Heart, LineChart as LineChartIcon } from "lucide-react";
import { moodOptions } from "./types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HealthChartsProps {
  chartData: any[];
  distributionData: any[];
  entries: any[];
  chartView: "line" | "bar" | "area" | "distribution";
  timeRange: "7days" | "30days" | "90days" | "all";
  setChartView: (view: "line" | "bar" | "area" | "distribution") => void;
  setTimeRange: (range: "7days" | "30days" | "90days" | "all") => void;
  calculateAverageSleep: () => string;
  calculateAverageEnergy: () => string;
  getDateRange: () => { startDate: Date; endDate: Date };
}

export const HealthCharts = ({
  chartData,
  distributionData,
  entries,
  chartView,
  timeRange,
  setChartView,
  setTimeRange,
  calculateAverageSleep,
  calculateAverageEnergy,
  getDateRange
}: HealthChartsProps) => {
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 border p-3 rounded-lg shadow-md text-sm">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div 
              key={`item-${index}`} 
              className="flex items-center gap-2 mt-1"
              style={{ color: entry.color }}
            >
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }} 
              />
              <span>{entry.name}: </span>
              <span className="font-medium">
                {entry.name === "Mood" 
                  ? moodOptions.find((_, i) => (4 - i) === entry.value)?.label 
                  : entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Render pie chart tooltip
  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background/95 border p-3 rounded-lg shadow-md text-sm">
          <div 
            className="flex items-center gap-2"
            style={{ color: data.color }}
          >
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: data.color }} 
            />
            <span className="font-medium">{data.name}: </span>
            <span>{data.value} entries ({((data.value / entries.length) * 100).toFixed(0)}%)</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Activity className="h-5 w-5 text-farm-green" />
            Health Trends & Analytics
          </CardTitle>
          
          <div className="flex flex-wrap gap-2">
            <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
              <SelectTrigger className="h-8 w-28">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">7 Days</SelectItem>
                <SelectItem value="30days">30 Days</SelectItem>
                <SelectItem value="90days">90 Days</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex border rounded-md overflow-hidden">
              <Button 
                variant={chartView === "line" ? "default" : "ghost"} 
                size="sm" 
                className="h-8 px-2" 
                onClick={() => setChartView("line")}
              >
                <LineChartIcon className="h-4 w-4" />
              </Button>
              <Button 
                variant={chartView === "bar" ? "default" : "ghost"} 
                size="sm" 
                className="h-8 px-2" 
                onClick={() => setChartView("bar")}
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
              <Button 
                variant={chartView === "area" ? "default" : "ghost"} 
                size="sm" 
                className="h-8 px-2" 
                onClick={() => setChartView("area")}
              >
                <Activity className="h-4 w-4" />
              </Button>
              <Button 
                variant={chartView === "distribution" ? "default" : "ghost"} 
                size="sm" 
                className="h-8 px-2" 
                onClick={() => setChartView("distribution")}
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-center">
            <Activity className="h-12 w-12 text-muted-foreground/40 mb-4" />
            <h3 className="text-lg font-medium">No health data available</h3>
            <p className="text-muted-foreground">Add your first health entry to start tracking your well-being over time.</p>
          </div>
        ) : (
          <>
            <div className="h-[350px]">
              {chartView === "line" && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                      interval={Math.max(Math.floor(chartData.length / 10), 0)}
                    />
                    <YAxis 
                      yAxisId="left" 
                      domain={[0, 10]} 
                      tick={{ fontSize: 12 }} 
                      label={{ value: 'Rating', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 12 } }} 
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="mood"
                      name="Mood"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                      dot={{ stroke: '#8884d8', strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="energy"
                      name="Energy"
                      stroke="#4CAF50"
                      strokeWidth={2}
                      dot={{ stroke: '#4CAF50', strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="sleep"
                      name="Sleep (hours)"
                      stroke="#2196F3"
                      strokeWidth={2}
                      dot={{ stroke: '#2196F3', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
              
              {chartView === "bar" && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                      interval={Math.max(Math.floor(chartData.length / 10), 0)}
                    />
                    <YAxis domain={[0, 10]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="mood" name="Mood" fill="#8884d8" />
                    <Bar dataKey="energy" name="Energy" fill="#4CAF50" />
                    <Bar dataKey="sleep" name="Sleep (hours)" fill="#2196F3" />
                  </BarChart>
                </ResponsiveContainer>
              )}
              
              {chartView === "area" && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                      interval={Math.max(Math.floor(chartData.length / 10), 0)}
                    />
                    <YAxis domain={[0, 10]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="mood" 
                      stackId="1" 
                      name="Mood" 
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="energy" 
                      stackId="2" 
                      name="Energy" 
                      stroke="#4CAF50" 
                      fill="#4CAF50" 
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="sleep" 
                      stackId="3" 
                      name="Sleep (hours)" 
                      stroke="#2196F3" 
                      fill="#2196F3" 
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
              
              {chartView === "distribution" && (
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                  <div className="flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={distributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {distributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<PieTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col justify-center p-4">
                    <h3 className="text-lg font-medium mb-3">Mood Distribution</h3>
                    <div className="space-y-4">
                      {distributionData.map((entry) => (
                        <div key={entry.name} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: entry.color }}
                              />
                              <span>{entry.name}</span>
                            </div>
                            <span className="font-medium">{entry.value} entries</span>
                          </div>
                          <div className="w-full bg-muted/30 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full" 
                              style={{ 
                                width: `${(entry.value / entries.length) * 100}%`,
                                backgroundColor: entry.color
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-muted/20 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Heart className="h-4 w-4 text-blue-500" />
                    Sleep Average
                  </h3>
                  <span className="text-xl font-bold">{calculateAverageSleep()}</span>
                </div>
                <p className="text-xs text-muted-foreground">Average hours of sleep per night during selected period</p>
              </div>
              
              <div className="bg-muted/20 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Activity className="h-4 w-4 text-green-500" />
                    Energy Average
                  </h3>
                  <span className="text-xl font-bold">{calculateAverageEnergy()}</span>
                </div>
                <p className="text-xs text-muted-foreground">Average energy level (1-10) during selected period</p>
              </div>
              
              <div className="bg-muted/20 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Activity className="h-4 w-4 text-purple-500" />
                    Tracking Consistency
                  </h3>
                  <span className="text-xl font-bold">
                    {chartData.length} / {
                      timeRange === "7days" ? 7 : 
                      timeRange === "30days" ? 30 : 
                      timeRange === "90days" ? 90 : 
                      Math.ceil((getDateRange().endDate.getTime() - getDateRange().startDate.getTime()) / (1000 * 60 * 60 * 24))
                    }
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Number of days with entries in the selected period</p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
