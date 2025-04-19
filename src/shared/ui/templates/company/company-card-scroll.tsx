import React, { type ReactNode } from "react";

const CompanyCardScroll = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-h-[100px] w-full overflow-y-auto scrollbar-hide">
      <div className="flex flex-col gap-2 whitespace-pre-wrap break-all">
        {children}
      </div>
    </div>
  );
};

export default CompanyCardScroll;
