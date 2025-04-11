import React, { type ReactNode } from "react";

const UserTableTopContentTemplate = ({
  search,
  button,
  totalCount,
}: {
  search: ReactNode;
  button: ReactNode;
  totalCount: ReactNode;
}) => {
  return (
    <div className={"flex items-center justify-between"}>
      <div className={"flex items-center gap-2"}>
        <div>{button}</div> <div>{search}</div>
      </div>
      {totalCount}
    </div>
  );
};

export default UserTableTopContentTemplate;
