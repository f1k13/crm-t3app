import { Skeleton } from "@heroui/react";
import React from "react";

const AppSidebarSkeleton = () => {
  return (
    <div className={"flex flex-col gap-2"}>
      <Skeleton className="rounded-lg">
        <div className="h-9 rounded-lg bg-secondary-700" />
      </Skeleton>
      <Skeleton className="rounded-lg">
        <div className="h-9 rounded-lg bg-secondary-700" />
      </Skeleton>
    </div>
  );
};

export default AppSidebarSkeleton;
