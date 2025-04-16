import { Button, Input } from "@heroui/react";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { TCompanyFormValues } from "~/entities/company/model/company.model";
import { FlexItemsCenterG2 } from "~/shared/ui/templates/common";
import { FieldsCompanyTemplate } from "~/shared/ui/templates/company";

const FieldsEmailCompany = () => {
  const { control, formState, register } = useFormContext<TCompanyFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "emails",
  });

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
                    onClick={() => remove(index)}
                    className="h-4 w-4 cursor-pointer text-danger-500"
                  />
                }
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
          <Plus />
        </Button>
      }
    />
  );
};

export default FieldsEmailCompany;
