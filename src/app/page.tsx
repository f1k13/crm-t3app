"use client";

import { useSession } from "~/shared/hooks/use-session";

const Page = () => {
  const { user } = useSession();
  console.log(user);
  return <div>page</div>;
};

export default Page;
