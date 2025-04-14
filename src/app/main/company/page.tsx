"use client";

import { useDisclosure } from "@heroui/react";
import { PageTemplate } from "~/app/_templates/common";
import ButtonCreateCompany from "~/features/company/ui/button-create-company";
import CreateCompany from "./_components/create-company";

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
        content={<ButtonCreateCompany onOpen={onOpenCompanyCreate} />}
      />
    </>
  );
};

export default Page;
