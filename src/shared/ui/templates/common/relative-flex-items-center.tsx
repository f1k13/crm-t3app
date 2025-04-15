import React, { type ReactNode } from "react";

const RelativeFlexItemsCenter = ({ children }: { children: ReactNode }) => {
  return <div className={"relative flex items-center gap-2"}>{children}</div>;
};

export default RelativeFlexItemsCenter;
