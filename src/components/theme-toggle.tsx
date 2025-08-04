
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full w-9 h-9 transition-all duration-300 hover:bg-primary/10"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-foreground/70" />
      ) : (
        <Sun className="h-5 w-5 text-foreground/70" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
