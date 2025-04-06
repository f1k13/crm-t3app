import { User } from "@heroui/react";
import { MonitorCog } from "lucide-react";
import type { IUser } from "~/entities/user/model/user.model";

const TopSidebar = () => {
  return (
    <>
      <div className={"flex items-center gap-2"}>
        <MonitorCog />
        <span className="text-xl font-semibold">CRM</span>
      </div>
    </>
  );
};

export default TopSidebar;
