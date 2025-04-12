import { Button } from "@heroui/react";
import React from "react";
import { UserTableTopContentTemplate } from "~/app/_templates/user";
import { useUserStore } from "~/entities/user/model/store";
import If from "~/features/abstract/if";
import ButtonModalOpen from "~/features/user/ui/button-modal-open";
import SearchUsers from "~/features/user/ui/search-users";

const UserTableTopContent = ({
  onOpen,
  onOpenDelete,
}: {
  onOpen: () => void;
  onOpenDelete: () => void;
}) => {
  const { totalCount } = useUserStore((state) => state);
  const { selectedDeletedUsers } = useUserStore((state) => state);

  return (
    <>
      <UserTableTopContentTemplate
        deletedUsers={
          <If condition={selectedDeletedUsers.length > 0}>
            <Button onClick={onOpenDelete} color={"danger"}>
              Удалить выбранных пользователей
            </Button>
          </If>
        }
        button={<ButtonModalOpen onClick={onOpen} />}
        search={<SearchUsers />}
        totalCount={
          <If condition={totalCount}>
            <span className="text-sm text-muted-foreground">
              Всего пользователей:{" "}
              <span className="font-medium text-foreground">{totalCount}</span>
            </span>
          </If>
        }
      />
    </>
  );
};

export default UserTableTopContent;
