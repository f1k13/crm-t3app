import type { ReactNode } from "react";

const SidebarTemplate = ({
  list,
  top,
  bottom,
}: {
  list: ReactNode;
  top: ReactNode;
  bottom: ReactNode;
}) => {
  return (
    <aside className="light: flex h-full w-56 flex-col justify-between bg-default-300 px-4 py-6 dark:bg-default-100">
      <div>
        <div className={"flex items-center gap-1"}>{top}</div>
        <div className={"mt-5 flex flex-col gap-2"}>{list}</div>
      </div>
      <div>{bottom}</div>
    </aside>
  );
};

export default SidebarTemplate;
