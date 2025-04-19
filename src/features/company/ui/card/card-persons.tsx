import React from "react";
import type { TCompanyData } from "~/entities/company/model/company.model";
import { FlexCol } from "~/shared/ui/templates/common";
import { CompanyCardLabelTemplate } from "~/shared/ui/templates/company";

const CardPersons = ({ persons }: { persons: TCompanyData["persons"] }) => {
  return (
    <>
      <span className="font-medium">Представители:</span>
      {persons?.map((it) => (
        <FlexCol key={it.id}>
          <CompanyCardLabelTemplate label={"ФИО:"} value={it.fullName} />
          <CompanyCardLabelTemplate label={"Почта:"} value={it.email} />
          <CompanyCardLabelTemplate
            label={"Номер телефона:"}
            value={it.phone}
          />
        </FlexCol>
      ))}
    </>
  );
};

export default CardPersons;
