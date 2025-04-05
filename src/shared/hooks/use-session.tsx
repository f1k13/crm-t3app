import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export function useSession() {
  const router = useRouter();
  const user = api.user.getSelf.useQuery(undefined, {});
  if (!user) {
    router.push("/auth/sign-in");
  }
  return {
    user: user.data,
  };
}
