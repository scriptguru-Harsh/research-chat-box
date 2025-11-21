import { ChatPanel } from "./ChatPanel";
import { ResultsPanel } from "./ResultsPanel";
import { PinnedResultsView } from "./PinnedResultsView";
import { Separator } from "./ui/separator";

interface Message {
  id: string;
  type: "user" | "system";
  content: React.ReactNode;
  isTyping?: boolean;
}

interface ResultGroup {
  title: string;
  count: number;
  items: Array<{ id: string; title: string; description: string }>;
}

interface SplitLayoutProps {
  messages: Message[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  resultGroups?: ResultGroup[];
  pinnedIds?: string[];
  onTogglePin?: (id: string) => void;
  placeholder?: string;
  showPinnedView?: boolean;
  onViewPinned?: () => void;
  onBackFromPinned?: () => void;
}

export function SplitLayout({
  messages,
  inputValue,
  onInputChange,
  onSend,
  resultGroups,
  pinnedIds = [],
  onTogglePin = () => {},
  placeholder,
  showPinnedView = false,
  onViewPinned,
  onBackFromPinned,
}: SplitLayoutProps) {
  // Get pinned items with their group info
  const pinnedItems = resultGroups
    ? resultGroups.flatMap((group) =>
        group.items
          .filter((item) => pinnedIds.includes(item.id))
          .map((item) => ({ ...item, group: group.title }))
      )
    : [];

  return (
    <div className="h-screen flex max-w-7xl mx-auto bg-gray-50">
      {/* Left Panel - Chat */}
      <div className="w-full md:w-1/2 lg:w-2/5 border-r border-gray-200">
        <ChatPanel
          messages={messages}
          inputValue={inputValue}
          onInputChange={onInputChange}
          onSend={onSend}
          placeholder={placeholder}
        />
      </div>

      {/* Right Panel - Results or Pinned View */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 flex-col bg-white">
        {showPinnedView ? (
          <PinnedResultsView
            pinnedItems={pinnedItems}
            onBack={onBackFromPinned || (() => {})}
            onTogglePin={onTogglePin}
          />
        ) : (
          <>
            <div className="border-b border-gray-200 px-6 py-4">
              <h2>Results</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {resultGroups && resultGroups.length > 0 ? (
                <ResultsPanel
                  groups={resultGroups}
                  pinnedIds={pinnedIds}
                  onTogglePin={onTogglePin}
                  onViewPinned={onViewPinned}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  Results will appear here
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}