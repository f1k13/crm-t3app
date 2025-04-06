import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { api } from "~/trpc/react";

export function useSession() {
  const router = useRouter();
  const { data, error } = api.user.getSelf.useQuery(undefined, {});
  useEffect(() => {
    if (!data) {
      router.push("/auth/sign-in");
    }
  }, [data, error]);
  return {
    user: data,
  };
}
