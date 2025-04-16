import type { ReactNode } from "react";

const FieldsCompanyTemplate = ({
  title,
  append,
  fields,
}: {
  title: ReactNode;
  append: ReactNode;
  fields: ReactNode;
}) => {
  return (
    <div className={"mt-4 flex w-full flex-col gap-2"}>
      {title}
      <div className={"flex w-full items-start gap-4"}>
        <div className={"flex w-full flex-col gap-4"}>{fields}</div>
        <div>{append}</div>
      </div>
    </div>
  );
};

export default FieldsCompanyTemplate;
