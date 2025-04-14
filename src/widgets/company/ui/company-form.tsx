import { Form } from "@heroui/react";
import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { TCompanyFormValues } from "~/entities/company/model/company.model";
import FieldCompanyName from "~/features/company/ui/fields/field-company-name";

type CompanyFormProps = {
  handleSubmit?: (data: TCompanyFormValues) => void;
  form: UseFormReturn<TCompanyFormValues>;
};

const CompanyForm = ({ handleSubmit, form }: CompanyFormProps) => {
  console.log(form.watch());
  return (
    <Form>
      <FieldCompanyName setValue={(value) => form.setValue("name", value)} />
    </Form>
  );
};

export default CompanyForm;
