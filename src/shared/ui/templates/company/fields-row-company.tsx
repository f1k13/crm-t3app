import React, { type ReactNode } from "react";

const FieldsRowCompany = ({ children }: { children: ReactNode }) => {
  return <div className={"flex w-full gap-4"}>{children}</div>;
};

export default FieldsRowCompany;
