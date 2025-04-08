"use client";

import { Switch } from "@heroui/react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Switch
      defaultSelected
      color="success"
      onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      endContent={<MoonIcon />}
      size="lg"
      startContent={<SunIcon />}
    >
      Темная тема
    </Switch>
  );
};

export default ThemeSwitcher;
