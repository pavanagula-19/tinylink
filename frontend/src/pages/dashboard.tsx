import LinksTable from "@/components/link-table";

export default function Dashboard() {
  return (
    <div className="px-3 sm:px-8 py-6">
      <div className="border border-gray-200 bg-white rounded-2xl p-4 sm:p-6 min-h-[400px] shadow-sm">
        <LinksTable />
      </div>
    </div>
  );
}
