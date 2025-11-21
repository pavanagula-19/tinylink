import { useState } from "react";
import { Pencil, Trash2, Filter, ChevronDown } from "lucide-react";
import EmptyState from "./EmptyState";

const dummyLinks = [
  {
    code: "abc123",
    targetUrl: "https://google.com",
    clicks: 120,
    lastClicked: "Today",
    createdAt: "5th May",
  },
  {
    code: "myblog89",
    targetUrl: "https://blog.com/post",
    clicks: 50,
    lastClicked: "Yesterday",
    createdAt: "2nd May",
  },
  {
    code: "yt0099",
    targetUrl: "https://youtube.com/watch?v=1",
    clicks: 500,
    lastClicked: "Today",
    createdAt: "1st May",
  },
];

export default function LinksTable() {
  const [links, setLinks] = useState(dummyLinks);
  const [selected, setSelected] = useState<string[]>([]);

  // delete a row
  const deleteRow = (code: string) => {
    setLinks((prev) => prev.filter((l) => l.code !== code));
  };

  // toggle select checkbox
  const toggleSelect = (code: string) => {
    setSelected((prev) =>
      prev.includes(code) ? prev.filter((id) => id !== code) : [...prev, code]
    );
  };

  // delete selected rows
  const deleteSelected = () => {
    setLinks((prev) => prev.filter((l) => !selected.includes(l.code)));
    setSelected([]);
  };

  // If empty → show empty state
  if (links.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3">
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 border border-gray-300 rounded-md text-sm flex items-center gap-2">
            <Filter size={16} /> Add Filter
          </button>

          <span className="text-xs bg-gray-100 px-2 py-1 rounded-md">
            Code is <span className="font-medium">abc123</span> ✕
          </span>
        </div>

        <button className="text-sm flex items-center gap-1 text-gray-600 hover:text-black">
          Saved Filters
        </button>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between">
        <button className="px-3 py-1.5 border border-gray-300 rounded-md text-sm flex items-center gap-2">
          Actions <ChevronDown size={14} />
        </button>

        {selected.length > 0 ? (
          <button
            onClick={deleteSelected}
            className="px-3 py-1.5 bg-red-500 text-white rounded-md text-sm"
          >
            Delete Selected
          </button>
        ) : (
          <button className="px-3 py-1.5 border border-gray-300 rounded-md text-sm flex items-center gap-2">
            Export CSV
          </button>
        )}
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3">
                <input type="checkbox" disabled className="opacity-50" />
              </th>
              <th className="px-4 py-3 text-left">Short Code</th>
              <th className="px-4 py-3 text-left">Target URL</th>
              <th className="px-4 py-3 text-left">Clicks</th>
              <th className="px-4 py-3 text-left">Last Clicked</th>
              <th className="px-4 py-3 text-left">Created At</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {links.map((row) => (
              <tr
                key={row.code}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selected.includes(row.code)}
                    onChange={() => toggleSelect(row.code)}
                  />
                </td>

                <td className="px-4 py-3 font-medium">{row.code}</td>

                <td className="px-4 py-3 text-gray-600 truncate max-w-[180px]">
                  {row.targetUrl}
                </td>

                <td className="px-4 py-3">{row.clicks}</td>

                <td className="px-4 py-3">{row.lastClicked}</td>

                <td className="px-4 py-3">{row.createdAt}</td>

                <td className="px-4 py-3 text-right">
                  <button className="text-blue-600 hover:opacity-70 mr-3">
                    <Pencil size={16} />
                  </button>
                  <button
                    className="text-red-500 hover:opacity-70"
                    onClick={() => deleteRow(row.code)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end pt-2">
        <button className="px-3 py-1.5 border text-sm rounded-md flex items-center gap-2">
          25 per page <ChevronDown size={14} />
        </button>
        <span className="text-sm text-gray-500 ml-3">
          1–3 of {links.length}
        </span>
      </div>
    </div>
  );
}
