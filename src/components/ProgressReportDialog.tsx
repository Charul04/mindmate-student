import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Target, Heart, CheckCircle, Clock, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { format, startOfWeek, endOfWeek, subDays, eachDayOfInterval } from "date-fns";
import { useTranslation } from "react-i18next";

interface ProgressData {
  goals: any[];
  moods: any[];
  habits: any[];
  habitEntries: any[];
  pomodoroSessions: any[];
  tasks: any[];
  journals: any[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'];

export default function ProgressReportDialog({ 
  triggerClassName = "w-full"
}: { 
  triggerClassName?: string 
}) {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [data, setData] = useState<ProgressData>({
    goals: [],
    moods: [],
    habits: [],
    habitEntries: [],
    pomodoroSessions: [],
    tasks: [],
    journals: []
  });
  const [loading, setLoading] = useState(false);

  const fetchProgressData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const [
        goalsResult,
        moodsResult,
        habitsResult,
        habitEntriesResult,
        pomodoroResult,
        tasksResult,
        journalsResult
      ] = await Promise.all([
        supabase.from('goals').select('*').eq('user_id', user.id),
        supabase.from('mood_entries').select('*').eq('user_id', user.id).order('entry_date', { ascending: true }),
        supabase.from('habits').select('*').eq('user_id', user.id),
        supabase.from('habit_entries').select('*').eq('user_id', user.id).order('entry_date', { ascending: true }),
        supabase.from('pomodoro_sessions').select('*').eq('user_id', user.id).order('session_date', { ascending: true }),
        supabase.from('daily_planner_tasks').select('*').eq('user_id', user.id).order('task_date', { ascending: true }),
        supabase.from('journals').select('*').eq('user_id', user.id).order('entry_date', { ascending: true })
      ]);

      setData({
        goals: goalsResult.data || [],
        moods: moodsResult.data || [],
        habits: habitsResult.data || [],
        habitEntries: habitEntriesResult.data || [],
        pomodoroSessions: pomodoroResult.data || [],
        tasks: tasksResult.data || [],
        journals: journalsResult.data || []
      });
    } catch (error) {
      console.error('Error fetching progress data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Prepare chart data
  const prepareMoodTrendData = () => {
    const last7Days = eachDayOfInterval({
      start: subDays(new Date(), 6),
      end: new Date()
    });

    return last7Days.map(day => {
      const dayStr = format(day, 'yyyy-MM-dd');
      const moodEntry = data.moods.find(m => m.entry_date === dayStr);
      const moodValue = moodEntry ? 
        (moodEntry.mood === 'excellent' ? 5 : 
         moodEntry.mood === 'good' ? 4 : 
         moodEntry.mood === 'neutral' ? 3 : 
         moodEntry.mood === 'low' ? 2 : 1) : 0;
      
      return {
        date: format(day, 'MMM dd'),
        mood: moodValue,
        energy: moodEntry?.energy_level || 0
      };
    });
  };

  const prepareHabitCompletionData = () => {
    const habitStats = data.habits.map(habit => {
      const entries = data.habitEntries.filter(e => e.habit_id === habit.id);
      const totalDays = entries.length;
      const completedDays = entries.filter(e => e.completed_count > 0).length;
      const completionRate = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;
      
      return {
        name: habit.name,
        completion: completionRate,
        streak: calculateStreak(entries)
      };
    });
    
    return habitStats;
  };

  const calculateStreak = (entries: any[]) => {
    let streak = 0;
    const sortedEntries = [...entries].sort((a, b) => new Date(b.entry_date).getTime() - new Date(a.entry_date).getTime());
    
    for (const entry of sortedEntries) {
      if (entry.completed_count > 0) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const prepareFocusTimeData = () => {
    const last7Days = eachDayOfInterval({
      start: subDays(new Date(), 6),
      end: new Date()
    });

    return last7Days.map(day => {
      const dayStr = format(day, 'yyyy-MM-dd');
      const sessions = data.pomodoroSessions.filter(s => s.session_date === dayStr && s.completed);
      const totalMinutes = sessions.reduce((sum, s) => sum + s.duration_minutes, 0);
      
      return {
        date: format(day, 'MMM dd'),
        minutes: totalMinutes,
        sessions: sessions.length
      };
    });
  };

  const prepareGoalProgressData = () => {
    return data.goals.map(goal => ({
      name: goal.title,
      progress: goal.target_value > 0 ? Math.round((goal.current_value / goal.target_value) * 100) : 0,
      target: goal.target_value,
      current: goal.current_value
    }));
  };

  const calculateOverallStats = () => {
    const totalGoals = data.goals.length;
    const completedGoals = data.goals.filter(g => g.current_value >= g.target_value).length;
    const totalTasks = data.tasks.length;
    const completedTasks = data.tasks.filter(t => t.completed).length;
    const totalFocusTime = data.pomodoroSessions.filter(s => s.completed).reduce((sum, s) => sum + s.duration_minutes, 0);
    const journalDays = data.journals.length;

    return {
      goalCompletion: totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0,
      taskCompletion: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      totalFocusHours: Math.round(totalFocusTime / 60),
      journalStreak: journalDays
    };
  };

  const stats = calculateOverallStats();
  const moodData = prepareMoodTrendData();
  const habitData = prepareHabitCompletionData();
  const focusData = prepareFocusTimeData();
  const goalData = prepareGoalProgressData();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button 
          className={triggerClassName}
          onClick={fetchProgressData}
        >
          <div className="flex flex-col items-start h-full">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-100 to-pink-100">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-indigo-900 mb-1">Progress Report</h3>
              <p className="text-sm text-indigo-700 leading-relaxed">
                View detailed analytics and insights from your productivity data
              </p>
            </div>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Your Progress Report
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="mood">Mood & Energy</TabsTrigger>
              <TabsTrigger value="habits">Habits & Goals</TabsTrigger>
              <TabsTrigger value="focus">Focus & Tasks</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Goal Completion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-green-600" />
                      <span className="text-2xl font-bold">{stats.goalCompletion}%</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Task Completion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span className="text-2xl font-bold">{stats.taskCompletion}%</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Focus Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-600" />
                      <span className="text-2xl font-bold">{stats.totalFocusHours}</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Journal Entries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-orange-600" />
                      <span className="text-2xl font-bold">{stats.journalStreak}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Focus Time</CardTitle>
                  <CardDescription>Your daily focus session minutes over the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={focusData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="minutes" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mood" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Mood & Energy Trends</CardTitle>
                  <CardDescription>Track your mood and energy levels over the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={moodData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="mood" stroke="#82ca9d" name="Mood (1-5)" />
                      <Line type="monotone" dataKey="energy" stroke="#8884d8" name="Energy (1-10)" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="habits" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Habit Completion Rates</CardTitle>
                    <CardDescription>Your habit consistency over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={habitData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="completion" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Goal Progress</CardTitle>
                    <CardDescription>Current progress towards your goals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={goalData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="progress" fill="#ffc658" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="focus" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Focus Sessions</CardTitle>
                  <CardDescription>Number of completed focus sessions per day</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={focusData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sessions" fill="#ff7300" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}