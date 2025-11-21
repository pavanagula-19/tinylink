import {
  Link as LinkIcon,
  BarChart2,
  Activity,
  Settings,
  LifeBuoy,
  FileCode,
  BadgeCheck,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col justify-between p-4"
    >
      <div>
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <BadgeCheck className="text-white" size={18} />
          </div>
          <span className="text-lg font-semibold text-gray-900">TinyLink</span>
        </div>
        <nav className="space-y-2">
          <SidebarItem icon={<LinkIcon />} label="Dashboard" active />
          <SidebarItem icon={<BarChart2 />} label="Stats" />
          <SidebarItem icon={<Activity />} label="Health Check" />
          <SidebarItem icon={<FileCode />} label="API Docs" />

          <div className="pt-6">
            <SidebarItem icon={<Settings />} label="Settings" />
            <SidebarItem icon={<LifeBuoy />} label="Support" />
          </div>
        </nav>
      </div>

      <div className="flex items-center gap-3 p-2">
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
        <div>
          <p className="text-sm font-medium">User</p>
        </div>
      </div>
    </motion.aside>
  );
}

function SidebarItem({ icon, label, active }: any) {
  return (
    <div
      className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition ${
        active
          ? "bg-blue-50 text-blue-600 font-medium"
          : "text-gray-500 hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
    </div>
  );
}
