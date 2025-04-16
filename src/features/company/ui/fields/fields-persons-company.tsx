import { Input } from "@heroui/react";
import React from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import type { TCompanyFormValues } from "~/entities/company/model/company.model";
import { FlexItemsCenterG2 } from "~/shared/ui/templates/common";
import { FieldsCompanyTemplate } from "~/shared/ui/templates/company";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@heroui/react";
import { phoneMask } from "~/shared/lib/phone-mask";

const FieldsPersonsCompany = () => {
  const { control, setValue, formState } = useFormContext<TCompanyFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contactPersons",
  });

  const value = useWatch({
    control,
    name: "contactPersons",
  });

  const onChange = (
    index: number,
    field: "fullName" | "phone" | "email",
    val: string,
  ) => {
    const prev = value?.[index] ?? { fullName: "", phone: "", email: "" };
    setValue(`contactPersons.${index}`, {
      ...prev,
      [field]: val,
    });
  };

  return (
    <FieldsCompanyTemplate
      title={
        <span className="text-2xl font-semibold text-default-800">
          Представители
        </span>
      }
      fields={
        <>
          {fields.map((field, index) => (
            <FlexItemsCenterG2 key={field.id}>
              <Input
                placeholder="ФИО"
                value={value?.[index]?.fullName ?? ""}
                onChange={(e) => onChange(index, "fullName", e.target.value)}
              />
              <Input
                placeholder="+7 (___) ___-__-__"
                value={value?.[index]?.phone ?? ""}
                onChange={(e) =>
                  onChange(index, "phone", phoneMask(e.target.value))
                }
                isInvalid={!!formState.errors.contactPersons?.[index]?.phone}
                errorMessage={
                  formState.errors.contactPersons?.[index]?.phone?.message
                }
              />
              <Input
                placeholder="Email"
                value={value?.[index]?.email ?? ""}
                onChange={(e) => onChange(index, "email", e.target.value)}
                isInvalid={!!formState.errors.contactPersons?.[index]?.email}
                errorMessage={
                  formState.errors.contactPersons?.[index]?.email?.message
                }
              />
              <Button
                isIconOnly
                variant="light"
                color="danger"
                onPress={() => remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </FlexItemsCenterG2>
          ))}
        </>
      }
      append={
        <Button
          color="success"
          variant="flat"
          onPress={() => append({ fullName: "", phone: "", email: "" })}
          isIconOnly
        >
          <Plus />
        </Button>
      }
    />
  );
};

export default FieldsPersonsCompany;
