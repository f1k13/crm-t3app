import type { ReactNode } from "react";

const FlexCol = ({ children }: { children: ReactNode }) => {
  return <div className={"flex flex-col"}>{children}</div>;
};

export default FlexCol;
