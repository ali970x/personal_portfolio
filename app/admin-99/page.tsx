"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import {
  Activity,
  BellRing,
  CalendarDays,
  Filter,
  LogOut,
  MonitorSmartphone,
  RefreshCw,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";

type AdminConfig = {
  configured: boolean;
  supabaseUrl: string;
  anonKey: string;
  adminEmail: string;
};

type VisitorEvent = {
  id?: string;
  occurred_at?: string;
  visitor_id?: string | null;
  session_id?: string | null;
  event_name?: string;
  project_id?: string | null;
  path?: string | null;
  referrer?: string | null;
  language?: string | null;
  timezone?: string | null;
  viewport_width?: number | null;
  viewport_height?: number | null;
  device_type?: string | null;
  browser?: string | null;
  operating_system?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
};

type VisitorProfile = {
  sessions: Set<string>;
  events: number;
};

function formatDate(value?: string) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function visitorKey(event: VisitorEvent, index: number) {
  return event.visitor_id ?? event.session_id ?? `anonymous-${index}`;
}

function todayStart() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.getTime();
}

export default function Admin99Page() {
  const [config, setConfig] = useState<AdminConfig | null>(null);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [events, setEvents] = useState<VisitorEvent[]>([]);
  const [status, setStatus] = useState("Loading visitor access...");
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState("");
  const [eventFilter, setEventFilter] = useState("all");
  const [deviceFilter, setDeviceFilter] = useState("all");
  const [visitorFilter, setVisitorFilter] = useState("all");

  const loadConfig = useCallback(async () => {
    const response = await fetch("/api/admin/config", { cache: "no-store" });
    const payload = await response.json() as AdminConfig;
    setConfig(payload);
    setEmail(payload.adminEmail);
    setStatus(payload.configured ? "Ready. Sign in to view visitor activity." : "Supabase is not connected yet.");
  }, []);

  const loadEvents = useCallback(async () => {
    if (!token) return;
    setBusy(true);
    try {
      const response = await fetch("/api/admin/visitors?limit=1000", {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Could not load visitor activity.");
      setEvents(payload.events as VisitorEvent[]);
      setStatus(`Loaded ${payload.events.length} activity events.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not load visitor activity.");
    } finally {
      setBusy(false);
    }
  }, [token]);

  useEffect(() => {
    // Older versions kept an admin token in the browser. Remove it so every visit is gated.
    window.localStorage.removeItem("portfolio-admin-token");
    const timer = window.setTimeout(() => void loadConfig(), 0);
    return () => window.clearTimeout(timer);
  }, [loadConfig]);

  useEffect(() => {
    if (!token) return;
    const timer = window.setTimeout(() => void loadEvents(), 0);
    return () => window.clearTimeout(timer);
  }, [loadEvents, token]);

  const profiles = useMemo(() => {
    const next = new Map<string, VisitorProfile>();
    events.forEach((event, index) => {
      const key = visitorKey(event, index);
      const current = next.get(key) ?? { sessions: new Set<string>(), events: 0 };
      if (event.session_id) current.sessions.add(event.session_id);
      current.events += 1;
      next.set(key, current);
    });
    return next;
  }, [events]);

  const filteredEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return events.filter((event, index) => {
      const profile = profiles.get(visitorKey(event, index));
      const returning = Boolean(profile && profile.events > 1);
      const searchable = [event.path, event.project_id, event.referrer, event.browser, event.operating_system, event.language, event.timezone]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return (eventFilter === "all" || event.event_name === eventFilter)
        && (deviceFilter === "all" || event.device_type === deviceFilter)
        && (visitorFilter === "all" || (visitorFilter === "returning" ? returning : !returning))
        && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [deviceFilter, eventFilter, events, profiles, query, visitorFilter]);

  const metrics = useMemo(() => {
    const returningVisitors = [...profiles.values()].filter((profile) => profile.events > 1).length;
    const today = events.filter((event) => new Date(event.occurred_at ?? 0).getTime() >= todayStart()).length;
    return {
      total: events.length,
      unique: profiles.size,
      returning: returningVisitors,
      today,
    };
  }, [events, profiles]);

  const eventOptions = useMemo(
    () => [...new Set(events.map((event) => event.event_name).filter(Boolean))] as string[],
    [events],
  );
  const deviceOptions = useMemo(
    () => [...new Set(events.map((event) => event.device_type).filter(Boolean))] as string[],
    [events],
  );

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!config?.configured) return setStatus("Supabase is not connected yet.");
    setBusy(true);
    try {
      const response = await fetch(`${config.supabaseUrl}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: { apikey: config.anonKey, "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.access_token) throw new Error(payload.error_description ?? "Sign in failed.");
      setToken(payload.access_token as string);
      setPassword("");
      setStatus("Signed in.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Sign in failed.");
    } finally {
      setBusy(false);
    }
  };

  const signOut = () => {
    window.localStorage.removeItem("portfolio-admin-token");
    setToken("");
    setEvents([]);
    setStatus("Signed out.");
  };

  return (
    <main className="visitor-admin">
      <section className="visitor-admin__hero">
        <div>
          <span><ShieldCheck size={17} /> Private visitor overview</span>
          <h1>Visitor activity</h1>
          <p>Anonymous, privacy-conscious activity from your portfolio. Device details help you understand usage, not identify people.</p>
        </div>
        <Link href="/" className="visitor-admin__home">Open portfolio</Link>
      </section>

      <div className="visitor-admin__status" data-ready={config?.configured ? "true" : "false"}>
        <strong>{config?.configured ? "Connected" : "Setup needed"}</strong><span>{status}</span>
      </div>

      {!token ? (
        <form className="visitor-login" onSubmit={signIn}>
          <label><span>Admin email</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" /></label>
          <label><span>Password</span><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" /></label>
          <button type="submit" disabled={busy || !config?.configured}><ShieldCheck size={17} /> Sign in</button>
        </form>
      ) : (
        <>
          <section className="visitor-metrics" aria-label="Visitor summary">
            <article><Activity size={20} /><span>Total activity</span><strong>{metrics.total}</strong></article>
            <article><Users size={20} /><span>Anonymous visitors</span><strong>{metrics.unique}</strong></article>
            <article><RefreshCw size={20} /><span>Returning browsers</span><strong>{metrics.returning}</strong></article>
            <article><CalendarDays size={20} /><span>Activity today</span><strong>{metrics.today}</strong></article>
          </section>

          <section className="visitor-panel">
            <div className="visitor-panel__topline">
              <div><BellRing size={19} /><div><h2>Visitor log</h2><p>Returning status is based on an anonymous browser identifier.</p></div></div>
              <div className="visitor-panel__actions"><button type="button" onClick={() => void loadEvents()} disabled={busy}><RefreshCw size={16} /> Refresh</button><button type="button" onClick={signOut}><LogOut size={16} /> Sign out</button></div>
            </div>

            <div className="visitor-filters">
              <label className="visitor-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search page, browser, referrer..." /></label>
              <label><Filter size={15} /><select value={eventFilter} onChange={(event) => setEventFilter(event.target.value)}><option value="all">All events</option>{eventOptions.map((item) => <option value={item} key={item}>{item}</option>)}</select></label>
              <label><MonitorSmartphone size={15} /><select value={deviceFilter} onChange={(event) => setDeviceFilter(event.target.value)}><option value="all">All devices</option>{deviceOptions.map((item) => <option value={item} key={item}>{item}</option>)}</select></label>
              <label><Users size={15} /><select value={visitorFilter} onChange={(event) => setVisitorFilter(event.target.value)}><option value="all">All visitors</option><option value="new">New browser</option><option value="returning">Returning browser</option></select></label>
            </div>

            <div className="visitor-table-wrap">
              <table>
                <thead><tr><th>When</th><th>Visitor</th><th>Activity</th><th>Device</th><th>Language & screen</th><th>Page / source</th></tr></thead>
                <tbody>
                  {filteredEvents.length === 0 && <tr><td colSpan={6}>No matching activity yet.</td></tr>}
                  {filteredEvents.map((event, index) => {
                    const profile = profiles.get(visitorKey(event, index));
                    const returning = Boolean(profile && profile.events > 1);
                    return <tr key={event.id ?? `${event.occurred_at}-${index}`}>
                      <td>{formatDate(event.occurred_at)}</td>
                      <td><b className={returning ? "visitor-badge visitor-badge--returning" : "visitor-badge"}>{returning ? "Returning" : "New"}</b><small>{profile?.sessions.size ?? 1} session{(profile?.sessions.size ?? 1) === 1 ? "" : "s"}</small></td>
                      <td><strong>{event.event_name ?? "-"}</strong>{event.project_id && <small>{event.project_id}</small>}</td>
                      <td>{event.device_type ?? "Unknown"}<small>{event.operating_system ?? "-"} · {event.browser ?? "-"}</small></td>
                      <td>{event.language ?? "-"}<small>{event.viewport_width ?? "?"} × {event.viewport_height ?? "?"} · {event.timezone ?? "-"}</small></td>
                      <td><span>{event.path ?? "-"}</span><small>{event.referrer ?? event.utm_source ?? "Direct visit"}</small></td>
                    </tr>;
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
