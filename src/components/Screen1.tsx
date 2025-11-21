import { useState, useEffect } from "react";
import { ScopeCard } from "./ScopeCard";
import { SplitLayout } from "./SplitLayout";
import { ChatPanel } from "./ChatPanel";
import { BottomSheet } from "./BottomSheet";
import { ResultsPanel } from "./ResultsPanel";
import { PinnedResultsView } from "./PinnedResultsView";
import { Button } from "./ui/button";

interface Screen1Props {
  onNext: () => void;
}

const initialResultGroups = [
  {
    title: "Likely",
    count: 18,
    items: [
      { id: "1", title: "Giovanni Rossi (1852-1920)", description: "Son of Antonio, lived in Mantova" },
      { id: "2", title: "Maria Bianchi (1855-1932)", description: "Married to Giovanni, records in Milan" },
      { id: "3", title: "Carlo Rossi (1880-1945)", description: "Son of Giovanni, birth record found" },
    ],
  },
  {
    title: "Worth Exploring",
    count: 37,
    items: [
      { id: "4", title: "Francesco Verdi (1848-1910)", description: "Possible brother, same region" },
      { id: "5", title: "Anna Russo (1860-1925)", description: "Marriage record mentions Antonio" },
    ],
  },
  {
    title: "Unrelated",
    count: 145,
    items: [
      { id: "6", title: "Giuseppe Ferrari (1845-1900)", description: "Different region, unlikely match" },
    ],
  },
];

export function Screen1({ onNext }: Screen1Props) {
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [showResultsSheet, setShowResultsSheet] = useState(false);
  const [showPinnedView, setShowPinnedView] = useState(false);
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);

  useEffect(() => {
    if (step === 2) {
      setTimeout(() => setStep(3), 1500);
    } else if (step === 3) {
      setTimeout(() => setStep(4), 800);
    }
  }, [step]);

  const handleSend = () => {
    if (inputValue.trim() && step === 0) {
      setStep(1);
      setInputValue("");
      setTimeout(() => setStep(2), 500);
    }
    onNext();
  };

  const handleTogglePin = (id: string) => {
    setPinnedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((p) => p !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const pinnedItems = initialResultGroups.flatMap((group) =>
    group.items
      .filter((item) => pinnedIds.includes(item.id))
      .map((item) => ({ ...item, group: group.title }))
  );

  const messages = [
    ...(step >= 1
      ? [
          {
            id: "1",
            type: "user" as const,
            content: "Find more relatives on my dad's side.",
          },
        ]
      : []),
    ...(step === 2
      ? [{ id: "2", type: "system" as const, content: "", isTyping: true }]
      : []),
    ...(step >= 3
      ? [
          {
            id: "3",
            type: "system" as const,
            content: "Research Job Created",
          },
          {
            id: "4",
            type: "system" as const,
            content: (
              <ScopeCard
                branch="Father's lineage"
                place="All regions"
                timebox="All time periods"
              />
            ),
          },
        ]
      : []),
      ...([{id:"0",
        type:"system" as const,
        content:"Hi, I can help you investigate family history, people, and records. What are you looking for?",
      }])
  ];

  const handleViewResults = () => {
    // On mobile, show bottom sheet
    if (window.innerWidth < 768) {
      setShowResultsSheet(true);
    } else {
      // On desktop, go to next screen
      onNext();
    }
  };

  return (
    <>
      {/* Desktop: Split Layout */}
      <div className="hidden md:block">
        <SplitLayout
          messages={messages}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSend={handleSend}
          resultGroups={step >= 4 ? initialResultGroups : undefined}
          pinnedIds={pinnedIds}
          onTogglePin={handleTogglePin}
          placeholder="Describe your research..."
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
          onSend={handleSend}
          showResultsButton={step >= 4}
          onViewResults={handleViewResults}
          placeholder="Describe your research..."
        />

        <BottomSheet isOpen={showResultsSheet && !showPinnedView} onClose={() => setShowResultsSheet(false)}>
          <div className="p-4">
            {step >= 4 ? (
              <>
                <ResultsPanel
                  groups={initialResultGroups}
                  pinnedIds={pinnedIds}
                  onTogglePin={handleTogglePin}
                  onViewPinned={() => {
                    setShowPinnedView(true);
                    setShowResultsSheet(false);
                  }}
                />
                <div className="pt-4 border-t border-gray-200 mt-4">
                  <Button
                    onClick={() => {
                      setShowResultsSheet(false);
                      onNext();
                    }}
                    className="w-full bg-blue-500 hover:bg-blue-600"
                  >
                    Continue
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-gray-400 text-sm">
                Results will appear here once generated
              </div>
            )}
          </div>
        </BottomSheet>

        <BottomSheet 
          isOpen={showPinnedView} 
          onClose={() => setShowPinnedView(false)}
        >
          <div className="h-full">
            <PinnedResultsView
              pinnedItems={pinnedItems}
              onBack={() => {
                setShowPinnedView(false);
                setShowResultsSheet(true);
              }}
              onTogglePin={handleTogglePin}
            />
          </div>
        </BottomSheet>
      </div>
    </>
  );
}