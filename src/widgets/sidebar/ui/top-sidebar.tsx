import { MonitorCog } from "lucide-react";

const TopSidebar = () => {
  return (
    <div className={"flex items-center gap-2"}>
      <MonitorCog />
      <span className="text-xl font-semibold">CRM</span>
    </div>
  );
};

export default TopSidebar;
