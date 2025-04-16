import { Button, Input } from "@heroui/react";
import { Plus, Trash2 } from "lucide-react";
import React, { type JSX } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { SiTelegram, SiViber, SiWhatsapp } from "react-icons/si";
import type { TCompanyFormValues } from "~/entities/company/model/company.model";
import { FlexItemsCenterG2 } from "~/shared/ui/templates/common";
import { FieldsCompanyTemplate } from "~/shared/ui/templates/company";
export type TMessengerKey = "telegram" | "whatsapp" | "viber";
type TMessengerOpt = {
  key: TMessengerKey;
  label: string;
};

const messengerOptions: TMessengerOpt[] = [
  { key: "telegram", label: "Telegram" },
  { key: "whatsapp", label: "WhatsApp" },
  { key: "viber", label: "Viber" },
];

const messengerIcons: Record<TMessengerKey, JSX.Element> = {
  telegram: <SiTelegram className="h-5 w-5 text-[#0088cc]" />,
  whatsapp: <SiWhatsapp className="h-5 w-5 text-[#25D366]" />,
  viber: <SiViber className="h-5 w-5 text-[#665CAC]" />,
};
const FieldsMessengersCompany = () => {
  const { control, setValue, formState, watch } =
    useFormContext<TCompanyFormValues>();

  const value = useWatch({
    control,
    name: "messengers",
  });

  const { append, fields, remove } = useFieldArray({
    control,
    name: "messengers",
  });

  const setType = (index: number, type: string) => {
    setValue(`messengers.${index}`, {
      type: type,
      contact: value?.[index]?.contact ?? "",
    });
  };

  const onChangeContact = (index: number, contact: string) => {
    setValue(`messengers.${index}`, {
      type: value?.[index]?.type ?? "",
      contact: contact,
    });
  };

  return (
    <FieldsCompanyTemplate
      title={
        <span className={"text-2xl font-semibold text-default-800"}>
          Мессенджеры
        </span>
      }
      fields={
        <>
          {fields.map((field, index) => (
            <FlexItemsCenterG2 key={field.id}>
              <Input
                value={value?.[index]?.contact}
                onChange={(e) => onChangeContact(index, e.target.value)}
                placeholder={"@example"}
                isInvalid={
                  !!formState.errors.messengers?.[index]?.contact?.message
                }
                errorMessage={
                  formState.errors.messengers?.[index]?.contact?.message
                }
                endContent={
                  <Trash2
                    onClick={() => remove(index)}
                    className="h-4 w-4 cursor-pointer text-danger-500"
                  />
                }
              />
              {messengerOptions.map((it) => (
                <Button
                  key={it.label}
                  isIconOnly
                  variant={
                    watch("messengers")?.[index]?.type === it.key
                      ? "faded"
                      : "bordered"
                  }
                  onPress={() => setType(index, it.key)}
                >
                  {messengerIcons[it.key]}
                </Button>
              ))}
            </FlexItemsCenterG2>
          ))}
        </>
      }
      append={
        <Button
          color={"success"}
          onPress={() => append({ contact: "", type: "" })}
          variant={"flat"}
          isIconOnly
        >
          <Plus />
        </Button>
      }
    />
  );
};

export default FieldsMessengersCompany;
