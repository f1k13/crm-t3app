import { Input } from "@heroui/react";
import { Trash2 } from "lucide-react";
import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import type { TCompanyFormValues } from "~/entities/company/model/company.model";
import { phoneMask } from "~/shared/lib/phone-mask";
import { FlexItemsCenterG2 } from "~/shared/ui/templates/common";
import { FieldsCompanyTemplate } from "~/shared/ui/templates/company";
import AppendButton from "./append-button";

const FieldsPhoneNumber = ({ onRemove }: { onRemove: () => void }) => {
  const { control } = useFormContext<TCompanyFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "phoneNumbers",
  });
  const handleRemove = (index: number) => {
    remove(index);
    if (fields.length === 1) onRemove();
  };
  return (
    <FieldsCompanyTemplate
      title={
        <span className="text-2xl font-semibold text-default-800">
          Телефоны
        </span>
      }
      fields={
        <>
          {fields.map((field, index) => (
            <FlexItemsCenterG2 key={field.id}>
              <Controller
                control={control}
                name={`phoneNumbers.${index}.value`}
                render={({ field: controllerField, fieldState }) => (
                  <Input
                    {...controllerField}
                    value={controllerField.value || ""}
                    onChange={(e) =>
                      controllerField.onChange(phoneMask(e.target.value))
                    }
                    isInvalid={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    endContent={
                      <Trash2
                        onClick={() => handleRemove(index)}
                        className="h-4 w-4 cursor-pointer text-danger-500"
                      />
                    }
                    placeholder="+7 (___) ___-__-__"
                  />
                )}
              />
            </FlexItemsCenterG2>
          ))}
        </>
      }
      append={<AppendButton onClick={() => append({ value: "" })} />}
    />
  );
};

export default FieldsPhoneNumber;
