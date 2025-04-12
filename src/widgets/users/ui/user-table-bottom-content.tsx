import { Pagination } from "@heroui/react";
import React from "react";
import { useUserStore } from "~/entities/user/model/store";
import If from "~/features/abstract/if";

const UserTableBottomContent = () => {
  const { totalPages, setPage } = useUserStore((state) => state);
  return (
    <If condition={totalPages > 1}>
      <Pagination
        total={totalPages}
        initialPage={1}
        onChange={(page) => setPage(page)}
        showControls
      />
    </If>
  );
};

export default UserTableBottomContent;
