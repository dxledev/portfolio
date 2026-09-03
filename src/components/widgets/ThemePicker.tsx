import { useTheme } from "../../context/useTheme";
import type { Theme } from "../../context/ThemeContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './Select.tsx';

function ThemePicker() {
  const items = [
    { label: "Rosé Pine", value: "rose-pine" },
    { label: "Bauhaus", value: "bauhaus" },
    { label: "Everforest", value: "everforest" },
    { label: "Gruvbox", value: "gruvbox" },
    { label: "Nord", value: "nord" },
    { label: "Catppuccin", value: "catppuccin" },
  ];

  const { theme, setTheme } = useTheme();
  
  function handleThemeChange(value: Theme | null) {
    if (value != null) {
      setTheme(value);
    }
  }

  return (
    <Select<Theme> 
      items={items}
      value={theme}
      onValueChange={handleThemeChange}
    >
      <SelectTrigger 
        className="md:w-40 data-[size=default]:h-8 text-sm sm:text-xl
                      cursor-pointer transition-colors duration-300"
      >
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false}>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem 
              key={item.value} 
              value={item.value}
              className="cursor-pointer text-xl"
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default ThemePicker;
