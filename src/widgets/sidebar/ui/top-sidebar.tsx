import { MonitorCog } from "lucide-react";

const TopSidebar = () => {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <MonitorCog className="h-6 w-6 text-primary" />
      <span className="text-xl font-semibold tracking-tight">
        CRM Апогей строй
      </span>
    </div>
  );
};

export default TopSidebar;
