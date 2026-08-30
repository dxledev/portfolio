import {
    useEffect,
    useState,
    type ReactNode,
} from "react";

import {
    ThemeContext,
    type Theme,
} from "./ThemeContext";

export function ThemeProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [theme, setTheme] = useState<Theme>("rose-pine");

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
