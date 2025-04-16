import React, { type ReactNode } from "react";

const FlexItemsCenterG2 = ({ children }: { children: ReactNode }) => {
  return <div className={"flex w-full items-center gap-2"}>{children}</div>;
};

export default FlexItemsCenterG2;
