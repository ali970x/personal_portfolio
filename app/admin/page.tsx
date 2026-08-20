"use client";

/* eslint-disable @next/next/no-html-link-for-pages */
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  Eye,
  EyeOff,
  FileJson,
  ImageUp,
  LoaderCircle,
  LogOut,
  Plus,
  RefreshCw,
  Save,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import type { ManagedRecord } from "@/lib/managed-content";
import {
  getSupabaseBrowserConfig,
  signInWithSupabase,
  supabaseBrowserFetch,
  uploadPortfolioMedia,
} from "@/lib/supabase-browser";

type VisitorEvent = {
  id?: string;
  event_name?: string;
  project_id?: string | null;
  path?: string;
  referrer?: string | null;
  language?: string | null;
  timezone?: string | null;
  viewport_width?: number | null;
  viewport_height?: number | null;
  device_type?: string | null;
  browser?: string | null;
  operating_system?: string | null;
  occurred_at?: string;
};

const blankRecord: ManagedRecord = {
  key: "project:new-project",
  kind: "project",
  data: {
    id: "new-project",
    name: "New Project",
    summary: {
      en: "Short English summary.",
      ar: "ملخص عربي قصير.",
    },
  },
  sort_order: 99,
  is_visible: true,
};

function readSavedToken() {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem("portfolio-admin-token") ?? "";
  } catch {
    return "";
  }
}

