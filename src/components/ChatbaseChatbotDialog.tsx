import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MessageSquare, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChatbaseChatbotDialog({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false);

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
            <MessageSquare className="text-blue-600" size={28} />
            <span className="font-semibold text-indigo-900 text-[1.08rem] ml-2">MindGuide Chatbot</span>
          </span>
          <span className="text-indigo-900/70 text-sm mt-1">
            Advanced AI chatbot with specialized student support and guidance.
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            MindGuide Chatbot
          </DialogTitle>
          <DialogDescription>
            Chat with our specialized AI assistant for personalized student support and guidance.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 min-h-[500px] w-full">
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/Sl0q4y9ILFqIdK8szW1Gv"
            width="100%"
            height="500"
            frameBorder="0"
            className="rounded-lg border border-gray-200"
            title="MindGuide Chatbot"
          />
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ExternalLink className="w-4 h-4" />
            <span>Powered by Chatbase</span>
          </div>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}