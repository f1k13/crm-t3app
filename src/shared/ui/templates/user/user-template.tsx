import type { ReactNode } from "react";

const UserTemplate = ({
  title,
  table,
}: {
  title: ReactNode;
  table: ReactNode;
}) => {
  return (
    <div className={"flex flex-col items-start gap-14"}>
      <h1 className={"text-4xl font-bold text-default-800"}>{title}</h1>{" "}
      <div className={"w-full"}>{table}</div>
    </div>
  );
};

export default UserTemplate;
