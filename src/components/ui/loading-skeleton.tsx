import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'card' | 'line' | 'circle' | 'button';
  lines?: number;
}

export const LoadingSkeleton = ({ 
  className, 
  variant = 'line',
  lines = 1
}: LoadingSkeletonProps) => {
  const baseClass = "animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted";

  if (variant === 'card') {
    return (
      <div className={cn("space-y-3", className)}>
        <div className={cn(baseClass, "h-48 w-full rounded-lg")} />
        <div className="space-y-2">
          <div className={cn(baseClass, "h-4 w-3/4 rounded")} />
          <div className={cn(baseClass, "h-4 w-1/2 rounded")} />
          <div className={cn(baseClass, "h-6 w-1/4 rounded")} />
        </div>
      </div>
    );
  }

  if (variant === 'circle') {
    return (
      <div className={cn(baseClass, "rounded-full", className)} />
    );
  }

  if (variant === 'button') {
    return (
      <div className={cn(baseClass, "h-10 w-24 rounded-lg", className)} />
    );
  }

  // Line variant (default)
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            baseClass,
            "h-4 rounded",
            i === lines - 1 ? "w-3/4" : "w-full"
          )}
        />
      ))}
    </div>
  );
};

// Product Card Skeleton
export const ProductCardSkeleton = () => (
  <div className="bg-card border border-border rounded-lg overflow-hidden">
    <div className="animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted h-64 w-full" />
    <div className="p-4 space-y-3">
      <div className="animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted h-4 w-1/3 rounded" />
      <div className="animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted h-5 w-full rounded" />
      <div className="flex justify-between items-center">
        <div className="animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted h-4 w-20 rounded" />
        <div className="animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted h-6 w-16 rounded" />
      </div>
    </div>
  </div>
);

// Search Skeleton
export const SearchSkeleton = () => (
  <div className="space-y-4">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex gap-4 p-4 border border-border rounded-lg">
        <div className="animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted h-16 w-16 rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted h-4 w-3/4 rounded" />
          <div className="animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted h-4 w-1/2 rounded" />
          <div className="animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted h-5 w-20 rounded" />
        </div>
      </div>
    ))}
  </div>
);