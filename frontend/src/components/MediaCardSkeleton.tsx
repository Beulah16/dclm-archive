import { Skeleton } from "./ui/skeleton";
import { Card, CardContent } from "./ui/card";

export function MediaCardSkeleton() {
  return (
    <Card className="overflow-hidden group cursor-pointer transition-all duration-200 hover:shadow-lg border-border/50">
      <CardContent className="p-0">
        {/* Thumbnail skeleton */}
        <div className="relative aspect-video bg-muted overflow-hidden">
          <Skeleton className="w-full h-full" />
          
          {/* Duration badge skeleton */}
          <div className="absolute bottom-2 right-2">
            <Skeleton className="h-5 w-12 rounded" />
          </div>
        </div>

        {/* Content skeleton */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-4 w-3/4" />

          {/* Speaker info */}
          <div className="flex items-center space-x-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-1 flex-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>

          {/* Meta info */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-4 w-20" />
          </div>

          {/* Category badge */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface MediaCardSkeletonGridProps {
  count?: number;
}

export function MediaCardSkeletonGrid({ count = 6 }: MediaCardSkeletonGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <MediaCardSkeleton key={i} />
      ))}
    </div>
  );
}