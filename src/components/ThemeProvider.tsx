"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{ theme: Theme; toggle: () => void } | undefined>(undefined);

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
    return ctx;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const getInitialTheme = (): Theme => {
        if (typeof document === "undefined") return "dark";
        const initialTheme = document.documentElement.dataset.theme;
        return (initialTheme === "light" || initialTheme === "dark") ? initialTheme : "dark";
    }
    const [theme, setTheme] = useState<Theme>(getInitialTheme);
    useEffect(()=>{
        document.documentElement.dataset.theme = theme;
        localStorage.setItem("subledger-theme", theme);
    }, [theme]);

    const handleToggle = () => {
        setTheme(t => t === "dark" ? "light" : "dark");
    };

    return (
        <ThemeContext.Provider value={{ theme, toggle: handleToggle }}>
            {children}
        </ThemeContext.Provider>
    );
}