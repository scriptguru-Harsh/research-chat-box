import { ChatMessage } from "./ChatMessage";
import { ScopeCard } from "./ScopeCard";
import { ChatInput } from "./ChatInput";
import { Button } from "./ui/button";

interface Message {
  id: string;
  type: "user" | "system";
  content: React.ReactNode;
  isTyping?: boolean;
}

interface ChatPanelProps {
  messages: Message[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  showResultsButton?: boolean;
  onViewResults?: () => void;
  placeholder?: string;
}

export function ChatPanel({
  messages,
  inputValue,
  onInputChange,
  onSend,
  showResultsButton,
  onViewResults,
  placeholder = "Type a message...",
}: ChatPanelProps) {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Chat Header */}
      <div className="border-b border-gray-200 px-4 py-4">
        <div className="text-center">Research Assistant</div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} type={message.type} isTyping={message.isTyping}>
            {message.content}
          </ChatMessage>
        ))}

        {showResultsButton && (
          <div className="flex justify-center pt-4">
            <Button
              onClick={onViewResults}
              className="bg-blue-500 hover:bg-blue-600 rounded-full px-6"
            >
              View Results
            </Button>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <ChatInput
        value={inputValue}
        onChange={onInputChange}
        onSend={onSend}
        placeholder={placeholder}
      />
    </div>
  );
}
