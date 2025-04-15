import { Divider, Form } from "@heroui/react";
import React from "react";
import { useFormContext } from "react-hook-form";
import type { TCompanyFormValues } from "~/entities/company/model/company.model";
import {
  FieldComment,
  FieldCompanyName,
  FieldSelectTypeCompany,
  FieldsEmailCompany,
  FieldsMessengersCompany,
  FieldsPhoneNumber,
} from "~/features/company/ui";
import { FieldsRowCompanyTemplate } from "~/shared/ui/templates/company";

type CompanyFormProps = {
  onSubmit: (data: TCompanyFormValues) => void;
};

const CompanyForm = ({ onSubmit }: CompanyFormProps) => {
  const { handleSubmit, watch } = useFormContext<TCompanyFormValues>();
  console.log(watch());
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FieldsRowCompanyTemplate>
        <FieldCompanyName />
        <FieldSelectTypeCompany />
      </FieldsRowCompanyTemplate>
      <FieldComment />
      <Divider className={"my-4 w-full"} />
      <FieldsPhoneNumber />
      <FieldsEmailCompany />
      <FieldsMessengersCompany />
    </Form>
  );
};

export default CompanyForm;
