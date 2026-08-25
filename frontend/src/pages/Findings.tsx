import {
  AlertTriangle,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  FileWarning,
  Search,
  ShieldAlert,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

type Severity = "Critical" | "High" | "Medium" | "Low";

type Finding = {
  id: number;
  issue: string;
  severity: Severity;
  target: string;
  evidence: string;
  recommendation: string;
};

const Findings = () => {
  const [selectedSeverity, setSelectedSeverity] = useState("All");
  const [search, setSearch] = useState("");
  const [expandedFinding, setExpandedFinding] = useState<number | null>(null);

  const findings: Finding[] = [
    {
      id: 1,
      issue: "SQL Injection",
      severity: "Critical",
      target: "example.com",
      evidence:
        "Potentially unsafe SQL query parameters were identified during the security assessment.",
      recommendation:
        "Use parameterized queries or prepared statements and validate all user-controlled input before database operations.",
    },
    {
      id: 2,
      issue: "Telnet service exposed",
      severity: "High",
      target: "example.com",
      evidence:
        "Port 23 was detected as open and associated with the Telnet service.",
      recommendation:
        "Disable Telnet and use an encrypted remote administration protocol such as SSH.",
    },
    {
      id: 3,
      issue: "MySQL service exposed",
      severity: "High",
      target: "example.com",
      evidence:
        "Port 3306 was detected as publicly accessible.",
      recommendation:
        "Restrict database access to trusted systems and avoid direct public exposure.",
    },
    {
      id: 4,
      issue: "Missing security header: Content-Security-Policy",
      severity: "Medium",
      target: "example.com",
      evidence:
        "The HTTP response did not contain a Content-Security-Policy header.",
      recommendation:
        "Configure an appropriate Content-Security-Policy header to reduce the impact of content injection attacks.",
    },
    {
      id: 5,
      issue: "Missing security header: X-Frame-Options",
      severity: "Low",
      target: "api.example.com",
      evidence:
        "The HTTP response did not contain the X-Frame-Options header.",
      recommendation:
        "Configure X-Frame-Options or an equivalent Content-Security-Policy frame-ancestors directive.",
    },
    {
      id: 6,
      issue: "SSH service publicly accessible",
      severity: "Low",
      target: "demo-site.com",
      evidence:
        "Port 22 was detected as open and associated with the SSH service.",
      recommendation:
        "Review SSH access controls, authentication settings and network restrictions.",
    },
  ];

  const severityFilters = [
    "All",
    "Critical",
    "High",
    "Medium",
    "Low",
  ];

  const filteredFindings = findings.filter((finding) => {
    const matchesSeverity =
      selectedSeverity === "All" ||
      finding.severity === selectedSeverity;

    const searchValue = search.toLowerCase();

    const matchesSearch =
      finding.issue.toLowerCase().includes(searchValue) ||
      finding.target.toLowerCase().includes(searchValue) ||
      finding.evidence.toLowerCase().includes(searchValue);

    return matchesSeverity && matchesSearch;
  });

  const getSeverityClass = (severity: Severity) => {
    switch (severity) {
      case "Critical":
        return "text-red-400 bg-red-500/10 border-red-500/20";
      case "High":
        return "text-orange-400 bg-orange-500/10 border-orange-500/20";
      case "Medium":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
      case "Low":
        return "text-blue-400 bg-blue-500/10 border-blue-500/20";
    }
  };

  const getSeverityIcon = (severity: Severity) => {
    switch (severity) {
      case "Critical":
        return <XCircle size={15} />;
      case "High":
        return <ShieldAlert size={15} />;
      case "Medium":
        return <AlertTriangle size={15} />;
      case "Low":
        return <FileWarning size={15} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-zinc-800 px-5 sm:px-8">
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Dashboard
          </Link>

          <div className="h-4 w-px bg-zinc-800" />

          <h1 className="text-sm font-semibold">Findings</h1>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-600">
          <span className="h-2 w-2 bg-green-500" />
          Scanner operational
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        {/* Heading */}
        <section>
          <p className="text-xs font-medium uppercase tracking-wider text-blue-500">
            Security Analysis
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Findings
          </h2>

          <p className="mt-1 max-w-2xl text-sm text-zinc-500">
            Review vulnerabilities detected across your scanned targets.
          </p>
        </section>

        {/* Summary */}
        <section className="mt-7 grid grid-cols-2 border border-zinc-800 bg-zinc-800 sm:grid-cols-4">
          <div className="border-b border-r border-zinc-800 bg-[#09090B] px-5 py-4 sm:border-b-0">
            <p className="text-xs text-zinc-600">Total Findings</p>
            <p className="mt-2 text-2xl font-semibold">29</p>
          </div>

          <div className="border-b border-zinc-800 bg-[#09090B] px-5 py-4 sm:border-b-0 sm:border-r">
            <p className="text-xs text-zinc-600">Critical</p>
            <p className="mt-2 text-2xl font-semibold text-red-400">03</p>
          </div>

          <div className="border-r border-zinc-800 bg-[#09090B] px-5 py-4">
            <p className="text-xs text-zinc-600">High</p>
            <p className="mt-2 text-2xl font-semibold text-orange-400">08</p>
          </div>

          <div className="bg-[#09090B] px-5 py-4">
            <p className="text-xs text-zinc-600">Medium / Low</p>
            <p className="mt-2 text-2xl font-semibold text-zinc-300">18</p>
          </div>
        </section>

        {/* Controls */}
        <section className="mt-6 flex flex-col gap-3 border border-zinc-800 bg-zinc-900/20 p-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative w-full lg:max-w-sm">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search findings..."
              className="h-10 w-full border border-zinc-800 bg-[#09090B] pl-9 pr-3 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-blue-500"
            />
          </div>

          {/* Severity */}
          <div className="flex flex-wrap gap-1">
            {severityFilters.map((severity) => (
              <button
                key={severity}
                onClick={() => setSelectedSeverity(severity)}
                className={`px-3 py-2 text-xs font-medium transition ${
                  selectedSeverity === severity
                    ? "bg-blue-600 text-white"
                    : "text-zinc-500 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                {severity}
              </button>
            ))}
          </div>
        </section>

        {/* Findings */}
        <section className="mt-6 border border-zinc-800">
          {/* Header */}
          <div className="hidden grid-cols-12 border-b border-zinc-800 px-5 py-3 text-[11px] uppercase tracking-wider text-zinc-600 md:grid">
            <span className="col-span-5">Finding</span>
            <span className="col-span-2">Severity</span>
            <span className="col-span-3">Target</span>
            <span className="col-span-2 text-right">Details</span>
          </div>

          {filteredFindings.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
              <FileWarning
                size={28}
                className="text-zinc-700"
              />

              <p className="mt-4 text-sm font-medium">
                No findings found
              </p>

              <p className="mt-1 text-xs text-zinc-600">
                Try changing your search or severity filter.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-800">
              {filteredFindings.map((finding) => {
                const expanded = expandedFinding === finding.id;

                return (
                  <div key={finding.id}>
                    {/* Finding row */}
                    <button
                      onClick={() =>
                        setExpandedFinding(
                          expanded ? null : finding.id
                        )
                      }
                      className="grid w-full gap-3 px-5 py-4 text-left transition hover:bg-zinc-900/50 md:grid-cols-12 md:items-center"
                    >
                      <div className="md:col-span-5">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 text-zinc-600">
                            {getSeverityIcon(finding.severity)}
                          </div>

                          <div>
                            <p className="text-sm font-medium">
                              {finding.issue}
                            </p>

                            <p className="mt-1 text-xs text-zinc-600">
                              Finding #{finding.id}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <span
                          className={`inline-flex items-center border px-2 py-1 text-[11px] font-medium ${getSeverityClass(
                            finding.severity
                          )}`}
                        >
                          {finding.severity}
                        </span>
                      </div>

                      <div className="text-xs text-zinc-500 md:col-span-3">
                        {finding.target}
                      </div>

                      <div className="flex justify-end text-zinc-600 md:col-span-2">
                        {expanded ? (
                          <ChevronUp size={17} />
                        ) : (
                          <ChevronDown size={17} />
                        )}
                      </div>
                    </button>

                    {/* Expanded details */}
                    {expanded && (
                      <div className="border-t border-zinc-800 bg-zinc-900/30 px-5 py-5">
                        <div className="grid gap-6 lg:grid-cols-2">
                          <div>
                            <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-600">
                              Evidence
                            </p>

                            <div className="mt-2 border border-zinc-800 bg-[#09090B] p-4">
                              <p className="text-xs leading-6 text-zinc-400">
                                {finding.evidence}
                              </p>
                            </div>
                          </div>

                          <div>
                            <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-600">
                              Recommendation
                            </p>

                            <div className="mt-2 border border-zinc-800 bg-[#09090B] p-4">
                              <p className="text-xs leading-6 text-zinc-400">
                                {finding.recommendation}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Footer note */}
        <div className="mt-5 flex items-center gap-2 text-xs text-zinc-600">
          <AlertTriangle size={14} />

          <span>
            Findings are generated from the configured vulnerability
            scanner checks.
          </span>
        </div>
      </main>
    </div>
  );
};

export default Findings;