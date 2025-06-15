import React, { useState, useRef } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Speaker } from "lucide-react";

type VoiceState = "idle" | "recording" | "thinking" | "speaking" | "error";

async function queryPerplexity(text: string): Promise<string> {
  const apiKey = localStorage.getItem("pplx_api_key");
  if (!apiKey) {
    return "⚠️ Please add your Perplexity API key in the regular AI chat first.";
  }
  const response = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.1-sonar-small-128k-online",
      messages: [
        { role: "system", content: "Reply friendly and concisely for a student. You are a Voice AI Companion." },
        { role: "user", content: text }
      ],
      temperature: 0.2,
      top_p: 0.9,
      max_tokens: 350,
      return_images: false
    }),
  });
  if (!response.ok) {
    return "❌ Error contacting Perplexity API";
  }
  const data = await response.json();
  return data?.choices?.[0]?.message?.content?.trim() || "⚠️ No response from AI";
}

// Helper for browser-based speech synthesis (TTS)
function speak(text: string, onEnd: () => void) {
  if ("speechSynthesis" in window) {
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.onend = onEnd;
    utter.rate = 1;
    utter.pitch = 1;
    window.speechSynthesis.speak(utter);
  } else {
    onEnd();
  }
}

// Helper for browser speech recognition (STT)
function getSpeechRecognition(): any | null {
  const w = window as any;
  return w.SpeechRecognition ? new w.SpeechRecognition() :
         w.webkitSpeechRecognition ? new w.webkitSpeechRecognition() :
         null;
}

export default function VoiceAiCompanionDialog({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false);
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [userText, setUserText] = useState("");
  const [aiReply, setAiReply] = useState("");
  const recognitionRef = useRef<any | null>(null);

  // Start voice recording and STT
  const startRecording = () => {
    const rec = getSpeechRecognition();
    if (!rec) {
      setVoiceState("error");
      setUserText("Speech recognition not supported in this browser.");
      return;
    }
    setVoiceState("recording");
    rec.lang = "en-US";
    rec.continuous = false;
    rec.interimResults = false;
    rec.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setUserText(transcript);
      setVoiceState("thinking");
      fetchAiResponse(transcript);
    };
    rec.onerror = () => {
      setUserText("Could not process speech.");
      setVoiceState("idle");
    };
    rec.onend = () => {
      if (voiceState === "recording") setVoiceState("idle");
    };
    recognitionRef.current = rec;
    rec.start();
  };

  // Stop voice recording
  const stopRecording = () => {
    recognitionRef.current?.stop();
    setVoiceState("idle");
  };

  // Query AI and speak reply
  const fetchAiResponse = async (q: string) => {
    setAiReply("");
    setVoiceState("thinking");
    const reply = await queryPerplexity(q);
    setAiReply(reply);
    setVoiceState("speaking");
    speak(reply, () => setVoiceState("idle"));
  };

  // Let user playback AI reply
  const handleReplay = () => {
    if (aiReply) {
      setVoiceState("speaking");
      speak(aiReply, () => setVoiceState("idle"));
    }
  };

  // Reset when dialog closed
  const handleOpenChange = (v: boolean) => {
    setOpen(v);
    if (!v) {
      setVoiceState("idle");
      setUserText("");
      setAiReply("");
      recognitionRef.current?.stop?.();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className={triggerClassName ?? "group flex flex-col items-start bg-white/70 rounded-xl border border-indigo-100 p-5 md:p-6 shadow-sm hover:shadow-lg transition-shadow hover:scale-105 focus:ring-2 focus:ring-sky-200 w-full min-h-[104px] text-left"}>
          <span className="flex items-center mb-2">
            <Mic className="text-indigo-700" size={28} />
            <span className="font-semibold text-indigo-900 text-[1.08rem] ml-2">Voice AI Companion</span>
          </span>
          <span className="text-indigo-900/70 text-sm mt-1">
            Talk to the dashboard! Press mic & ask your question by voice.
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md w-full p-0 md:rounded-xl shadow-lg flex flex-col" style={{ minHeight: 400 }}>
        <DialogHeader className="px-4 pt-3 pb-1">
          <DialogTitle>
            <span className="flex items-center gap-2">
              <Mic size={20} className="text-indigo-700" />
              <span className="text-base font-medium">Voice-based AI Companion</span>
            </span>
          </DialogTitle>
          <DialogDescription>
            Ask anything by voice & get answers read aloud to you.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 px-4 pt-3 pb-4">
          {/* Recording/idle/controls */}
          <div className="flex flex-col gap-2 items-center">
            <Button
              variant={voiceState === "recording" ? "destructive" : "default"}
              size="lg"
              className="rounded-full w-16 h-16 flex items-center justify-center text-2xl"
              onClick={
                voiceState === "recording"
                  ? stopRecording
                  : startRecording
              }
              aria-label={voiceState === "recording" ? "Stop recording" : "Start recording"}
            >
              {voiceState === "recording" ? <MicOff size={32} /> : <Mic size={32} />}
            </Button>
            <span className={
              "mt-1 text-xs " +
              (voiceState === "recording"
                ? "text-red-500"
                : voiceState === "thinking"
                  ? "text-sky-700"
                  : "text-gray-400")
            }>
              {voiceState === "recording"
                ? "Listening..."
                : voiceState === "thinking"
                  ? "Thinking..."
                  : voiceState === "speaking"
                    ? "Speaking..."
                    : "Tap mic and ask your question"}
            </span>
          </div>
          {/* transcript & ai reply */}
          <div className="rounded bg-slate-50 px-3 py-2 min-h-[38px] text-indigo-900">{userText}</div>
          {!!aiReply && (
            <div className="rounded bg-indigo-50 border border-indigo-100 px-3 py-2 min-h-[38px] text-sky-900 flex items-start gap-2">
              <Speaker size={20} className="text-sky-500 mt-1" />
              <span>{aiReply}</span>
            </div>
          )}
          {!!aiReply && (
            <Button variant="ghost" size="sm" onClick={handleReplay}>
              <Speaker size={18} className="mr-1" />
              Replay Response
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
