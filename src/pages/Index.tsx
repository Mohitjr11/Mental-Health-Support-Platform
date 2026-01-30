
import { Layout } from "@/components/layout";
import { Link } from "react-router-dom";
import { BarChart2, Users, Sparkles, LifeBuoy, ChevronRight, PlayCircle } from "lucide-react";
import { useEffect, useState } from "react";

const Index = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 -z-10"></div>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50"></div>
        
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6 animate-fade-in">
                Your mental health journey begins here
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 fade-up" style={{ animationDelay: "0.1s" }}>
                Find Balance in Your <span className="text-primary">Mental Wellbeing</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 fade-up" style={{ animationDelay: "0.2s" }}>
                Connect with mental health professionals, track your moods, practice mindfulness, 
                and access crisis support all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start fade-up" style={{ animationDelay: "0.3s" }}>
                {user ? (
                  <Link to="/mood-tracker" className="btn-primary">
                    Get Started 
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                ) : (
                  <Link to="/signup" className="btn-primary">
                    Create Account
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                )}
                <Link to="/mindfulness" className="btn-ghost flex items-center justify-center">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Try Mindfulness
                </Link>
              </div>
            </div>
            <div className="flex-1 relative w-full max-w-md">
              <div className="glass-card relative animate-float shadow-xl p-6 rounded-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1489659639091-8b687bc4386e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Person using mental wellness app" 
                  className="w-full h-auto rounded-xl object-cover shadow-inner"
                />
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-card p-4 rounded-xl shadow-lg animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">😊</div>
                    <div className="text-sm font-medium">Mood tracked for 7 days in a row!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">How MindLink Helps You</h2>
          <p className="text-xl text-muted-foreground">
            Our platform provides all the tools you need for your mental health journey,
            from tracking your mood to connecting with professionals.
          </p>
        </div>

        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<BarChart2 className="h-8 w-8 text-mind-500" />}
              title="Mood Tracking"
              description="Log your emotions daily with our simple emoji-based system and discover patterns over time."
              linkTo="/mood-tracker"
              color="bg-mind-50 dark:bg-mind-900/30"
              delay={0.1}
            />
            <FeatureCard 
              icon={<Users className="h-8 w-8 text-calm-500" />}
              title="Professional Help"
              description="Find and connect with qualified mental health professionals who match your specific needs."
              linkTo="/professionals"
              color="bg-calm-50 dark:bg-calm-900/30"
              delay={0.2}
            />
            <FeatureCard 
              icon={<Sparkles className="h-8 w-8 text-warmth-500" />}
              title="Mindfulness Practice"
              description="Access guided meditations, breathing exercises, and relaxation techniques anytime."
              linkTo="/mindfulness"
              color="bg-warmth-50 dark:bg-warmth-900/30"
              delay={0.3}
            />
            <FeatureCard 
              icon={<LifeBuoy className="h-8 w-8 text-primary" />}
              title="Crisis Support"
              description="Get immediate help during difficult moments with our crisis resources and hotlines."
              linkTo="/crisis-support"
              color="bg-primary/10"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center max-w-4xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Stories from Our Community</h2>
          <p className="text-xl text-muted-foreground">
            Hear how MindLink has helped people on their mental health journey.
          </p>
        </div>

        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="The mood tracking feature helped me identify patterns I never noticed before. It's been crucial for my therapy sessions."
              name="Harsh."
              role="Using MindLink for 8 months"
              avatar="https://sportsmatik.com/uploads/world-events/players/lionel-messi_1564492648.jpg"
              delay={0.1}
            />
            <TestimonialCard 
              quote="Finding the right therapist used to be so difficult. MindLink matched me with someone who truly understands my needs."
              name="Pranav."
              role="Using MindLink for 1 year"
              avatar="https://s.hs-data.com/bilder/spieler/gross/142105.jpg"
              delay={0.2}
            />
            <TestimonialCard 
              quote="The mindfulness exercises have become a daily ritual for me. Just 10 minutes each morning has made a huge difference."
              name="Anushka."
              role="Using MindLink for 6 months"
              avatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=150"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="glass-card p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-background to-accent/20 opacity-70"></div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Begin Your Journey?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Take the first step toward better mental health today. Join our community of people committed to growth and wellbeing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link to="/mood-tracker" className="btn-primary">
                  Track Your Mood
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              ) : (
                <Link to="/signup" className="btn-primary">
                  Create Free Account
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              )}
              <Link to="/professionals" className="btn-ghost">
                Browse Professionals
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const FeatureCard = ({ icon, title, description, linkTo, color, delay }: any) => (
  <Link 
    to={linkTo} 
    className="glass-card p-6 flex flex-col items-center text-center hover:scale-105 transition-all duration-300 h-full staggered-fade"
    style={{ animationDelay: `${delay}s` }}
  >
    <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${color}`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
    <div className="text-primary font-medium flex items-center mt-2">
      <span>Learn more</span>
      <ChevronRight className="ml-1 h-4 w-4" />
    </div>
  </Link>
);

const TestimonialCard = ({ quote, name, role, avatar, delay }: any) => (
  <div 
    className="glass-card p-6 staggered-fade"
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="mb-6">
      <svg className="h-8 w-8 text-primary/30" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
    </div>
    <p className="text-lg mb-6">{quote}</p>
    <div className="flex items-center">
      <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover mr-3" />
      <div>
        <h4 className="font-medium">{name}</h4>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  </div>
);

export default Index;
