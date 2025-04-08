"use client";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import type { ReactNode } from "react";
import { SidebarProvider } from "~/shared/ui/sidebar";
const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <HeroUIProvider>
      <SidebarProvider>
        <ToastProvider />
        {children}
      </SidebarProvider>
    </HeroUIProvider>
  );
};

export default Providers;
