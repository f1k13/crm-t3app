"use client";

import { Button } from "@heroui/react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteCookie } from "~/shared/cookies/cookie";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie();
    router.push("/auth/sign-in");
  };

  return (
    <Button className={"flex justify-start"} onPress={handleLogout}>
      <LogOut className="h-5 w-5 text-danger-600" />
      <span className={"text-md"}>Выйти</span>
    </Button>
  );
};

export default LogoutButton;
