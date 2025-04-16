import React, { type ReactNode } from "react";

const FlexItemsJustify = ({ children }: { children: ReactNode }) => {
  return <div className={"flex items-center justify-between"}>{children}</div>;
};

export default FlexItemsJustify;
