"use client";

import * as React from "react";
import { useConsoleStore } from "@/app/useConsoleStore";

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    commits?: Array<{ message: string }>;
  };
}

export const GitHubDisplay = () => {
  const [events, setEvents] = React.useState<GitHubEvent[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const { activePreset, addLogMessage } = useConsoleStore();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        addLogMessage("GITHUB_HANDSHAKE_INITIATED...");
        const res = await fetch("https://api.github.com/users/jhollen/events/public?per_page=10");
        if (!res.ok) throw new Error("UPSTREAM_LINK_FAILURE");
        const data = await res.json();
        setEvents(data);
        addLogMessage("GITHUB_SYNC_COMPLETE.");
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "UNKNOWN_COMM_ERROR";
        setError(message);
        addLogMessage(`GITHUB_SYNC_ERROR: ${message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
    const interval = setInterval(fetchEvents, 300000); // Sync every 5 mins
    return () => clearInterval(interval);
  }, [addLogMessage]);

  const getThemeStyles = () => {
    switch (activePreset) {
      case "RETRO":
        return "text-[#facc15] bg-[#3e2723] border-[#facc15]";
      case "HACKER":
        return "text-[#22d3ee] bg-[#020617] border-[#22d3ee]";
      default:
        return "text-[#1a2015] bg-[#e8e9e4] border-[#1a2015]";
    }
  };

  const formatEventType = (type: string) => {
    return type.replace("Event", "").toUpperCase();
  };

  const formatRepoName = (name: string) => {
    return name.split("/")[1] || name;
  };

  return (
    <div className={`w-full h-32 border-2 rounded p-2 overflow-hidden flex flex-col font-mono text-[10px] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] transition-colors duration-300 ${getThemeStyles()}`}>
      <div className="flex justify-between items-center border-b border-current pb-1 mb-1 opacity-70">
        <span className="font-bold tracking-widest">SECONDARY_FEED: GITHUB_REMOTE</span>
        <span className="animate-pulse">● LIVE_SYNC</span>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1 [&::-webkit-scrollbar]:hidden">
        {loading && <p className="animate-pulse">SYNCING_REMOTE_DATA...</p>}
        {error && <p className="text-red-500 font-bold">COMM_LINK_ERROR: {error}</p>}
        {!loading && !error && events.map((event) => (
          <div key={event.id} className="flex gap-2 whitespace-nowrap opacity-80 hover:opacity-100 transition-opacity">
            <span className="font-bold">[{formatEventType(event.type)}]</span>
            <span className="opacity-60">{new Date(event.created_at).toLocaleDateString()}</span>
            <span>{formatRepoName(event.repo.name)}</span>
            {event.type === "PushEvent" && (
              <span className="opacity-50 italic truncate">
                {event.payload.commits?.[0]?.message || "COMMIT_PUSHED"}
              </span>
            )}
          </div>
        ))}
        {!loading && !error && events.length === 0 && <p>NO_RECENT_UPSTREAM_ACTIVITY</p>}
      </div>
    </div>
  );
};
