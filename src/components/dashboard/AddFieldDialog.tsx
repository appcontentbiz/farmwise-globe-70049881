import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Field name must be at least 2 characters." }),
  crop: z.string().min(1, { message: "Please select a crop type." }),
  size: z.string().min(1, { message: "Please enter field size." }),
  health: z.string().min(1, { message: "Please select field health." })
});

type FormValues = z.infer<typeof formSchema>;

const cropTypes = [
  { value: "corn", label: "Corn" },
  { value: "wheat", label: "Wheat" },
  { value: "soybeans", label: "Soybeans" },
  { value: "cotton", label: "Cotton" },
  { value: "rice", label: "Rice" },
  { value: "vegetables", label: "Vegetables" }
];

const healthStatuses = [
  { value: "excellent", label: "Excellent" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "poor", label: "Poor" }
];

interface AddFieldDialogProps {
  onFieldAdded: (field: { id: string, name: string, crop: string, size: string, health: string }) => void;
}

export function AddFieldDialog({ onFieldAdded }: AddFieldDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      crop: "",
      size: "",
      health: ""
    }
  });
  
  const onSubmit = (data: FormValues) => {
    // Create a new field with the form data
    const newField = {
      id: `field${Date.now()}`, // Generate a unique ID
      name: data.name,
      crop: data.crop,
      size: data.size,
      health: data.health
    };
    
    onFieldAdded(newField);
    
    toast({
      title: "Field Added",
      description: `${data.name} has been added to your farm.`
    });
    
    form.reset();
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Field
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Field</DialogTitle>
          <DialogDescription>
            Enter details for your new farm field.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Field Name</FormLabel>
                  <FormControl>
                    <Input placeholder="North Field" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="crop"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Crop</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select crop type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cropTypes.map((crop) => (
                        <SelectItem key={crop.value} value={crop.value}>
                          {crop.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Field Size</FormLabel>
                  <FormControl>
                    <Input placeholder="10 acres" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="health"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Field Health</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select health status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {healthStatuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Field</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
