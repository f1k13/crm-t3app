import { Button, Divider, Form } from "@heroui/react";
import React from "react";
import { useFormContext } from "react-hook-form";
import type { TCompanyFormValues } from "~/entities/company/model/company.model";
import {
  FieldComment,
  FieldCompanyName,
  FieldSelectTypeCompany,
  FieldsEmailCompany,
  FieldsPhoneNumber,
} from "~/features/company/ui";

type CompanyFormProps = {
  onSubmit: (data: TCompanyFormValues) => void;
};

const CompanyForm = ({ onSubmit }: CompanyFormProps) => {
  const { handleSubmit } = useFormContext<TCompanyFormValues>();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FieldCompanyName />
      <FieldSelectTypeCompany />
      <FieldComment />
      <Divider className={"my-4 w-full"} />
      <FieldsPhoneNumber />
      <FieldsEmailCompany />
      <Button type={"submit"}>Отправить</Button>
    </Form>
  );
};

export default CompanyForm;
