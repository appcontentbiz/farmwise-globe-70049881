
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: string;
  completed: boolean;
}

export function ChecklistContent() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    {
      id: "1",
      title: "Define your farm goals and mission",
      description: "Write down what you want to achieve with your farm",
      category: "planning",
      completed: true
    },
    {
      id: "2",
      title: "Research local zoning and regulations",
      description: "Ensure your planned activities are permitted on your land",
      category: "planning",
      completed: true
    },
    {
      id: "3",
      title: "Create a business plan",
      description: "Include market analysis, financial projections, and marketing strategy",
      category: "planning",
      completed: false
    },
    {
      id: "4",
      title: "Register your farm business",
      description: "Apply for necessary licenses and permits",
      category: "legal",
      completed: false
    },
    {
      id: "5",
      title: "Set up accounting system",
      description: "Establish separate business accounts and recordkeeping",
      category: "legal",
      completed: false
    },
    {
      id: "6",
      title: "Obtain farm insurance",
      description: "Research appropriate coverage for your operation",
      category: "legal",
      completed: false
    },
    {
      id: "7",
      title: "Complete soil testing",
      description: "Determine soil composition and fertility needs",
      category: "production",
      completed: true
    },
    {
      id: "8",
      title: "Source equipment and supplies",
      description: "Research and acquire necessary equipment for your operation",
      category: "production",
      completed: false
    },
    {
      id: "9",
      title: "Develop farm safety protocols",
      description: "Create procedures to ensure safe operation",
      category: "production",
      completed: false
    },
    {
      id: "10",
      title: "Research market channels",
      description: "Identify where you'll sell your products",
      category: "marketing",
      completed: true
    },
    {
      id: "11",
      title: "Create farm branding",
      description: "Design logo, website, and marketing materials",
      category: "marketing",
      completed: false
    },
    {
      id: "12",
      title: "Connect with local farming networks",
      description: "Join farmer associations and attend community events",
      category: "marketing",
      completed: false
    }
  ]);

  const toggleItem = (id: string) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedItems = checklist.filter(item => item.completed).length;
  const completionPercentage = (completedItems / checklist.length) * 100;

  const categories = ["planning", "legal", "production", "marketing"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center mb-6">
        <h4 className="font-medium text-center">Getting Started Checklist</h4>
        <div className="w-full mt-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{completedItems}/{checklist.length} completed</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
      </div>
      
      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category} className="space-y-3">
            <h4 className="capitalize font-medium">{category}</h4>
            <div className="space-y-3">
              {checklist
                .filter(item => item.category === category)
                .map(item => (
                  <div 
                    key={item.id} 
                    className={`p-3 border rounded-md transition-colors ${item.completed ? 'bg-farm-green/5 border-farm-green/30' : 'bg-white'}`}
                  >
                    <div className="flex items-start gap-2">
                      <Checkbox 
                        id={`item-${item.id}`} 
                        checked={item.completed}
                        onCheckedChange={() => toggleItem(item.id)}
                        className="mt-0.5"
                      />
                      <div>
                        <label 
                          htmlFor={`item-${item.id}`} 
                          className={`text-sm font-medium cursor-pointer ${item.completed ? 'line-through text-muted-foreground' : ''}`}
                        >
                          {item.title}
                        </label>
                        <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
