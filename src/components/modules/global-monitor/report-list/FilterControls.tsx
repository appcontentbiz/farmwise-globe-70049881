
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Search } from "lucide-react";

interface FilterControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string | undefined) => void;
}

export function FilterControls({ searchTerm, onSearchChange, onFilterChange }: FilterControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="relative flex-grow">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search reports..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <Select onValueChange={(value) => onFilterChange(value || undefined)}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder="All Types" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Types</SelectItem>
          <SelectItem value="weather">Weather Event</SelectItem>
          <SelectItem value="disease">Crop Disease/Pest</SelectItem>
          <SelectItem value="innovation">Farming Technique</SelectItem>
          <SelectItem value="market">Market Insight</SelectItem>
          <SelectItem value="policy">Policy Impact</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
