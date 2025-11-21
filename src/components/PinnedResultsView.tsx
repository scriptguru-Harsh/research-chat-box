import { ArrowLeft, Pin } from "lucide-react";
import { Button } from "./ui/button";

interface PinnedItem {
  id: string;
  title: string;
  description: string;
  group: string;
}

interface PinnedResultsViewProps {
  pinnedItems: PinnedItem[];
  onBack: () => void;
  onTogglePin: (id: string) => void;
}

export function PinnedResultsView({ pinnedItems, onBack, onTogglePin }: PinnedResultsViewProps) {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Pin className="w-5 h-5 text-blue-600 fill-current" />
            <h2 className="text-lg">Pinned Results</h2>
          </div>
        </div>
        <span className="text-sm text-gray-500">{pinnedItems.length} {pinnedItems.length === 1 ? 'item' : 'items'}</span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {pinnedItems.length > 0 ? (
          <div className="space-y-2">
            {pinnedItems.map((item) => (
              <div
                key={item.id}
                className="bg-blue-50/50 border border-blue-200 rounded-lg p-4 hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-900 mb-1">{item.title}</div>
                    <div className="text-xs text-gray-500 mb-2">{item.description}</div>
                    <div className="text-xs text-blue-600 bg-blue-100 inline-block px-2 py-0.5 rounded">
                      {item.group}
                    </div>
                  </div>
                  <button
                    onClick={() => onTogglePin(item.id)}
                    className="shrink-0 p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all"
                    title="Unpin"
                  >
                    <Pin className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No pinned results yet
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4">
        <Button onClick={onBack} variant="outline" className="w-full">
          Back to Results
        </Button>
      </div>
    </div>
  );
}
