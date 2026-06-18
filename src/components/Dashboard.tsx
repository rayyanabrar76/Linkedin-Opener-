import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Building2, User, Sparkles, Trash2 } from "lucide-react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────
type CollectedItem = {
  companyName: string;
  website: string;
  linkedinCompany: string;
  ceoLinkedin: string;
};

type ParsedItem = {
  type: "company" | "profile" | "url" | "name";
  raw: string;
  companyName: string;
  website: string;
  linkedinCompany: string;
  ceoLinkedin: string;
};

// ─── Constants ────────────────────────────────────────────────────────────────
const MAX_ITEMS = 200;
const OPEN_DELAY_MS = 600;
const EXPORT_DELAY_MS = 80;

const TLDS = [
  ".com", ".net", ".org", ".io", ".co", ".ai", ".app", ".dev",
  ".us", ".uk", ".ca", ".in", ".info", ".biz", ".me", ".edu", ".gov",
];

// ─── Utilities ────────────────────────────────────────────────────────────────
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const ddgBang = (query: string) =>
  `https://duckduckgo.com/?q=!ducky+${encodeURIComponent(query)}`;

/** Slugify a company/person name for a LinkedIn profile path: lowercase, spaces → hyphens */
const slugify = (name: string) =>
  name.trim().toLowerCase().replace(/\s+/g, "-");

const makeBlobUrl = (targetUrl: string): string => {
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=${targetUrl}"></head></html>`;
  return URL.createObjectURL(new Blob([html], { type: "text/html" }));
};

// ── Background tab opener ─────────────────────────────────────────────────────
// Strategy 1: Simulate Ctrl+Click (Cmd+Click on Mac) — browser's native
//             "open in background tab" shortcut. Prevents focus switch entirely.
// Strategy 2: window.open + triple blur/focus lock as fallback.
const openInBackground = (url: string): boolean => {
  try {
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.style.cssText = "position:fixed;opacity:0;pointer-events:none;";
    document.body.appendChild(a);
    a.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        ctrlKey: true,  // Windows/Linux: background tab
        metaKey: true,  // macOS: background tab (Cmd+Click)
        button: 0,
      })
    );
    document.body.removeChild(a);
    return true;
  } catch (_) {
    return false;
  }
};

const openAndRevoke = (url: string, isBlob = false) => {
  const success = openInBackground(url);

  if (!success) {
    // Fallback: window.open + triple blur/focus lock
    try {
      const w = window.open(url, "_blank", "noopener,noreferrer");
      if (w) {
        w.blur();
        window.focus();
        requestAnimationFrame(() => { try { w.blur(); } catch (_) {} window.focus(); });
        setTimeout(() => { try { w.blur(); } catch (_) {} window.focus(); }, 50);
      }
    } catch (_) {}
  }

  if (isBlob) setTimeout(() => URL.revokeObjectURL(url), 1000);
};

