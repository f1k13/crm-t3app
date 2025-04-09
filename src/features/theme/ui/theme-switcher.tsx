"use client";

import { Switch } from "@heroui/react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Switch
      defaultSelected
      color={"secondary"}
      onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      endContent={<MoonIcon />}
      size="lg"
      startContent={<SunIcon />}
    />
  );
};

export default ThemeSwitcher;
