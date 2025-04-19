"use client";

import { Spinner, useDisclosure } from "@heroui/react";
import { ButtonCreateCompany } from "~/features/company/ui";
import {
  FlexItemsCenterG2,
  FlexItemsJustify,
} from "~/shared/ui/templates/common";
import AreaModal from "~/widgets/area/ui/area-modal";
import CreateCompany from "./drawers/create-company";
import FlexColG6 from "~/shared/ui/templates/common/flex-col-g-6";
import CompanyList from "~/widgets/company/ui/company-list";
import { useFilterCompanies } from "~/entities/company/hooks/use-filter-companies";
import If from "~/features/abstract/if";
import { QueryCompany } from "~/features/company/ui/filter";
import CompanyFilter from "~/widgets/company/ui/company-filter";
import FlexItemsStartG6 from "~/shared/ui/templates/common/flex-items-start-g-6";

const Final = () => {
  const {
    onClose: onCloseCompanyCreate,
    isOpen: isOpenCompanyCreate,
    onOpen: onOpenCompanyCreate,
  } = useDisclosure();
  const { data, isLoading } = useFilterCompanies();

  return (
    <FlexColG6>
      <FlexItemsJustify>
        <FlexItemsCenterG2>
          <ButtonCreateCompany onOpen={onOpenCompanyCreate} />
          <QueryCompany />
        </FlexItemsCenterG2>
        <AreaModal />
        <CreateCompany
          isOpen={isOpenCompanyCreate}
          onClose={onCloseCompanyCreate}
        />
      </FlexItemsJustify>
      <If condition={!isLoading} fallback={<Spinner />}>
        <FlexItemsStartG6>
          <CompanyFilter />
          <CompanyList list={data} />
        </FlexItemsStartG6>
      </If>
    </FlexColG6>
  );
};

export default Final;
