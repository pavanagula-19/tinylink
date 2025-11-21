import { useState } from "react";
import { Card } from "@/components/ui/card";

export default function StatsPage() {
  const [data, setData] = useState<any>(null);

  if (!data) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="container mx-auto px-6 py-10 max-w-3xl">
      <Card className="p-6">
        <h3 className="text-xl font-semibold">Stats for {data.code}</h3>
        <div className="mt-4 space-y-3">
          <div>
            <div className="text-sm text-muted">Target</div>
            <div>{data.targetUrl}</div>
          </div>
          <div>
            <div className="text-sm text-muted">Clicks</div>
            <div className="text-lg font-bold">{data.clicks}</div>
          </div>
          <div>
            <div className="text-sm text-muted">Last Clicked</div>
            <div>
              {data.lastClicked
                ? new Date(data.lastClicked).toLocaleString()
                : "-"}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
