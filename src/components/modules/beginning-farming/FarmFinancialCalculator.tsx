
import { useState } from "react";
import { Calculator, DollarSign, PercentIcon, ArrowRight, Download, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type FinancialData = {
  [key: string]: number;
};

export function FarmFinancialCalculator() {
  const [activeTab, setActiveTab] = useState("startup");
  const [startupResults, setStartupResults] = useState<FinancialData | null>(null);
  const [operationalResults, setOperationalResults] = useState<FinancialData | null>(null);
  const [profitabilityResults, setProfitabilityResults] = useState<FinancialData | null>(null);
  const [notes, setNotes] = useState("");

  // Startup Cost Calculator Form
  const startupForm = useForm({
    defaultValues: {
      land: 0,
      equipment: 0,
      buildings: 0,
      initialSeeds: 0,
      initialFertilizer: 0,
      permits: 0,
      insurance: 0,
      otherStartupCosts: 0,
    },
  });

  // Operational Cost Calculator Form
  const operationalForm = useForm({
    defaultValues: {
      seeds: 0,
      fertilizer: 0,
      pesticides: 0,
      labor: 0,
      utilities: 0,
      fuel: 0,
      maintenance: 0,
      marketing: 0,
      otherOperationalCosts: 0,
    },
  });

  // Profitability Calculator Form
  const profitabilityForm = useForm({
    defaultValues: {
      cropYield: 0,
      pricePerUnit: 0,
      totalOperationalCosts: 0,
      loanPayments: 0,
      taxRate: 15,
    },
  });

  // Handle Startup Cost Calculation
  const calculateStartupCosts = startupForm.handleSubmit((data) => {
    const total = Object.values(data).reduce((sum, value) => sum + (value || 0), 0);
    
    setStartupResults({
      totalStartupCost: total,
      landCostPercentage: ((data.land / total) * 100) || 0,
      equipmentCostPercentage: ((data.equipment / total) * 100) || 0,
      fundingNeeded: total * 1.1, // Add 10% buffer
    });

    toast.success("Startup costs calculated successfully");
  });

  // Handle Operational Cost Calculation
  const calculateOperationalCosts = operationalForm.handleSubmit((data) => {
    const total = Object.values(data).reduce((sum, value) => sum + (value || 0), 0);
    
    setOperationalResults({
      totalOperationalCost: total,
      monthlyCost: total / 12,
      seedsAndFertilizerPercentage: (((data.seeds + data.fertilizer) / total) * 100) || 0,
      laborPercentage: ((data.labor / total) * 100) || 0,
    });

    toast.success("Operational costs calculated successfully");
  });

  // Handle Profitability Calculation
  const calculateProfitability = profitabilityForm.handleSubmit((data) => {
    const grossRevenue = data.cropYield * data.pricePerUnit;
    const operatingProfit = grossRevenue - data.totalOperationalCosts;
    const profitBeforeTax = operatingProfit - data.loanPayments;
    const tax = profitBeforeTax * (data.taxRate / 100);
    const netProfit = profitBeforeTax - tax;
    const profitMargin = (netProfit / grossRevenue) * 100;
    const roi = (netProfit / data.totalOperationalCosts) * 100;

    setProfitabilityResults({
      grossRevenue,
      operatingProfit,
      profitBeforeTax,
      tax,
      netProfit,
      profitMargin,
      roi,
    });

    toast.success("Profitability analysis completed");
  });

  const resetAllCalculations = () => {
    startupForm.reset();
    operationalForm.reset();
    profitabilityForm.reset();
    setStartupResults(null);
    setOperationalResults(null);
    setProfitabilityResults(null);
    toast.info("All calculations have been reset");
  };

  const exportToCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    if (startupResults) {
      csvContent += "Startup Costs:\n";
      Object.entries(startupResults).forEach(([key, value]) => {
        csvContent += `${key},${value}\n`;
      });
      csvContent += "\n";
    }
    
    if (operationalResults) {
      csvContent += "Operational Costs:\n";
      Object.entries(operationalResults).forEach(([key, value]) => {
        csvContent += `${key},${value}\n`;
      });
      csvContent += "\n";
    }
    
    if (profitabilityResults) {
      csvContent += "Profitability Analysis:\n";
      Object.entries(profitabilityResults).forEach(([key, value]) => {
        csvContent += `${key},${value}\n`;
      });
      csvContent += "\n";
    }
    
    if (notes) {
      csvContent += "Notes:\n";
      csvContent += notes.replace(/\n/g, " ");
    }
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "farm_financial_analysis.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Financial data exported successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Calculator className="h-6 w-6 text-farm-green mr-2" />
          <h3 className="text-lg font-medium">Farm Financial Calculator</h3>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetAllCalculations}
            title="Reset all calculations"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={exportToCSV}
            disabled={!startupResults && !operationalResults && !profitabilityResults}
            title="Export results to CSV"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="startup">Startup Costs</TabsTrigger>
          <TabsTrigger value="operational">Operational Costs</TabsTrigger>
          <TabsTrigger value="profitability">Profitability</TabsTrigger>
        </TabsList>
        
        {/* Startup Costs Tab */}
        <TabsContent value="startup">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Startup Cost Calculator</CardTitle>
              <CardDescription>
                Calculate the initial investment needed to start your farm
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...startupForm}>
                <form onSubmit={calculateStartupCosts} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={startupForm.control}
                      name="land"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Land Cost ($)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                className="pl-9"
                                placeholder="0"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={startupForm.control}
                      name="equipment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Equipment ($)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                className="pl-9"
                                placeholder="0"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={startupForm.control}
                      name="buildings"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Buildings & Structures ($)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                className="pl-9"
                                placeholder="0"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={startupForm.control}
                      name="initialSeeds"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Initial Seeds/Plants ($)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                className="pl-9"
                                placeholder="0"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={startupForm.control}
                      name="initialFertilizer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Initial Fertilizer/Amendments ($)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                className="pl-9"
                                placeholder="0"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={startupForm.control}
                      name="permits"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Permits & Licenses ($)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                className="pl-9"
                                placeholder="0"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={startupForm.control}
                      name="insurance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Insurance ($)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                className="pl-9"
                                placeholder="0"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={startupForm.control}
                      name="otherStartupCosts"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Other Startup Costs ($)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                className="pl-9"
                                placeholder="0"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Calculate Startup Costs
                  </Button>
                </form>
              </Form>
              
              {startupResults && (
                <div className="mt-6 p-4 bg-muted/30 rounded-md">
                  <h4 className="font-medium mb-2">Startup Cost Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Startup Cost:</span>
                      <span className="font-medium">${startupResults.totalStartupCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Land Cost (% of total):</span>
                      <span>{startupResults.landCostPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Equipment Cost (% of total):</span>
                      <span>{startupResults.equipmentCostPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Recommended Funding (with 10% buffer):</span>
                      <span className="font-medium">${startupResults.fundingNeeded.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Operational Costs Tab */}
        <TabsContent value="operational">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Operational Cost Calculator</CardTitle>
              <CardDescription>
                Estimate your annual farm operating expenses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...operationalForm}>
                <form onSubmit={calculateOperationalCosts} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={operationalForm.control}
                      name="seeds"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Seeds/Plants ($)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                className="pl-9"
                                placeholder="0"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={operationalForm.control}
                      name="fertilizer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fertilizer/Soil Amendments ($)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                className="pl-9"
                                placeholder="0"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={operationalForm.control}
                      name="pesticides"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pesticides/Herbicides ($)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                className="pl-9"
                                placeholder="0"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={operationalForm.control}
                      name="labor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Labor Costs ($)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                className="pl-9"
                                placeholder="0"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={operationalForm.control}
                      name="utilities"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Utilities (electricity, water) ($)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                className="pl-9"
                                placeholder="0"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={operationalForm.control}
                      name="fuel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fuel & Transportation ($)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                className="pl-9"
                                placeholder="0"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={operationalForm.control}
                      name="maintenance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Equipment Maintenance ($)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                className="pl-9"
                                placeholder="0"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={operationalForm.control}
                      name="marketing"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Marketing & Sales ($)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                className="pl-9"
                                placeholder="0"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={operationalForm.control}
                      name="otherOperationalCosts"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Other Operational Costs ($)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                className="pl-9"
                                placeholder="0"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Calculate Operational Costs
                  </Button>
                </form>
              </Form>
              
              {operationalResults && (
                <div className="mt-6 p-4 bg-muted/30 rounded-md">
                  <h4 className="font-medium mb-2">Operational Cost Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Annual Operational Cost:</span>
                      <span className="font-medium">${operationalResults.totalOperationalCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Monthly Cost:</span>
                      <span>${operationalResults.monthlyCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Seeds & Fertilizer (% of total):</span>
                      <span>{operationalResults.seedsAndFertilizerPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Labor Cost (% of total):</span>
                      <span>{operationalResults.laborPercentage.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Profitability Tab */}
        <TabsContent value="profitability">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Profitability Calculator</CardTitle>
              <CardDescription>
                Analyze your farm's profitability and return on investment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profitabilityForm}>
                <form onSubmit={calculateProfitability} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={profitabilityForm.control}
                      name="cropYield"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expected Yield (units)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profitabilityForm.control}
                      name="pricePerUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price Per Unit ($)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                className="pl-9"
                                placeholder="0"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profitabilityForm.control}
                      name="totalOperationalCosts"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Operational Costs ($)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                className="pl-9"
                                placeholder="0"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profitabilityForm.control}
                      name="loanPayments"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Annual Loan Payments ($)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                className="pl-9"
                                placeholder="0"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profitabilityForm.control}
                      name="taxRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estimated Tax Rate (%)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <PercentIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                className="pl-9"
                                placeholder="15"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Calculate Profitability
                  </Button>
                </form>
              </Form>
              
              {profitabilityResults && (
                <div className="mt-6 p-4 bg-muted/30 rounded-md">
                  <h4 className="font-medium mb-2">Profitability Analysis</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Gross Revenue:</span>
                      <span>${profitabilityResults.grossRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Operating Profit:</span>
                      <span>${profitabilityResults.operatingProfit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Profit Before Tax:</span>
                      <span>${profitabilityResults.profitBeforeTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (Estimated):</span>
                      <span>${profitabilityResults.tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Net Profit:</span>
                      <span>${profitabilityResults.netProfit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Profit Margin:</span>
                      <span>{profitabilityResults.profitMargin.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Return on Investment (ROI):</span>
                      <span>{profitabilityResults.roi.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6">
        <Label htmlFor="notes">Notes</Label>
        <Textarea 
          id="notes" 
          placeholder="Add notes about your financial calculations..." 
          className="mt-1"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
        />
      </div>
    </div>
  );
}
