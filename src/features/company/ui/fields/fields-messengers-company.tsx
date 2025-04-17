import { Button, Input } from "@heroui/react";
import { Trash2 } from "lucide-react";
import React, { type JSX } from "react";
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { SiTelegram, SiViber, SiWhatsapp } from "react-icons/si";
import type { TCompanyFormValues } from "~/entities/company/model/company.model";
import { FieldsCompanyTemplate } from "~/shared/ui/templates/company";
import FieldsRowCompany from "~/shared/ui/templates/company/fields-row-company";
import AppendButton from "./append-button";
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
const FieldsMessengersCompany = ({ onRemove }: { onRemove: () => void }) => {
  const { control, setValue, formState } = useFormContext<TCompanyFormValues>();

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

  const handleRemove = (index: number) => {
    remove(index);
    if (fields.length === 1) onRemove();
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
            <FieldsRowCompany key={field.id}>
              <Controller
                name={`messengers.${index}.contact`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={"@example"}
                    isInvalid={
                      !!formState.errors.messengers?.[index]?.contact?.message
                    }
                    errorMessage={
                      formState.errors.messengers?.[index]?.contact?.message
                    }
                    endContent={
                      <Trash2
                        onClick={() => handleRemove(index)}
                        className="h-4 w-4 cursor-pointer text-danger-500"
                      />
                    }
                  />
                )}
              />
              {messengerOptions.map((it) => (
                <Button
                  key={it.label}
                  isIconOnly
                  variant={
                    value?.[index]?.type === it.key ? "flat" : "bordered"
                  }
                  onPress={() => setType(index, it.key)}
                >
                  {messengerIcons[it.key]}
                </Button>
              ))}
            </FieldsRowCompany>
          ))}
        </>
      }
      append={
        <AppendButton onClick={() => append({ contact: "", type: "" })} />
      }
    />
  );
};

export default FieldsMessengersCompany;
