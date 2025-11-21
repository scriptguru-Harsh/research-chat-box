import { Pin } from "lucide-react";
import { Badge } from "./ui/badge";

interface ResultCardProps {
  title: string;
  description: string;
  isPinned?: boolean;
  onClick?: () => void;
}

export function ResultCard({ title, description, isPinned, onClick }: ResultCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`bg-white border rounded-lg p-4 mb-2 cursor-pointer hover:border-blue-300 transition-all ${
        isPinned ? 'border-blue-400 shadow-sm' : 'border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="text-sm text-gray-900">{title}</div>
        {isPinned && (
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 shrink-0">
            <Pin className="w-3 h-3 mr-1" />
            Pinned
          </Badge>
        )}
      </div>
      <div className="text-xs text-gray-500">{description}</div>
    </div>
  );
}
