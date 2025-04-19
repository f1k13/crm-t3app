import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { DateTime } from "luxon";
import {
  COMPANY_TYPE,
  type TCompanyData,
} from "~/entities/company/model/company.model";
import If from "~/features/abstract/if";
import {
  CardEmails,
  CardMessengers,
  CardPersons,
  CardPhoneNumbers,
} from "~/features/company/ui/card";
import {
  CompanyCardLabelTemplate,
  CompanyCardScroll,
} from "~/shared/ui/templates/company";

const CompanyCard = ({ item }: { item: TCompanyData }) => {
  const { company, persons, messengers, phones, emails } = item;
  return (
    <Card className={"w-full"}>
      <CardHeader>
        <CompanyCardLabelTemplate
          label={"Клиент:"}
          value={<span className={"text-primary-700"}>{company.name}</span>}
        />
      </CardHeader>
      <Divider />
      <CardBody className={"flex-1 space-y-2 overflow-hidden"}>
        <If condition={company.inn !== null}>
          <CompanyCardLabelTemplate label={"ИНН:"} value={company.inn} />
        </If>
        {company.type !== null && (
          <CompanyCardLabelTemplate
            label={"Вид:"}
            value={COMPANY_TYPE[company.type]}
          />
        )}
        {company.area && (
          <CompanyCardLabelTemplate
            label={"Сфера деятельности:"}
            value={company.area.name}
          />
        )}
        {company.comment && (
          <CompanyCardScroll>
            <span className="font-medium">Комментарий:</span>
            <div className="whitespace-pre-wrap break-all">
              {company.comment}
            </div>
          </CompanyCardScroll>
        )}

        {phones && phones?.length > 0 && (
          <>
            <Divider />

            <CardPhoneNumbers phones={phones} />
            <Divider />
          </>
        )}
        {emails && emails.length > 0 && (
          <>
            <CardEmails emails={emails} />
            <Divider />
          </>
        )}
        {messengers && messengers.length > 0 && (
          <>
            <CardMessengers messengers={messengers} />
            <Divider />
          </>
        )}
        {persons && persons.length > 0 && (
          <>
            <CardPersons persons={persons} />
            <Divider />
          </>
        )}
        <CompanyCardLabelTemplate
          label={"Дата создания:"}
          value={DateTime.fromISO(company.createdAt.toISOString())
            .setLocale("ru")
            .toFormat("DD")}
        />
      </CardBody>
    </Card>
  );
};

export default CompanyCard;
