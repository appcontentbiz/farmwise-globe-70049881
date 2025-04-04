
import { Skeleton } from "@/components/ui/skeleton";

export function HealthLoadingState() {
  return (
    <div className="space-y-6">
      {/* Calendar and Form Loading State */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="col-span-1 bg-card p-4 rounded-lg border shadow-sm">
          <Skeleton className="h-[300px] w-full" />
        </div>
        <div className="col-span-2 bg-card p-4 rounded-lg border shadow-sm">
          <Skeleton className="h-8 w-1/3 mb-4" />
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-24 ml-auto" />
          </div>
        </div>
      </div>

      {/* Charts Loading State */}
      <div className="bg-card border rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-6 w-40" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
        <Skeleton className="h-[300px] w-full" />
      </div>

      {/* Insights Loading State */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-[180px] w-full" />
        <Skeleton className="h-[180px] w-full" />
        <Skeleton className="h-[180px] w-full" />
      </div>
    </div>
  );
}
