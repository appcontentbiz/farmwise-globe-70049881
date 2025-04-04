
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  className = ''
}: PaginationControlsProps) {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onPrevious}
        disabled={currentPage <= 1}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages || 1}
      </span>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onNext}
        disabled={currentPage >= totalPages}
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
}
