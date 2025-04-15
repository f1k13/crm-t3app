import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useCreateCompany } from "~/entities/company/hooks/use-create-company";
import {
  companyCreateSchema,
  type TCompanyFormValues,
  type TCreateCompany,
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
      phoneNumbers: [
        {
          value: "",
        },
      ],
      emails: [
        {
          value: "",
        },
      ],
      messengers: [
        {
          type: "",
          contact: "",
        },
      ],
      contactPersons: undefined,
      type: CompanyTypeEnum.LB,
    },
  });

  const create = useCreateCompany();
  const onSubmit = (data: TCreateCompany) => {
    create.mutate({
      ...data,
      phoneNumbers: data.phoneNumbers?.map((it) => it.value),
      emails: data.emails?.map((it) => it.value),
    });
  };
  return (
    <FormProvider {...form}>
      <CompanyForm onSubmit={onSubmit} />
    </FormProvider>
  );
};

export default CreateFormCompany;
