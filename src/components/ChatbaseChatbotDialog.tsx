import React, { useState, useEffect } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MessageSquare, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChatbaseChatbotDialog({
  triggerClassName,
  autoOpen = false
}: {
  triggerClassName?: string;
  autoOpen?: boolean;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (autoOpen) {
      setOpen(true);
    }
  }, [autoOpen]);
  return <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-hidden mx-0 my-0 px-[50px] py-[40px]">
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
          <iframe src="https://www.chatbase.co/chatbot-iframe/Sl0q4y9ILFqIdK8szW1Gv" width="100%" height="500" frameBorder="0" className="rounded-lg border border-gray-200" title="MindGuide Chatbot" />
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
    </Dialog>;
}