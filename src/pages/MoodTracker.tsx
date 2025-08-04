
import { Layout } from "@/components/layout";
import { useState, useEffect } from "react";
import { BarChart2, Calendar, Plus, ArrowRight, Info, Save, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MoodEntry {
  id: string;
  mood: string;
  note: string;
  activity: string;
  date: string;
  timestamp: number;
}

const moods = [
  { emoji: "😊", label: "Happy", value: 5 },
  { emoji: "😌", label: "Calm", value: 4 },
  { emoji: "😐", label: "Neutral", value: 3 },
  { emoji: "😔", label: "Sad", value: 2 },
  { emoji: "😡", label: "Angry", value: 1 },
];

const activities = [
  "Work",
  "Family",
  "Friends",
  "Exercise",
  "Sleep",
  "Food",
  "Relaxation",
  "Entertainment",
  "Social Media",
  "Other",
];

const MoodTracker = () => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");
  const [activity, setActivity] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
      
      // Load mood entries for this user
      const storedEntries = JSON.parse(localStorage.getItem(`moodEntries_${JSON.parse(userData).id}`) || "[]");
      setEntries(storedEntries);
    }
  }, []);

  const handleSaveMood = () => {
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        description: "Choose an emoji that best represents how you feel.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to track your mood.",
        variant: "destructive",
      });
      return;
    }

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood: selectedMood,
      note,
      activity,
      date: new Date().toISOString(),
      timestamp: Date.now(),
    };

    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    
    // Save to localStorage
    localStorage.setItem(`moodEntries_${user.id}`, JSON.stringify(updatedEntries));

    toast({
      title: "Mood saved!",
      description: "Your mood has been successfully recorded.",
    });

    // Reset form
    setSelectedMood("");
    setNote("");
    setActivity("");
    setShowForm(false);
  };

  // Prepare data for chart
  const chartData = entries
    .slice(-14) // Last 14 entries
    .map((entry) => {
      const moodValue = moods.find((m) => m.emoji === entry.mood)?.value || 3;
      return {
        date: new Date(entry.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        mood: moodValue,
        moodEmoji: entry.mood,
      };
    });

  return (
    <Layout>
      <div className="page-container">
        <header className="mb-8 text-center">
          <span className="inline-block px-3 py-1 bg-mind-100 dark:bg-mind-900/30 text-mind-700 dark:text-mind-400 rounded-full text-sm font-medium mb-4">
            <BarChart2 className="inline-block w-4 h-4 mr-2" />
            Mood Tracker
          </span>
          <h1 className="section-title">Track Your Mood Journey</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Log your emotions daily to discover patterns and gain insights into your mental wellbeing.
          </p>
        </header>

        {!user ? (
          <div className="glass-card p-8 text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Login to Track Your Mood</h2>
            <p className="text-muted-foreground mb-6">
              Create an account or log in to start tracking your mood journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className="btn-primary">
                Sign In
              </Link>
              <Link to="/signup" className="btn-ghost">
                Create Account
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Mood Entry Form */}
            <div className="mb-12">
              {!showForm ? (
                <button
                  onClick={() => setShowForm(true)}
                  className="glass-card p-6 hover:bg-primary/5 transition-all duration-300 flex items-center justify-center gap-3 text-lg font-medium w-full max-w-xl mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  <span>Log Your Current Mood</span>
                </button>
              ) : (
                <div className="glass-card p-6 max-w-xl mx-auto animate-scale-in">
                  <h2 className="text-xl font-bold mb-4">How are you feeling right now?</h2>
                  
                  <div className="flex justify-between mb-6">
                    {moods.map((mood) => (
                      <button
                        key={mood.label}
                        className={`emoji-btn ${selectedMood === mood.emoji ? "selected" : ""}`}
                        onClick={() => setSelectedMood(mood.emoji)}
                        aria-label={mood.label}
                      >
                        <span role="img" aria-label={mood.label}>
                          {mood.emoji}
                        </span>
                      </button>
                    ))}
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label htmlFor="activity" className="block text-sm font-medium mb-1">
                        What are you doing?
                      </label>
                      <select
                        id="activity"
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                        className="input-field"
                      >
                        <option value="">Select an activity</option>
                        {activities.map((act) => (
                          <option key={act} value={act}>
                            {act}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="note" className="block text-sm font-medium mb-1">
                        Add a note (optional)
                      </label>
                      <textarea
                        id="note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Write a few words about how you're feeling..."
                        className="input-field min-h-[100px]"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button onClick={handleSaveMood} className="btn-primary flex-1">
                      <Save className="w-4 h-4 mr-2" />
                      Save Mood
                    </button>
                    <button onClick={() => setShowForm(false)} className="btn-ghost flex-1">
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {entries.length > 0 ? (
              <>
                {/* Mood Visualization */}
                <div className="glass-card p-6 mb-8">
                  <h2 className="text-xl font-bold mb-6">Your Mood Over Time</h2>
                  <div className="h-64 sm:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="date" />
                        <YAxis
                          domain={[1, 5]}
                          ticks={[1, 2, 3, 4, 5]}
                          tickFormatter={(value) => {
                            const labels = {
                              1: "Angry",
                              2: "Sad",
                              3: "Neutral",
                              4: "Calm",
                              5: "Happy",
                            };
                            return labels[value as keyof typeof labels] || "";
                          }}
                        />
                        <Tooltip
                          formatter={(value, name) => {
                            const moodNames = {
                              1: "Angry",
                              2: "Sad",
                              3: "Neutral", 
                              4: "Calm",
                              5: "Happy",
                            };
                            return [moodNames[value as keyof typeof moodNames], "Mood"];
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="mood"
                          stroke="hsl(var(--primary))"
                          strokeWidth={3}
                          dot={{ r: 6 }}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recent Entries */}
                <div>
                  <h2 className="text-xl font-bold mb-4">Recent Entries</h2>
                  <div className="space-y-4">
                    {entries
                      .slice()
                      .reverse()
                      .slice(0, 5)
                      .map((entry) => (
                        <div key={entry.id} className="glass-card p-4 flex items-start gap-4">
                          <div className="text-3xl">{entry.mood}</div>
                          <div className="flex-grow">
                            {entry.note && <p className="mb-2">{entry.note}</p>}
                            <div className="flex flex-col sm:flex-row sm:items-center text-sm text-muted-foreground gap-2 sm:gap-4">
                              {entry.activity && (
                                <span className="flex items-center gap-1">
                                  <Info className="w-3 h-3" />
                                  {entry.activity}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(entry.date).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(entry.date).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="glass-card p-6 text-center">
                <h2 className="text-xl font-medium mb-3">No mood entries yet</h2>
                <p className="text-muted-foreground mb-4">
                  Start logging your mood to see patterns and insights over time.
                </p>
              </div>
            )}

            {/* Tips */}
            <div className="mt-12 glass-card p-6 bg-mind-50 dark:bg-mind-900/30 border-mind-200 dark:border-mind-800/50">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-mind-600" />
                Tips for Effective Mood Tracking
              </h2>
              <ul className="space-y-2 text-mind-900 dark:text-mind-100">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-mind-600" />
                  <span>Track your mood at the same times each day for consistency</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-mind-600" />
                  <span>Note what activities or events might have influenced your mood</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-mind-600" />
                  <span>Look for patterns over time rather than focusing on single entries</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-mind-600" />
                  <span>Share insights with your therapist or support system if helpful</span>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default MoodTracker;
