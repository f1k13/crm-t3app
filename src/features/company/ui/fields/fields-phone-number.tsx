import { Button, Input } from "@heroui/react";
import { Plus, Trash2 } from "lucide-react";
import React from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import type { TCompanyFormValues } from "~/entities/company/model/company.model";
import { phoneMask } from "~/shared/lib/phone-mask";
import { FlexItemsCenterG2 } from "~/shared/ui/templates/common";
import { FieldsCompanyTemplate } from "~/shared/ui/templates/company";

const FieldsPhoneNumber = () => {
  const { control, setValue, formState } = useFormContext<TCompanyFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "phoneNumbers",
  });

  const phoneNumbers = useWatch({
    control,
    name: "phoneNumbers",
  });

  const handleChange = (index: number, value: string) => {
    const maskValue = phoneMask(value);
    setValue(`phoneNumbers.${index}`, { value: maskValue });
  };

  return (
    <FieldsCompanyTemplate
      title={
        <span className={"text-2xl font-semibold text-default-800"}>
          Телефоны
        </span>
      }
      fields={
        <>
          {fields.map((field, index) => (
            <FlexItemsCenterG2 key={field.id}>
              <Input
                value={phoneNumbers?.[index]?.value ?? ""}
                onChange={(e) => handleChange(index, e.target.value)}
                isInvalid={!!formState.errors.phoneNumbers?.[index]?.value}
                errorMessage={
                  formState.errors.phoneNumbers?.[index]?.value?.message
                }
                endContent={
                  <Trash2
                    onClick={() => remove(index)}
                    className="w-4 h-4 cursor-pointer text-danger-500"
                  />
                }
                placeholder="+7 (___) ___-__-__"
              />
            </FlexItemsCenterG2>
          ))}
        </>
      }
      append={
        <Button
          color={"success"}
          onPress={() => append({ value: "" })}
          variant={"flat"}
          isIconOnly
        >
          <Plus  />
        </Button>
      }
    />
  );
};

export default FieldsPhoneNumber;
