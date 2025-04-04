
import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { MoodEntry } from "./types";
import { useToast } from "@/hooks/use-toast";
import { 
  fetchHealthData, 
  saveEntryToLocalStorage, 
  saveEntryToSupabase 
} from "./utils/supabaseHealthUtils";
import { 
  generateChartData, 
  getMoodDistributionData, 
  calculateAverageSleep, 
  calculateAverageEnergy,
  getDateRange 
} from "./utils/chartUtils";
import { findEntryForDate, getDefaultEntry } from "./utils/entryUtils";
import { useRealtimeHealthTracking } from "./hooks/useRealtimeHealthTracking";
import { getMoodColor } from "./types";

export const useSupabaseHealthTracking = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentEntry, setCurrentEntry] = useState<Omit<MoodEntry, "date">>(getDefaultEntry());
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [chartView, setChartView] = useState<"line" | "bar" | "area" | "distribution">("line");
  const [timeRange, setTimeRange] = useState<"7days" | "30days" | "90days" | "all">("30days");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch data callback that can be used for initial load and realtime updates
  const loadHealthData = useCallback(async () => {
    if (!user) {
      // If user not authenticated, load from localStorage as fallback
      const savedEntries = localStorage.getItem("health-tracking-entries");
      if (savedEntries) {
        setEntries(JSON.parse(savedEntries));
      }
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      
      const data = await fetchHealthData(user.id);
      setEntries(data);
      
      // Also store in localStorage as backup
      localStorage.setItem("health-tracking-entries", JSON.stringify(data));
      
    } catch (error: any) {
      console.error("Error loading health data:", error);
      toast({
        title: "Error loading health data",
        description: error.message || "Failed to load your health tracking data",
        variant: "destructive",
      });
      
      // Try to load from localStorage as fallback
      const savedEntries = localStorage.getItem("health-tracking-entries");
      if (savedEntries) {
        setEntries(JSON.parse(savedEntries));
      }
    } finally {
      setIsLoading(false);
    }
  }, [user, toast]);

  // Load entries from Supabase when user changes
  useEffect(() => {
    loadHealthData();
  }, [loadHealthData]);

  // Set up realtime subscription
  useRealtimeHealthTracking(user?.id, loadHealthData);

  // Handle saving entry to Supabase or localStorage
  const handleSaveEntry = async () => {
    // Format date to YYYY-MM-DD for database storage
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    
    if (!user) {
      // Save to localStorage if user is not authenticated
      const newEntry = {
        date: selectedDate,
        ...currentEntry,
      };

      const updatedEntries = saveEntryToLocalStorage(entries, newEntry);
      setEntries(updatedEntries);
      
      toast({
        title: "Entry Saved Locally",
        description: "Your health data was saved to local storage. Sign in to sync across devices.",
      });
      
      return true;
    }

    // Save to Supabase if user is authenticated
    try {
      setIsSaving(true);
      
      const result = await saveEntryToSupabase(user.id, formattedDate, currentEntry);
      return result;
    } finally {
      setIsSaving(false);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    setSelectedDate(date);
    
    // Find if an entry exists for this date
    const existingEntry = findEntryForDate(entries, date);
    
    if (existingEntry) {
      setCurrentEntry({
        mood: existingEntry.mood,
        energy: existingEntry.energy,
        sleep: existingEntry.sleep,
        physicalSymptoms: existingEntry.physicalSymptoms,
        thoughts: existingEntry.thoughts,
      });
    } else {
      // Reset form for a new entry
      setCurrentEntry(getDefaultEntry());
    }
  };

  const chartData = generateChartData(entries, timeRange);
  const distributionData = getMoodDistributionData(entries, timeRange);

  return {
    selectedDate,
    currentEntry,
    entries,
    chartView,
    timeRange,
    chartData,
    distributionData,
    isLoading,
    isSaving,
    setSelectedDate,
    setCurrentEntry,
    setChartView,
    setTimeRange,
    getDateRange: () => getDateRange(timeRange, entries),
    calculateAverageSleep: () => calculateAverageSleep(entries),
    calculateAverageEnergy: () => calculateAverageEnergy(entries),
    handleSaveEntry,
    handleDateSelect,
    getMoodColor,
    fetchHealthData: loadHealthData
  };
};
