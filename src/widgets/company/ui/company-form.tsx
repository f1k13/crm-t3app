import { Button, Divider, Form } from "@heroui/react";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { TCompanyFormValues } from "~/entities/company/model/company.model";
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
  const { handleSubmit, setValue } = useFormContext<TCompanyFormValues>();

  const [showPhoneNumbers, setShowPhoneNumbers] = useState(false);
  const [showEmails, setShowEmails] = useState(false);
  const [showMessengers, setShowMessengers] = useState(false);
  const [showContactPersons, setShowContactPersons] = useState(false);

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
          {!showPhoneNumbers && (
            <AddFieldButton
              onClick={() => {
                setShowPhoneNumbers(true);
                setValue("phoneNumbers", [{ value: "" }]);
              }}
              text={"Добавить телефон"}
            />
          )}
          {!showEmails && (
            <AddFieldButton
              onClick={() => {
                setShowEmails(true);
                setValue("emails", [{ value: "" }]);
              }}
              text={"Добавить email"}
            />
          )}
          {!showMessengers && (
            <AddFieldButton
              onClick={() => {
                setShowMessengers(true);
                setValue("messengers", [{ type: "", contact: "" }]);
              }}
              text={"Добавить мессенджер"}
            />
          )}
          {!showContactPersons && (
            <AddFieldButton
              onClick={() => {
                setShowContactPersons(true);
                setValue("contactPersons", [
                  { fullName: "", phone: "", email: "" },
                ]);
              }}
              text={"Добавить контактное лицо"}
            />
          )}
        </FlexItemsCenterG2>

        {showPhoneNumbers && (
          <FieldsPhoneNumber onRemove={() => setShowPhoneNumbers(false)} />
        )}
        {showEmails && (
          <FieldsEmailCompany onRemove={() => setShowEmails(false)} />
        )}
        {showMessengers && (
          <FieldsMessengersCompany onRemove={() => setShowMessengers(false)} />
        )}
        {showContactPersons && (
          <FieldsPersonsCompany onRemove={() => setShowContactPersons(false)} />
        )}

        <Divider className={"my-4 w-full"} />
        <FieldArea />
      </CompanyFormTemplate>
    </Form>
  );
};

export default CompanyForm;
