
import React, { useState } from "react";
import JournalCalendar from "@/components/JournalCalendar";
import JournalEditor from "@/components/JournalEditor";
import JournalViewer from "@/components/JournalViewer";
import { useJournals } from "@/hooks/useJournals";
import { Button } from "@/components/ui/button";
import { PenLine, Calendar, BookOpen } from "lucide-react";

export default function JournalPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<'calendar' | 'write' | 'browse'>('calendar');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              My Journal
            </h1>
            <p className="text-muted-foreground">Capture your thoughts, track your journey</p>
          </div>

          {/* Navigation */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-white/20">
              <Button
                variant={view === 'calendar' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('calendar')}
                className="flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                Calendar
              </Button>
              <Button
                variant={view === 'write' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('write')}
                className="flex items-center gap-2"
              >
                <PenLine className="h-4 w-4" />
                Write
              </Button>
              <Button
                variant={view === 'browse' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('browse')}
                className="flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Browse
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            {view === 'calendar' && (
              <JournalCalendar 
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                onWriteClick={() => setView('write')}
              />
            )}
            {view === 'write' && (
              <div className="p-6">
                <JournalEditor selectedDate={selectedDate} />
              </div>
            )}
            {view === 'browse' && (
              <div className="p-6">
                <JournalViewer />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
