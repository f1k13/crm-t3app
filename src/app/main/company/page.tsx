"use client";

import { useDisclosure } from "@heroui/react";
import { FlexItemsJustify, PageTemplate } from "~/shared/ui/templates/common";
import ButtonCreateCompany from "~/features/company/ui/button-create-company";
import CreateCompany from "./_components/create-company";
import AreaModal from "~/widgets/area/ui/area-modal";

const Page = () => {
  const {
    onClose: onCloseCompanyCreate,
    isOpen: isOpenCompanyCreate,
    onOpen: onOpenCompanyCreate,
  } = useDisclosure();
  return (
    <>
      <CreateCompany
        isOpen={isOpenCompanyCreate}
        onClose={onCloseCompanyCreate}
      />
      <PageTemplate
        title={"Клиенты"}
        content={
          <FlexItemsJustify>
            <ButtonCreateCompany onOpen={onOpenCompanyCreate} />
            <AreaModal />
          </FlexItemsJustify>
        }
      />
    </>
  );
};

export default Page;
