import React from "react";
import { UserTableTopContentTemplate } from "~/app/_templates/user";
import { useUserStore } from "~/entities/user/model/store";
import ButtonModalOpen from "~/features/user/ui/button-modal-open";
import SearchUsers from "~/features/user/ui/search-users";

const UserTableTopContent = ({ onOpen }: { onOpen: () => void }) => {
  const { totalCount } = useUserStore((state) => state);
  return (
    <UserTableTopContentTemplate
      button={<ButtonModalOpen onClick={onOpen} />}
      search={<SearchUsers />}
      totalCount={
        <span className="text-sm text-muted-foreground">
          Всего пользователей:{" "}
          <span className="font-medium text-foreground">{totalCount}</span>
        </span>
      }
    />
  );
};

export default UserTableTopContent;
