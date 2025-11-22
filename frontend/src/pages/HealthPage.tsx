"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api";
import {
  CircleDot,
  ArrowLeft,
  Activity,
  Link as LinkIcon,
  HeartPulse,
  ExternalLink,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function fmtMs(n: number) {
  return n < 1000 ? `${n}ms` : `${(n / 1000).toFixed(2)}s`;
}

export default function HealthPage() {
  const navigate = useNavigate();

  const [status, setStatus] = useState<"up" | "down">("down");
  const [latency, setLatency] = useState<number | null>(null);
  const [lastChecked, setLastChecked] = useState<string | null>(null);

  const timerRef = useRef<any>(null);

  async function check() {
    const start = performance.now();
    try {
      const res = await apiClient.get("/healthz");
      setLatency(Math.round(performance.now() - start));
      setLastChecked(new Date().toISOString());
      setStatus(res.status === 200 ? "up" : "down");
    } catch {
      setStatus("down");
      setLatency(null);
      setLastChecked(new Date().toISOString());
    }
  }

  useEffect(() => {
    check();
    timerRef.current = setInterval(check, 10_000);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center flex-wrap gap-1 text-sm text-neutral-500">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-1 hover:text-neutral-800 dark:hover:text-neutral-300"
        >
          <ArrowLeft size={14} /> Back
        </button>
        <span>/</span>
        <span className="font-medium text-neutral-700 dark:text-neutral-300">
          System Health
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-3xl font-semibold">System Health</h1>
          <p className="text-neutral-500 text-sm">
            API uptime, latency & redirect checks.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={check} className="gap-2 w-full">
            <Activity size={16} /> Refresh
          </Button>
          <p className="text-xs text-neutral-500 sm:ml-2 sm:self-center">
            Last checked:{" "}
            <span className="font-medium">
              {lastChecked ? new Date(lastChecked).toLocaleString() : "—"}
            </span>
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* API Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CircleDot
                size={14}
                className={`${
                  status === "up" ? "text-green-500" : "text-red-500"
                } animate-pulse`}
              />
              API Status
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            <div
              className={`text-3xl font-semibold ${
                status === "up" ? "text-green-600" : "text-red-500"
              }`}
            >
              {status === "up" ? "UP" : "DOWN"}
            </div>
            <p className="text-sm text-neutral-500">
              {status === "up"
                ? "All systems operational."
                : "Backend unreachable."}
            </p>
          </CardContent>
        </Card>

        {/* Latency */}
        <Card>
          <CardHeader>
            <CardTitle>Latency</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-semibold">
              {latency != null ? fmtMs(latency) : "—"}
            </div>
            <p className="text-sm text-neutral-500">
              Time from frontend → /healthz → frontend.
            </p>
          </CardContent>
        </Card>

        {/* Redirect Test */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon size={16} /> Redirect Test
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <p className="text-sm text-neutral-500">
              Confirm redirect worker is functioning.
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <a
                className="px-3 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-md text-sm text-center"
                href={`${import.meta.env.VITE_SHORT_BASE_URL}/abc123`}
                target="_blank"
              >
                Test Redirect
              </a>

              <Button
                variant="outline"
                className="gap-2 w-full sm:w-auto"
                onClick={() =>
                  window.open(import.meta.env.VITE_SHORT_BASE_URL, "_blank")
                }
              >
                <ExternalLink size={14} /> Root URL
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 text-neutral-400 text-xs">
        <HeartPulse size={14} />
        Auto-refresh every 10 seconds.
      </div>
    </div>
  );
}
