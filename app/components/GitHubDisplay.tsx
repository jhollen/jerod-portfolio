"use client";

import * as React from "react";
import { useConsoleStore } from "@/app/useConsoleStore";

const GITHUB_USERNAME = "jhollen"; // Centralized username

/*
  NOTE FOR RECRUITERS / COLLABORATORS:
  The GitHub API has a rate limit for unauthenticated requests (60 per hour per IP).
  To increase this limit, you can use a Personal Access Token (PAT).
  
  To authenticate:
  1. Generate a PAT in GitHub Settings.
  2. Add it to your .env.local as NEXT_PUBLIC_GITHUB_TOKEN.
  3. Uncomment the Authorization header in the fetch call below.
*/

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
            // "Authorization": `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}` // Uncomment to authenticate
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
    // Dark terminal style: Black background, Olive Green text
    return "text-[#8fb379] bg-[#050505] border-[#1a1a1a]";
  };

  const formatEventType = (type: string) => {
    return type.replace("Event", "").toUpperCase();
  };

  const formatRepoName = (name: string) => {
    return name.split("/")[1] || name;
  };

  return (
    <div className={`w-full h-32 border-2 rounded p-2 overflow-hidden flex flex-col font-mono text-[10px] shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)] transition-colors duration-300 ${getThemeStyles()}`}>
      <div className="flex justify-between items-center border-b border-[#8fb379]/30 pb-1 mb-1 opacity-70">
        <span className="font-bold tracking-widest uppercase">Feed: GitHub_Remote [{GITHUB_USERNAME}]</span>
        <div className="flex items-center gap-2">
          {loading && <span className="animate-spin text-[#8fb379]/50">⟳</span>}
          <span className={`${error ? "text-red-900 animate-pulse" : "animate-pulse text-[#8fb379]"}`}>● {error ? "LINK_FAILURE" : "LIVE_SYNC"}</span>
        </div>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1 [&::-webkit-scrollbar]:hidden">
        {loading && events.length === 0 && <p className="animate-pulse opacity-50">NEGOTIATING_HANDSHAKE...</p>}
        {error && (
          <div className="flex flex-col gap-1 text-red-900 font-bold opacity-80">
            <p>COMM_LINK_ERROR: {error}</p>
            <p className="opacity-50 text-[8px]">CHECK_UPSTREAM_CONNECTION_OR_RATE_LIMITS</p>
          </div>
        )}
        {!error && events.map((event) => (
          <div key={event.id} className="flex gap-2 whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity">
            <span className="font-bold shrink-0 text-[#8fb379]/80">[{formatEventType(event.type)}]</span>
            <span className="opacity-40 shrink-0">{new Date(event.created_at).toLocaleDateString()}</span>
            <span className="font-bold truncate max-w-[100px] text-[#8fb379]">{formatRepoName(event.repo.name)}</span>
            {event.type === "PushEvent" && (
              <span className="opacity-40 italic truncate">
                - {event.payload.commits?.[0]?.message || "COMMIT_PUSHED"}
              </span>
            )}
          </div>
        ))}
        {!loading && !error && events.length === 0 && <p className="opacity-40">NO_RECENT_UPSTREAM_ACTIVITY</p>}
      </div>
    </div>
  );
};
