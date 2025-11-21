import { MapPin, Calendar, GitBranch } from "lucide-react";

interface ScopeCardProps {
  branch?: string;
  place?: string;
  timebox?: string;
  isUpdated?: boolean;
}

export function ScopeCard({ branch, place, timebox, isUpdated }: ScopeCardProps) {
  return (
    <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-4 transition-all ${
      isUpdated ? 'animate-pulse-scale' : ''
    }`}>
      <div className="text-sm text-gray-600 mb-3">Research Scope</div>
      <div className="space-y-2">
        {branch && (
          <div className="flex items-center gap-2 text-sm">
            <GitBranch className="w-4 h-4 text-blue-600" />
            <span className="text-gray-700">{branch}</span>
          </div>
        )}
        {place && (
          <div className={`flex items-center gap-2 text-sm transition-all ${
            isUpdated ? 'animate-highlight' : ''
          }`}>
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className={`text-gray-700 ${isUpdated ? 'font-semibold' : ''}`}>{place}</span>
          </div>
        )}
        {timebox && (
          <div className={`flex items-center gap-2 text-sm transition-all ${
            isUpdated ? 'animate-highlight' : ''
          }`}>
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className={`text-gray-700 ${isUpdated ? 'font-semibold' : ''}`}>{timebox}</span>
          </div>
        )}
      </div>
    </div>
  );
}