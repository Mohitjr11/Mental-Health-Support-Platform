import { useState, useRef } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, Moon, Wind, Sunrise, BookOpen } from "lucide-react";

export default function Mindfulness() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="flex flex-col gap-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Mindfulness & Self-Care</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover guided exercises, breathing techniques, and mindfulness practices to promote relaxation and self-awareness.
            </p>
          </div>

          <Tabs defaultValue="meditation" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="meditation" className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                <span className="hidden md:inline">Meditation</span>
              </TabsTrigger>
              <TabsTrigger value="breathing" className="flex items-center gap-2">
                <Wind className="h-4 w-4" />
                <span className="hidden md:inline">Breathing</span>
              </TabsTrigger>
              <TabsTrigger value="sleep" className="flex items-center gap-2">
                <Moon className="h-4 w-4" />
                <span className="hidden md:inline">Sleep</span>
              </TabsTrigger>
              <TabsTrigger value="gratitude" className="flex items-center gap-2">
                <Sunrise className="h-4 w-4" />
                <span className="hidden md:inline">Gratitude</span>
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden md:inline">Resources</span>
              </TabsTrigger>
            </TabsList>

            {/* Meditation Section */}
            <TabsContent value="meditation" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* ✅ Beginner Meditation with Play/Pause */}
                <Card className="overflow-hidden">
                  <CardHeader className="bg-primary/5 pb-2">
                    <CardTitle>Beginner Meditation</CardTitle>
                    <CardDescription>5-minute guided practice for beginners</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 flex flex-col items-center justify-between">
                    <span className="text-sm text-muted-foreground">5 min</span>
                    <Button size="sm" className="rounded-full mt-2" onClick={toggleAudio}>
                      {isPlaying ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
                      {isPlaying ? "Pause" : "Play"}
                    </Button>
                    <audio ref={audioRef} src="/audio/meditation.mp3"></audio>
                  </CardContent>
                </Card>

                {/* Other Meditation Sessions */}
                {[
                  {
                    title: "Body Scan",
                    description: "Release tension throughout your body",
                    duration: "10 min"
                  },
                  {
                    title: "Mindful Awareness",
                    description: "Focus on the present moment",
                    duration: "15 min"
                  },
                  {
                    title: "Loving-Kindness",
                    description: "Cultivate compassion for yourself and others",
                    duration: "12 min"
                  },
                  {
                    title: "Stress Relief",
                    description: "Reduce anxiety and stress",
                    duration: "8 min"
                  },
                  {
                    title: "Morning Meditation",
                    description: "Start your day with clarity",
                    duration: "7 min"
                  }
                ].map((session, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="bg-primary/5 pb-2">
                      <CardTitle>{session.title}</CardTitle>
                      <CardDescription>{session.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{session.duration}</span>
                      <Button size="sm" className="rounded-full">
                        <Play className="h-4 w-4 mr-1" />
                        Play
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
             <TabsContent value="breathing" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Box Breathing",
                    description: "4-4-4-4 pattern for calm and focus",
                    duration: "3 min"
                  },
                  {
                    title: "4-7-8 Technique",
                    description: "Breathe in for 4, hold for 7, exhale for 8",
                    duration: "5 min"
                  },
                  {
                    title: "Deep Breathing",
                    description: "Diaphragmatic breathing for relaxation",
                    duration: "7 min"
                  }
                ].map((exercise, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="bg-primary/5 pb-2">
                      <CardTitle>{exercise.title}</CardTitle>
                      <CardDescription>{exercise.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{exercise.duration}</span>
                      <Button size="sm" className="rounded-full">
                        <Play className="h-4 w-4 mr-1" />
                        Start
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sleep" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sleep Sounds</CardTitle>
                    <CardDescription>Ambient sounds to help you relax and fall asleep</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    {["Rain", "Ocean Waves", "White Noise", "Forest Night", "Gentle Stream", "Soft Piano"].map((sound, i) => (
                      <Button variant="outline" key={i} className="justify-start">
                        <Play className="h-4 w-4 mr-2" />
                        {sound}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Bedtime Meditation</CardTitle>
                    <CardDescription>Guided meditations to prepare for sleep</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 gap-4">
                    {["Body Scan for Sleep", "Release the Day", "Deep Sleep Journey"].map((meditation, i) => (
                      <Button variant="outline" key={i} className="justify-start">
                        <Play className="h-4 w-4 mr-2" />
                        {meditation}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="gratitude" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gratitude Journal</CardTitle>
                  <CardDescription>Reflect on what you're grateful for today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Taking a few minutes each day to reflect on what you're grateful for can significantly improve your mental well-being.
                    </p>
                    <Button>Open Journal</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Articles & Guides</CardTitle>
                    <CardDescription>Learn more about mindfulness practices</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>
                        <a
                         href="https://www.mindful.org/the-science-of-mindfulness/"
                         target="_blank"
                         rel="noopener noreferrer"
                         className="text-primary underline"
                        >
                          The Science of Mindfulness
                        </a>
                      </li>
                      <li className="text-primary underline">How to Build a Daily Meditation Habit</li>
                      <li className="text-primary underline">Mindfulness for Anxiety</li>
                      <li className="text-primary underline">Breathwork Techniques</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Books & Resources</CardTitle>
                    <CardDescription>Recommended reading for mindfulness</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                    <li>
                        <a
                         href="https://www.amazon.in/Wherever-You-There-Are-Mindfulness-ebook/dp/B01DT5WL0O/ref=tmm_kin_swatch_0"
                         target="_blank"
                         rel="noopener noreferrer"
                         className="text-primary underline"
                        >
                          Wherever You Go, There You Are
                        </a>
                      </li>
                      <li className="text-primary underline">The Miracle of Mindfulness</li>
                      <li className="text-primary underline">Mindfulness for Beginners</li>
                      <li className="text-primary underline">The Power of Now</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
