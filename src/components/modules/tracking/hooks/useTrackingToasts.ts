
import { useRef } from "react";
import { useToast } from "@/hooks/use-toast";

export function useTrackingToasts() {
  const { toast } = useToast();
  const lastToastIdRef = useRef<string | null>(null);
  
  const showToast = (title: string, description: string, variant?: "default" | "destructive") => {
    const toastId = `${title}-${description}`.replace(/\s+/g, '-').toLowerCase();
    
    if (lastToastIdRef.current === toastId) {
      return;
    }
    
    lastToastIdRef.current = toastId;
    
    toast({
      title,
      description,
      variant,
    });
    
    setTimeout(() => {
      if (lastToastIdRef.current === toastId) {
        lastToastIdRef.current = null;
      }
    }, 3000);
  };

  return { showToast };
}
