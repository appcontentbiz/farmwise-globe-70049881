
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sprout, Share2 } from "lucide-react";
import { FarmingTypeCardGrid } from "./components/FarmingTypeCardGrid";
import { FarmingTypeDialogContent } from "./components/FarmingTypeDialogContent";
import { QuickActionButtons } from "./components/QuickActionButtons";
import { useFarmingTypeActions } from "./hooks/useFarmingTypeActions";

interface FarmingTypesProps {
  onLearnMoreClick?: (typeName: string, description: string) => void;
}

export function FarmingTypes({ onLearnMoreClick }: FarmingTypesProps) {
  const {
    selectedType,
    showDialog,
    setShowDialog,
    handleCompareClick,
    handleCardClick,
    handleResourceClick,
    handleQuickAction
  } = useFarmingTypeActions();

  return (
    <div className="grid grid-cols-1 gap-6 mt-6">
      <Card className="farm-module-card">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Sprout className="h-5 w-5 text-farm-green" />
              <h2 className="text-xl font-semibold">Beginner Farming Types</h2>
            </div>
            <Button variant="outline" onClick={handleCompareClick}>
              <Share2 className="h-4 w-4 mr-2" />
              Compare Types
            </Button>
          </div>
          <p className="text-muted-foreground mb-6">Explore different farming approaches suitable for beginners</p>
          
          <QuickActionButtons handleQuickAction={handleQuickAction} />
          
          <FarmingTypeCardGrid
            onLearnMoreClick={onLearnMoreClick}
            onCardClick={handleCardClick}
          />
        </div>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          {selectedType && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <span className="w-6 h-6 flex items-center justify-center">{selectedType.icon}</span>
                  <span>{selectedType.title}</span>
                </DialogTitle>
                <DialogDescription>{selectedType.description}</DialogDescription>
              </DialogHeader>
              
              <FarmingTypeDialogContent
                selectedType={selectedType}
                handleResourceClick={handleResourceClick}
                handleQuickAction={handleQuickAction}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
