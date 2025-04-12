import type { ReactNode } from "react";

const If = ({
  children,
  condition,
  fallback,
}: {
  children: ReactNode;
  condition: unknown;
  fallback?: ReactNode;
}) => {
  return !!condition ? children : fallback;
};

export default If;
