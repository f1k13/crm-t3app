import React, { type ReactNode } from "react";

const FlexItemsCenter = ({ children }: { children: ReactNode }) => {
  return <div className={"flex items-center"}>{children}</div>;
};

export default FlexItemsCenter;
