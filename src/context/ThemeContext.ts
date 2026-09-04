import { createContext } from 'react';

export type Theme = 
  | 'rose-pine' 
  | 'nord' 
  | 'catppuccin'
  | 'bauhaus'
  | 'gruvbox'
  | 'everforest';

export type ThemeContextType = {
  theme: Theme,
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


