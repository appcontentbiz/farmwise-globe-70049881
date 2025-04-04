
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { MoodEntry } from "../types";
import { toast } from "sonner";

// Interface for the database record
export interface HealthTrackingData {
  id: string;
  user_id: string;
  date: string;
  mood: string;
  energy: number;
  sleep: number;
  physical_symptoms?: string;
  thoughts?: string;
}

// Fetch health data from Supabase
export const fetchHealthData = async (userId: string | undefined) => {
  if (!userId) return [];
  
  try {
    const { data, error } = await supabase
      .from('health_tracking')
      .select('*')
      .eq('user_id', userId)
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
    
    return transformedEntries;
  } catch (error: any) {
    console.error("Error fetching health data:", error);
    toast(`Error loading health data: ${error.message || "Failed to load your health tracking data"}`);
    return [];
  }
};

// Save entry to Supabase
export const saveEntryToSupabase = async (
  userId: string,
  formattedDate: string, 
  currentEntry: Omit<MoodEntry, "date">
) => {
  try {
    // Check if entry for this date already exists
    const { data: existingEntries, error: fetchError } = await supabase
      .from('health_tracking')
      .select('id')
      .eq('user_id', userId)
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
        
      if (!result.error) {
        toast(`Entry updated for ${formattedDate}`);
      }
    } else {
      // Create new entry
      result = await supabase
        .from('health_tracking')
        .insert({
          user_id: userId,
          date: formattedDate,
          mood: currentEntry.mood,
          energy: currentEntry.energy,
          sleep: currentEntry.sleep,
          physical_symptoms: currentEntry.physicalSymptoms,
          thoughts: currentEntry.thoughts
        });
        
      if (!result.error) {
        toast(`Entry saved for ${formattedDate}`);
      }
    }
    
    if (result.error) throw result.error;
    
    return true;
  } catch (error: any) {
    console.error("Error saving health entry:", error);
    toast(`Save failed: ${error.message || "Failed to save your health data"}`);
    return false;
  }
};

// Save entry to localStorage (fallback when user is not authenticated)
export const saveEntryToLocalStorage = (
  entries: MoodEntry[],
  newEntry: MoodEntry
) => {
  // Check if an entry for this date already exists
  const existingEntryIndex = entries.findIndex(
    (entry) => format(new Date(entry.date), "yyyy-MM-dd") === format(newEntry.date, "yyyy-MM-dd")
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

  // Store in localStorage
  localStorage.setItem("health-tracking-entries", JSON.stringify(updatedEntries));
  
  return updatedEntries;
};