/** Parse a single input line into a structured item */
const parseItem = (raw: string): ParsedItem => {
  const lower = raw.toLowerCase();
  const looksLikeUrl =
    lower.startsWith("http://") ||
    lower.startsWith("https://") ||
    lower.startsWith("www.") ||
    TLDS.some((tld) => lower.includes(tld));

  if (raw.includes("linkedin.com/in/")) {
    const slug = raw.split("linkedin.com/in/")[1]?.split(/[/?#]/)[0] ?? "";
    const companyName = decodeURIComponent(slug).replace(/-/g, " ");
    const ceoLinkedin = raw.startsWith("http") ? raw : `https://${raw}`;
    return { type: "profile", raw, companyName, website: "", linkedinCompany: "", ceoLinkedin };
  }

  if (raw.includes("linkedin.com/company/")) {
    const slug = raw.split("linkedin.com/company/")[1]?.split(/[/?#]/)[0] ?? "";
    const companyName = decodeURIComponent(slug).replace(/-/g, " ");
    const linkedinCompany = raw.startsWith("http") ? raw : `https://${raw}`;
    return { type: "company", raw, companyName, website: "", linkedinCompany, ceoLinkedin: "" };
  }

  if (looksLikeUrl) {
    const website = lower.startsWith("http") ? raw : `https://${raw}`;
    const domain = raw.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
    const companyName = domain.split(".")[0];
    return { type: "url", raw, companyName, website, linkedinCompany: "", ceoLinkedin: "" };
  }

  return { type: "name", raw, companyName: raw, website: "", linkedinCompany: "", ceoLinkedin: "" };
};

/** Merge new items into existing collected data */
const mergeCollected = (prev: CollectedItem[], incoming: CollectedItem[]): CollectedItem[] => {
  const map = new Map(prev.map((x) => [x.companyName, x]));
  incoming.forEach((item) => {
    const existing = map.get(item.companyName);
    if (existing) {
      map.set(item.companyName, {
        ...existing,
        ...Object.fromEntries(Object.entries(item).filter(([, v]) => v !== "")),
      });
    } else {
      map.set(item.companyName, item);
    }
  });
  return Array.from(map.values());
};

// ─── Component ────────────────────────────────────────────────────────────────
const Dashboard = () => {
  const [urls, setUrls] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const [collectedData, setCollectedData] = useState<CollectedItem[]>([]);
  const [tabsOpened, setTabsOpened] = useState(0);
  const editableRef = useRef<HTMLDivElement>(null);

  // ── URL Extraction ──────────────────────────────────────────────────────────
  const extractUrls = useCallback((): string[] => {
    if (!editableRef.current) return [];
    const found = new Set<string>();

    const normalize = (url: string) =>
      url.trim().replace(/[.,;:!?]+$/, "").replace(/\/+$/, "").toLowerCase() === url.trim()
        ? url.trim().replace(/[.,;:!?]+$/, "").replace(/\/+$/, "")
        : url.trim();

    // 1. Extract from hyperlink hrefs
    editableRef.current.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href");
      if (href?.trim()) found.add(normalize(href));
    });

    // 2. Extract from plain text if no hyperlinks
    if (found.size === 0) {
      const tldPattern = TLDS.map((t) => t.slice(1).replace(".", "\\.")).join("|");
      const urlPattern = new RegExp(
        `\\b(?:https?:\\/\\/)?(?:www\\.)?[a-zA-Z0-9][a-zA-Z0-9-]*\\.(${tldPattern})(?:\\/[^\\s]*)?\\b`,
        "gi"
      );
      const text = editableRef.current.innerText;
      (text.match(urlPattern) ?? []).forEach((m) => found.add(normalize(m)));
    }

    if (found.size > 0) return Array.from(found);

    // 3. Fall back to plain text lines (company names)
    return (editableRef.current.innerText ?? "")
      .split(/\n/)
      .map((l) => l.trim())
      .filter(Boolean);
  }, []);

  const updatePreview = () => setUrls(extractUrls());

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const fresh = extractUrls();
      setUrls(fresh);
      openAllWithItems(fresh);
    }
  };

  // ── Core Open Logic ─────────────────────────────────────────────────────────
  const openAllWithItems = async (items: string[]) => {
    const valid = items.map((u) => u.trim()).filter(Boolean);
    if (valid.length === 0) {
      toast.error("Please paste at least one valid link or company name");
      return;
    }
    if (valid.length > MAX_ITEMS) {
      toast.error(`Too many items! Please paste ${MAX_ITEMS} or fewer at a time.`);
      return;
    }

    setIsOpening(true);
    setProgress(0);
    setTabsOpened(0);
    const newData: CollectedItem[] = [];

    for (let i = 0; i < valid.length; i++) {
      const parsed = parseItem(valid[i]);

      if (parsed.type === "profile") {
        openAndRevoke(parsed.ceoLinkedin);
      } else if (parsed.type === "company") {
        openAndRevoke(makeBlobUrl(ddgBang(`${parsed.companyName} LinkedIn`)), true);
      } else if (parsed.type === "url") {
        openAndRevoke(parsed.website);
      } else {
        openAndRevoke(makeBlobUrl(ddgBang(`${parsed.companyName} LinkedIn`)), true);
      }

      newData.push({
        companyName: parsed.companyName || valid[i],
        website: parsed.website,
        linkedinCompany: parsed.linkedinCompany,
        ceoLinkedin: parsed.ceoLinkedin,
      });

      setTabsOpened(i + 1);
      setProgress(Math.round(((i + 1) / valid.length) * 100));
      await sleep(OPEN_DELAY_MS);
    }

    setCollectedData((prev) => mergeCollected(prev, newData));
    setIsOpening(false);
    toast.success(`✅ Opened ${valid.length} tabs in the background!`);
  };

  const openAll = () => openAllWithItems(urls);

  // ── CEO Open Logic ──────────────────────────────────────────────────────────
  const openAllCEOs = async () => {
    const valid = urls.map((u) => u.trim()).filter(Boolean);
    if (valid.length === 0) {
      toast.error("No company links or names found");
      return;
    }
    if (valid.length > MAX_ITEMS) {
      toast.error(`Too many items! Please paste ${MAX_ITEMS} or fewer at a time.`);
      return;
    }

    setIsOpening(true);
    setProgress(0);
    setTabsOpened(0);
    const newData: CollectedItem[] = [];

    for (let i = 0; i < valid.length; i++) {
      const parsed = parseItem(valid[i]);

      if (parsed.type === "profile") {
        openAndRevoke(parsed.ceoLinkedin);
        newData.push({ ...parsed, ceoLinkedin: parsed.ceoLinkedin });
      } else {
        openAndRevoke(makeBlobUrl(ddgBang(`CEO of ${parsed.companyName} site:linkedin.com`)), true);
        newData.push({
          companyName: parsed.companyName,
          website: parsed.website,
          linkedinCompany: parsed.linkedinCompany,
          ceoLinkedin: "Searched — check opened tab",
        });
      }

      setTabsOpened(i + 1);
      setProgress(Math.round(((i + 1) / valid.length) * 100));
      await sleep(OPEN_DELAY_MS);
    }

    setCollectedData((prev) => mergeCollected(prev, newData));
    setIsOpening(false);
    toast.success(`✅ Opened ${valid.length} CEO tabs in the background!`);
  };

  // ── Single Item Actions ─────────────────────────────────────────────────────
  const openSingleCEO = (item: string) => {
    const parsed = parseItem(item);
    openAndRevoke(makeBlobUrl(ddgBang(`CEO of ${parsed.companyName} site:linkedin.com`)), true);
    toast.success(`Searching CEO of ${parsed.companyName}`);
  };

  const openCompanyFromProfile = (profileUrl: string) => {
    const parsed = parseItem(profileUrl);
    openAndRevoke(makeBlobUrl(ddgBang(`${parsed.companyName} company site:linkedin.com/company`)), true);
    toast.success(`Finding company of ${parsed.companyName}`);
  };

  const openProfileFromCompany = (companyUrl: string) => {
    const base = (companyUrl.startsWith("http") ? companyUrl : `https://${companyUrl}`).split("?")[0];
    const peopleUrl = base.endsWith("/") ? `${base}people` : `${base}/people`;
    openAndRevoke(peopleUrl);
    toast.success("Opening company profiles");
  };

  // ── Export ──────────────────────────────────────────────────────────────────
  // Builds a real .xlsx with native, clickable hyperlinks via SheetJS — opens
  // directly in Excel/Google Sheets, no copy-paste step required.
  const exportAllXLSX = async () => {
    const valid = urls.map((u) => u.trim()).filter(Boolean);
    if (valid.length === 0) {
      toast.error("No data to export");
      return;
    }
    if (valid.length > MAX_ITEMS) {
      toast.error(`Too many items! Please paste ${MAX_ITEMS} or fewer at a time.`);
      return;
    }

    const XLSX = await import("xlsx");

    toast.info("Generating spreadsheet...");
    setIsOpening(true);
    setProgress(0);

    type LeadRow = {
      companyName: string;
      website: string;
      linkedinCompany: string;
      ceoLinkedin: string;
    };

    const rows: LeadRow[] = [];

    for (let i = 0; i < valid.length; i++) {
      const parsed = parseItem(valid[i]);
      const name = parsed.companyName || valid[i];

      rows.push({
        companyName: name,
        website:
          parsed.website ||
          `https://duckduckgo.com/?q=!ducky+${encodeURIComponent(name)}+official+site`,
        linkedinCompany:
          parsed.linkedinCompany ||
          `https://duckduckgo.com/?q=!ducky+${encodeURIComponent(name)}+LinkedIn+company+page`,
        ceoLinkedin: parsed.ceoLinkedin || ddgBang(`CEO of ${name} site:linkedin.com`),
      });

      setProgress(Math.round(((i + 1) / valid.length) * 100));
      await sleep(EXPORT_DELAY_MS);
    }

    // Header row + one display string per link cell; hyperlinks are patched in below.
    const ws = XLSX.utils.aoa_to_sheet([
      ["Company Name", "Website", "LinkedIn Company Page", "CEO LinkedIn Profile"],
      ...rows.map((r) => [r.companyName, "Website", "LinkedIn Company", "CEO LinkedIn"]),
    ]);

    // Attach native hyperlinks to columns B (website), C (company), D (CEO).
    rows.forEach((r, i) => {
      const excelRow = i + 2; // 1-indexed worksheet row, +1 for header
      const link = (target: string, tooltip: string) => ({
        l: { Target: target, Tooltip: tooltip },
      });
      Object.assign(ws[`B${excelRow}`], link(r.website, `Open ${r.companyName} website`));
      Object.assign(ws[`C${excelRow}`], link(r.linkedinCompany, `${r.companyName} on LinkedIn`));
      Object.assign(ws[`D${excelRow}`], link(r.ceoLinkedin, `CEO of ${r.companyName} on LinkedIn`));
    });

    ws["!cols"] = [{ wch: 30 }, { wch: 22 }, { wch: 25 }, { wch: 22 }];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    XLSX.writeFile(wb, "linkedin-leads.xlsx");

    setCollectedData((prev) =>
      mergeCollected(
        prev,
        rows.map((r) => ({ ...r })),
      ),
    );
    setIsOpening(false);
    setProgress(0);
    toast.success(`Exported ${rows.length} leads to linkedin-leads.xlsx`);
  };

  // ── Clear ───────────────────────────────────────────────────────────────────
  const clear = () => {
    if (editableRef.current) editableRef.current.innerHTML = "";
    setUrls([]);
    setProgress(0);
    setTabsOpened(0);
    setCollectedData([]);
    toast.success("Cleared all data");
  };

  // ── Derived ─────────────────────────────────────────────────────────────────
  const hasValidInput = urls.some((u) => u.trim() !== "");

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <section
      id="dashboard"
      className="min-h-screen py-16 sm:py-31 bg-gradient-to-b from-secondary/20 to-background flex justify-center items-start sm:items-center"
    >
      <div className="container mx-auto px-3 sm:px-4">
        <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-8 max-w-7xl mx-auto shadow-2xl">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-1 sm:mb-2">Profiles Dashboard</h2>
              <p className="text-sm text-muted-foreground">
                Paste LinkedIn companies, profiles, or type company names here
              </p>
            </div>

            {/* 2-col grid on mobile → original flex row on md+ */}
            <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:gap-3 w-full md:w-auto">
              <Button
                onClick={openAll}
                disabled={isOpening || !hasValidInput}
                className="shadow-lg w-full md:w-auto"
              >
                <Sparkles className="w-4 h-4 mr-2 shrink-0" />
                Open All
              </Button>
              <Button
                onClick={openAllCEOs}
                disabled={isOpening || !hasValidInput}
                variant="secondary"
                className="shadow-lg w-full md:w-auto"
              >
                <Building2 className="w-4 h-4 mr-2 shrink-0" />
                {urls.filter(u => u.trim()).length <= 1 ? "Find CEO" : "Find CEOs"}
              </Button>
              <Button
                onClick={exportAllXLSX}
                disabled={isOpening || !hasValidInput}
                variant="outline"
                className="shadow-lg w-full md:w-auto"
              >
                <Sparkles className="w-4 h-4 mr-2 shrink-0" />
                Export Excel
              </Button>
              <Button onClick={clear} variant="outline" className="w-full md:w-auto">
                <Trash2 className="w-4 h-4 mr-2 shrink-0" />
                Clear
              </Button>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

            {/* Left: Input */}
            <div className="lg:col-span-2 space-y-4">
              <label className="text-sm font-semibold block">
                Paste LinkedIn links, profiles, or type company names
              </label>
              <div
                ref={editableRef}
                contentEditable
                onInput={updatePreview}
                onKeyDown={handleKeyDown}
                className="min-h-[180px] sm:min-h-[300px] p-4 rounded-xl border-2 border-border bg-background/50 focus:border-primary focus:outline-none transition-colors font-mono text-sm empty:before:content-['Paste_here...'] empty:before:text-muted-foreground"
              />

              {/* Progress bar + live background tab counter */}
              {progress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      {progress < 100 ? (
                        <>
                          <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
                          Opening in background…{" "}
                          <span className="font-semibold text-foreground">
                            {tabsOpened} tab{tabsOpened !== 1 ? "s" : ""} opened
                          </span>
                        </>
                      ) : (
                        <>
                          ✅ Done!{" "}
                          <span className="font-semibold text-foreground">{tabsOpened} tabs</span>{" "}
                          opened in background
                        </>
                      )}
                    </span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Item count warning */}
              {urls.length > 150 && (
                <p className="text-sm text-yellow-500">
                  ⚠️ {urls.length} items detected. Maximum is {MAX_ITEMS}. Please reduce your list.
                </p>
              )}
            </div>

            {/* Right: Preview */}
            <div className="glass-card rounded-xl p-4 sm:p-6">
              <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                Preview ({urls.length})
              </h3>
              <div className="space-y-2 sm:space-y-3 max-h-[300px] sm:max-h-[400px] overflow-y-auto">
                {urls.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No links or company names detected yet</p>
                ) : (
                  urls.map((url, i) => {
                    const isCompany = url.includes("linkedin.com/company/");
                    const isProfile = url.includes("linkedin.com/in/");
                    const isGenericUrl = !isCompany && !isProfile;

                    return (
                      <div
                        key={i}
                        className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          {isCompany ? (
                            <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                          ) : isProfile ? (
                            <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                          ) : (
                            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-xs sm:text-sm">
                            {isCompany ? "Company" : isProfile ? "Profile" : "URL"} {i + 1}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">{url}</div>
                        </div>

                        {isCompany && (
                          <div className="flex gap-1 flex-shrink-0">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => openSingleCEO(url)}
                              className="h-7 sm:h-8 px-2 text-xs"
                              title="Open CEO"
                            >
                              <Building2 className="w-3 h-3 mr-1" />
                              CEO
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => openProfileFromCompany(url)}
                              className="h-7 sm:h-8 px-2 text-xs"
                              title="View company profiles"
                            >
                              <User className="w-3 h-3 mr-1" />
                              People
                            </Button>
                          </div>
                        )}

                        {isProfile && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => openCompanyFromProfile(url)}
                            className="flex-shrink-0 h-7 sm:h-8 px-2 text-xs"
                            title="Find company"
                          >
                            <Building2 className="w-3 h-3 mr-1" />
                            <span className="hidden sm:inline">Company</span>
                            <span className="sm:hidden">Co.</span>
                          </Button>
                        )}

                        {isGenericUrl && (
                          <div className="flex gap-1 flex-shrink-0">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => openAllWithItems([url])}
                              className="h-7 sm:h-8 px-2 text-xs"
                              title="Open link"
                            >
                              <Sparkles className="w-3 h-3 mr-1" />
                              Open
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => openSingleCEO(url)}
                              className="h-7 sm:h-8 px-2 text-xs"
                              title="Find CEO"
                            >
                              <Building2 className="w-3 h-3 mr-1" />
                              CEO
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-3 sm:mt-4 border-t border-border pt-3 sm:pt-4">
                💡 Final Step: Click Export Excel to download an .xlsx file that opens directly in Excel or Google Sheets — with clickable links, no copy-paste needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;