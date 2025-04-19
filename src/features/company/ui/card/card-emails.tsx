import React from "react";
import type { TCompanyData } from "~/entities/company/model/company.model";

const CardEmails = ({ emails }: { emails: TCompanyData["emails"] }) => {
  return (
    <>
      <span className="font-medium">ЭЛ.почты:</span>
      {emails?.map((it) => <span key={it.id}>{it?.email}</span>)}
    </>
  );
};

export default CardEmails;
