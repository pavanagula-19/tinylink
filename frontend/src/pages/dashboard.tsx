import LinksTable from "@/components/link-table";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function Dashboard() {
  return (
    <div className="flex bg-[#F7F9FC]">
      <Sidebar />

      <div className="flex-1 min-h-screen">
        <Topbar />

        <div className="p-8">
          <div className="border border-gray-200 rounded-2xl bg-white p-6 min-h-[400px]">
            <LinksTable />
          </div>
        </div>
      </div>
    </div>
  );
}
