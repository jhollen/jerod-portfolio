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

// Static cache shown when the GitHub API is unreachable (rate-limited,
// offline, or blocked). Seeded from the real repo list so the panel
// always renders something useful instead of a LINK_FAILURE.
const FALLBACK_REPOS: GitHubRepo[] = [
  { id: 1, name: "half-dollars", description: "Repo for my freelance shop website", stargazers_count: 0, language: "TypeScript", updated_at: "2026-07-03T00:00:00Z" },
  { id: 2, name: "jerod-portfolio", description: "This site — hardware-emulated portfolio console", stargazers_count: 1, language: "TypeScript", updated_at: "2026-03-25T00:00:00Z" },
  { id: 3, name: "LeetCode-Practice", description: "Data structures and algorithms practice", stargazers_count: 0, language: "C++", updated_at: "2026-03-24T00:00:00Z" },
  { id: 4, name: "bogardt", description: "Band website", stargazers_count: 0, language: "TypeScript", updated_at: "2026-03-23T00:00:00Z" },
  { id: 5, name: "rails-image-optimizer-demo", description: "Build-time image optimization pipeline demo", stargazers_count: 0, language: "HTML", updated_at: "2025-10-22T00:00:00Z" },
  { id: 6, name: "OurCalendSQL", description: "Addition of SQL database", stargazers_count: 1, language: "Java", updated_at: "2025-10-13T00:00:00Z" },
  { id: 7, name: "multi", description: "Multi-purpose JavaScript experiments", stargazers_count: 0, language: "JavaScript", updated_at: "2025-10-13T00:00:00Z" },
  { id: 8, name: "task-manager", description: "A simple task manager app with Vue.js", stargazers_count: 0, language: "Vue", updated_at: "2024-03-19T00:00:00Z" },
  { id: 9, name: "Jerodhollen.github.io", description: "Personal landing page", stargazers_count: 0, language: "HTML", updated_at: "2021-12-03T00:00:00Z" },
  { id: 10, name: "OurCalendarApp", description: "Native Android calendar app", stargazers_count: 0, language: "Java", updated_at: "2020-05-15T00:00:00Z" },
];

const FALLBACK_EVENTS: GitHubEvent[] = [
  { id: "c1", type: "PushEvent", repo: { name: "jhollen/half-dollars" }, created_at: "2026-07-03T00:00:00Z", payload: {} },
  { id: "c2", type: "PushEvent", repo: { name: "jhollen/jerod-portfolio" }, created_at: "2026-03-25T00:00:00Z", payload: {} },
  { id: "c3", type: "PushEvent", repo: { name: "jhollen/LeetCode-Practice" }, created_at: "2026-03-24T00:00:00Z", payload: {} },
  { id: "c4", type: "PushEvent", repo: { name: "jhollen/bogardt" }, created_at: "2026-03-23T00:00:00Z", payload: {} },
  { id: "c5", type: "CreateEvent", repo: { name: "jhollen/rails-image-optimizer-demo" }, created_at: "2025-10-22T00:00:00Z", payload: {} },
];

export const GitHubDisplay = () => {
  const { activePreset, addLogMessage } = useConsoleStore();
  const [viewMode, setViewMode] = React.useState<ViewMode>("FEED");
  const [events, setEvents] = React.useState<GitHubEvent[]>([]);
  const [repos, setRepos] = React.useState<GitHubRepo[]>([]);
  const [selectedRepo, setSelectedRepo] = React.useState<string | null>(null);
  const [repoDetails, setRepoDetails] = React.useState<GitHubPR[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isLive, setIsLive] = React.useState(true);
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
      setIsLive(true);
    } catch (err: unknown) {
      // API unreachable — serve the static cache instead of an error state.
      setEvents(FALLBACK_EVENTS);
      setError(null);
      setIsLive(false);
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
      setIsLive(true);
    } catch (err: unknown) {
      // API unreachable — serve the static cache instead of an error state.
      setRepos(FALLBACK_REPOS);
      setError(null);
      setIsLive(false);
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
      setIsLive(true);
    } catch (err: unknown) {
      setRepoDetails([]);
      setError(null);
      setIsLive(false);
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
    <div className={`w-full h-48 border-2 border-[#1a1a1a] rounded p-2 overflow-hidden flex flex-col font-mono text-[10px] shadow-[inset:0_2px_10px_rgba(0,0,0,0.8)] transition-colors duration-500 ${themeColors.text} bg-[#050505]`}>

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
          <span className={isLive ? `animate-pulse ${themeColors.text}` : "text-amber-500/80"}>● {isLive ? "LIVE_SYNC" : "CACHED_SYNC"}</span>
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

      </div>
    </div>
  );
};
