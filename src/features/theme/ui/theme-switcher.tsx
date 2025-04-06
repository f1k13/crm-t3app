"use client";

import React, { useState, useEffect } from "react";
import { Switch } from "@heroui/react";
import { MoonIcon, SunIcon } from "lucide-react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<string>("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <Switch
      defaultSelected
      color="success"
      onChange={toggleTheme}
      endContent={<MoonIcon />}
      size="lg"
      startContent={<SunIcon />}
    >
      Темная тема
    </Switch>
  );
};

export default ThemeSwitcher;
