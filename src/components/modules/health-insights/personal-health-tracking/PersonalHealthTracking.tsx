
import { useHealthTracking } from "./useHealthTracking";
import { HealthCalendar } from "./HealthCalendar";
import { DailyEntryForm } from "./DailyEntryForm";
import { HealthCharts } from "./HealthCharts";
import { HealthInsights } from "./HealthInsights";

export function PersonalHealthTracking() {
  const {
    selectedDate,
    currentEntry,
    entries,
    chartView,
    timeRange,
    chartData,
    distributionData,
    setCurrentEntry,
    setChartView,
    setTimeRange,
    getDateRange,
    calculateAverageSleep,
    calculateAverageEnergy,
    handleSaveEntry,
    handleDateSelect
  } = useHealthTracking();

  return (
    <div className="space-y-6">
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
