import { Button, Input } from "@heroui/react";
import { Plus, Trash2 } from "lucide-react";
import {
  useFieldArray,
  useFormContext,
  useWatch,
  type FieldArrayPath,
} from "react-hook-form";
import type { TCompanyFormValues } from "~/entities/company/model/company.model";
import { FlexItemsCenterG2 } from "~/shared/ui/templates/common";
import { FieldsCompanyTemplate } from "~/shared/ui/templates/company";

const FieldsEmailCompany = () => {
  const { control, setValue, formState, watch } =
    useFormContext<TCompanyFormValues>();

  const { fields, append, remove } = useFieldArray<
    TCompanyFormValues,
    FieldArrayPath<TCompanyFormValues>
  >({
    control,
    name: "emails",
  });

  const emails = useWatch({
    control,
    name: "emails",
  });
  console.log(watch());
  const handleChange = (index: number, value: string) => {
    setValue(`emails.${index}`, { value });
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
                isInvalid={!!formState.errors.emails?.[index]}
                value={emails?.[index]?.value ?? ""}
                errorMessage={formState.errors.emails?.[index]?.message}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder="example@gmail.com"
              />
              <Button onPress={() => remove(index)} color={"danger"}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </FlexItemsCenterG2>
          ))}
        </>
      }
      append={
        <Button
          color={"success"}
          onPress={() => append({ value: "" })}
          variant={"flat"}
        >
          <Plus className="mr-1 h-4 w-4" /> Добавить email
        </Button>
      }
    />
  );
};

export default FieldsEmailCompany;
