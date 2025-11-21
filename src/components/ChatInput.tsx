import { Send } from "lucide-react";
import { Button } from "./ui/button";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
}

export function ChatInput({ value, onChange, onSend, placeholder = "Type a message..." }: ChatInputProps) {
  const handleSend = () => {
    if (value.trim()) {
      onSend();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
      <div className="flex gap-2 items-end">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
        <Button 
          onClick={handleSend}
          size="icon"
          className="rounded-full h-10 w-10 bg-blue-500 hover:bg-blue-600"
          disabled={!value.trim()}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}