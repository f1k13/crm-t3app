import { Input } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { TCompanyFormValues } from "~/entities/company/model/company.model";
import { FlexItemsCenterG2 } from "~/shared/ui/templates/common";
import { FieldsCompanyTemplate } from "~/shared/ui/templates/company";
import AppendButton from "./append-button";

const FieldsEmailCompany = ({ onRemove }: { onRemove: () => void }) => {
  const { formState, register } = useFormContext<TCompanyFormValues>();

  const { fields, append, remove } = useFieldArray({
    name: "emails",
  });
  const handleRemove = (index: number) => {
    remove(index);
    if (fields.length === 1) onRemove();
  };
  return (
    <FieldsCompanyTemplate
      title={
        <span className={"text-2xl font-semibold text-default-800"}>
          Эл. почты
        </span>
      }
      fields={
        <>
          {fields.map((field, index) => (
            <FlexItemsCenterG2 key={field.id}>
              <Input
                isInvalid={!!formState.errors.emails?.[index]?.value}
                {...register(`emails.${index}.value`)}
                errorMessage={formState.errors.emails?.[index]?.value?.message}
                placeholder="example@gmail.com"
                endContent={
                  <Trash2
                    onClick={() => handleRemove(index)}
                    className="h-4 w-4 cursor-pointer text-danger-500"
                  />
                }
              />
            </FlexItemsCenterG2>
          ))}
        </>
      }
      append={<AppendButton onClick={() => append({ value: "" })} />}
    />
  );
};

export default FieldsEmailCompany;
