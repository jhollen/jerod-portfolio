"use client";

import * as React from "react";
import { useConsoleStore } from "@/app/useConsoleStore";

const GITHUB_USERNAME = "jhollen"; // Centralized username

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
        setLoading(true);
        addLogMessage(`GITHUB_SYNC: Initializing for [${GITHUB_USERNAME}]...`);
        
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`, {
          headers: {
            "Accept": "application/vnd.github.v3+json",
          }
        });

        if (!res.ok) {
          if (res.status === 403) throw new Error("RATE_LIMIT_EXCEEDED");
          if (res.status === 404) throw new Error("USER_NOT_FOUND");
          throw new Error(`STATUS_${res.status}`);
        }

        const data = await res.json();
        setEvents(data);
        setError(null);
        addLogMessage("GITHUB_SYNC: Connection established.");
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "COMM_FAILURE";
        setError(message);
        addLogMessage(`GITHUB_ERROR: ${message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
    const interval = setInterval(fetchEvents, 300000); // 5 mins
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
        <span className="font-bold tracking-widest uppercase">Feed: GitHub_Remote [{GITHUB_USERNAME}]</span>
        <div className="flex items-center gap-2">
          {loading && <span className="animate-spin">⟳</span>}
          <span className={`${error ? "text-red-500 animate-pulse" : "animate-pulse"}`}>● {error ? "LINK_FAILURE" : "LIVE_SYNC"}</span>
        </div>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1 [&::-webkit-scrollbar]:hidden">
        {loading && events.length === 0 && <p className="animate-pulse">NEGOTIATING_HANDSHAKE...</p>}
        {error && (
          <div className="flex flex-col gap-1 text-red-500 font-bold">
            <p>COMM_LINK_ERROR: {error}</p>
            <p className="opacity-50 text-[8px]">CHECK_UPSTREAM_CONNECTION_OR_RATE_LIMITS</p>
          </div>
        )}
        {!error && events.map((event) => (
          <div key={event.id} className="flex gap-2 whitespace-nowrap opacity-80 hover:opacity-100 transition-opacity">
            <span className="font-bold shrink-0">[{formatEventType(event.type)}]</span>
            <span className="opacity-60 shrink-0">{new Date(event.created_at).toLocaleDateString()}</span>
            <span className="font-bold truncate max-w-[100px]">{formatRepoName(event.repo.name)}</span>
            {event.type === "PushEvent" && (
              <span className="opacity-50 italic truncate">
                - {event.payload.commits?.[0]?.message || "COMMIT_PUSHED"}
              </span>
            )}
          </div>
        ))}
        {!loading && !error && events.length === 0 && <p>NO_RECENT_UPSTREAM_ACTIVITY</p>}
      </div>
    </div>
  );
};
