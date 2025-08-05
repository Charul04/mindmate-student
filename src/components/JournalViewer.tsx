import React, { useState } from "react";
import { useJournals } from "@/hooks/useJournals";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Trash2, Calendar, Clock } from "lucide-react";
import { format, parseISO } from "date-fns";

export default function JournalViewer() {
  const { journals, loading, deleteJournal } = useJournals();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  const filteredJournals = journals
    .filter(journal => 
      journal.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.entry_date);
      const dateB = new Date(b.entry_date);
      return sortBy === "newest" ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this journal entry?")) {
      await deleteJournal(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">All Journal Entries</h2>
          <p className="text-muted-foreground">
            {journals.length} total {journals.length === 1 ? 'entry' : 'entries'}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
          
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as "newest" | "oldest")}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="text-muted-foreground">Loading your journals...</div>
        </div>
      ) : filteredJournals.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">
            {searchTerm ? "No entries match your search" : "No journal entries found"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJournals.map((journal) => (
            <div key={journal.id} className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(parseISO(journal.entry_date), "MMM d, yyyy")}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {format(new Date(journal.created_at), "h:mm a")}
                    </Badge>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(journal.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap text-foreground leading-relaxed">
                    {journal.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}