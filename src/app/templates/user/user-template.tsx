import type { ReactNode } from "react";

const UserTemplate = ({
  button,
  table,
}: {
  button: ReactNode;
  table: ReactNode;
}) => {
  return (
    <div className={"flex flex-col gap-14"}>
      {button} <div className={"w-full"}>{table}</div>
    </div>
  );
};

export default UserTemplate;
