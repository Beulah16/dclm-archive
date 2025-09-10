import { Button } from "./button";
import { Badge } from "./badge";
import { X } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  count: number;
  countLabel?: string;
  hasActiveFilters?: boolean;
  onClearFilters?: () => void;
  className?: string;
}

export function SectionHeader({
  title,
  count,
  countLabel,
  hasActiveFilters = false,
  onClearFilters,
  className = ""
}: SectionHeaderProps) {
  return (
    <div className={`flex items-start justify-between ${className}`}>
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {hasActiveFilters && onClearFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters}
            className="h-7 px-2 text-xs text-destructive hover:text-destructive/80 hover:bg-destructive/10"
          >
            <X className="h-3 w-3 mr-1" />
            Clear All Filters
          </Button>
        )}
      </div>
      <Badge variant="outline">
        {count} {countLabel || 'items'}
      </Badge>
    </div>
  );
}