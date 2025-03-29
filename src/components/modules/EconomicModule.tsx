import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, CreditCard, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrackingInterface } from "./TrackingInterface";

export function EconomicModule() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="farm-module-card col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="farm-module-card-title">
              <Coins className="h-5 w-5 text-farm-green" />
              Economic Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="market">
              <TabsList className="mb-4">
                <TabsTrigger value="market">Market Prices</TabsTrigger>
                <TabsTrigger value="profit">Profit & Loss</TabsTrigger>
                <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="market">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Commodity Prices</h4>
                      <p className="text-sm text-muted-foreground">Last 7 months market prices per bushel</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Update
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                  
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={marketPriceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="corn" name="Corn ($/bushel)" stroke="#4CAF50" />
                        <Line type="monotone" dataKey="wheat" name="Wheat ($/bushel)" stroke="#FBC02D" />
                        <Line type="monotone" dataKey="soybeans" name="Soybeans ($/bushel)" stroke="#42A5F5" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="bg-farm-green/10 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Market Insights</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-center">
                        <Truck className="h-4 w-4 mr-2 text-farm-green" />
                        Local grain elevator offering $0.15/bushel premium for corn delivery in August
                      </li>
                      <li className="flex items-center">
                        <Share className="h-4 w-4 mr-2 text-farm-green" />
                        Forward contracts available at $5.85/bushel for corn delivered by October
                      </li>
                      <li className="flex items-center">
                        <LineChartIcon className="h-4 w-4 mr-2 text-farm-green" />
                        USDA projecting 3% increase in soybean prices by harvest
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="profit">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Profit & Loss Statement</h4>
                    <p className="text-sm text-muted-foreground">Revenue, expenses and profit overview</p>
                  </div>
                  
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={profitData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="revenue" name="Revenue ($)" fill="#4CAF50" />
                        <Bar dataKey="expenses" name="Expenses ($)" fill="#A1887F" />
                        <Bar dataKey="profit" name="Profit ($)" fill="#42A5F5" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <Card className="p-4">
                      <div className="text-sm text-muted-foreground mb-1">Total Revenue YTD</div>
                      <div className="text-2xl font-bold text-farm-green">$253,000</div>
                      <div className="text-xs text-farm-green mt-1">↑ 8% from last year</div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-sm text-muted-foreground mb-1">Total Expenses YTD</div>
                      <div className="text-2xl font-bold text-farm-earth">$182,000</div>
                      <div className="text-xs text-farm-earth mt-1">↑ 5% from last year</div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-sm text-muted-foreground mb-1">Net Profit YTD</div>
                      <div className="text-2xl font-bold text-farm-sky">$71,000</div>
                      <div className="text-xs text-farm-sky mt-1">↑ 12% from last year</div>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="roi">
                <div className="space-y-4">
                  <h4 className="font-medium">Investment ROI Analysis</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={expenseData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {expenseData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="text-center text-sm text-muted-foreground">Expense Breakdown (%)</div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-farm-wheat/10 p-4 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center">
                          <DollarSign className="h-4 w-4 mr-1 text-farm-wheat-dark" />
                          ROI by Investment Type
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Precision Agriculture Tech</span>
                              <span className="font-medium">132% ROI</span>
                            </div>
                            <div className="w-full bg-farm-wheat/30 rounded-full h-2 mt-1">
                              <div className="bg-farm-wheat-dark h-2 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Irrigation System</span>
                              <span className="font-medium">87% ROI</span>
                            </div>
                            <div className="w-full bg-farm-wheat/30 rounded-full h-2 mt-1">
                              <div className="bg-farm-wheat-dark h-2 rounded-full" style={{ width: '65%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>New Tractor</span>
                              <span className="font-medium">42% ROI</span>
                            </div>
                            <div className="w-full bg-farm-wheat/30 rounded-full h-2 mt-1">
                              <div className="bg-farm-wheat-dark h-2 rounded-full" style={{ width: '42%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Investment Recommendations</h4>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-start">
                            <div className="h-5 w-5 rounded-full bg-farm-green flex items-center justify-center text-white text-xs mr-2 mt-0.5">1</div>
                            <div>Soil moisture sensors: projected 95% ROI</div>
                          </li>
                          <li className="flex items-start">
                            <div className="h-5 w-5 rounded-full bg-farm-green flex items-center justify-center text-white text-xs mr-2 mt-0.5">2</div>
                            <div>Solar panels for irrigation: projected 78% ROI</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="farm-module-card">
          <CardHeader className="pb-2">
            <CardTitle className="farm-module-card-title">
              <BarChartIcon className="h-5 w-5 text-farm-green" />
              Financial Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <div className="flex flex-col items-center">
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
                      className="text-farm-wheat-dark"
                      strokeWidth="8"
                      strokeDasharray={356}
                      strokeDashoffset={356 - (356 * 78) / 100}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="56"
                      cx="64"
                      cy="64"
                    />
                  </svg>
                  <span className="absolute text-2xl font-bold">78</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Financial Health Score</p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Debt-to-Asset Ratio</span>
                    <span className="font-medium text-farm-green">0.32</span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2">
                    <div className="bg-farm-green h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Operating Margin</span>
                    <span className="font-medium text-farm-sky">22%</span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2">
                    <div className="bg-farm-sky h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Working Capital</span>
                    <span className="font-medium text-farm-wheat-dark">$85,000</span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2">
                    <div className="bg-farm-wheat-dark h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Return on Assets</span>
                    <span className="font-medium text-farm-earth">12%</span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2">
                    <div className="bg-farm-earth h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-5 pt-4 border-t space-y-4">
                <h4 className="font-medium text-sm">Financial Recommendations</h4>
                <div className="bg-farm-green/10 p-3 rounded-lg">
                  <div className="flex items-start">
                    <DollarSign className="h-4 w-4 mr-2 text-farm-green mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Refinance Equipment Loan</p>
                      <p className="text-xs text-muted-foreground">Current rates are 2% lower than your existing loan. Potential savings: $3,600/year</p>
                    </div>
                  </div>
                </div>
                <div className="bg-farm-sky/10 p-3 rounded-lg">
                  <div className="flex items-start">
                    <DollarSign className="h-4 w-4 mr-2 text-farm-sky mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">USDA Grant Opportunity</p>
                      <p className="text-xs text-muted-foreground">Conservation Stewardship Program accepting applications until August 15th</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <TrackingInterface moduleName="Economic & Market" />
    </div>
  );
}
