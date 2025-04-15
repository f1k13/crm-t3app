import React, { type ReactNode } from "react";

const UserTableTopContentTemplate = ({
  search,
  button,
  totalCount,
  deletedUsers,
}: {
  search: ReactNode;
  button: ReactNode;
  totalCount: ReactNode;
  deletedUsers: ReactNode;
}) => {
  return (
    <div className={"flex items-center justify-between"}>
      <div className={"flex items-center gap-2"}>
        <div>{button}</div> <div>{search}</div>
      </div>
      <div className={"flex items-center gap-2"}>
        <div>{deletedUsers}</div>
        <div>{totalCount}</div>
      </div>
    </div>
  );
};

export default UserTableTopContentTemplate;
