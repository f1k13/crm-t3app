"use client";

import { useDisclosure } from "@heroui/react";
import { ButtonCreateCompany } from "~/features/company/ui";
import { FlexCol, FlexItemsJustify } from "~/shared/ui/templates/common";
import AreaModal from "~/widgets/area/ui/area-modal";
import CreateCompany from "./drawers/create-company";
import List from "./list/list";

const Final = () => {
  const {
    onClose: onCloseCompanyCreate,
    isOpen: isOpenCompanyCreate,
    onOpen: onOpenCompanyCreate,
  } = useDisclosure();
  return (
    <FlexCol>
      <FlexItemsJustify>
        <ButtonCreateCompany onOpen={onOpenCompanyCreate} />
        <AreaModal />
        <CreateCompany
          isOpen={isOpenCompanyCreate}
          onClose={onCloseCompanyCreate}
        />
      </FlexItemsJustify>
      <List />
    </FlexCol>
  );
};

export default Final;
