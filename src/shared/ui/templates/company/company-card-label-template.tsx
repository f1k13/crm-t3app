import React, { type ReactNode } from "react";

const CompanyCardLabelTemplate = ({
  label,
  value,
}: {
  label: ReactNode;
  value: ReactNode;
}) => {
  return (
    <div className={"flex items-center gap-1"}>
      <span className={"font-semibold"}>{label}</span>
      <span>{value}</span>
    </div>
  );
};

export default CompanyCardLabelTemplate;
