import { X, Pin } from "lucide-react";
import { Button } from "./ui/button";
import { ResultCard } from "./ResultCard";

interface Screen4Props {
  onBack: () => void;
}

const pinnedItems = [
  { id: "1", title: "Giovanni Rossi (1852-1920)", description: "Son of Antonio, lived in Mantova", isPinned: true },
];

export function Screen4({ onBack }: Screen4Props) {
  return (
    <div className="h-screen flex flex-col max-w-md mx-auto bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Pin className="w-5 h-5 text-blue-600" />
          <span>Pinned Items</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onBack}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Pinned Items List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="text-sm text-gray-600 mb-4">
          {pinnedItems.length} {pinnedItems.length === 1 ? 'item' : 'items'} saved for review
        </div>
        
        {pinnedItems.map((item) => (
          <ResultCard
            key={item.id}
            title={item.title}
            description={item.description}
            isPinned={item.isPinned}
          />
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="border-t border-gray-200 p-4">
        <Button 
          onClick={onBack}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          Back to Results
        </Button>
      </div>
    </div>
  );
}
