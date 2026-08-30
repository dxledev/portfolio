import { useTheme } from "../../context/useTheme";
import type { Theme } from "../../context/ThemeContext";

function ThemePicker() {
  const { theme, setTheme } = useTheme();
  
  function handleThemeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setTheme(event.target.value as Theme);
  }

  return (
    <select value={theme} onChange={handleThemeChange}>
      <option value="rose-pine">Rosé Pine</option>
      <option value="nord">Nord</option>
      <option value="catppuccin">Catppuccin</option>
    </select>
  )
}

export default ThemePicker;
