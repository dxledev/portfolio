import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext, type Theme } from "./ThemeContext";

// local browser theme for last 
// used theme by user
const THEME_STORAGE_KEY = "portfolio-theme";
const DEFAULT_THEME: Theme = "rose-pine";

function isTheme(value: string | null): value is Theme {
  return (
    value === 'rose-pine' || 
    value === 'bauhaus' || 
    value === 'gruvbox' || 
    value === 'everforest' || 
    value === 'nord' || 
    value === 'catppuccin'
  );
}

type ThemeProviderProps = {
  children: ReactNode;
}
export function ThemeProvider({ children }: ThemeProviderProps) {
    // using a function form here makes React read localStorage
    // only during initial state creation
    const [theme, setTheme] = useState<Theme>(() => {
      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

      return isTheme(storedTheme) ? storedTheme : DEFAULT_THEME;
    });

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
