
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

// Sample data for product categories
const productCategories = [
  { id: "vegetables", label: "Vegetables" },
  { id: "fruits", label: "Fruits" },
  { id: "dairy", label: "Dairy" },
  { id: "meat", label: "Meat/Poultry" },
  { id: "honey", label: "Honey" },
  { id: "eggs", label: "Eggs" },
  { id: "crafts", label: "Crafts" },
  { id: "equipment", label: "Equipment" },
  { id: "labor", label: "Farm Labor" },
  { id: "hay", label: "Hay/Feed" },
  { id: "beef", label: "Beef" }
];

// Form validation schema
const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters long" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
  offering: z.string().array().min(1, { message: "You must select at least one item you're offering" }),
  seeking: z.string().array().min(1, { message: "You must select at least one item you're seeking" })
});

type FormValues = z.infer<typeof formSchema>;

interface CreateBarterListingFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateBarterListingForm({ open, onOpenChange }: CreateBarterListingFormProps) {
  const { toast } = useToast();
  const [selectedOffering, setSelectedOffering] = useState<string>("");
  const [selectedSeeking, setSelectedSeeking] = useState<string>("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      offering: [],
      seeking: []
    }
  });

  const addOffering = () => {
    if (!selectedOffering) return;
    
    const currentOffering = form.getValues("offering");
    if (!currentOffering.includes(selectedOffering)) {
      form.setValue("offering", [...currentOffering, selectedOffering]);
    }
    setSelectedOffering("");
  };

  const removeOffering = (item: string) => {
    const currentOffering = form.getValues("offering");
    form.setValue("offering", currentOffering.filter(i => i !== item));
  };

  const addSeeking = () => {
    if (!selectedSeeking) return;
    
    const currentSeeking = form.getValues("seeking");
    if (!currentSeeking.includes(selectedSeeking)) {
      form.setValue("seeking", [...currentSeeking, selectedSeeking]);
    }
    setSelectedSeeking("");
  };

  const removeSeeking = (item: string) => {
    const currentSeeking = form.getValues("seeking");
    form.setValue("seeking", currentSeeking.filter(i => i !== item));
  };

  const onSubmit = (data: FormValues) => {
    toast({
      title: "Listing Created",
      description: "Your barter listing has been created successfully!"
    });

    console.log("Form submitted:", data);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Barter Listing</DialogTitle>
          <DialogDescription>
            Share what farm products you have to offer and what you're looking to trade for.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Listing Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Fresh Organic Tomatoes for Trade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe what you're offering, quantity, quality, and any other relevant details..." 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="offering"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>What You're Offering</FormLabel>
                    <div className="flex mb-2">
                      <Select value={selectedOffering} onValueChange={setSelectedOffering}>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          {productCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button type="button" onClick={addOffering} className="ml-2">Add</Button>
                    </div>
                    <div className="flex flex-wrap gap-2 min-h-[60px]">
                      {field.value.map((item) => (
                        <Badge key={item} variant="secondary" className="flex items-center gap-1">
                          {productCategories.find(c => c.id === item)?.label || item}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-4 w-4 rounded-full p-0 text-muted-foreground"
                            onClick={() => removeOffering(item)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="seeking"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>What You're Seeking</FormLabel>
                    <div className="flex mb-2">
                      <Select value={selectedSeeking} onValueChange={setSelectedSeeking}>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          {productCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button type="button" onClick={addSeeking} className="ml-2">Add</Button>
                    </div>
                    <div className="flex flex-wrap gap-2 min-h-[60px]">
                      {field.value.map((item) => (
                        <Badge key={item} variant="outline" className="flex items-center gap-1">
                          {productCategories.find(c => c.id === item)?.label || item}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-4 w-4 rounded-full p-0 text-muted-foreground"
                            onClick={() => removeSeeking(item)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Listing</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
