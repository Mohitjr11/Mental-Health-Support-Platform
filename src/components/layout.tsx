
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X, Home, BarChart2, Users, Heart, Sparkles, LifeBuoy, LogIn } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/mood-tracker", label: "Mood Tracker", icon: BarChart2 },
  { path: "/professionals", label: "Professionals", icon: Users },
  { path: "/mindfulness", label: "Mindfulness", icon: Sparkles },
  { path: "/crisis-support", label: "Crisis Support", icon: LifeBuoy },
];

export function Layout({ children }: LayoutProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("user") !== null;

  // Close mobile nav when route changes
  useEffect(() => {
    setIsNavOpen(false);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/70 border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="bg-primary/10 text-primary p-1.5 rounded-lg">
              <Heart className="w-5 h-5" />
            </span>
            <span className="font-display font-bold text-xl">MindLink</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "nav-link flex items-center gap-1.5",
                  location.pathname === item.path && "active"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            {!isLoggedIn && (
              <Link to="/login" className="hidden md:flex btn-ghost">
                <LogIn className="w-4 h-4 mr-2" />
                <span>Sign In</span>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-primary/10"
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              {isNavOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isNavOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-sm animate-fade-in">
          <nav className="container mx-auto px-4 py-8 flex flex-col gap-4">
            {navItems.map((item, i) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "nav-link flex items-center gap-2 text-lg py-3",
                  location.pathname === item.path && "active",
                  "staggered-fade"
                )}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
            {!isLoggedIn && (
              <Link 
                to="/login" 
                className="btn-primary mt-4 text-center flex items-center justify-center staggered-fade"
                style={{ animationDelay: "0.3s" }}
              >
                <LogIn className="w-5 h-5 mr-2" />
                <span>Sign In</span>
              </Link>
            )}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="py-6 border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>MindLink.</p>
          <p className="text-sm mt-2">
             
            <a href="tel:988" className="text-primary hover:underline ml-1"></a> 
            <a href="sms:741741" className="text-primary hover:underline ml-1"></a>
          </p>
        </div>
      </footer>
    </div>
  );
}
