"use client";

import * as React from "react";
import { useConsoleStore } from "@/app/useConsoleStore";

const GITHUB_USERNAME = "jhollen";

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    commits?: Array<{ message: string }>;
  };
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
}

interface GitHubPR {
  id: number;
  title: string;
  state: string;
  created_at: string;
  user: { login: string };
}

type ViewMode = "FEED" | "REPOS" | "REPO_DETAIL";

export const GitHubDisplay = () => {
  const { activePreset, addLogMessage } = useConsoleStore();
  const [viewMode, setViewMode] = React.useState<ViewMode>("FEED");
  const [events, setEvents] = React.useState<GitHubEvent[]>([]);
  const [repos, setRepos] = React.useState<GitHubRepo[]>([]);
  const [selectedRepo, setSelectedRepo] = React.useState<string | null>(null);
  const [repoDetails, setRepoDetails] = React.useState<GitHubPR[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Dynamic Theme Colors
  const themeColors = React.useMemo(() => {
    if (activePreset === "HACKER") return { text: "text-[#00f3ff]", border: "border-[#00f3ff]/30", dot: "text-[#00f3ff]", scroll: "scrollbar-hacker" };
    if (activePreset === "RETRO") return { text: "text-[#ffb000]", border: "border-[#ffb000]/30", dot: "text-[#ffb000]", scroll: "scrollbar-retro" };
    return { text: "text-[#8fb379]", border: "border-[#8fb379]/30", dot: "text-[#8fb379]", scroll: "scrollbar-original" };
  }, [activePreset]);

  const getHeaders = React.useCallback(() => {
    const headers: Record<string, string> = {
      "Accept": "application/vnd.github.v3+json",
    };
    if (process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
      headers["Authorization"] = `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`;
    }
    return headers;
  }, []);

  const fetchEvents = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`, {
        headers: getHeaders()
      });
      if (!res.ok) throw new Error(`STATUS_${res.status}`);
      const data = await res.json();
      setEvents(data);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "COMM_FAILURE");
    } finally {
      setLoading(false);
    }
  }, [getHeaders]);

  const fetchRepos = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`, {
        headers: getHeaders()
      });
      if (!res.ok) throw new Error(`STATUS_${res.status}`);
      const data = await res.json();
      setRepos(data);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "COMM_FAILURE");
    } finally {
      setLoading(false);
    }
  }, [getHeaders]);

  const fetchRepoPRs = React.useCallback(async (repoName: string) => {
    try {
      setLoading(true);
      const res = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/pulls?state=all&per_page=10`, {
        headers: getHeaders()
      });
      if (!res.ok) throw new Error(`STATUS_${res.status}`);
      const data = await res.json();
      setRepoDetails(data);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "COMM_FAILURE");
    } finally {
      setLoading(false);
    }
  }, [getHeaders]);

  React.useEffect(() => {
    if (viewMode === "FEED") fetchEvents();
    if (viewMode === "REPOS") fetchRepos();
  }, [viewMode, fetchEvents, fetchRepos]);

  const handleRepoClick = (repoName: string) => {
    setSelectedRepo(repoName);
    setViewMode("REPO_DETAIL");
    fetchRepoPRs(repoName);
    addLogMessage(`GITHUB_UPLINK: Fetching activity for [${repoName}]`);
  };

  const formatRepoName = (name: string) => name.split("/")[1] || name;

  return (
    <div className={`w-full h-32 border-2 border-[#1a1a1a] rounded p-2 overflow-hidden flex flex-col font-mono text-[10px] shadow-[inset:0_2px_10px_rgba(0,0,0,0.8)] transition-colors duration-500 ${themeColors.text} bg-[#050505]`}>
      <div className={`flex justify-between items-center border-b ${themeColors.border} pb-1 mb-1 opacity-70`}>
        <div className="flex gap-2 text-[9px]">
          <button 
            onClick={() => setViewMode("FEED")}
            className={`uppercase tracking-widest hover:text-white transition-colors ${viewMode === "FEED" ? "font-bold underline" : "opacity-50"}`}
          >
            Feed
          </button>
          <span className="opacity-20">|</span>
          <button 
            onClick={() => setViewMode("REPOS")}
            className={`uppercase tracking-widest hover:text-white transition-colors ${viewMode === "REPOS" || viewMode === "REPO_DETAIL" ? "font-bold underline" : "opacity-50"}`}
          >
            Repos
          </button>
        </div>
        <div className="flex items-center gap-2">
          {loading && <span className="animate-spin opacity-50 text-[8px]">⟳</span>}
          <span className={`${error ? "text-red-900 animate-pulse" : `animate-pulse ${themeColors.text}`}`}>● {error ? "LINK_FAILURE" : "LIVE_SYNC"}</span>
        </div>
      </div>
      
      <div ref={scrollRef} className={`flex-1 overflow-y-auto space-y-1 [&::-webkit-scrollbar]:hidden ${themeColors.scroll}`}>
        {loading && events.length === 0 && repos.length === 0 && <p className="animate-pulse opacity-50 uppercase text-[8px]">Negotiating_Handshake...</p>}
        
        {viewMode === "FEED" && !error && events.map((event) => (
          <div key={event.id} className="flex gap-2 whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity">
            <span className="font-bold shrink-0 opacity-80">[{event.type.replace("Event", "").toUpperCase()}]</span>
            <span className="opacity-40 shrink-0">{new Date(event.created_at).toLocaleDateString()}</span>
            <span className="font-bold truncate max-w-[100px] underline decoration-dotted">{formatRepoName(event.repo.name)}</span>
            {event.type === "PushEvent" && (
              <span className="opacity-40 italic truncate">- {event.payload.commits?.[0]?.message || "COMMIT_PUSHED"}</span>
            )}
          </div>
        ))}

        {viewMode === "REPOS" && !error && repos.map((repo) => (
          <button 
            key={repo.id} 
            onClick={() => handleRepoClick(repo.name)}
            className="flex w-full gap-2 whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity text-left outline-none"
          >
            <span className="font-bold shrink-0 opacity-80">[REPO]</span>
            <span className="font-bold truncate max-w-[120px] underline decoration-dotted">{repo.name}</span>
            <span className="opacity-40 truncate flex-1 italic">{repo.description || "NO_DESC"}</span>
            <span className="opacity-40 shrink-0">★{repo.stargazers_count}</span>
          </button>
        ))}

        {viewMode === "REPO_DETAIL" && !error && (
          <div className="space-y-1">
            <div className={`flex justify-between border-b ${themeColors.border} pb-1 mb-1`}>
              <span className="font-black uppercase tracking-widest opacity-90">Activity: {selectedRepo}</span>
              <button onClick={() => setViewMode("REPOS")} className="opacity-50 hover:opacity-100 italic underline text-[8px]">[Back]</button>
            </div>
            {repoDetails.length === 0 && !loading && <p className="opacity-40 italic text-[8px]">NO_PULL_REQUESTS_FOUND</p>}
            {repoDetails.map((pr) => (
              <div key={pr.id} className="flex gap-2 whitespace-nowrap opacity-60 text-[9px]">
                <span className={`font-bold shrink-0 ${pr.state === "open" ? "text-emerald-500" : "text-purple-500"}`}>[{pr.state.toUpperCase()}]</span>
                <span className="truncate flex-1">{pr.title}</span>
                <span className="opacity-40 shrink-0 italic">@{pr.user.login}</span>
              </div>
            ))}
          </div>
        )}

        {error && <p className="text-red-900 font-bold opacity-80 uppercase text-[8px]">Comm_Link_Error: {error}</p>}
      </div>
    </div>
  );
};
