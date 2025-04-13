"use client";

import { Input } from "@heroui/react";
import React, { useState } from "react";
import { useSuggestCompany } from "~/entities/company/hooks/use-suggest-company";

const Page = () => {
  const [query, setQuery] = useState("");
  const suggestCompany = useSuggestCompany({ query });
  console.log(suggestCompany);
  return (
    <Input
      placeholder={"компания"}
      onChange={(e) => setQuery(e.target.value)}
      value={query}
    />
  );
};

export default Page;
