
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { MoodEntry } from "./types";
import { getMoodColor, getMoodScore, moodOptions } from "./types";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";

interface HealthTrackingData {
  id: string;
  user_id: string;
  date: string;
  mood: string;
  energy: number;
  sleep: number;
  physical_symptoms?: string;
  thoughts?: string;
}

export const useSupabaseHealthTracking = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentEntry, setCurrentEntry] = useState<Omit<MoodEntry, "date">>({
    mood: "okay",
    energy: 5,
    sleep: 7,
    physicalSymptoms: "",
    thoughts: "",
  });
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [chartView, setChartView] = useState<"line" | "bar" | "area" | "distribution">("line");
  const [timeRange, setTimeRange] = useState<"7days" | "30days" | "90days" | "all">("30days");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load entries from Supabase when user changes
  useEffect(() => {
    if (!user) {
      // If user not authenticated, load from localStorage as fallback
      const savedEntries = localStorage.getItem("health-tracking-entries");
      if (savedEntries) {
        setEntries(JSON.parse(savedEntries));
      }
      setIsLoading(false);
      return;
    }
    
    fetchHealthData();
    
    // Set up realtime subscription
    const channel = supabase
      .channel('health-tracking-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'health_tracking',
        filter: `user_id=eq.${user.id}`
      }, () => {
        // Refresh data when any change happens
        fetchHealthData();
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  // Fetch health data from Supabase
  const fetchHealthData = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('health_tracking')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });
      
      if (error) {
        throw error;
      }

      // Transform Supabase data to match our MoodEntry interface
      const transformedEntries: MoodEntry[] = data.map((item: HealthTrackingData) => ({
        date: new Date(item.date),
        mood: item.mood,
        energy: item.energy,
        sleep: item.sleep,
        physicalSymptoms: item.physical_symptoms || "",
        thoughts: item.thoughts || "",
      }));

      setEntries(transformedEntries);
      
      // Also store in localStorage as backup
      localStorage.setItem("health-tracking-entries", JSON.stringify(transformedEntries));
      
    } catch (error: any) {
      console.error("Error fetching health data:", error);
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
  };

  // Get date range based on selected time range
  const getDateRange = () => {
    const endDate = new Date();
    const startDate = new Date();
    
    switch (timeRange) {
      case "7days":
        startDate.setDate(endDate.getDate() - 7);
        break;
      case "30days":
        startDate.setDate(endDate.getDate() - 30);
        break;
      case "90days":
        startDate.setDate(endDate.getDate() - 90);
        break;
      case "all":
        if (entries.length > 0) {
          // Find the earliest entry date
          const dates = entries.map(e => new Date(e.date).getTime());
          startDate.setTime(Math.min(...dates));
        } else {
          startDate.setDate(endDate.getDate() - 30); // Default to 30 days if no entries
        }
        break;
    }
    
    return { startDate, endDate };
  };

  // Generate chart data based on time range
  const generateChartData = () => {
    const { startDate, endDate } = getDateRange();
    const filteredEntries = entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= startDate && entryDate <= endDate;
    });
    
    // Sort entries by date
    filteredEntries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return filteredEntries.map(entry => ({
      date: format(new Date(entry.date), "MMM dd"),
      rawDate: new Date(entry.date),
      mood: getMoodScore(entry.mood),
      moodLabel: entry.mood,
      moodColor: getMoodColor(entry.mood),
      energy: entry.energy,
      sleep: entry.sleep,
    }));
  };

  // Calculate mood distribution data
  const getMoodDistributionData = () => {
    const { startDate, endDate } = getDateRange();
    const filteredEntries = entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= startDate && entryDate <= endDate;
    });
    
    const distribution = moodOptions.map(option => ({
      name: option.label,
      value: filteredEntries.filter(entry => entry.mood === option.value).length,
      color: option.color,
    }));
    
    return distribution.filter(item => item.value > 0);
  };

  // Calculate health insights
  const calculateAverageSleep = () => {
    if (entries.length === 0) return "N/A";
    const total = entries.reduce((sum, entry) => sum + entry.sleep, 0);
    return (total / entries.length).toFixed(1);
  };

  const calculateAverageEnergy = () => {
    if (entries.length === 0) return "N/A";
    const total = entries.reduce((sum, entry) => sum + entry.energy, 0);
    return (total / entries.length).toFixed(1);
  };

  // Handle saving entry to Supabase
  const handleSaveEntry = async () => {
    // Format date to YYYY-MM-DD for database storage
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    
    if (!user) {
      // Save to localStorage if user is not authenticated
      const newEntry = {
        date: selectedDate,
        ...currentEntry,
      };

      // Check if an entry for this date already exists
      const existingEntryIndex = entries.findIndex(
        (entry) => format(new Date(entry.date), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
      );

      let updatedEntries;
      if (existingEntryIndex >= 0) {
        // Update existing entry
        updatedEntries = [...entries];
        updatedEntries[existingEntryIndex] = newEntry;
      } else {
        // Add new entry
        updatedEntries = [...entries, newEntry];
      }

      setEntries(updatedEntries);
      localStorage.setItem("health-tracking-entries", JSON.stringify(updatedEntries));
      
      toast({
        title: "Entry Saved Locally",
        description: "Your health data was saved to local storage. Sign in to sync across devices.",
      });
      
      return true;
    }

    // Save to Supabase if user is authenticated
    try {
      setIsSaving(true);
      
      // Check if entry for this date already exists
      const { data: existingEntries, error: fetchError } = await supabase
        .from('health_tracking')
        .select('id')
        .eq('user_id', user.id)
        .eq('date', formattedDate);
        
      if (fetchError) throw fetchError;
      
      let result;
      
      if (existingEntries && existingEntries.length > 0) {
        // Update existing entry
        result = await supabase
          .from('health_tracking')
          .update({
            mood: currentEntry.mood,
            energy: currentEntry.energy,
            sleep: currentEntry.sleep,
            physical_symptoms: currentEntry.physicalSymptoms,
            thoughts: currentEntry.thoughts,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingEntries[0].id);
          
        toast({
          title: "Entry Updated",
          description: "Your health data has been updated for " + format(selectedDate, "MMMM d, yyyy"),
        });
      } else {
        // Create new entry
        result = await supabase
          .from('health_tracking')
          .insert({
            user_id: user.id,
            date: formattedDate,
            mood: currentEntry.mood,
            energy: currentEntry.energy,
            sleep: currentEntry.sleep,
            physical_symptoms: currentEntry.physicalSymptoms,
            thoughts: currentEntry.thoughts
          });
          
        toast({
          title: "Entry Saved",
          description: "Your health data has been saved for " + format(selectedDate, "MMMM d, yyyy"),
        });
      }
      
      if (result.error) throw result.error;
      
      // Fetch updated data (will happen via realtime subscription)
      return true;
    } catch (error: any) {
      console.error("Error saving health entry:", error);
      toast({
        title: "Save Failed",
        description: error.message || "Failed to save your health data",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    setSelectedDate(date);
    
    // Find if an entry exists for this date
    const existingEntry = entries.find(
      (entry) => format(new Date(entry.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
    
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
      setCurrentEntry({
        mood: "okay",
        energy: 5,
        sleep: 7,
        physicalSymptoms: "",
        thoughts: "",
      });
    }
  };

  const chartData = generateChartData();
  const distributionData = getMoodDistributionData();

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
    getDateRange,
    calculateAverageSleep,
    calculateAverageEnergy,
    handleSaveEntry,
    handleDateSelect,
    getMoodColor,
    fetchHealthData
  };
};
