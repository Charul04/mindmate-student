
import React, { useState } from "react";
import { ChartLine, Plus, Target, Calendar, TrendingUp, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { useGoals } from "@/hooks/useGoals";
import { format, startOfWeek, startOfMonth, startOfYear, endOfWeek, endOfMonth, endOfYear, isWithinInterval, parseISO } from "date-fns";

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00'];

export default function GoalsTracker() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetValue, setTargetValue] = useState("");
  const [unit, setUnit] = useState("tasks");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState<"active" | "completed" | "paused">("active");
  
  const { goals, loading, addGoal, updateGoal, deleteGoal } = useGoals();

  const handleAddGoal = async () => {
    if (!title.trim()) return;
    
    await addGoal({
      title,
      description: description || undefined,
      target_value: targetValue ? parseInt(targetValue) : undefined,
      current_value: 0,
      unit,
      deadline: deadline || undefined,
      status,
    });
    
    // Reset form
    setTitle("");
    setDescription("");
    setTargetValue("");
    setUnit("tasks");
    setDeadline("");
    setStatus("active");
  };

  const handleUpdateProgress = async (goalId: string, newValue: number) => {
    await updateGoal(goalId, { current_value: newValue });
  };

  const handleToggleStatus = async (goalId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'completed' ? 'active' : 'completed';
    await updateGoal(goalId, { status: newStatus });
  };

  // Analytics data
  const getTimeBasedGoals = (period: 'week' | 'month' | 'year') => {
    const now = new Date();
    let start: Date, end: Date;
    
    switch (period) {
      case 'week':
        start = startOfWeek(now);
        end = endOfWeek(now);
        break;
      case 'month':
        start = startOfMonth(now);
        end = endOfMonth(now);
        break;
      case 'year':
        start = startOfYear(now);
        end = endOfYear(now);
        break;
    }
    
    return goals.filter(goal => {
      if (!goal.deadline) return false;
      const deadline = parseISO(goal.deadline);
      return isWithinInterval(deadline, { start, end });
    });
  };

  const chartData = [
    { period: 'Week', total: getTimeBasedGoals('week').length, completed: getTimeBasedGoals('week').filter(g => g.status === 'completed').length },
    { period: 'Month', total: getTimeBasedGoals('month').length, completed: getTimeBasedGoals('month').filter(g => g.status === 'completed').length },
    { period: 'Year', total: getTimeBasedGoals('year').length, completed: getTimeBasedGoals('year').filter(g => g.status === 'completed').length },
  ];

  const statusData = [
    { name: 'Active', value: goals.filter(g => g.status === 'active').length },
    { name: 'Completed', value: goals.filter(g => g.status === 'completed').length },
    { name: 'Paused', value: goals.filter(g => g.status === 'paused').length },
  ];

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading goals...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Create New Goal */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Create New Goal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                placeholder="Goal title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mb-2"
              />
              <Textarea
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Target"
                  value={targetValue}
                  onChange={(e) => setTargetValue(e.target.value)}
                  className="flex-1"
                />
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tasks">Tasks</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="pages">Pages</SelectItem>
                    <SelectItem value="exercises">Exercises</SelectItem>
                    <SelectItem value="days">Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input
                type="date"
                placeholder="Deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
              <Button onClick={handleAddGoal} className="w-full" disabled={!title.trim()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Goal
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Goals</p>
                <p className="text-2xl font-bold">{goals.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold">{goals.filter(g => g.status === 'completed').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold">{goals.filter(g => g.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold">{getTimeBasedGoals('month').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Progress by Period</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <RTooltip />
                <Bar dataKey="completed" fill="#22c55e" name="Completed" />
                <Bar dataKey="total" fill="#e5e7eb" name="Total" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Goals by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, value}) => value > 0 ? `${name}: ${value}` : ''}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RTooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Goals List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {goals.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No goals yet. Create your first goal above!</p>
            ) : (
              goals.map((goal) => (
                <div key={goal.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold">{goal.title}</h4>
                      {goal.description && (
                        <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant={goal.status === 'completed' ? 'default' : goal.status === 'active' ? 'secondary' : 'outline'}>
                          {goal.status}
                        </Badge>
                        {goal.deadline && (
                          <Badge variant="outline" className="text-xs">
                            <Calendar className="h-3 w-3 mr-1" />
                            {format(parseISO(goal.deadline), 'MMM dd, yyyy')}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleStatus(goal.id!, goal.status)}
                      >
                        {goal.status === 'completed' ? 'Reopen' : 'Complete'}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteGoal(goal.id!)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  {goal.target_value && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress: {goal.current_value}/{goal.target_value} {goal.unit}</span>
                        <span>{Math.round((goal.current_value / goal.target_value) * 100)}%</span>
                      </div>
                      <Progress value={(goal.current_value / goal.target_value) * 100} className="h-2" />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateProgress(goal.id!, Math.max(0, goal.current_value - 1))}
                          disabled={goal.current_value <= 0}
                        >
                          -
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateProgress(goal.id!, Math.min(goal.target_value || goal.current_value + 1, goal.current_value + 1))}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
