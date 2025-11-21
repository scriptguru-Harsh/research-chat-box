import { useState, useEffect } from "react";
import { ScopeCard } from "./ScopeCard";
import { SplitLayout } from "./SplitLayout";
import { ChatPanel } from "./ChatPanel";
import { BottomSheet } from "./BottomSheet";
import { ResultsPanel } from "./ResultsPanel";
import { Button } from "./ui/button";

interface Screen5Props {
  onNext: () => void;
}

const resultGroups = [
  {
    title: "Likely",
    count: 18,
    items: [
      { id: "1", title: "Giovanni Rossi (1852-1920)", description: "Son of Antonio, lived in Mantova" },
      { id: "2", title: "Maria Bianchi (1855-1932)", description: "Married to Giovanni, records in Milan" },
      { id: "3", title: "Carlo Rossi (1880-1945)", description: "Son of Giovanni, birth record found" },
      { id: "4", title: "Antonio Rossi Jr. (1878-1950)", description: "Birth certificate found in archives" },
      { id: "5", title: "Sofia Rossi (1885-1960)", description: "Marriage record lists Antonio as father" },
    ],
  },
  {
    title: "Worth Exploring",
    count: 37,
    items: [
      { id: "6", title: "Francesco Verdi (1848-1910)", description: "Possible brother, same region" },
      { id: "7", title: "Anna Russo (1860-1925)", description: "Marriage record mentions Antonio" },
      { id: "8", title: "Pietro Rossi (1875-1940)", description: "Census record, same surname" },
      { id: "9", title: "Lucia Bianchi (1870-1945)", description: "Connected through marriage records" },
      { id: "10", title: "Marco Verdi (1882-1955)", description: "Same town, possible cousin" },
    ],
  },
  {
    title: "Unrelated",
    count: 145,
    items: [
      { id: "11", title: "Giuseppe Ferrari (1845-1900)", description: "Different region, unlikely match" },
      { id: "12", title: "Luigi Colombo (1870-1935)", description: "No direct connection found" },
      { id: "13", title: "Elena Martini (1865-1930)", description: "Different family line" },
      { id: "14", title: "Paolo Ricci (1890-1970)", description: "No overlap in records" },
      { id: "15", title: "Teresa Bruno (1875-1955)", description: "Unrelated surname, different area" },
    ],
  },
];

export function Screen5({ onNext }: Screen5Props) {
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [pinnedIds, setPinnedIds] = useState<string[]>(["1"]);
  const [showResultsSheet, setShowResultsSheet] = useState(false);

  useEffect(() => {
    if (step === 2) {
      setTimeout(() => setStep(3), 1000);
    } else if (step === 3) {
      setTimeout(() => setStep(4), 1500);
    }
  }, [step]);

  const handleSend = () => {
    if (inputValue.trim() && step === 0) {
      setStep(1);
      setInputValue("");
      setTimeout(() => setStep(2), 500);
    }
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
    ...(step >= 1
      ? [
          {
            id: "5",
            type: "user" as const,
            content: "Narrow that to Mantova 1880–1900.",
          },
        ]
      : []),
    ...(step === 2
      ? [{ id: "6", type: "system" as const, content: "", isTyping: true }]
      : []),
    ...(step >= 3
      ? [
          {
            id: "7",
            type: "system" as const,
            content: "Research scope updated",
          },
          {
            id: "8",
            type: "system" as const,
            content: (
              <ScopeCard
                branch="Father's lineage"
                place="Mantova"
                timebox="1880–1900"
                isUpdated
              />
            ),
          },
        ]
      : []),
  ];

  const handleViewResults = () => {
    if (window.innerWidth < 768) {
      setShowResultsSheet(true);
    } else {
      onNext();
    }
  };

  return (
    <>
      {/* Desktop: Split Layout */}
      <div className="hidden md:block">
        <SplitLayout
          messages={[
            ...messages,
            ...(step >= 4
              ? [
                  {
                    id: "view-results",
                    type: "system" as const,
                    content: (
                      <div className="flex justify-center pt-2">
                        <Button
                          onClick={onNext}
                          className="bg-blue-500 hover:bg-blue-600 rounded-full px-6"
                        >
                          View Updated Results
                        </Button>
                      </div>
                    ),
                  },
                ]
              : []),
          ]}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSend={handleSend}
          resultGroups={step < 4 ? resultGroups : undefined}
          pinnedIds={pinnedIds}
          onTogglePin={handleTogglePin}
          placeholder="Refine your search..."
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
          placeholder="Refine your search..."
        />

        <BottomSheet isOpen={showResultsSheet} onClose={() => setShowResultsSheet(false)}>
          <div className="p-4">
            <ResultsPanel
              groups={resultGroups}
              pinnedIds={pinnedIds}
              onTogglePin={handleTogglePin}
            />
            {step >= 4 && (
              <div className="pt-4">
                <button
                  onClick={() => {
                    setShowResultsSheet(false);
                    onNext();
                  }}
                  className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  View Updated Results
                </button>
              </div>
            )}
          </div>
        </BottomSheet>
      </div>
    </>
  );
}