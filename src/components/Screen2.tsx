import { useState } from "react";
import { ScopeCard } from "./ScopeCard";
import { SplitLayout } from "./SplitLayout";
import { ChatPanel } from "./ChatPanel";
import { BottomSheet } from "./BottomSheet";
import { ResultsPanel } from "./ResultsPanel";
import { PinnedResultsView } from "./PinnedResultsView";

interface Screen2Props {
  onCardPin: () => void;
  onRefine: () => void;
}
interface Message {
  id: string;
  type: "user" | "system";
  content: React.ReactNode;
  isTyping?: boolean;
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

export function Screen2({ onCardPin, onRefine }: Screen2Props) {
  const [inputValue, setInputValue] = useState("");
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);
  const [showResultsSheet, setShowResultsSheet] = useState(false);
  const [showPinnedView, setShowPinnedView] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {id:"0",
        type:"system" as const,
        content:"Hi, I can help you investigate family history, people, and records. What are you looking for?",
      },
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
  ]);
  const [currentScope, setCurrentScope] = useState({
    branch: "Father's lineage",
    place: "All regions",
    timebox: "All time periods",
  });

  const handleSend = () => {
    if (inputValue.trim()) {
      const userInput = inputValue.trim().toLowerCase();
      const originalInput = inputValue.trim();
      
      // Add user message immediately
      setMessages((prev) => [...prev, {
        id: `user-${Date.now()}`,
        type: "user" as const,
        content: originalInput,
      }]);
      
      // Clear input
      setInputValue("");
      
      // Show typing indicator after a brief delay
      setTimeout(() => {
        setMessages((prev) => [...prev, {
          id: `typing-${Date.now()}`,
          type: "system" as const,
          content: "",
          isTyping: true,
        }]);
        
        // Process the update after typing indicator
        setTimeout(() => {
          let updatedScope = { ...currentScope };
          let hasUpdate = false;
          
          // Simple parsing logic to detect intent for places
          if (userInput.includes("mantova") || userInput.includes("mantua")) {
            updatedScope.place = "Mantova";
            hasUpdate = true;
          }
          if (userInput.includes("milan") || userInput.includes("milano")) {
            updatedScope.place = "Milan";
            hasUpdate = true;
          }
          if (userInput.includes("rome") || userInput.includes("roma")) {
            updatedScope.place = "Rome";
            hasUpdate = true;
          }
          if (userInput.includes("florence") || userInput.includes("firenze")) {
            updatedScope.place = "Florence";
            hasUpdate = true;
          }
          if (userInput.includes("venice") || userInput.includes("venezia")) {
            updatedScope.place = "Venice";
            hasUpdate = true;
          }
          if (userInput.includes("region") || userInput.includes("everywhere") || userInput.includes("all place")) {
            updatedScope.place = "All regions";
            hasUpdate = true;
          }
          
          // Simple parsing logic to detect intent for time periods
          if (userInput.includes("1880") && userInput.includes("1900")) {
            updatedScope.timebox = "1880–1900";
            hasUpdate = true;
          }
          if (userInput.includes("1850") && userInput.includes("1870")) {
            updatedScope.timebox = "1850–1870";
            hasUpdate = true;
          }
          if (userInput.includes("1920")) {
            updatedScope.timebox = "1900–1920";
            hasUpdate = true;
          }
          if (userInput.includes("19th century") || userInput.includes("1800s")) {
            updatedScope.timebox = "1800–1900";
            hasUpdate = true;
          }
          if (userInput.includes("early 1900") || userInput.includes("early 20th")) {
            updatedScope.timebox = "1900–1930";
            hasUpdate = true;
          }
          
          // Branch updates
          if (userInput.includes("mother") || userInput.includes("mom")) {
            updatedScope.branch = "Mother's lineage";
            hasUpdate = true;
          }
          if (userInput.includes("father") || userInput.includes("dad")) {
            updatedScope.branch = "Father's lineage";
            hasUpdate = true;
          }
          if (userInput.includes("both side") || userInput.includes("all branches")) {
            updatedScope.branch = "All branches";
            hasUpdate = true;
          }
          
          // Remove typing indicator and add response
          setMessages((prev) => {
            const filtered = prev.filter((m) => !m.isTyping);
            return [
              ...filtered,
              {
                id: `system-${Date.now()}`,
                type: "system" as const,
                content: "Research scope updated",
              },
              {
                id: `scope-${Date.now()}`,
                type: "system" as const,
                content: (
                  <ScopeCard
                    branch={updatedScope.branch}
                    place={updatedScope.place}
                    timebox={updatedScope.timebox}
                    isUpdated={hasUpdate}
                  />
                ),
              },
            ];
          });
          
          // Update current scope state
          setCurrentScope(updatedScope);
        }, 1500);
      }, 300);
    }
  };

  const handleTogglePin = (id: string) => {
    setPinnedIds((prev) => {
      const isCurrentlyPinned = prev.includes(id);
      
      if (isCurrentlyPinned) {
        return prev.filter((p) => p !== id);
      } else {
        // Add pin message when first item is pinned
        if (prev.length === 0) {
          setTimeout(() => {
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                id: "pin-message",
                type: "system" as const,
                content: "Pinned for later review.",
              },
            ]);
          }, 300);
        }
        onCardPin();
        return [...prev, id];
      }
    });
  };

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
          onSend={handleSend}
          resultGroups={resultGroups}
          pinnedIds={pinnedIds}
          onTogglePin={handleTogglePin}
          placeholder="Refine your search..."
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
          showResultsButton={true}
          onViewResults={() => setShowResultsSheet(true)}
          placeholder="Refine your search..."
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
              onViewPinned={() => {
                setShowPinnedView(true);
                setShowResultsSheet(false);
              }}
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