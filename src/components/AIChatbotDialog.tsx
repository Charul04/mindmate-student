import React, { useState, useRef, useEffect } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MessageSquare, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

type ChatMessage = {
  sender: "user" | "ai",
  text: string
};

const PPLX_API_URL = "https://api.perplexity.ai/chat/completions";
const systemPrompt = "You are MindMate+, a concise, friendly, and helpful AI Study Assistant for students. Reply in clear, simple explanations and feel free to include step-by-step solutions, summaries, or relatable examples when asked. You can also help with brainstorming or mental health tips!";

function getStoredAPIKey() {
  try { return localStorage.getItem("pplx_api_key") || ""; } catch { return ""; }
}
function storeAPIKey(key: string) {
  try { localStorage.setItem("pplx_api_key", key); } catch {}
}

export default function AIChatbotDialog({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: "ai", text: "👋 Hey! I'm your AI Study Assistant. Ask me anything—study help, summaries, explanations, ideas, motivation and more!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [apiKey, setApiKey] = useState<string>(getStoredAPIKey());
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Chat history is preserved within dialog session for ChatGPT-like experience.
  // Each message is sent with full chat history (minus opening prompt for Perplexity token efficiency).
  // Scroll to bottom on new message or dialog open
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function handleSend() {
    if (!input.trim() || loading) return;
    setMessages(msgs => [...msgs, { sender: "user", text: input.trim() }]);
    setLoading(true);
    const userMessage = input.trim();
    setInput("");
    setError(null);

    // Compose Perplexity API call
    if (!apiKey) {
      setLoading(false);
      setError("No Perplexity API key set.");
      return;
    }
    try {
      const response = await fetch(PPLX_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-sonar-small-128k-online",
          messages: [
            { role: "system", content: systemPrompt },
            ...[...messages.filter(m => m.sender !== "ai" || m.text !== messages[0].text), { sender: "user", text: userMessage }].map(m => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text
            }))
          ],
          temperature: 0.2,
          top_p: 0.9,
          max_tokens: 1000,
          return_images: false,
          search_domain_filter: ["perplexity.ai"],
          search_recency_filter: "month",
          frequency_penalty: 1,
          presence_penalty: 0
        }),
      });

      if (!response.ok) {
        const errMsg = await response.text();
        throw new Error(errMsg);
      }

      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content?.trim();
      setMessages(msgs =>
        [...msgs, { sender: "ai", text: content || "I'm sorry, I didn't understand that." }]
      );
    } catch (e: any) {
      setMessages(msgs =>
        [...msgs, { sender: "ai", text: "❌ Sorry, I couldn't get a response. Please check your API key or try again later." }]
      );
      setError(e?.message || "Unknown error.");
    }
    setLoading(false);
  }

  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSend();
    }
  }

  function handleSaveKey() {
    if (/^sk-/.test(apiKeyInput.trim())) {
      setApiKey(apiKeyInput.trim());
      storeAPIKey(apiKeyInput.trim());
      setApiKeyInput("");
      setError(null);
    } else {
      setError("Please enter a valid Perplexity API key starting with sk-");
    }
  }

  // Reset chat on dialog close
  function handleClose(openNow: boolean) {
    setOpen(openNow);
    if (!openNow) {
      setTimeout(() => {
        setMessages([
          { sender: "ai", text: "👋 Hey! I'm your AI Study Assistant. Ask me anything—study help, summaries, explanations, ideas, motivation and more!" }
        ]);
        setInput("");
        setError(null);
      }, 250);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
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
          <DialogTitle>
            <span className="flex items-center gap-2">
              <Bot className="text-indigo-700" size={22} />
              AI Study Assistant
            </span>
          </DialogTitle>
          <DialogDescription>
            Ask anything about your studies—answers, explanations, summaries, brainstorming, and more.
          </DialogDescription>
        </DialogHeader>
        {/* API Key Input if not set */}
        {!apiKey && (
          <div className="flex flex-col gap-2 px-5 pb-3 pt-2">
            <label className="font-medium text-indigo-700 text-sm">Paste your Perplexity API key to unlock AI chat:</label>
            <input
              className="border rounded px-2 py-1 text-sm"
              placeholder="sk-..."
              value={apiKeyInput}
              onChange={e => setApiKeyInput(e.target.value)}
            />
            <Button onClick={handleSaveKey} size="sm">Save Key</Button>
            <span className="text-xs text-indigo-400">Get a free API key at <a href="https://www.perplexity.ai/account/api" target="_blank" className="underline">perplexity.ai</a></span>
            {error && <span className="text-xs text-red-500">{error}</span>}
          </div>
        )}
        {/* Chat Messages */}
        <div className="flex flex-col px-5 pt-2 pb-4 min-h-[260px] max-h-[340px] overflow-y-auto bg-slate-50 rounded-t">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-2 w-full flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[76%] px-3 py-2 rounded-xl ${
                  msg.sender === "user"
                    ? "bg-sky-100 text-sky-800 self-end"
                    : "bg-white text-indigo-900 border border-indigo-100 self-start flex items-center gap-1"
                } text-sm break-words`}
              >
                {msg.sender === "ai" && <Bot size={14} className="mr-1 text-indigo-400" />}
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Input */}
        <div className="flex items-center border-t border-indigo-100 px-5 py-2 gap-2 bg-white rounded-b">
          <input
            className="flex-1 py-1 px-2 border rounded focus:outline-none text-sm"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={apiKey ? "Type your message..." : "Enter API key first..."}
            onKeyDown={handleEnter}
            disabled={loading || !apiKey}
          />
          <Button size="sm" onClick={handleSend} disabled={loading || !input.trim() || !apiKey}>
            <Send size={16} className={loading ? "animate-spin" : ""} />
          </Button>
        </div>
        {error && apiKey && <div className="text-xs text-red-600 px-5 py-1">{error}</div>}
      </DialogContent>
    </Dialog>
  );
}
