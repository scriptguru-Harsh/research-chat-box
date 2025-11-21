import { useState } from "react";
import { ScopeCard } from "./ScopeCard";
import { SplitLayout } from "./SplitLayout";
import { ChatPanel } from "./ChatPanel";
import { BottomSheet } from "./BottomSheet";
import { ResultsPanel } from "./ResultsPanel";
import { PinnedResultsView } from "./PinnedResultsView";

const resultGroups = [
  {
    title: "Likely",
    count: 8,
    items: [
      { id: "1", title: "Giovanni Rossi (1852-1920)", description: "Son of Antonio, lived in Mantova" },
      { id: "2", title: "Carlo Rossi (1880-1945)", description: "Birth record in Mantova, 1880" },
      { id: "3", title: "Antonio Rossi (1885-1960)", description: "Marriage record Mantova, 1895" },
      { id: "4", title: "Maria Rossi (1890-1970)", description: "Census record Mantova 1890" },
      { id: "5", title: "Giuseppe Rossi (1882-1955)", description: "Birth certificate Mantova 1882" },
    ],
  },
  {
    title: "Worth Exploring",
    count: 15,
    items: [
      { id: "6", title: "Francesco Verdi (1888-1950)", description: "Census Mantova 1890" },
      { id: "7", title: "Anna Russo (1882-1955)", description: "Birth record Mantova 1882" },
      { id: "8", title: "Pietro Rossi (1890-1965)", description: "School record Mantova 1898" },
      { id: "9", title: "Lucia Bianchi (1885-1960)", description: "Marriage Mantova 1899" },
      { id: "10", title: "Marco Verdi (1895-1975)", description: "Birth Mantova 1895" },
    ],
  },
  {
    title: "Unrelated",
    count: 52,
    items: [
      { id: "11", title: "Giuseppe Ferrari (1895-1970)", description: "Different region, outside date range" },
      { id: "12", title: "Luigi Colombo (1870-1935)", description: "Before specified time period" },
      { id: "13", title: "Elena Martini (1905-1980)", description: "After specified time period" },
      { id: "14", title: "Paolo Ricci (1865-1940)", description: "Wrong location" },
      { id: "15", title: "Teresa Bruno (1910-1990)", description: "Outside timeframe" },
    ],
  },
];

export function Screen6() {
  const [inputValue, setInputValue] = useState("");
  const [pinnedIds, setPinnedIds] = useState<string[]>(["1"]);
  const [showResultsSheet, setShowResultsSheet] = useState(false);
  const [showPinnedView, setShowPinnedView] = useState(false);

  const handleTogglePin = (id: string) => {
    setPinnedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((p) => p !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const messages = [
    {
      id: "1",
      type: "user" as const,
      content: "Find more relatives on my dad's side.",
    },
    {
      id: "2",
      type: "system" as const,
      content: "Research Job Created",
    },
    {
      id: "3",
      type: "system" as const,
      content: (
        <ScopeCard
          branch="Father's lineage"
          place="All regions"
          timebox="All time periods"
        />
      ),
    },
    {
      id: "4",
      type: "system" as const,
      content: "Pinned for later review.",
    },
    {
      id: "5",
      type: "user" as const,
      content: "Narrow that to Mantova 1880–1900.",
    },
    {
      id: "6",
      type: "system" as const,
      content: "Research scope updated",
    },
    {
      id: "7",
      type: "system" as const,
      content: (
        <ScopeCard
          branch="Father's lineage"
          place="Mantova"
          timebox="1880–1900"
        />
      ),
    },
  ];

  const pinnedItems = resultGroups.flatMap((group) =>
    group.items
      .filter((item) => pinnedIds.includes(item.id))
      .map((item) => ({ ...item, group: group.title }))
  );

  return (
    <>
      {/* Desktop: Split Layout */}
      <div className="hidden md:block">
        <SplitLayout
          messages={messages}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSend={() => {}}
          resultGroups={resultGroups}
          pinnedIds={pinnedIds}
          onTogglePin={handleTogglePin}
          placeholder="Continue refining..."
          showPinnedView={showPinnedView}
          onViewPinned={() => setShowPinnedView(true)}
          onBackFromPinned={() => setShowPinnedView(false)}
        />
      </div>

      {/* Mobile: Chat Panel + Bottom Sheet */}
      <div className="md:hidden h-screen">
        <ChatPanel
          messages={messages}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSend={() => {}}
          showResultsButton={true}
          onViewResults={() => setShowResultsSheet(true)}
          placeholder="Continue refining..."
        />

        <BottomSheet 
          isOpen={showResultsSheet && !showPinnedView} 
          onClose={() => setShowResultsSheet(false)}
        >
          <div className="p-4">
            <ResultsPanel
              groups={resultGroups}
              pinnedIds={pinnedIds}
              onTogglePin={handleTogglePin}
              onViewPinned={() => setShowPinnedView(true)}
            />
          </div>
        </BottomSheet>

        <BottomSheet 
          isOpen={showPinnedView} 
          onClose={() => setShowPinnedView(false)}
        >
          <div className="h-full">
            <PinnedResultsView
              pinnedItems={pinnedItems}
              onBack={() => setShowPinnedView(false)}
              onTogglePin={handleTogglePin}
            />
          </div>
        </BottomSheet>
      </div>
    </>
  );
}