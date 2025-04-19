import React from "react";
import type { TCompanyData } from "~/entities/company/model/company.model";
import { CompanyCardLabelTemplate } from "~/shared/ui/templates/company";
import { messengerIcons } from "../../model/messenger.model";
import type { TMessengerKey } from "../fields/fields-messengers-company";

const CardMessengers = ({
  messengers,
}: {
  messengers: TCompanyData["messengers"];
}) => {
  return (
    <>
      <span className="font-medium">Мессенджеры:</span>
      {messengers?.map((it) => (
        <CompanyCardLabelTemplate
          key={it.id}
          label={messengerIcons[it.type as TMessengerKey]}
          value={it.contact}
        />
      ))}
    </>
  );
};

export default CardMessengers;
