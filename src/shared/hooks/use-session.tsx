import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { api } from "~/trpc/react";

export function useSession() {
  const router = useRouter();
  const { data, error } = api.user.getSelf.useQuery(undefined, {});

  return {
    user: data,
  };
}
