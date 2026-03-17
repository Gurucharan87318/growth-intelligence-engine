"use client";

import { useEffect, useState } from "react";
import { Database, Wifi } from "lucide-react";

import { Badge } from "@/components/ui/badge";

type LiveDataStatusProps = {
  source?: string;
};

function formatSyncTime(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function LiveDataStatus({
  source = "Supabase backend",
}: LiveDataStatusProps) {
  const [syncedAt, setSyncedAt] = useState("");

  useEffect(() => {
    setSyncedAt(formatSyncTime(new Date()));
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge className="border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
        <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        Live
      </Badge>

      <Badge
        variant="secondary"
        className="bg-slate-100 text-slate-700 hover:bg-slate-100"
      >
        <Database className="mr-1 h-3.5 w-3.5" />
        {source}
      </Badge>

      <Badge
        variant="secondary"
        className="bg-slate-100 text-slate-600 hover:bg-slate-100"
      >
        <Wifi className="mr-1 h-3.5 w-3.5" />
        Last synced:{" "}
        <span suppressHydrationWarning>
          {syncedAt || "Syncing..."}
        </span>
      </Badge>
    </div>
  );
}
