import { useState } from "react";
import { ScopeCard } from "./ScopeCard";
import { SplitLayout } from "./SplitLayout";
import { ChatPanel } from "./ChatPanel";
import { BottomSheet } from "./BottomSheet";
import { ResultsPanel } from "./ResultsPanel";
import { PinnedResultsView } from "./PinnedResultsView";

interface Screen3Props {
  onViewPinned: () => void;
  onContinue: () => void;
}