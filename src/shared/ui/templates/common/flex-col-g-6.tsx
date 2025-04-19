import React, { type ReactNode } from "react";

const FlexColG6 = ({ children }: { children: ReactNode }) => {
  return <div className={"flex flex-col gap-6"}>{children}</div>;
};

export default FlexColG6;
