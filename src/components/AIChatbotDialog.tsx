
import React, { useState, useRef, useEffect } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

type ChatMessage = {
  sender: "user" | "ai",
  text: string
};

export default function AIChatbotDialog({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: "ai", text: "Hey! I'm your AI Study Assistant. Ask me anything—study help, summaries, explanations, ideas, and more!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // Simulate AI reply with a simple placeholder
  async function handleSend() {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setMessages(msgs => [...msgs, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    // Simulate API call (replace with real API for prod)
    setTimeout(() => {
      setMessages(msgs => [
        ...msgs,
        {
          sender: "ai",
          text: `I'm just a demo for now, but I'll soon answer like ChatGPT! You asked: "${userMessage}"`
        }
      ]);
      setLoading(false);
    }, 1100);
  }

  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSend();
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={`
            group flex flex-col items-start bg-white/70 rounded-xl border border-indigo-100 p-5 md:p-6 shadow-sm
            hover:shadow-lg transition-shadow hover:scale-105 focus:ring-2 focus:ring-sky-200 w-full min-h-[104px] text-left
            ${triggerClassName ?? ""}
          `}
        >
          <span className="flex items-center mb-2">
            <MessageSquare className="text-indigo-700" size={28} />
            <span className="font-semibold text-indigo-900 text-[1.08rem] ml-2">AI Study Assistant</span>
          </span>
          <span className="text-indigo-900/70 text-sm mt-1">
            Get personalized support, notes, and answers—instantly, 24/7.
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg w-full p-0">
        <DialogHeader className="px-5 pt-4">
          <DialogTitle>AI Study Assistant</DialogTitle>
          <DialogDescription>Ask anything about your studies—answers, explanations, summaries, brainstorming, and more.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col px-5 pt-2 pb-4 min-h-[300px] max-h-[420px] overflow-y-auto bg-slate-50 rounded-t">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-2 w-full flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[76%] px-3 py-2 rounded-xl ${
                  msg.sender === "user"
                    ? "bg-sky-100 text-sky-800 self-end"
                    : "bg-white text-indigo-900 border border-indigo-100 self-start"
                } text-sm break-words`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex items-center border-t border-indigo-100 px-5 py-2 gap-2 bg-white rounded-b">
          <input
            className="flex-1 py-1 px-2 border rounded focus:outline-none text-sm"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={handleEnter}
            disabled={loading}
          />
          <Button size="sm" onClick={handleSend} disabled={loading || !input.trim()}>
            <Send size={16} className={loading ? "animate-spin" : ""} />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
