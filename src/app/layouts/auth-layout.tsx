import React, { type ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-semibold">Логин</h2>
        <div className="w-full space-y-4">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
