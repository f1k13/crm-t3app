import { Button, Divider, Form } from "@heroui/react";
import React from "react";
import { useFormContext } from "react-hook-form";
import type { TCompanyFormValues } from "~/entities/company/model/company.model";
import If from "~/features/abstract/if";
import {
  AddFieldButton,
  FieldArea,
  FieldComment,
  FieldCompanyName,
  FieldSelectTypeCompany,
  FieldsEmailCompany,
  FieldsMessengersCompany,
  FieldsPersonsCompany,
  FieldsPhoneNumber,
} from "~/features/company/ui";
import { FlexItemsCenterG2 } from "~/shared/ui/templates/common";
import {
  CompanyFormTemplate,
  FieldsRowCompanyTemplate,
} from "~/shared/ui/templates/company";

type CompanyFormProps = {
  onSubmit: (data: TCompanyFormValues) => void;
};

const CompanyForm = ({ onSubmit }: CompanyFormProps) => {
  const { handleSubmit, watch, setValue } =
    useFormContext<TCompanyFormValues>();

  const phoneNumbers = watch("phoneNumbers") ?? [];
  const emails = watch("emails") ?? [];
  const messengers = watch("messengers") ?? [];
  const contactPersons = watch("contactPersons") ?? [];

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <CompanyFormTemplate
        button={
          <Button color={"primary"} className={"w-1/2"} type={"submit"}>
            Создать
          </Button>
        }
      >
        <FieldsRowCompanyTemplate>
          <FieldCompanyName />
          <FieldSelectTypeCompany />
        </FieldsRowCompanyTemplate>

        <FieldComment />

        <Divider className={"my-4 w-full"} />

        <FlexItemsCenterG2>
          {phoneNumbers.length === 0 && (
            <AddFieldButton
              onClick={() => setValue("phoneNumbers", [{ value: "" }])}
              text={"Добавить телефон"}
            />
          )}
          {emails.length === 0 && (
            <AddFieldButton
              onClick={() => setValue("emails", [{ value: "" }])}
              text={"Добавить email"}
            />
          )}
          {messengers.length === 0 && (
            <AddFieldButton
              onClick={() =>
                setValue("messengers", [{ type: "", contact: "" }])
              }
              text={"Добавить мессенджер"}
            />
          )}
          {contactPersons.length === 0 && (
            <AddFieldButton
              onClick={() =>
                setValue("contactPersons", [
                  { fullName: "", phone: "", email: "" },
                ])
              }
              text={"Добавить контактное лицо"}
            />
          )}
        </FlexItemsCenterG2>

        <If condition={phoneNumbers.length > 0}>
          <FieldsPhoneNumber />
        </If>
        <If condition={emails.length > 0}>
          <FieldsEmailCompany />
        </If>
        <If condition={messengers.length > 0}>
          <FieldsMessengersCompany />
        </If>
        <If condition={contactPersons.length > 0}>
          <FieldsPersonsCompany />
        </If>
        <Divider className={"my-4 w-full"} />

        <FieldArea />
      </CompanyFormTemplate>
    </Form>
  );
};

export default CompanyForm;
