import { useSupabaseHealthTracking } from "./personal-health-tracking/useSupabaseHealthTracking";
import { HealthCalendar } from "./personal-health-tracking/HealthCalendar";
import { DailyEntryForm } from "./personal-health-tracking/DailyEntryForm";
import { HealthCharts } from "./personal-health-tracking/HealthCharts";
import { HealthInsights } from "./personal-health-tracking/HealthInsights";
import { HealthLoadingState } from "./personal-health-tracking/HealthLoadingState";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function PersonalHealthTracking() {
  const { user } = useAuth();
  const {
    selectedDate,
    currentEntry,
    entries,
    chartView,
    timeRange,
    chartData,
    distributionData,
    isLoading,
    isSaving,
    setCurrentEntry,
    setChartView,
    setTimeRange,
    getDateRange,
    calculateAverageSleep,
    calculateAverageEnergy,
    handleSaveEntry,
    handleDateSelect
  } = useSupabaseHealthTracking();

  if (isLoading) {
    return <HealthLoadingState />;
  }

  return (
    <div className="space-y-6">
      {!user && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Sign in to save your health data across devices. Currently working in local mode.
          </AlertDescription>
        </Alert>
      )}

      {/* Health Calendar and Entry Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <HealthCalendar 
          selectedDate={selectedDate}
          entries={entries}
          onDateSelect={handleDateSelect}
        />

        <DailyEntryForm
          selectedDate={selectedDate}
          currentEntry={currentEntry}
          onEntryChange={setCurrentEntry}
          onSave={handleSaveEntry}
          isSaving={isSaving}
        />
      </div>

      {/* Interactive Health Visualization Section */}
      <HealthCharts
        chartData={chartData}
        distributionData={distributionData}
        entries={entries}
        chartView={chartView}
        timeRange={timeRange}
        setChartView={setChartView}
        setTimeRange={setTimeRange}
        calculateAverageSleep={calculateAverageSleep}
        calculateAverageEnergy={calculateAverageEnergy}
        getDateRange={getDateRange}
      />

      <HealthInsights
        averageSleep={calculateAverageSleep()}
      />
    </div>
  );
}
