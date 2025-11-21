interface ChatMessageProps {
  type: "user" | "system";
  children: React.ReactNode;
  isTyping?: boolean;
}

export function ChatMessage({ type, children, isTyping }: ChatMessageProps) {
  if (type === "user") {
    return (
      <div className="flex justify-end mb-4">
        <div className="bg-blue-500 text-white px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[80%]">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-4">
      <div className="bg-white border border-gray-200 px-4 py-2.5 rounded-2xl rounded-tl-sm max-w-[80%] shadow-sm">
        {isTyping ? (
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        ) : (
          <div className="text-gray-900">{children}</div>
        )}
      </div>
    </div>
  );
}
