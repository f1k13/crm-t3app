"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { api } from "~/trpc/react";

export function useSession() {
  const router = useRouter();
  const { data, isLoading } = api.user.getSelf.useQuery(undefined, {
    retry: false,
  });

  useEffect(() => {
    if (!isLoading && !data) {
      router.replace("/auth/sign-in");
    }
  }, [data, isLoading, router]);

  return {
    user: data,
    isLoading,
    isAuthenticated: Boolean(data),
  };
}
