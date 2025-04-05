"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme("light");
    }
  }, []);

  const toggleTheme = (newTheme: string) => {
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
    <>
      <Button onClick={() => toggleTheme("light")}>Светлая тема</Button>
      <Button onClick={() => toggleTheme("dark")}>Темная тема</Button>
    </>
  );
};

export default ThemeSwitcher;
