import { Card, CardBody, CardHeader } from "@heroui/react";
import { AreaAccordion } from "~/features/company/ui/filter";

const CompanyFilter = () => {
  return (
    <Card className={"w-[30%]"}>
      <CardHeader className={"flex justify-center"}>
        <span className={"text-2xl font-semibold"}>Фильтры</span>
      </CardHeader>
      <CardBody className={"scrollbar-hide"}>
        <AreaAccordion />
      </CardBody>
    </Card>
  );
};

export default CompanyFilter;
