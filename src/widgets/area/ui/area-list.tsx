import { Card, CardBody, Spinner } from "@heroui/react";
import React from "react";
import { useGetAreas } from "~/entities/area/hooks/use-get-area";
import If from "~/features/abstract/if";

const AreaList = () => {
  const { data, isLoading } = useGetAreas();
  return (
    <If condition={!isLoading} fallback={<Spinner />}>
      {data?.map((it) => (
        <Card key={it.id}>
          <CardBody>{it.name}</CardBody>
        </Card>
      ))}
    </If>
  );
};

export default AreaList;
