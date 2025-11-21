import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ResultCard } from "./ResultCard";

interface GroupSectionProps {
  title: string;
  count: number;
  items: Array<{ id: string; title: string; description: string; isPinned?: boolean }>;
  onCardClick?: (id: string) => void;
}

export function GroupSection({ title, count, items, onCardClick }: GroupSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full mb-3 text-left"
      >
        <div className="flex items-center gap-2">
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-500" />
          )}
          <span className="text-gray-900">{title}</span>
          <span className="text-sm text-gray-500">({count})</span>
        </div>
      </button>
      
      {isExpanded && (
        <div className="pl-7">
          {items.slice(0, 3).map((item) => (
            <ResultCard
              key={item.id}
              title={item.title}
              description={item.description}
              isPinned={item.isPinned}
              onClick={() => onCardClick?.(item.id)}
            />
          ))}
          {items.length > 3 && (
            <div className="text-xs text-gray-400 text-center py-2">
              + {items.length - 3} more
            </div>
          )}
        </div>
      )}
    </div>
  );
}
