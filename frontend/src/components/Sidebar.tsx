"use client";

import { useNavigate, useLocation } from "react-router-dom";
import {
  Link as LinkIcon,
  BarChart2,
  Activity,
  BadgeCheck,
} from "lucide-react";
import PATH from "@/routes/path";

export default function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const Item = ({
    label,
    icon,
    path,
  }: {
    label: string;
    icon: any;
    path: string;
  }) => (
    <div
      onClick={() => navigate(path)}
      className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer
        ${
          pathname === path
            ? "bg-blue-50 text-blue-600"
            : "text-gray-600 hover:bg-gray-100"
        }`}
    >
      {icon} <span>{label}</span>
    </div>
  );

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-blue-600 w-8 h-8 rounded-md flex items-center justify-center">
          <BadgeCheck size={18} className="text-white" />
        </div>
        <h1 className="font-semibold text-lg">TinyLink</h1>
      </div>

      <Item
        label="Dashboard"
        icon={<LinkIcon size={18} />}
        path={PATH.DASHBOARD}
      />
      <Item label="Stats" icon={<BarChart2 size={18} />} path={PATH.STATS} />
      <Item
        label="Health Check"
        icon={<Activity size={18} />}
        path={PATH.HEALTH}
      />
    </div>
  );
}
