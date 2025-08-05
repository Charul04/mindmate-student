import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useJournals } from "@/hooks/useJournals";
import { PenLine, BookOpen } from "lucide-react";
import { format, isSameDay } from "date-fns";

type Props = {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onWriteClick: () => void;
};

export default function JournalCalendar({ selectedDate, onDateSelect, onWriteClick }: Props) {
  const { journals, loading } = useJournals();

  const journalDates = journals.map(journal => new Date(journal.entry_date));
  
  const selectedDateJournals = journals.filter(journal => 
    isSameDay(new Date(journal.entry_date), selectedDate)
  );

  const modifiers = {
    hasJournal: journalDates,
  };

  const modifiersClassNames = {
    hasJournal: "bg-primary/20 text-primary font-semibold relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:transform after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full",
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Journal Calendar</h2>
            <Badge variant="secondary" className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              {journals.length} entries
            </Badge>
          </div>
          
          <div className="bg-white rounded-lg border shadow-sm p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && onDateSelect(date)}
              modifiers={modifiers}
              modifiersClassNames={modifiersClassNames}
              className="w-full"
            />
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-3 h-3 bg-primary/20 rounded border"></div>
            <span>Days with journal entries</span>
          </div>
        </div>

        {/* Selected Date Content */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              {format(selectedDate, "MMMM d, yyyy")}
            </h3>
            <Button onClick={onWriteClick} size="sm" className="flex items-center gap-2">
              <PenLine className="h-4 w-4" />
              Write Entry
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading entries...
            </div>
          ) : selectedDateJournals.length > 0 ? (
            <div className="space-y-4">
              {selectedDateJournals.map((journal) => (
                <div key={journal.id} className="bg-white rounded-lg border p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(journal.created_at), "h:mm a")}
                    </span>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-wrap text-sm">{journal.content}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <p className="text-muted-foreground mb-2">No entries for this day</p>
                <Button onClick={onWriteClick} variant="outline" size="sm">
                  Write your first entry
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}