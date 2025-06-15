import React, { useState, useRef } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Speaker, Sparkles } from "lucide-react";

// Voice state types
type VoiceState = "idle" | "recording" | "thinking" | "speaking" | "error";

// Query Perplexity helper (unchanged)
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

// Speech Synthesis
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

// Speech Recognition browser helper
function getSpeechRecognition(): any | null {
  const w = window as any;
  return w.SpeechRecognition ? new w.SpeechRecognition() :
         w.webkitSpeechRecognition ? new w.webkitSpeechRecognition() :
         null;
}

// Fun SVG Doodle for top of dialog
function CompanionDoodle({ mood = "idle" }: { mood?: VoiceState }) {
  // Stars animate if "speaking", mic glows if "recording"
  return (
    <div className="relative flex flex-col items-center justify-center my-2">
      <svg viewBox="0 0 110 70" width={158} height={92} aria-hidden="true" className="mb-1 select-none">
        {/* Main happy face */}
        <ellipse cx="55" cy="52" rx="42" ry="14" fill="#dbeafe" />
        <ellipse cx="55" cy="33" rx="26" ry="24" fill="#f0f9ff" stroke="#60a5fa" strokeWidth="2.3"/>
        <circle cx="43" cy="32" r="3.4" fill="#0ea5e9" />
        <circle cx="67" cy="32" r="3.4" fill="#0ea5e9" />
        <ellipse cx="55" cy="40" rx="8" ry="5" fill="#fbbf24" opacity="0.6"/>
        <path d="M48 44 Q55 51 62 44" stroke="#38bdf8" strokeWidth="2" fill="none"/>
        {/* Cheek highlight */}
        <ellipse cx="43" cy="36.3" rx="2" ry="1" fill="#60a5fa" opacity="0.27"/>
        <ellipse cx="67" cy="36.3" rx="2" ry="1" fill="#60a5fa" opacity="0.27"/>
        {/* Animated sparkle */}
        {
          mood === "speaking"
            ? (<g className="animate-pulse">
                <polygon points="93,17 96,22 101,19 98,25 104,27 97,27 96,33 94,27 87,27 92,25" fill="#a5b4fc" opacity=".9"/>
              </g>)
            : (<g>
                <polygon points="93,17 96,22 101,19 98,25 104,27 97,27 96,33 94,27 87,27 92,25"
                  fill="#a5b4fc" opacity={mood === "idle" ? ".15" : ".3"}/>
              </g>)
        }
        {/* Small sparkle always */}
        <polygon points="8,16 10,19 13,18 11,21 15,22 11,22 10,26 9,22 5,22 8,21"
          fill="#fbbf24" opacity="0.7"/>
        {/* Mic at top center */}
        <g className={mood === "recording" ? "animate-pulse" : ""}>
          <circle cx="55" cy="13" r="11" fill="#ddd6fe" opacity={mood === "recording" ? ".92" : ".7"}/>
          <Mic className={
            "absolute left-1/2 top-0 -translate-x-1/2 text-indigo-700 drop-shadow " +
            (mood === "recording" ? "animate-pulse" : "")
          } size={24} style={{
            position: "absolute",
            left: "calc(50% - 12px)",
            top: 8,
            zIndex: 2,
          }}/>
        </g>
      </svg>
      <div className="text-indigo-600 text-xs font-bold flex items-center gap-1 px-3">
        <Sparkles size={16} className="text-yellow-400" />
        Your friendly Study Buddy!
      </div>
    </div>
  );
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
        <button className={triggerClassName ?? 
            "group flex flex-col items-start bg-gradient-to-br from-sky-100 via-indigo-50 to-white rounded-xl border border-indigo-100 p-5 md:p-6 shadow-md hover:shadow-xl transition-shadow hover:scale-105 focus:ring-2 focus:ring-sky-200 w-full min-h-[104px] text-left relative"}>
          <span className="flex items-center mb-2">
            <Mic className="text-indigo-700 animate-bounce" size={28} />
            <span className="font-semibold text-indigo-900 text-[1.08rem] ml-2">Voice AI Companion</span>
          </span>
          <span className="text-indigo-900/70 text-sm mt-1 flex items-center gap-1">
            <Sparkles className="text-yellow-300" size={16} />
            Talk to the dashboard! Press mic & ask by voice.
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md w-full p-0 md:rounded-xl shadow-lg flex flex-col border-none bg-gradient-to-br from-indigo-50/90 via-white to-sky-100" style={{ minHeight: 430 }}>
        <CompanionDoodle mood={voiceState} />
        <DialogHeader className="px-4 pt-1 pb-1">
          <DialogTitle>
            <span className="flex items-center gap-2 text-[1.1rem]">
              <Mic size={20} className="text-indigo-700 animate-bounce" />
              <span className="font-semibold">Voice-based AI Companion</span>
            </span>
          </DialogTitle>
          <DialogDescription>
            <div className="flex gap-1 items-center">
              <Sparkles className="text-yellow-400" size={16}/>
              Ask anything by voice & hear custom answers!
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 px-4 pt-1 pb-5">
          {/* Recording/idle/controls */}
          <div className="flex flex-col gap-2 items-center">
            <Button
              variant={voiceState === "recording" ? "destructive" : "default"}
              size="lg"
              className={
                "rounded-full w-20 h-20 flex items-center justify-center text-2xl shadow-lg bg-gradient-to-tr from-indigo-200 via-indigo-50 to-sky-100 transition-all duration-200 " +
                (voiceState === "recording" ? "animate-pulse ring-4 ring-red-300" : "hover:scale-105")
              }
              style={{ fontSize: 36 }}
              onClick={
                voiceState === "recording"
                  ? stopRecording
                  : startRecording
              }
              aria-label={voiceState === "recording" ? "Stop recording" : "Start recording"}
            >
              {voiceState === "recording" ? <MicOff size={38} className="animate-bounce text-red-500"/> : <Mic size={38} className="animate-bounce" />}
            </Button>
            <span className={
              "mt-1 text-xs font-medium transition-all duration-200 " +
              (voiceState === "recording"
                ? "text-red-500 animate-pulse"
                : voiceState === "thinking"
                  ? "text-sky-700 animate-pulse"
                  : voiceState === "speaking"
                    ? "text-indigo-700 animate-fade-in"
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
          <div className="rounded-xl border border-sky-100 bg-white/80 px-3 py-2 min-h-[38px] text-indigo-900 text-base shadow-sm animate-fade-in flex items-center gap-2">
            {userText ? (
              <>
                <span className="inline-block font-semibold text-indigo-500"><Mic size={15} /></span>
                <span className="tracking-wide">{userText}</span>
              </>
            ) : (
              <span className="text-gray-400">Your transcript will appear here...</span>
            )}
          </div>
          {!!aiReply && (
            <div className="rounded-xl border border-indigo-100 bg-sky-50/70 px-3 py-2 min-h-[38px] text-sky-900 text-base flex items-start gap-2 animate-fade-in slide-in-right shadow">
              <Speaker size={20} className="text-sky-500 mt-1 animate-pulse" />
              <span>{aiReply}</span>
              <Sparkles size={18} className="text-yellow-400 animate-bounce mt-0.5 ml-1" />
            </div>
          )}
          {!!aiReply && (
            <Button variant="ghost" size="sm" onClick={handleReplay} className="flex items-center gap-1 animate-fade-in">
              <Speaker size={18} className="mr-1" />
              Replay Response
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
