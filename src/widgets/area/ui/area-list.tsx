import { Card, CardBody, ScrollShadow, Spinner } from "@heroui/react";
import React from "react";
import { useGetAreas } from "~/entities/area/hooks/use-get-area";
import If from "~/features/abstract/if";

const AreaList = () => {
  const { data, isLoading } = useGetAreas();
  return (
    <If condition={!isLoading} fallback={<Spinner />}>
      <ScrollShadow
        hideScrollBar
        size={0}
        className={"flex max-h-[200px] flex-col gap-2"}
      >
        {data?.map((it) => (
          <Card key={it.id}>
            <CardBody>{it.name}</CardBody>
          </Card>
        ))}
      </ScrollShadow>
    </If>
  );
};

export default AreaList;
