import type { JSX } from "react";
import { SiTelegram, SiWhatsapp, SiViber } from "react-icons/si";
import type { TMessengerKey } from "../ui/fields/fields-messengers-company";

export const messengerIcons: Record<TMessengerKey, JSX.Element> = {
	telegram: <SiTelegram className="h-5 w-5 text-[#0088cc]" />,
	whatsapp: <SiWhatsapp className="h-5 w-5 text-[#25D366]" />,
	viber: <SiViber className="h-5 w-5 text-[#665CAC]" />,
};