import React, { useRef, useState, useEffect, ReactNode } from "react";
import { Clock, Play, Pause, RotateCcw, Sprout, Calendar as CalendarIcon, BarChart3, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useFocusSessions } from "@/hooks/useFocusSessions";
import { useToast } from "@/hooks/use-toast";
import { useBackgroundTimer } from "@/hooks/useBackgroundTimer";
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";

function formatTime(sec: number) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// Plant growth stages based on progress
const getPlantStage = (progressPercentage: number) => {
  if (progressPercentage < 25) return "seed";
  if (progressPercentage < 50) return "sprout";
  if (progressPercentage < 75) return "sapling";
  return "tree";
};

// Plant SVG component with growth animation
const PlantVisualization = ({ progress, isRunning }: { progress: number; isRunning: boolean }) => {
  const stage = getPlantStage(progress);
  
  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="url(#backgroundGradient)"
          className="drop-shadow-lg"
        />
        
        {/* Progress ring */}
        <circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke="#6366f1"
          strokeWidth="6"
          strokeDasharray={`${(progress / 100) * 534.07} 534.07`}
          strokeLinecap="round"
          transform="rotate(-90 100 100)"
          className="transition-all duration-500"
        />
        
        {/* Soil */}
        <ellipse
          cx="100"
          cy="140"
          rx="40"
          ry="15"
          fill="#8b4513"
          className="drop-shadow-sm"
        />
        
        {/* Plant stages */}
        {stage === "seed" && (
          <circle
            cx="100"
            cy="135"
            r="3"
            fill="#654321"
            className={isRunning ? "animate-pulse" : ""}
          />
        )}
        
        {stage === "sprout" && (
          <g className={isRunning ? "animate-bounce" : ""}>
            <line x1="100" y1="135" x2="100" y2="120" stroke="#22c55e" strokeWidth="3" />
            <circle cx="95" cy="118" r="2" fill="#22c55e" />
            <circle cx="105" cy="118" r="2" fill="#22c55e" />
          </g>
        )}
        
        {stage === "sapling" && (
          <g className={isRunning ? "animate-pulse" : ""}>
            <line x1="100" y1="135" x2="100" y2="100" stroke="#16a34a" strokeWidth="4" />
            <path d="M85 110 Q100 95 115 110" fill="#22c55e" />
            <path d="M90 120 Q100 110 110 120" fill="#16a34a" />
          </g>
        )}
        
        {stage === "tree" && (
          <g className={isRunning ? "animate-pulse" : ""}>
            <line x1="100" y1="135" x2="100" y2="80" stroke="#15803d" strokeWidth="6" />
            <circle cx="100" cy="75" r="25" fill="#22c55e" className="drop-shadow-md" />
            <circle cx="85" cy="85" r="15" fill="#16a34a" />
            <circle cx="115" cy="85" r="15" fill="#16a34a" />
            <circle cx="100" cy="60" r="12" fill="#22c55e" />
          </g>
        )}
        
        {/* Sparkles for completed sessions */}
        {progress === 100 && (
          <g className="animate-ping">
            <circle cx="70" cy="60" r="2" fill="#fbbf24" />
            <circle cx="130" cy="70" r="2" fill="#fbbf24" />
            <circle cx="120" cy="50" r="2" fill="#fbbf24" />
          </g>
        )}
        
        <defs>
          <radialGradient id="backgroundGradient" cx="50%" cy="30%">
            <stop offset="0%" stopColor="#f0f9ff" />
            <stop offset="100%" stopColor="#e0f2fe" />
          </radialGradient>
        </defs>
      </svg>
      
      {/* Growth stage indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">
          {stage === "seed" && "🌱 Seed"}
          {stage === "sprout" && "🌿 Sprout"}
          {stage === "sapling" && "🌳 Sapling"}
          {stage === "tree" && "🌲 Tree"}
        </Badge>
      </div>
    </div>
  );
};

export default function FocusTimer() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { sessions, saveSession, getTotalFocusTime, getMonthlyStats } = useFocusSessions();
  const { toast } = useToast();
  
  // Use background timer hook
  const {
    timer,
    initialTime,
    isRunning,
    mode,
    sessionStartTime,
    focusMinutes,
    breakMinutes,
    progressPercentage,
    start,
    pause,
    reset,
    switchMode,
    updateSettings
  } = useBackgroundTimer();

  // Complete session handler
  const completeSession = async () => {
    if (sessionStartTime) {
      const durationMinutes = Math.ceil(initialTime / 60);
      await saveSession({
        session_type: mode,
        duration_minutes: durationMinutes,
        completed: true,
        session_date: new Date().toISOString().split('T')[0]
      });
      
      toast({
        title: "Session Complete! 🌱",
        description: `Great job! Your ${mode === "work" ? "focus" : "break"} session is finished.`,
      });
      
      // Auto-switch mode after completion
      const nextMode = mode === "work" ? "break" : "work";
      switchMode(nextMode);
    }
  };

  // Handler functions that use the background timer
  const handleStart = () => {
    start(completeSession);
  };

  const handlePause = async () => {
    pause();
    
    // Save partial session if there was progress
    if (sessionStartTime && timer < initialTime) {
      const durationMinutes = Math.ceil((initialTime - timer) / 60);
      saveSession({
        session_type: mode,
        duration_minutes: durationMinutes,
        completed: false,
        session_date: new Date().toISOString().split('T')[0]
      });
    }
  };

  const handleReset = () => {
    reset();
  };

  const handleSwitchMode = (newMode: "work" | "break") => {
    switchMode(newMode);
  };

  const handleSettingsChange = (newFocusMinutes: number, newBreakMinutes: number) => {
    updateSettings(newFocusMinutes, newBreakMinutes);
  };

  // Get stats for selected date
  const selectedDateSessions = sessions.filter(
    session => session.session_date === format(selectedDate, 'yyyy-MM-dd')
  );
  
  const todayFocusTime = getTotalFocusTime(format(new Date(), 'yyyy-MM-dd'));
  const selectedDateFocusTime = getTotalFocusTime(format(selectedDate, 'yyyy-MM-dd'));

  // Weekly stats
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
  
  const weeklyData = weekDays.map(day => ({
    day: format(day, 'EEE'),
    minutes: getTotalFocusTime(format(day, 'yyyy-MM-dd'))
  }));

  // Monthly stats using the hook function
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyStats = getMonthlyStats(currentYear, currentMonth);

  // Local state for settings dialog
  const [tempFocusMinutes, setTempFocusMinutes] = useState(focusMinutes);
  const [tempBreakMinutes, setTempBreakMinutes] = useState(breakMinutes);

  // Update temp settings when actual settings change
  useEffect(() => {
    setTempFocusMinutes(focusMinutes);
    setTempBreakMinutes(breakMinutes);
  }, [focusMinutes, breakMinutes]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="timer" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="timer" className="flex items-center gap-2">
            <Sprout className="w-4 h-4" />
            Timer
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Stats
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timer" className="space-y-6">
          <div className="flex flex-col items-center p-6 bg-gradient-to-br from-indigo-50 to-sky-50 rounded-2xl border border-indigo-200 shadow-lg min-h-[600px] w-full max-w-md mx-auto">
            {/* Header with Settings */}
            <div className="flex items-center justify-between w-full mb-4">
              <div className="flex items-center gap-2">
                <Sprout className="text-indigo-600" size={24} />
                <h3 className="font-semibold text-indigo-800 text-lg">
                  {mode === "work" ? "Start planting today!" : "Take a rest!"}
                </h3>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-indigo-600 hover:bg-indigo-100">
                    <Settings className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Timer Settings</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="focus-time">Focus Time (minutes)</Label>
                      <Input
                        id="focus-time"
                        type="number"
                        min="1"
                        max="120"
                        value={tempFocusMinutes}
                        onChange={(e) => setTempFocusMinutes(parseInt(e.target.value) || 25)}
                        onBlur={() => handleSettingsChange(tempFocusMinutes, tempBreakMinutes)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="break-time">Break Time (minutes)</Label>
                      <Input
                        id="break-time"
                        type="number"
                        min="1"
                        max="30"
                        value={tempBreakMinutes}
                        onChange={(e) => setTempBreakMinutes(parseInt(e.target.value) || 5)}
                        onBlur={() => handleSettingsChange(tempFocusMinutes, tempBreakMinutes)}
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Mode Switcher */}
            <div className="flex gap-2 mb-6">
              <Button
                variant={mode === "work" ? "default" : "outline"}
                onClick={() => handleSwitchMode("work")}
                className={mode === "work" ? "bg-indigo-600 hover:bg-indigo-700" : "border-indigo-300 text-indigo-700 hover:bg-indigo-50"}
              >
                <Sprout className="w-4 h-4 mr-1" />
                Study ({focusMinutes}m)
              </Button>
              <Button
                variant={mode === "break" ? "default" : "outline"}
                onClick={() => handleSwitchMode("break")}
                className={mode === "break" ? "bg-indigo-600 hover:bg-indigo-700" : "border-indigo-300 text-indigo-700 hover:bg-indigo-50"}
              >
                <Clock className="w-4 h-4 mr-1" />
                Break ({breakMinutes}m)
              </Button>
            </div>

            {/* Plant Visualization */}
            <PlantVisualization progress={progressPercentage} isRunning={isRunning} />

            {/* Progress Bar */}
            <div className="w-full mb-4">
              <Progress 
                value={progressPercentage} 
                className="h-3 bg-indigo-100" 
              />
            </div>

            {/* Timer Display */}
            <div className="text-6xl font-mono text-indigo-800 mb-6 tracking-wide">
              {formatTime(timer)}
            </div>

            {/* Control Buttons */}
            <div className="flex gap-3">
              {!isRunning ? (
                <Button 
                  onClick={handleStart} 
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg font-medium rounded-xl shadow-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Plant
                </Button>
              ) : (
                <Button 
                  onClick={handlePause} 
                  size="lg"
                  variant="outline"
                  className="border-indigo-600 text-indigo-700 hover:bg-indigo-50 px-8 py-3 text-lg font-medium rounded-xl"
                >
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </Button>
              )}
              
              <Button 
                onClick={handleReset}
                size="lg"
                variant="outline"
                className="border-indigo-300 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-xl"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>

            {/* Session Info */}
            <div className="mt-4 text-center text-indigo-700 text-sm">
              {mode === "work" 
                ? `${focusMinutes} min focus session - grow your knowledge tree!` 
                : `${breakMinutes} min break - let your mind rest and recharge!`
              }
            </div>

            {/* Today's Progress */}
            <div className="mt-4 p-3 bg-white/60 rounded-lg border border-indigo-200 w-full">
              <div className="text-center">
                <p className="text-sm text-indigo-700 font-medium">Today's Focus Time</p>
                <p className="text-2xl font-bold text-indigo-800">{todayFocusTime} min</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {format(selectedDate, 'MMMM d, yyyy')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-indigo-50 rounded-lg">
                <p className="text-sm text-indigo-700 font-medium">Focus Time</p>
                <p className="text-3xl font-bold text-indigo-800">{selectedDateFocusTime} min</p>
              </div>
              
              {selectedDateSessions.length > 0 ? (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Sessions</h4>
                  {selectedDateSessions.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        {session.session_type === 'work' ? (
                          <Sprout className="w-4 h-4 text-indigo-600" />
                        ) : (
                          <Clock className="w-4 h-4 text-blue-600" />
                        )}
                        <span className="text-sm capitalize">{session.session_type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{session.duration_minutes} min</span>
                        {session.completed && (
                          <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">
                            ✓
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  No sessions recorded for this date
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Today's Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center p-4 bg-indigo-50 rounded-lg">
                    <p className="text-2xl font-bold text-indigo-800">{todayFocusTime}</p>
                    <p className="text-sm text-indigo-600">minutes focused</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-800">
                      {sessions.filter(s => 
                        s.session_date === format(new Date(), 'yyyy-MM-dd') && 
                        s.completed && 
                        s.session_type === 'work'
                      ).length}
                    </p>
                    <p className="text-sm text-blue-600">sessions completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weeklyData.map((day, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{day.day}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500 transition-all duration-300"
                            style={{ width: `${Math.min((day.minutes / 120) * 100, 100)}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-12 text-right">{day.minutes}m</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Monthly Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-800">{monthlyStats.totalMinutes}</p>
                    <p className="text-sm text-purple-600">total minutes</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <p className="text-2xl font-bold text-orange-800">
                      {monthlyStats.totalSessions}
                    </p>
                    <p className="text-sm text-orange-600">sessions completed</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-800">
                      {monthlyStats.averageSession}
                    </p>
                    <p className="text-sm text-green-600">avg. session length</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievement Badges */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className={`text-center p-4 rounded-lg border-2 ${todayFocusTime >= 25 ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="text-2xl mb-2">🌱</div>
                  <p className="text-sm font-medium">First Sprout</p>
                  <p className="text-xs text-gray-600">25 min today</p>
                </div>
                <div className={`text-center p-4 rounded-lg border-2 ${todayFocusTime >= 60 ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="text-2xl mb-2">🌿</div>
                  <p className="text-sm font-medium">Growing Strong</p>
                  <p className="text-xs text-gray-600">1 hour today</p>
                </div>
                <div className={`text-center p-4 rounded-lg border-2 ${monthlyStats.totalMinutes >= 300 ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="text-2xl mb-2">🌳</div>
                  <p className="text-sm font-medium">Forest Builder</p>
                  <p className="text-xs text-gray-600">5 hours this month</p>
                </div>
                <div className={`text-center p-4 rounded-lg border-2 ${monthlyStats.totalSessions >= 20 ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="text-2xl mb-2">🏆</div>
                  <p className="text-sm font-medium">Consistency King</p>
                  <p className="text-xs text-gray-600">20 sessions this month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-indigo-600" />
                Focus Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                modifiers={{
                  hasSessions: sessions
                    .filter(s => s.completed && s.session_type === 'work')
                    .map(s => new Date(s.session_date))
                }}
                modifiersStyles={{
                  hasSessions: {
                    backgroundColor: '#6366f1',
                    color: 'white',
                    fontWeight: 'bold'
                  }
                }}
                className="rounded-md border"
              />
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-3 h-3 bg-indigo-500 rounded"></div>
                <span>Days with completed focus sessions</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}