"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getLinkByCodeRequest } from "@/redux/slices/links-slice";
import { selectLinks } from "@/redux/selectors/links-selectors";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Copy, ExternalLink, ArrowLeft } from "lucide-react";
import { getShortUrl } from "@/lib/short-url";

function formatDate(d?: string | null) {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleString();
  } catch {
    return d;
  }
}

function Sparkline({ values }: { values: number[] }) {
  if (!values || values.length === 0) return null;

  const width = 260;
  const height = 50;
  const max = Math.max(...values);
  const min = Math.min(...values);

  const norm = (v: number) =>
    max === min ? height / 2 : height - ((v - min) / (max - min)) * height;

  const step = width / Math.max(1, values.length - 1);
  const points = values.map((v, i) => `${i * step},${norm(v)}`).join(" ");

  return (
    <div className="overflow-x-auto">
      <svg
        width={width}
        height={height}
        className="min-w-[260px] text-blue-500"
        viewBox={`0 0 ${width} ${height}`}
      >
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          points={points}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function CodeStats() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const links = useAppSelector(selectLinks);

  const [loading, setLoading] = useState(false);

  const link = links.find((l: any) => l.code === code);

  useEffect(() => {
    if (!code) return;
    setLoading(true);

    dispatch(getLinkByCodeRequest({ code }));

    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [code]);

  const sparkValues = useMemo(() => {
    if (!link) return [];

    const clicks = link.clicks || 0;
    const base = Math.floor(clicks / 8);

    return Array.from({ length: 8 }, (_, i) =>
      Math.round(base * (i * 0.7 + 1) + (i === 7 ? clicks % 8 : 1))
    );
  }, [link]);

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(getShortUrl(code));
    toast.success("Short URL copied!");
  };

  const handleOpen = () => {
    if (!code) return;
    window.open(getShortUrl(code), "_blank");
  };

  if (!code)
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>No code provided</CardTitle>
          </CardHeader>
          <CardContent>Use a link such as /code/abc123</CardContent>
        </Card>
      </div>
    );

  return (
    <div className="p-4 sm:p-6 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Detailed insight for{" "}
            <span className="font-medium text-neutral-800">{code}</span>
          </p>
        </div>

        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="gap-2 w-full sm:w-auto"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2 order-2 lg:order-1 border-neutral-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <div className="text-xl font-semibold">{code}</div>
                <a
                  href={getShortUrl(code)}
                  target="_blank"
                  className="text-xs text-blue-600 underline"
                >
                  {getShortUrl(code)}
                </a>
              </div>

              {/* Actions */}
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  onClick={handleCopy}
                  className="gap-2 w-full sm:w-auto"
                >
                  <Copy size={14} /> Copy
                </Button>
                <Button onClick={handleOpen} className="gap-2 w-full sm:w-auto">
                  <ExternalLink size={14} /> Open
                </Button>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard label="Total Clicks" value={link?.clicks ?? 0} />
              <StatCard label="Created" value={formatDate(link?.createdAt)} />
              <StatCard
                label="Last Clicked"
                value={formatDate(link?.lastClicked)}
              />
            </div>

            <div>
              <p className="text-xs text-neutral-500 mb-1">Clicks trend</p>
              <Sparkline values={sparkValues} />
            </div>

            <div>
              <p className="text-xs text-neutral-500 mb-1">Target URL</p>
              <div className="p-3 bg-neutral-50 rounded-md break-words text-sm text-neutral-700">
                {link?.targetUrl}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4 order-1 lg:order-2">
          <Card className="border-neutral-200 shadow-sm">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-2">
              <Button onClick={handleCopy}>Copy Short URL</Button>
              <Button variant="outline" onClick={handleOpen}>
                Open Link
              </Button>
              <Button
                variant="ghost"
                onClick={() =>
                  navigator.clipboard.writeText(link?.targetUrl ?? "")
                }
              >
                Copy Target URL
              </Button>
            </CardContent>
          </Card>

          <Card className="border-neutral-200 shadow-sm">
            <CardHeader>
              <CardTitle>Meta</CardTitle>
            </CardHeader>

            <CardContent className="text-sm space-y-1">
              <MetaItem label="Code" value={link?.code} />
              <MetaItem label="Clicks" value={link?.clicks} />
              <MetaItem label="Created" value={formatDate(link?.createdAt)} />
              <MetaItem
                label="Last Clicked"
                value={formatDate(link?.lastClicked)}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: any }) {
  return (
    <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
      <p className="text-xs text-neutral-500">{label}</p>
      <p className="text-xl font-semibold mt-1">{value}</p>
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex justify-between text-neutral-700">
      <span>{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
