import type { ReactNode } from "react";

const FlexWrapJustify = ({ children }: { children: ReactNode }) => {
  return (
    <div className={"flex w-full flex-wrap items-start justify-between gap-4"}>
      {children}
    </div>
  );
};

export default FlexWrapJustify;
