import React, { type ReactNode } from "react";

const CompanyFormTemplate = ({
  children,
  button,
}: {
  children: ReactNode;
  button: ReactNode;
}) => {
  return (
    <div className={"flex w-full flex-col justify-end gap-2"}>
      {children}
      <div className={"mt-xl flex justify-end"}>{button}</div>
    </div>
  );
};

export default CompanyFormTemplate;
