import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, LifeBuoy, Phone, MessageSquare, Heart, AlertCircle } from "lucide-react";

export default function CrisisSupport() {
  return (
    <Layout>
      <div className="container max-w-5xl mx-auto py-8 px-4">
        <div className="flex flex-col gap-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center p-2 bg-red-100 dark:bg-red-900/20 text-red-500 rounded-full mb-4">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Crisis Support</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              If you're experiencing a mental health emergency, please reach out to one of these resources immediately.
              Help is available 24/7.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="border-red-200 dark:border-red-900/50">
              <CardHeader className="bg-red-50 dark:bg-red-900/20 pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-red-500" />
                  Emergency Hotlines
                </CardTitle>
                <CardDescription>
                  Free, confidential support for people in distress
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">National Suicide Prevention Lifeline</h3>
                    <p className="text-sm text-muted-foreground mb-2">24/7 support for people in distress</p>
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="h-4 w-4 mr-2" />
                      <span className="font-bold">+91</span> 9152987821
                    </Button>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Crisis Text Line</h3>
                    <p className="text-sm text-muted-foreground mb-2">Text support for any type of crisis</p>
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Text <span className="font-bold">HOME</span> to 741741
                    </Button>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Veterans Crisis Line</h3>
                    <p className="text-sm text-muted-foreground mb-2">Support for veterans and their loved ones</p>
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="h-4 w-4 mr-2" />
                      <span className="font-bold">988</span> (Press 1)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-primary/5 pb-2">
                <CardTitle className="flex items-center gap-2">
                  <LifeBuoy className="h-5 w-5 text-primary" />
                  SOS Emergency Button
                </CardTitle>
                <CardDescription>
                  Immediate help when you need it most
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    If you're in immediate danger or having suicidal thoughts, press the SOS button to be connected with a crisis counselor.
                  </p>
                  
                  <Button size="lg" variant="destructive" className="w-full h-16 text-lg">
                    <AlertCircle className="h-6 w-6 mr-2" />
                    SOS - Get Immediate Help
                  </Button>
                  
                  <p className="text-xs text-muted-foreground">
                    This will connect you to a crisis counselor. If you're in immediate physical danger, please call emergency services (911) directly.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Emergency Contacts</CardTitle>
              <CardDescription>
                Add trusted contacts who can be notified in case of an emergency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <Button>
                  <Heart className="h-4 w-4 mr-2" />
                  Set Up Emergency Contacts
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Add friends or family members who can be contacted during a crisis
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Self-Help Crisis Resources</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="panic-attack">
                <AccordionTrigger>What to do during a panic attack</AccordionTrigger>
                <AccordionContent>
                  <ol className="list-decimal list-inside space-y-2 pl-4">
                    <li>Acknowledge what's happening. Recognize that you're having a panic attack.</li>
                    <li>Focus on your breathing. Take slow, deep breaths (4 seconds in, hold for 2, exhale for 6).</li>
                    <li>Use grounding techniques. Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.</li>
                    <li>Repeat a mantra. "This feeling will pass. I am safe."</li>
                    <li>If possible, find a quiet place to sit or lie down.</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="suicidal-thoughts">
                <AccordionTrigger>Coping with suicidal thoughts</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <p className="font-medium text-red-500">If you're having thoughts of suicide, please call 988 or text HOME to 741741 immediately.</p>
                    <p>While waiting for help:</p>
                    <ul className="list-disc list-inside space-y-1 pl-4">
                      <li>Remove any means of self-harm from your environment</li>
                      <li>Don't isolate yourself - go to a public place or contact someone you trust</li>
                      <li>Remind yourself that these feelings are temporary and will pass</li>
                      <li>Focus on getting through just the next hour, then the next</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="self-harm">
                <AccordionTrigger>Alternatives to self-harm</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <p>If you're feeling the urge to self-harm, try these alternatives:</p>
                    <ul className="list-disc list-inside space-y-1 pl-4">
                      <li>Hold an ice cube against your skin</li>
                      <li>Draw on yourself with a red marker</li>
                      <li>Engage in intense exercise</li>
                      <li>Scream or cry into a pillow</li>
                      <li>Call a friend or crisis hotline</li>
                      <li>Write down your feelings</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="severe-anxiety">
                <AccordionTrigger>Managing severe anxiety</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>Practice box breathing: inhale (4 counts), hold (4 counts), exhale (4 counts), hold (4 counts)</li>
                    <li>Progressive muscle relaxation: tense and then release each muscle group</li>
                    <li>Use the 5-4-3-2-1 grounding technique</li>
                    <li>Place your hand on your chest and focus on your heartbeat</li>
                    <li>If possible, go for a walk or change your environment</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="text-center pt-6 mt-4 border-t">
            <p className="text-muted-foreground text-sm">
              Remember, seeking help is a sign of strength, not weakness.
              You don't have to face difficult times alone.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
