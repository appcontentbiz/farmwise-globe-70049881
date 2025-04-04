import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated?: (post: PostFormData) => void;
}

// Define the form schema with validation rules
const formSchema = z.object({
  postType: z.enum(["article", "resource"]),
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title cannot exceed 100 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  category: z.string().min(2, "Category must be at least 2 characters"),
  tags: z.string().optional(),
  file: z.instanceof(File).optional().or(z.literal(null))
});

export type PostFormData = z.infer<typeof formSchema>;

export function CreatePostModal({ isOpen, onClose, onPostCreated }: CreatePostModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize the form
  const form = useForm<PostFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postType: "article",
      title: "",
      content: "",
      category: "",
      tags: "",
      file: null
    }
  });

  const handleSubmit = async (values: PostFormData) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to save the data
      console.log("Form data to submit:", values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Show success message
      toast({
        title: "Post created successfully!",
        description: "Your content has been submitted and will be published soon.",
      });
      
      // If callback provided, pass the data
      if (onPostCreated) {
        onPostCreated(values);
      }
      
      // Close modal and reset form
      form.reset();
      onClose();
    } catch (error) {
      console.error("Error submitting post:", error);
      toast({
        title: "Error creating post",
        description: "There was a problem submitting your content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Post or Resource</DialogTitle>
          <DialogDescription>
            Share your knowledge or upload resources to help the farming community.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="postType"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Post Type</FormLabel>
                  <RadioGroup 
                    onValueChange={field.onChange} 
                    value={field.value} 
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="article" id="article" />
                      <Label htmlFor="article">Article</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="resource" id="resource" />
                      <Label htmlFor="resource">Resource</Label>
                    </div>
                  </RadioGroup>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a descriptive title..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your article or describe your resource..."
                      rows={6}
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
                name="category"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E.g., Sustainability, Technology"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Tags (comma separated)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E.g., organic, soil health, irrigation"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            {form.watch("postType") === "resource" && (
              <FormField
                control={form.control}
                name="file"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Upload File</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        {...fieldProps}
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          onChange(file);
                        }}
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      Supported formats: PDF, DOCX, XLSX, JPG, PNG, MP3, MP4 (max 100MB)
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
