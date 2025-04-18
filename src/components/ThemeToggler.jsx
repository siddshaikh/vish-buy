"use client";

import { Button, IconButton, Tooltip } from "@mui/material";
import { useThemeMode } from "@/providers/ThemeModeProvider";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function ThemeToggle() {
  const context = useThemeMode();

  if (!context) return null;

  const { mode, toggleColorMode } = context;

  return (
    <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}>
      <Button
        onClick={toggleColorMode}
        color="inherit"
        size="medium"
        sx={{
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          height: 25,
          "&:hover": {
            bgcolor: "action.hover",
          },
          transition: "all 0.3s ease-in-out",
        }}
      >
        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </Button>
    </Tooltip>
  );
}
