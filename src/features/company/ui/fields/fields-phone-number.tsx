import { Button, Input } from "@heroui/react";
import { Plus, Trash2 } from "lucide-react";
import React from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { phoneMask } from "~/shared/lib/phone-mask";
import { FlexItemsCenterG2 } from "~/shared/ui/templates/common";
import { FieldsCompanyTemplate } from "~/shared/ui/templates/company";

const FieldsPhoneNumber = () => {
  const { control, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "phoneNumbers",
  });

  const phoneNumbers = useWatch({
    control,
    name: "phoneNumbers",
  }) as string[];

  const handleChange = (index: number, value: string) => {
    const maskValue = phoneMask(value);
    setValue(`phoneNumbers.${index}`, maskValue);
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
          {" "}
          {fields.map((field, index) => (
            <FlexItemsCenterG2 key={field.id}>
              <Input
                value={phoneNumbers[index] ?? ""}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder="+7 (___) ___-__-__"
              />
              <Button onPress={() => remove(index)} color={"danger"}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </FlexItemsCenterG2>
          ))}
        </>
      }
      append={
        <Button color={"success"} onPress={() => append("")} variant={"flat"}>
          <Plus className="w-4 h-4 mr-1" /> Добавить телефон
        </Button>
      }
    />
  );
};

export default FieldsPhoneNumber;
