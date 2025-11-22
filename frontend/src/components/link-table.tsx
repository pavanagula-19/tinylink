"use client";

import { useEffect, useState } from "react";
import {
  Pencil,
  Trash2,
  Filter,
  Plus,
  Copy,
  ExternalLink,
  HeartPulse,
  Activity,
} from "lucide-react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/hooks";

import {
  createLinkRequest,
  deleteLinkRequest,
  fetchLinksRequest,
} from "@/redux/slices/links-slice";

import {
  selectLinks,
  selectLinksLoading,
  selectLinksError,
  selectLinksPage,
  selectLinksLimit,
  selectLinksTotal,
  selectLinksPages,
} from "@/redux/selectors/links-selectors";

import FiltersDrawer, { type Filters } from "./FiltersDrawer";
import EditLinkModal from "./EditLinkModal";
import { useNavigate } from "react-router-dom";

export default function LinksTable() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const links = useAppSelector(selectLinks);
  const loading = useAppSelector(selectLinksLoading);
  const error = useAppSelector(selectLinksError);
  const page = useAppSelector(selectLinksPage);
  const limit = useAppSelector(selectLinksLimit);
  const total = useAppSelector(selectLinksTotal);
  const pages = useAppSelector(selectLinksPages);

  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState<{
    code: string;
    targetUrl: string;
  } | null>(null);

  const [selected, setSelected] = useState<string[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [targetUrl, setTargetUrl] = useState("");
  const [code, setCode] = useState("");

  const [activeFilters, setActiveFilters] = useState<Filters>({});

  useEffect(() => {
    dispatch(fetchLinksRequest({ page, limit, ...activeFilters }));
  }, [page, limit, activeFilters]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const addLink = () => {
    if (!targetUrl.startsWith("http")) {
      return toast.error("Invalid URL");
    }

    dispatch(createLinkRequest({ targetUrl, code: code || undefined }));
    setAddOpen(false);
    setTargetUrl("");
    setCode("");
  };

  const deleteRow = (codeVal: string) => {
    dispatch(deleteLinkRequest({ code: codeVal }));
    setSelected((prev) => prev.filter((c) => c !== codeVal));
  };

  const toggleSelect = (codeVal: string) => {
    setSelected((prev) =>
      prev.includes(codeVal)
        ? prev.filter((id) => id !== codeVal)
        : [...prev, codeVal]
    );
  };

  const onPageChange = (newPage: number) => {
    dispatch(fetchLinksRequest({ page: newPage, limit, ...activeFilters }));
  };

  const copyShortUrl = (code: string) => {
    const base = import.meta.env.VITE_SHORT_BASE_URL;

    if (!base) return toast.error("Short URL base missing");

    navigator.clipboard.writeText(`${base}/${code}`);
    toast.success("Copied!");
  };

  const openEdit = (row: any) => {
    setEditData({ code: row.code, targetUrl: row.targetUrl });
    setEditOpen(true);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => navigate("/healthz")} className="gap-2">
            <HeartPulse size={18} /> System Health
          </Button>

          <Button
            onClick={() => navigate("/dashboard")}
            className="gap-2"
            variant="outline"
          >
            <Activity size={18} /> Overview
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            className="gap-2"
            variant="outline"
            onClick={() => setFiltersOpen(true)}
          >
            <Filter size={16} /> Filters
          </Button>

          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus size={16} /> Add Link
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create Short Link</DialogTitle>
              </DialogHeader>

              <div className="space-y-4 mt-3">
                <Input
                  placeholder="https://example.com"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                />

                <Input
                  placeholder="Custom code (optional)"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />

                <Button className="w-full" onClick={addLink}>
                  Create
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <FiltersDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        initialFilters={activeFilters}
        onApply={(f) => setActiveFilters(f)}
        onReset={() => setActiveFilters({})}
      />

      <div className="border border-gray-200 rounded-xl shadow-sm overflow-x-auto">
        {loading && links.length === 0 ? (
          <div className="p-6 text-center">Loading links…</div>
        ) : (
          <table className="w-full min-w-[700px] text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 w-10"></th>
                <th className="px-4 py-3 text-left">Short Code</th>
                <th className="px-4 py-3 text-left">Target URL</th>
                <th className="px-4 py-3 text-left">Clicks</th>
                <th className="px-4 py-3 text-left">Created</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {links.map((row: any) => (
                <tr key={row.code} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={selected.includes(row.code)}
                      onChange={() => toggleSelect(row.code)}
                    />
                  </td>

                  <td
                    className="px-4 py-3 font-medium text-blue-600 cursor-pointer hover:underline"
                    onClick={() => navigate(`/code/${row.code}`)}
                  >
                    {row.code}
                  </td>

                  <td className="px-4 py-3 truncate max-w-[200px] text-gray-600">
                    {row.targetUrl}
                  </td>

                  <td className="px-4 py-3">{row.clicks}</td>

                  <td className="px-4 py-3">
                    {new Date(row.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3 text-right flex justify-end items-center gap-3">
                    <button
                      className="text-gray-600 hover:text-blue-500"
                      onClick={() => copyShortUrl(row.code)}
                    >
                      <Copy size={16} />
                    </button>

                    <a
                      href={`${import.meta.env.VITE_SHORT_BASE_URL}/${
                        row.code
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={16} />
                    </a>

                    <button
                      className="text-blue-600 hover:opacity-70"
                      onClick={() => openEdit(row)}
                    >
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
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
        <span className="text-sm text-gray-500">
          Showing {links.length} of {total} links
        </span>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            Prev
          </Button>

          <span className="text-sm">
            Page {page} / {pages}
          </span>

          <Button
            variant="ghost"
            disabled={page >= pages}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      {editData && (
        <EditLinkModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          code={editData.code}
          targetUrl={editData.targetUrl}
        />
      )}
    </div>
  );
}
