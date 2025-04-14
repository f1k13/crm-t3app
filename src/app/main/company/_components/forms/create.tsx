import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  companyCreateSchema,
  type TCompanyFormValues,
} from "~/entities/company/model/company.model";
import { CompanyTypeEnum } from "~/server/api/enums/company-enum";
import CompanyForm from "~/widgets/company/ui/company-form";

const CreateFormCompany = () => {
  const form = useForm<TCompanyFormValues>({
    resolver: zodResolver(companyCreateSchema),
    defaultValues: {
      name: "",
      inn: 0,
      comment: "",
      phoneNumbers: undefined,
      emails: undefined,
      messengers: undefined,
      contactPersons: undefined,
      type: CompanyTypeEnum.IE,
    },
  });

  return <CompanyForm form={form} />;
};

export default CreateFormCompany;
