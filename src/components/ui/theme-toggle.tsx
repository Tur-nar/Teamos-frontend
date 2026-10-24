import { Button } from "./button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "./dropdown-menu";

import { useTheme } from "next-themes";
import { Sun, Moon, Laptop, Check } from "lucide-react";
import { useMounted } from "@/hooks/use-mounted";

const THEMES = {
    light: {
        label: "Light",
        icon: Sun,
    },
    dark: {
        label: "Dark",
        icon: Moon,
    },
    system: {
        label: "System",
        icon: Laptop,
    },
};
type Theme = keyof typeof THEMES;

export function ThemeToggle() {
    const mounted = useMounted();
    const { theme, setTheme } = useTheme();
    const currentTheme = (theme ?? "system") as Theme;
    const CurrentIcon = THEMES[currentTheme].icon;

    if (!mounted) return null; // Render nothing while the theme is being loaded
    return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <CurrentIcon className="size-4" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(THEMES).map(([key, value]) => {
          const Icon = value.icon;
          const label = value.label;
          return (
        <DropdownMenuItem
            className="gap-2"
            key={key}
            onClick={() => setTheme(key as Theme)}
        >
            <Icon className="size-4" />
            <span>{label}</span>
            {currentTheme === key && <Check className="size-4 ml-auto" />}
        </DropdownMenuItem>
    );
}) 
}
</DropdownMenuContent>
    </DropdownMenu>
  );
}
  
