"use client";

import { AuthTemplate } from "~/app/_templates/auth";
import ResetForm from "../_components/reset-form";
import { Suspense } from "react";
import { Spinner } from "@heroui/react";

const Page = () => {
  return (
    <AuthTemplate title={"Изменения пароля"}>
      <Suspense fallback={<Spinner />}>
        <ResetForm />
      </Suspense>
    </AuthTemplate>
  );
};

export default Page;
