import type { ReactNode } from "react";

const FlexColG4 = ({ children }: { children: ReactNode }) => {
  return <div className={"flex w-full flex-col gap-4"}>{children}</div>;
};

export default FlexColG4;
