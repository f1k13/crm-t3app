import React, { type ReactNode } from "react";

const AuthTemplate = ({
  children,
  title,
}: {
  children: ReactNode;
  title: ReactNode;
}) => {
  return (
    <div className={"flex w-full flex-col gap-4"}>
      <h2 className="mb-6 text-center text-2xl font-semibold">{title}</h2>
      {children}
    </div>
  );
};

export default AuthTemplate;
