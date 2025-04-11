"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "~/entities/user/model/store";
import { api } from "~/trpc/react";

export function useSession() {
  const router = useRouter();

  const setUser = useUserStore((state) => state.setUser);

  const { data, isLoading } = api.user.getSelf.useQuery(undefined, {
    retry: false,
  });

  useEffect(() => {
    if (!isLoading && !data) {
      router.replace("/auth/sign-in");
    }
    if (data) {
      setUser(data);
    }
  }, [data, isLoading, router, setUser]);

  return {
    user: data,
    isLoading,
  };
}
