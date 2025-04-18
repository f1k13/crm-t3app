import React, { type ReactNode } from "react";

const PageTemplate = ({
  title,
  content,
}: {
  title: ReactNode;
  content: ReactNode;
}) => {
  return (
    <div className={"flex flex-col items-start gap-14"}>
      <h1 className={"text-4xl font-bold text-default-800"}>{title}</h1>
      <div className={"w-full"}>{content}</div>
    </div>
  );
};

export default PageTemplate;
