import { useState } from "react";
import { ChevronDown, ChevronRight, Pin } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface ResultItem {
  id: string;
  title: string;
  description: string;
}

interface ResultGroup {
  title: string;
  count: number;
  items: ResultItem[];
}

interface ResultsPanelProps {
  groups: ResultGroup[];
  pinnedIds: string[];
  onTogglePin: (id: string) => void;
  onViewPinned?: () => void;
}

export function ResultsPanel({ groups, pinnedIds, onTogglePin, onViewPinned }: ResultsPanelProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(groups.map((g) => g.title))
  );

  const toggleGroup = (title: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  };

  const totalPinned = pinnedIds.length;

  return (
    <div className="space-y-4">
      {totalPinned > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Pin className="w-4 h-4 text-blue-600 fill-current" />
            <span className="text-sm text-blue-900">Pinned Results ({totalPinned})</span>
          </div>
          {onViewPinned && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onViewPinned}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-100 h-7"
            >
              View All
            </Button>
          )}
        </div>
      )}

      {groups.map((group) => {
        const isExpanded = expandedGroups.has(group.title);
        
        return (
          <Card key={group.title} className="overflow-hidden">
            {/* Group Header */}
            <button
              onClick={() => toggleGroup(group.title)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-center gap-2">
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                )}
                <span className="text-gray-900">{group.title}</span>
                <Badge variant="secondary" className="text-xs">{group.count}</Badge>
              </div>
            </button>

            {/* Group Items */}
            {isExpanded && (
              <div className="border-t border-gray-100">
                {group.items.slice(0, 5).map((item) => {
                  const isPinned = pinnedIds.includes(item.id);
                  
                  return (
                    <div
                      key={item.id}
                      className={`p-4 border-b border-gray-100 last:border-b-0 transition-all ${
                        isPinned ? 'bg-blue-50/50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-gray-900 mb-1">{item.title}</div>
                          <div className="text-xs text-gray-500">{item.description}</div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onTogglePin(item.id);
                          }}
                          className={`shrink-0 p-2 rounded-lg border transition-all ${
                            isPinned
                              ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                              : "bg-white text-gray-400 border-gray-200 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50"
                          }`}
                          title={isPinned ? "Unpin" : "Pin for later"}
                        >
                          <Pin className={`w-4 h-4 ${isPinned ? "fill-current" : ""}`} />
                        </button>
                      </div>
                    </div>
                  );
                })}
                {group.items.length > 5 && (
                  <div className="text-xs text-gray-400 text-center py-3 bg-gray-50">
                    + {group.items.length - 5} more
                  </div>
                )}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}