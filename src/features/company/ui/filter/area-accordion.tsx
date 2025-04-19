import { Accordion, AccordionItem, Checkbox } from "@heroui/react";
import React from "react";
import { useGetAreas } from "~/entities/area/hooks/use-get-area";
import { FlexCol, FlexColG4 } from "~/shared/ui/templates/common";

const AreaAccordion = () => {
  const { data, isLoading } = useGetAreas();

  return (
    <Accordion>
      <AccordionItem key={"1"} title={"Сфера деятельности"}>
        <FlexColG4>
          {data?.map((it) => <Checkbox key={it.id}>{it.name}</Checkbox>)}
        </FlexColG4>
      </AccordionItem>
    </Accordion>
  );
};

export default AreaAccordion;
