"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeModeContext = createContext();

export const useThemeMode = () => useContext(ThemeModeContext);

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: { main: "#0f766e" },
          secondary: { main: "#f59e0b" },
          background: { default: "#f9fafb", paper: "#ffffff" },
          text: { primary: "#111827", secondary: "#6b7280" },
        }
      : {
          primary: { main: "#14b8a6" },
          secondary: { main: "#fbbf24" },
          background: { default: "#111827", paper: "#1f2937" },
          text: { primary: "#f9fafb", secondary: "#d1d5db" },
        }),
  },
  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
  },
});

export default function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode === "light" || savedMode === "dark") {
      setMode(savedMode);
    }
  }, []);

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", newMode);
      return newMode;
    });
  };

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
