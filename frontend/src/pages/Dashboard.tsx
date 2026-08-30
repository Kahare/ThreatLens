import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Globe,
  Plus,
  ScanLine,
  ShieldAlert,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo } from "react";

type Severity =
  | "Critical"
  | "High"
  | "Medium"
  | "Low"
  | "Informational";

type Finding = {
  issue?: string;
  severity?: Severity;
  evidence?: string | null;
  recommendation?: string | null;
};

type ScanResult = {
  scan_information?: {
    target?: string;
    domain?: string;
    scan_time?: string;
  };

  risk_summary?: {
    risk_score?: number;
    risk_level?: string;
    total_findings?: number;
    severity_counts?: Record<string, number>;
    findings?: Finding[];
  };

  report_paths?: {
    txt_report?: string;
    json_report?: string;
  };
};

const Dashboard = () => {
  const scanResult = useMemo<ScanResult | null>(() => {
    try {
      const stored = sessionStorage.getItem(
        "threatlens_scan_result",
      );

      if (!stored) {
        return null;
      }

      return JSON.parse(stored);
    } catch (error) {
      console.error(
        "Unable to read scan result:",
        error,
      );

      return null;
    }
  }, []);

  const riskSummary =
    scanResult?.risk_summary;

  const severityCounts =
    riskSummary?.severity_counts ?? {};

  const findings =
    riskSummary?.findings ?? [];

  const riskScore =
    riskSummary?.risk_score ?? 0;

  const riskLevel =
    riskSummary?.risk_level ?? "No Scan";

  const totalFindings =
    riskSummary?.total_findings ??
    findings.length;

  const criticalCount =
    severityCounts.Critical ?? 0;

  const highCount =
    severityCounts.High ?? 0;

  const mediumCount =
    severityCounts.Medium ?? 0;

  const lowCount =
    severityCounts.Low ?? 0;

  const target =
    scanResult?.scan_information?.domain ||
    scanResult?.scan_information?.target ||
    "No scan completed";

  const scanDate = useMemo(() => {
    const scanTime =
      scanResult?.scan_information?.scan_time;

    if (!scanTime) {
      return "No scan yet";
    }

    const date = new Date(scanTime);

    if (Number.isNaN(date.getTime())) {
      return scanTime;
    }

    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }, [scanResult]);

  const topVulnerabilities = useMemo(() => {
    const counts: Record<
      string,
      {
        name: string;
        severity: Severity;
        count: number;
        target: string;
      }
    > = {};

    findings.forEach((finding) => {
      const name =
        finding.issue ||
        "Unknown finding";

      const severity =
        finding.severity ||
        "Informational";

      if (!counts[name]) {
        counts[name] = {
          name,
          severity,
          count: 0,
          target,
        };
      }

      counts[name].count += 1;
    });

    return Object.values(counts)
      .sort((a, b) => {
        const severityOrder: Record<
          Severity,
          number
        > = {
          Critical: 5,
          High: 4,
          Medium: 3,
          Low: 2,
          Informational: 1,
        };

        const severityDifference =
          severityOrder[b.severity] -
          severityOrder[a.severity];

        if (severityDifference !== 0) {
          return severityDifference;
        }

        return b.count - a.count;
      })
      .slice(0, 4);
  }, [findings, target]);

  const getRiskColor = (
    level: string,
  ) => {
    switch (level.toLowerCase()) {
      case "critical":
        return "text-red-400";

      case "high":
        return "text-orange-400";

      case "medium":
        return "text-yellow-400";

      case "low":
      case "good":
        return "text-blue-400";

      default:
        return "text-zinc-500";
    }
  };

  const getSeverityColor = (
    severity: string,
  ) => {
    switch (severity) {
      case "Critical":
        return "text-red-400";

      case "High":
        return "text-orange-400";

      case "Medium":
        return "text-yellow-400";

      case "Low":
        return "text-blue-400";

      default:
        return "text-zinc-400";
    }
  };

  const getSeverityBar = (
    severity: string,
  ) => {
    switch (severity) {
      case "Critical":
        return "w-[85%] bg-red-500";

      case "High":
        return "w-[65%] bg-orange-500";

      case "Medium":
        return "w-[50%] bg-yellow-500";

      case "Low":
        return "w-[30%] bg-blue-500";

      default:
        return "w-[20%] bg-zinc-500";
    }
  };

  return (
    <>
      {/* Page Header */}
      <header className="flex h-16 items-center justify-between border-b border-zinc-800 px-5 sm:px-7">
        <div>
          <h1 className="text-base font-semibold sm:text-lg">
            Security Overview
          </h1>
        </div>

        <Link
          to="/new-scan"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium transition hover:bg-blue-700"
        >
          <Plus size={16} />
          New Scan
        </Link>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-[1500px] space-y-6 p-5 sm:p-7">
        {/* Page Intro */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight">
            Security Overview
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Monitor vulnerabilities and security activity across your
            targets.
          </p>
        </section>

        {/* Security Posture */}
        <section className="grid gap-px overflow-hidden border border-zinc-800 bg-zinc-800 lg:grid-cols-3">
          {/* Score */}
          <div className="bg-[#09090B] p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">
              Security Posture
            </p>

            <div className="mt-5 flex items-end gap-3">
              <span className="text-5xl font-semibold tracking-tight">
                {riskScore}
              </span>

              <span className="mb-1 text-sm text-zinc-600">
                / 100
              </span>
            </div>

            <div className="mt-4 h-1.5 w-full bg-zinc-800">
              <div
                className="h-full bg-blue-600 transition-all"
                style={{
                  width: `${Math.min(
                    Math.max(riskScore, 0),
                    100,
                  )}%`,
                }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs">
              <span
                className={getRiskColor(
                  riskLevel,
                )}
              >
                {riskLevel}
              </span>

              <span className="text-zinc-600">
                {scanResult
                  ? "Latest scan"
                  : "No scan completed"}
              </span>
            </div>
          </div>

          {/* Vulnerability Summary */}
          <div className="bg-[#09090B] p-5 lg:col-span-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">
                Vulnerability Summary
              </p>

              <ShieldAlert
                size={17}
                className="text-zinc-600"
              />
            </div>

            <div className="mt-5 grid grid-cols-2 divide-x divide-zinc-800 sm:grid-cols-4">
              {/* Critical */}
              <div className="px-4 first:pl-0">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-red-500" />

                  <span className="text-xs text-zinc-500">
                    Critical
                  </span>
                </div>

                <p className="mt-2 text-2xl font-semibold text-red-400">
                  {criticalCount
                    .toString()
                    .padStart(2, "0")}
                </p>
              </div>

              {/* High */}
              <div className="px-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-orange-500" />

                  <span className="text-xs text-zinc-500">
                    High
                  </span>
                </div>

                <p className="mt-2 text-2xl font-semibold text-orange-400">
                  {highCount
                    .toString()
                    .padStart(2, "0")}
                </p>
              </div>

              {/* Medium */}
              <div className="px-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-yellow-500" />

                  <span className="text-xs text-zinc-500">
                    Medium
                  </span>
                </div>

                <p className="mt-2 text-2xl font-semibold text-yellow-400">
                  {mediumCount
                    .toString()
                    .padStart(2, "0")}
                </p>
              </div>

              {/* Low */}
              <div className="px-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-blue-500" />

                  <span className="text-xs text-zinc-500">
                    Low
                  </span>
                </div>

                <p className="mt-2 text-2xl font-semibold text-blue-400">
                  {lowCount
                    .toString()
                    .padStart(2, "0")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Scan */}
        <section className="border border-zinc-800 bg-zinc-900/20 p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <ScanLine
                  size={17}
                  className="text-blue-500"
                />

                <h3 className="text-sm font-semibold">
                  Start a vulnerability scan
                </h3>
              </div>

              <p className="mt-1 text-xs text-zinc-600">
                Enter a target URL to begin security analysis.
              </p>
            </div>

            <Link
              to="/new-scan"
              className="flex h-10 w-full items-center justify-center gap-2 bg-blue-600 px-4 text-sm font-medium transition hover:bg-blue-700 lg:w-auto"
            >
              <ScanLine size={16} />
              Start Scan
            </Link>
          </div>
        </section>

        {/* Main Grid */}
        <section className="grid gap-6 xl:grid-cols-3">
          {/* Recent Scan */}
          <div className="border border-zinc-800 xl:col-span-2">
            <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
              <div>
                <h3 className="text-sm font-semibold">
                  Recent Scans
                </h3>

                <p className="mt-1 text-xs text-zinc-600">
                  Latest vulnerability assessments
                </p>
              </div>

              <Link
                to="/reports"
                className="text-xs text-blue-500 hover:text-blue-400"
              >
                View reports
              </Link>
            </div>

            {/* Table Header */}
            <div className="hidden grid-cols-12 border-b border-zinc-800 px-5 py-3 text-[11px] uppercase tracking-wider text-zinc-600 sm:grid">
              <span className="col-span-4">
                Target
              </span>

              <span className="col-span-2">
                Findings
              </span>

              <span className="col-span-2">
                Risk
              </span>

              <span className="col-span-2">
                Status
              </span>

              <span className="col-span-2 text-right">
                Scanned
              </span>
            </div>

            <div className="divide-y divide-zinc-800">
              {scanResult ? (
                <div className="grid gap-3 px-5 py-4 transition hover:bg-zinc-900/50 sm:grid-cols-12 sm:items-center">
                  {/* Target */}
                  <div className="sm:col-span-4">
                    <div className="flex items-center gap-3">
                      <Globe
                        size={16}
                        className="text-zinc-600"
                      />

                      <div>
                        <p className="text-sm font-medium">
                          {target}
                        </p>

                        <p className="mt-1 flex items-center gap-1 text-[11px] text-zinc-600 sm:hidden">
                          <Clock3 size={11} />
                          {scanDate}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Findings */}
                  <div className="text-sm text-zinc-400 sm:col-span-2">
                    <span className="sm:hidden">
                      Findings:{" "}
                    </span>

                    {totalFindings}
                  </div>

                  {/* Risk */}
                  <div className="sm:col-span-2">
                    <span
                      className={`text-xs font-medium ${getRiskColor(
                        riskLevel,
                      )}`}
                    >
                      {riskLevel}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="sm:col-span-2">
                    <span className="inline-flex items-center gap-1.5 text-xs text-green-400">
                      <CheckCircle2 size={13} />
                      Completed
                    </span>
                  </div>

                  {/* Date */}
                  <div className="hidden text-right text-xs text-zinc-600 sm:col-span-2 sm:block">
                    {scanDate}
                  </div>
                </div>
              ) : (
                <div className="px-5 py-12 text-center">
                  <ScanLine
                    size={25}
                    className="mx-auto text-zinc-700"
                  />

                  <p className="mt-4 text-sm font-medium">
                    No scans yet
                  </p>

                  <p className="mt-1 text-xs text-zinc-600">
                    Start your first vulnerability scan to see results here.
                  </p>

                  <Link
                    to="/new-scan"
                    className="mt-5 inline-flex items-center gap-2 bg-blue-600 px-4 py-2 text-xs font-medium hover:bg-blue-700"
                  >
                    <Plus size={14} />
                    New Scan
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Top Vulnerabilities */}
          <div className="border border-zinc-800">
            <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
              <div>
                <h3 className="text-sm font-semibold">
                  Top Vulnerabilities
                </h3>

                <p className="mt-1 text-xs text-zinc-600">
                  Most frequently detected
                </p>
              </div>

              <AlertTriangle
                size={17}
                className="text-zinc-600"
              />
            </div>

            <div className="divide-y divide-zinc-800">
              {topVulnerabilities.length > 0 ? (
                topVulnerabilities.map(
                  (vulnerability) => (
                    <div
                      key={vulnerability.name}
                      className="px-5 py-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {vulnerability.name}
                          </p>

                          <p className="mt-1 truncate text-xs text-zinc-600">
                            {vulnerability.target}
                          </p>
                        </div>

                        <span
                          className={`shrink-0 text-[11px] font-medium ${getSeverityColor(
                            vulnerability.severity,
                          )}`}
                        >
                          {vulnerability.severity}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="h-1 flex-1 bg-zinc-800">
                          <div
                            className={`h-full ${getSeverityBar(
                              vulnerability.severity,
                            )}`}
                          />
                        </div>

                        <span className="ml-3 text-xs text-zinc-500">
                          {vulnerability.count}
                        </span>
                      </div>
                    </div>
                  ),
                )
              ) : (
                <div className="px-5 py-12 text-center">
                  <CheckCircle2
                    size={24}
                    className="mx-auto text-zinc-700"
                  />

                  <p className="mt-4 text-sm font-medium">
                    No vulnerabilities yet
                  </p>

                  <p className="mt-1 text-xs text-zinc-600">
                    Run a scan to populate this section.
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-zinc-800 px-5 py-4">
              <Link
                to="/findings"
                className="flex w-full items-center justify-center gap-2 text-xs font-medium text-blue-500 hover:text-blue-400"
              >
                View all findings
              </Link>
            </div>
          </div>
        </section>

        {/* Bottom Status */}
        <section className="flex flex-col gap-3 border border-zinc-800 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-green-500" />

            <span className="text-xs text-zinc-500">
              Scanner service operational
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs text-zinc-600">
            <span>
              {scanResult
                ? "1 completed scan"
                : "0 completed scans"}
            </span>

            <span>
              {totalFindings} vulnerabilities
            </span>

            <span>
              {scanResult
                ? `Last scan ${scanDate}`
                : "No scan yet"}
            </span>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;