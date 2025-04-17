import { Button, Input } from "@heroui/react";
import { Trash2 } from "lucide-react";
import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import type { TCompanyFormValues } from "~/entities/company/model/company.model";
import { phoneMask } from "~/shared/lib/phone-mask";
import FieldsRowCompany from "~/shared/ui/templates/company/fields-row-company";
import { FieldsCompanyTemplate } from "~/shared/ui/templates/company";
import AppendButton from "./append-button";

const FieldsPersonsCompany = ({ onRemove }: { onRemove: () => void }) => {
  const { control } = useFormContext<TCompanyFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "contactPersons",
  });
  const handleRemove = (index: number) => {
    remove(index);
    if (fields.length === 1) onRemove();
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
            <FieldsRowCompany key={field.id}>
              <Controller
                control={control}
                name={`contactPersons.${index}.fullName`}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    placeholder="ФИО"
                    isInvalid={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name={`contactPersons.${index}.phone`}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    placeholder="+7 (___) ___-__-__"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(phoneMask(e.target.value))}
                    isInvalid={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name={`contactPersons.${index}.email`}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    placeholder="Email"
                    isInvalid={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
              <Button
                isIconOnly
                variant="light"
                color="danger"
                onPress={() => handleRemove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </FieldsRowCompany>
          ))}
        </>
      }
      append={
        <AppendButton
          onClick={() => append({ fullName: "", phone: "", email: "" })}
        />
      }
    />
  );
};

export default FieldsPersonsCompany;
