
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Globe, 
  Upload,
  Send,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useFieldReports } from "@/contexts/FieldReportContext";

interface FieldReportFormProps {
  onSubmit: () => void;
}

// Define the form schema with validation rules
const formSchema = z.object({
  reportType: z.string({
    required_error: "Please select a report type",
  }),
  location: z.string().min(3, "Location must be at least 3 characters"),
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title cannot exceed 100 characters"),
  description: z.string()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description cannot exceed 1000 characters"),
  // Fix: Change literal validation to boolean with refinement for "true" value
  acknowledgement: z.boolean().refine(val => val === true, {
    message: "You must acknowledge this"
  })
});

type FieldReportFormValues = z.infer<typeof formSchema>;

export function FieldReportForm({ onSubmit }: FieldReportFormProps) {
  const { toast } = useToast();
  const { addReport, isSubmitting, setIsSubmitting } = useFieldReports();
  const [files, setFiles] = useState<File[]>([]);
  
  // Initialize form with React Hook Form
  const form = useForm<FieldReportFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reportType: "",
      location: "",
      title: "",
      description: "",
      acknowledgement: false
    }
  });
  
  const handleSubmit = async (values: FieldReportFormValues) => {
    try {
      // Convert files to serializable format
      const fileData = files.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      }));
      
      // Add the report to our context
      await addReport({
        reportType: values.reportType,
        location: values.location,
        title: values.title,
        description: values.description,
        files: fileData
      });
      
      // Show success message
      toast({
        title: "Report Submitted Successfully",
        description: "Thank you for contributing to the global farming community.",
      });
      
      // Reset form
      form.reset();
      setFiles([]);
      
      // Callback to parent
      onSubmit();
    } catch (error) {
      console.error("Error submitting report:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your report. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileArray = Array.from(e.target.files);
      // Check file size (5MB limit)
      const validFiles = fileArray.filter(file => file.size <= 5 * 1024 * 1024);
      
      if (validFiles.length !== fileArray.length) {
        toast({
          title: "File Size Exceeded",
          description: "Some files were not added because they exceed the 5MB limit.",
          variant: "destructive",
        });
      }
      
      setFiles(prev => [...prev, ...validFiles]);
    }
  };
  
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="farm-module-card">
        <CardHeader className="pb-2">
          <CardTitle className="farm-module-card-title">
            <Globe className="h-5 w-5 text-farm-green" />
            Submit Field Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="reportType"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Report Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="weather">Weather Event</SelectItem>
                        <SelectItem value="disease">Crop Disease/Pest</SelectItem>
                        <SelectItem value="innovation">Farming Technique</SelectItem>
                        <SelectItem value="market">Market Insight</SelectItem>
                        <SelectItem value="policy">Policy Impact</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="City, Region, Country"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Report Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Brief title of your report"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detailed information about your observation or insight"
                        className="min-h-[120px]"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-2">
                <Label htmlFor="attachments">Attachments (Optional)</Label>
                <div 
                  className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors ${
                    isSubmitting ? 'opacity-50 pointer-events-none' : ''
                  }`}
                  onClick={() => !isSubmitting && document.getElementById('file-upload')?.click()}
                >
                  <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Drag & drop files or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supports: JPG, PNG, PDF (max 5MB)
                  </p>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="hidden"
                    disabled={isSubmitting}
                  />
                </div>
                
                {files.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <Label>Selected Files</Label>
                    <div className="space-y-2 max-h-[120px] overflow-y-auto">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
                          <span className="text-sm truncate max-w-[80%]">{file.name}</span>
                          <Button 
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            disabled={isSubmitting}
                            type="button"
                          >
                            ✕
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <FormField
                control={form.control}
                name="acknowledgement"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        I confirm this report is accurate and can be shared with the farming community.
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Report
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card className="farm-module-card">
        <CardHeader className="pb-2">
          <CardTitle className="farm-module-card-title">
            <Globe className="h-5 w-5 text-farm-green" />
            Why Contribute?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-medium mb-2">Collective Intelligence</h3>
            <p className="text-sm text-muted-foreground">
              By sharing your observations and insights, you contribute to a global knowledge base that helps farmers worldwide prepare for challenges and opportunities.
            </p>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-medium mb-2">Early Warning System</h3>
            <p className="text-sm text-muted-foreground">
              Field reports create an early warning network that can identify emerging issues before they become widespread problems.
            </p>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-medium mb-2">Global Community</h3>
            <p className="text-sm text-muted-foreground">
              Connect with farmers and agricultural experts worldwide who share similar challenges and innovative solutions.
            </p>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <h3 className="font-medium mb-2">Recent Contributions</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Successful companion planting technique in Iowa</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span>New wheat rust variant detected in Saskatchewan</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>Unusual rainfall patterns affecting rice in Thailand</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
