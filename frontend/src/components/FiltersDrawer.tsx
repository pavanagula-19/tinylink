"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";

import { Filter, Calendar, Hash, MousePointer2 } from "lucide-react";

export interface Filters {
  code?: string;
  minClicks?: number;
  maxClicks?: number;
  from?: string;
  to?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  initialFilters: Filters;
  onApply: (filters: Filters) => void;
  onReset: () => void;
}

export default function FiltersDrawer({
  open,
  onClose,
  initialFilters,
  onApply,
  onReset,
}: Props) {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const setField = (field: keyof Filters, value: any) =>
    setFilters((prev) => ({ ...prev, [field]: value }));

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="
          w-[440px] sm:w-[480px]
           dark:bg-neutral-900 
          backdrop-blur-md
          border-l-0 shadow-xl 
          px-8 py-10
        "
      >
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center gap-2 text-xl font-semibold">
            <Filter size={18} className="text-neutral-500" />
            Filters
          </SheetTitle>
          <p className="text-sm text-neutral-500">
            Refine your link list using flexible filters.
          </p>
        </SheetHeader>

        <div className="space-y-8">
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-wide text-neutral-400 flex items-center gap-1">
              <Hash size={14} /> Short Code
            </div>

            <input
              className="w-full px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700 outline-none border-0"
              placeholder="Enter code"
              value={filters.code ?? ""}
              onChange={(e) => setField("code", e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <div className="text-xs uppercase tracking-wide text-neutral-400 flex items-center gap-1">
              <MousePointer2 size={14} /> Clicks Range
            </div>

            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="Min"
                value={filters.minClicks ?? ""}
                onChange={(e) => setField("minClicks", Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700 outline-none border-0"
              />

              <span className="text-neutral-400">—</span>

              <input
                type="number"
                placeholder="Max"
                value={filters.maxClicks ?? ""}
                onChange={(e) => setField("maxClicks", Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700 outline-none border-0"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs uppercase tracking-wide text-neutral-400 flex items-center gap-1">
              <Calendar size={14} /> Date Range
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-neutral-500">From</label>
                <input
                  type="date"
                  value={filters.from ?? ""}
                  onChange={(e) => setField("from", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700 outline-none border-0"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-500">To</label>
                <input
                  type="date"
                  value={filters.to ?? ""}
                  onChange={(e) => setField("to", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700 outline-none border-0"
                />
              </div>
            </div>
          </div>
        </div>

        <SheetFooter className="mt-10 flex gap-3">
          <Button
            variant="outline"
            className="w-full border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            onClick={() => {
              setFilters({});
              onReset();
            }}
          >
            Reset
          </Button>

          <Button
            className="w-full bg-black text-white hover:bg-neutral-800 dark: dark:text-black dark:hover:bg-neutral-200"
            onClick={() => {
              onApply(filters);
              onClose();
            }}
          >
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