function formatDate(value?: string) {
  if (!value) return "-";
  try {
    return new Intl.DateTimeFormat("en", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function safeJson(value: unknown) {
  return JSON.stringify(value, null, 2);
}

export default function AdminPage() {
  const config = useMemo(() => getSupabaseBrowserConfig(), []);
  const [token, setToken] = useState(readSavedToken);
  const [email, setEmail] = useState(() => config?.adminEmail ?? "");
  const [password, setPassword] = useState("");
  const [records, setRecords] = useState<ManagedRecord[]>([]);
  const [visitors, setVisitors] = useState<VisitorEvent[]>([]);
  const [selectedKey, setSelectedKey] = useState("");
  const [draft, setDraft] = useState(safeJson(blankRecord));
  const [status, setStatus] = useState(() => config
    ? "Supabase is connected. Sign in with your admin account."
    : "Supabase is not configured yet. Add the public keys to the Static Site environment.");
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [mediaUrl, setMediaUrl] = useState("");

  const selectedRecord = useMemo(
    () => records.find((record) => record.key === selectedKey),
    [records, selectedKey],
  );

  const loadContent = useCallback(async () => {
    if (!token) return;
    setBusy(true);
    try {
      const response = await supabaseBrowserFetch(
        "/rest/v1/portfolio_records?select=*&order=sort_order.asc,updated_at.desc",
        { cache: "no-store" },
        token,
      );
      if (!response.ok) throw new Error("Could not load records. Confirm the Supabase admin policy.");
      const nextRecords = await response.json() as ManagedRecord[];
      setRecords(nextRecords);
      const first = nextRecords[0];
      if (first) {
        setSelectedKey(first.key);
        setDraft(safeJson(first));
      }
      setStatus("Content loaded.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not load content.");
    } finally {
      setBusy(false);
    }
  }, [token]);

  const loadVisitors = useCallback(async () => {
    if (!token) return;
    try {
      const response = await supabaseBrowserFetch(
        "/rest/v1/portfolio_visitor_events?select=*&order=occurred_at.desc&limit=200",
        { cache: "no-store" },
        token,
      );
      if (!response.ok) throw new Error("Could not load visitor activity. Confirm the Supabase admin policy.");
      setVisitors(await response.json() as VisitorEvent[]);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not load visitors.");
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    const timer = window.setTimeout(() => {
      void loadContent();
      void loadVisitors();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [loadContent, loadVisitors, token]);

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!config) {
      setStatus("Supabase is not configured yet.");
      return;
    }
    setBusy(true);
    try {
      const accessToken = await signInWithSupabase(email, password);
      setToken(accessToken);
      window.localStorage.setItem("portfolio-admin-token", accessToken);
      setPassword("");
      setStatus("Signed in.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Sign in failed.");
    } finally {
      setBusy(false);
    }
  };

  const signOut = () => {
    setToken("");
    setRecords([]);
    setVisitors([]);
    setSelectedKey("");
    setDraft(safeJson(blankRecord));
    window.localStorage.removeItem("portfolio-admin-token");
    setStatus("Signed out.");
  };

  const selectRecord = (record: ManagedRecord) => {
    setSelectedKey(record.key);
    setDraft(safeJson(record));
  };

  const newRecord = () => {
    setSelectedKey("");
    setDraft(safeJson(blankRecord));
  };

  const saveRecord = async () => {
    setBusy(true);
    try {
      const parsed = JSON.parse(draft) as ManagedRecord;
      const response = await supabaseBrowserFetch("/rest/v1/portfolio_records?on_conflict=key", {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates,return=representation" },
        body: JSON.stringify({ ...parsed, updated_at: new Date().toISOString() }),
      }, token);
      if (!response.ok) throw new Error("Could not save record. Check the Supabase admin policy.");
      const saved = (await response.json() as ManagedRecord[])[0] ?? parsed;
      setRecords((items) => {
        const withoutSaved = items.filter((item) => item.key !== saved.key);
        return [...withoutSaved, saved].sort((a, b) => a.sort_order - b.sort_order);
      });
      setSelectedKey(saved.key);
      setDraft(safeJson(saved));
      setStatus("Saved.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not save. Check the JSON.");
    } finally {
      setBusy(false);
    }
  };

  const deleteRecord = async () => {
    if (!selectedRecord) return;
    setBusy(true);
    try {
      const response = await supabaseBrowserFetch(`/rest/v1/portfolio_records?key=eq.${encodeURIComponent(selectedRecord.key)}`, {
        method: "DELETE",
      }, token);
      if (!response.ok) throw new Error("Could not delete record. Check the Supabase admin policy.");
      setRecords((items) => items.filter((item) => item.key !== selectedRecord.key));
      newRecord();
      setStatus("Deleted.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not delete record.");
    } finally {
      setBusy(false);
    }
  };

  const toggleVisible = () => {
    try {
      const parsed = JSON.parse(draft) as ManagedRecord;
      setDraft(safeJson({ ...parsed, is_visible: !parsed.is_visible }));
    } catch {
      setStatus("Fix the JSON before changing visibility.");
    }
  };

  const uploadMedia = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      setMediaUrl(await uploadPortfolioMedia(file, token));
      setStatus("Media uploaded. Paste the URL into a project image, icon, or video field.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <main className="admin-shell">
      <section className="admin-hero">
        <div>
          <span><ShieldCheck size={18} /> Portfolio control room</span>
          <h1>Admin dashboard</h1>
          <p>Manage portfolio records, media, project visibility, and visitor activity from one place.</p>
        </div>
        <a href="/" className="admin-home-link">Open portfolio</a>
      </section>

      <div className="admin-status" data-ready={config ? "true" : "false"}>
        <strong>{config ? "Connected" : "Setup needed"}</strong>
        <span>{status}</span>
      </div>

      {!token && (
        <form className="admin-card admin-login" onSubmit={signIn}>
          <label>
            <span>Admin email</span>
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" />
          </label>
          <label>
            <span>Password</span>
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="current-password" />
          </label>
          <button type="submit" disabled={busy || !config}>
            {busy ? <LoaderCircle className="admin-spin" /> : <ShieldCheck />} Sign in
          </button>
        </form>
      )}

      {token && (
        <>
          <div className="admin-toolbar">
            <button type="button" onClick={() => { void loadContent(); void loadVisitors(); }} disabled={busy}><RefreshCw /> Refresh</button>
            <button type="button" onClick={newRecord}><Plus /> New record</button>
            <button type="button" onClick={toggleVisible}>{selectedRecord?.is_visible === false ? <Eye /> : <EyeOff />} Toggle visibility</button>
            <button type="button" onClick={saveRecord} disabled={busy}><Save /> Save</button>
            <button type="button" onClick={deleteRecord} disabled={!selectedRecord || busy}><Trash2 /> Delete</button>
            <button type="button" onClick={signOut}><LogOut /> Sign out</button>
          </div>

          <section className="admin-grid">
            <aside className="admin-card admin-records">
              <h2>Content records</h2>
              <div>
                {records.length === 0 && <p>No managed records yet. Create one to override or add portfolio content.</p>}
                {records.map((record) => (
                  <button
                    type="button"
                    key={record.key}
                    className={record.key === selectedKey ? "is-active" : ""}
                    onClick={() => selectRecord(record)}
                  >
                    <FileJson size={18} />
                    <span>{record.key}</span>
                    <small>{record.kind}{record.is_visible ? "" : " / hidden"}</small>
                  </button>
                ))}
              </div>
            </aside>

            <section className="admin-card admin-editor">
              <div className="admin-card-title">
                <div>
                  <h2>Record editor</h2>
                  <p>Edit JSON. Use keys like <code>project:phonexa</code> to override an existing project.</p>
                </div>
                <button type="button" onClick={saveRecord} disabled={busy}><Save /> Save</button>
              </div>
              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                spellCheck={false}
                aria-label="Portfolio record JSON"
              />
            </section>
          </section>

          <section className="admin-grid admin-grid--lower">
            <section className="admin-card admin-upload">
              <h2>Media upload</h2>
              <label>
                <ImageUp />
                <span>{uploading ? "Uploading..." : "Upload image or video"}</span>
                <input type="file" accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm" onChange={uploadMedia} disabled={uploading} />
              </label>
              {mediaUrl && (
                <div className="admin-media-url">
                  <span>Latest URL</span>
                  <input value={mediaUrl} readOnly onFocus={(event) => event.currentTarget.select()} />
                </div>
              )}
            </section>

            <section className="admin-card admin-visitors">
              <div className="admin-card-title">
                <div>
                  <h2>Visitor activity</h2>
                  <p>Privacy-friendly events from the portfolio.</p>
                </div>
                <button type="button" onClick={() => void loadVisitors()}><RefreshCw /> Refresh</button>
              </div>
              <div className="admin-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Event</th>
                      <th>Project</th>
                      <th>Path</th>
                      <th>Device</th>
                      <th>Browser</th>
                      <th>When</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visitors.length === 0 && (
                      <tr><td colSpan={6}>No visitor events yet.</td></tr>
                    )}
                    {visitors.map((event, index) => (
                      <tr key={event.id ?? `${event.event_name}-${index}`}>
                        <td>{event.event_name}</td>
                        <td>{event.project_id ?? "-"}</td>
                        <td>{event.path}</td>
                        <td>{event.device_type} / {event.operating_system}</td>
                        <td>{event.browser}</td>
                        <td>{formatDate(event.occurred_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </section>
        </>
      )}
    </main>
  );
}
