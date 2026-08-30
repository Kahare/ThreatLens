import {
  Calendar,
  CheckCircle2,
  Download,
  FileJson,
  FileText,
  Globe,
  Search,
  ShieldAlert,
} from "lucide-react";
import { useMemo, useState } from "react";

type Severity =
  | "Critical"
  | "High"
  | "Medium"
  | "Low"
  | "Informational";

type Finding = {
  issue?: string;
  severity?: Severity;
  score?: number;
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

  module_results?: Record<string, unknown>;

  report_paths?: {
    txt_report?: string;
    json_report?: string;
  };
};

const Reports = () => {
  const [search, setSearch] = useState("");

  const [scanResult] = useState<ScanResult | null>(() => {
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
  });

  const target =
    scanResult?.scan_information?.target ||
    scanResult?.scan_information?.domain ||
    "Unknown target";

  const risk =
    scanResult?.risk_summary?.risk_level ||
    "Unknown";

  const findings =
    scanResult?.risk_summary?.findings ?? [];

  const totalFindings =
    scanResult?.risk_summary?.total_findings ??
    findings.length;

  const scanTime =
    scanResult?.scan_information?.scan_time;

  /*
   * Format the scan timestamp for display.
   */
  const formattedDate = useMemo(() => {
    if (!scanTime) {
      return "Unknown date";
    }

    const date = new Date(scanTime);

    if (Number.isNaN(date.getTime())) {
      return scanTime;
    }

    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }, [scanTime]);

  /*
   * Keep the current Reports UI structure,
   * but create one report from the actual scan.
   */
  const reports = useMemo(() => {
    if (!scanResult) {
      return [];
    }

    return [
      {
        id: 1,
        target,
        date: formattedDate,
        risk,
        findings: totalFindings,
      },
    ];
  }, [
    scanResult,
    target,
    formattedDate,
    risk,
    totalFindings,
  ]);

  const filteredReports = reports.filter(
    (report) =>
      report.target
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  const riskColor = (riskLevel: string) => {
    switch (riskLevel) {
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

  /*
   * Download a file in the browser.
   */
  const downloadFile = (
    content: string,
    filename: string,
    type: string,
  ) => {
    const blob = new Blob(
      [content],
      { type },
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);
  };

  /*
   * Create a readable TXT report from
   * the actual scanner result.
   */
  const downloadTxtReport = () => {
    if (!scanResult) {
      return;
    }

    const riskSummary =
      scanResult.risk_summary ?? {};

    const scannerFindings =
      riskSummary.findings ?? [];

    let content = "";

    content +=
      "============================================\n";

    content +=
      "              THREATLENS REPORT\n";

    content +=
      "============================================\n\n";

    content += `Target: ${target}\n`;

    content += `Scan Time: ${formattedDate}\n`;

    content += `Risk Level: ${
      riskSummary.risk_level ?? "Unknown"
    }\n`;

    content += `Risk Score: ${
      riskSummary.risk_score ?? "N/A"
    }\n`;

    content += `Total Findings: ${
      riskSummary.total_findings ??
      scannerFindings.length
    }\n\n`;

    content +=
      "--------------------------------------------\n";

    content +=
      "SEVERITY BREAKDOWN\n";

    content +=
      "--------------------------------------------\n";

    const severityCounts =
      riskSummary.severity_counts ?? {};

    content += `Critical: ${
      severityCounts.Critical ?? 0
    }\n`;

    content += `High: ${
      severityCounts.High ?? 0
    }\n`;

    content += `Medium: ${
      severityCounts.Medium ?? 0
    }\n`;

    content += `Low: ${
      severityCounts.Low ?? 0
    }\n`;

    content += `Informational: ${
      severityCounts.Informational ?? 0
    }\n\n`;

    content +=
      "--------------------------------------------\n";

    content +=
      "DETECTED FINDINGS\n";

    content +=
      "--------------------------------------------\n";

    if (scannerFindings.length === 0) {
      content +=
        "\nNo security findings were detected.\n";
    }

    scannerFindings.forEach(
      (finding, index) => {
        content += `\n${index + 1}. ${
          finding.issue ??
          "Unknown finding"
        }\n`;

        content += `Severity: ${
          finding.severity ??
          "Informational"
        }\n`;

        if (
          finding.score !== undefined
        ) {
          content += `Score: ${finding.score}\n`;
        }

        content += `Evidence: ${
          finding.evidence ??
          "No evidence provided."
        }\n`;

        content += `Recommendation: ${
          finding.recommendation ??
          "No recommendation provided."
        }\n`;

        content += "\n";
      },
    );

    content +=
      "============================================\n";

    content +=
      "Generated by ThreatLens\n";

    content +=
      "============================================\n";

    downloadFile(
      content,
      "threatlens-report.txt",
      "text/plain",
    );
  };

  /*
   * Download the complete JSON result.
   */
  const downloadJsonReport = () => {
    if (!scanResult) {
      return;
    }

    const json = JSON.stringify(
      scanResult,
      null,
      2,
    );

    downloadFile(
      json,
      "threatlens-report.json",
      "application/json",
    );
  };

  return (
    <>
      {/* Page Header */}
      <header className="flex h-16 items-center justify-between border-b border-zinc-800 px-5 sm:px-7">
        <div>
          <h1 className="text-base font-semibold sm:text-lg">
            Reports
          </h1>

          <p className="mt-0.5 hidden text-xs text-zinc-600 sm:block">
            Generated reports from completed vulnerability scans.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-600">
          <span className="h-2 w-2 bg-green-500" />
          Report system ready
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-7">
        {/* Heading */}
        <section>
          <p className="text-xs font-medium uppercase tracking-wider text-blue-500">
            Scan Results
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Reports
          </h2>

          <p className="mt-1 max-w-2xl text-sm text-zinc-500">
            Access reports generated from completed vulnerability scans.
          </p>

          {scanResult && (
            <p className="mt-4 text-xs text-zinc-600">
              Latest scan:{" "}
              <span className="text-zinc-400">
                {target}
              </span>
            </p>
          )}
        </section>

        {/* No Scan */}
        {!scanResult && (
          <section className="mt-7 border border-yellow-500/20 bg-yellow-500/[0.03] p-4">
            <p className="text-sm font-medium text-yellow-500">
              No scan report available
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              Run a security scan first to generate a report.
            </p>
          </section>
        )}

        {/* Summary */}
        <section className="mt-7 grid grid-cols-2 border border-zinc-800 bg-zinc-800 sm:grid-cols-3">
          <div className="border-b border-r border-zinc-800 bg-[#09090B] px-5 py-4 sm:border-b-0">
            <div className="flex items-center gap-2">
              <FileText
                size={15}
                className="text-zinc-600"
              />

              <p className="text-xs text-zinc-600">
                Reports
              </p>
            </div>

            <p className="mt-2 text-2xl font-semibold">
              {scanResult ? 1 : 0}
            </p>
          </div>

          <div className="border-b border-zinc-800 bg-[#09090B] px-5 py-4 sm:border-b-0 sm:border-r">
            <div className="flex items-center gap-2">
              <CheckCircle2
                size={15}
                className="text-green-500"
              />

              <p className="text-xs text-zinc-600">
                Completed Scans
              </p>
            </div>

            <p className="mt-2 text-2xl font-semibold">
              {scanResult ? 1 : 0}
            </p>
          </div>

          <div className="bg-[#09090B] px-5 py-4">
            <div className="flex items-center gap-2">
              <ShieldAlert
                size={15}
                className="text-zinc-600"
              />

              <p className="text-xs text-zinc-600">
                Latest Findings
              </p>
            </div>

            <p className="mt-2 text-2xl font-semibold">
              {totalFindings}
            </p>
          </div>
        </section>

        {/* Search */}
        <section className="mt-6 border border-zinc-800 bg-zinc-900/20 p-4">
          <div className="relative w-full sm:max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search reports by target..."
              className="h-10 w-full border border-zinc-800 bg-[#09090B] pl-9 pr-3 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-blue-500"
            />
          </div>
        </section>

        {/* Reports */}
        <section className="mt-6 border border-zinc-800">
          {/* Table header */}
          <div className="hidden grid-cols-12 border-b border-zinc-800 px-5 py-3 text-[11px] uppercase tracking-wider text-zinc-600 md:grid">
            <span className="col-span-4">
              Target
            </span>

            <span className="col-span-2">
              Risk
            </span>

            <span className="col-span-2">
              Findings
            </span>

            <span className="col-span-2">
              Generated
            </span>

            <span className="col-span-2 text-right">
              Export
            </span>
          </div>

          <div className="divide-y divide-zinc-800">
            {filteredReports.map(
              (report) => (
                <div
                  key={report.id}
                  className="flex flex-col gap-4 px-5 py-5 transition hover:bg-zinc-900/50 md:grid md:grid-cols-12 md:items-center"
                >
                  {/* Target */}
                  <div className="md:col-span-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center border border-zinc-800 bg-zinc-900 text-zinc-500">
                        <Globe size={16} />
                      </div>

                      <div>
                        <p className="text-sm font-medium">
                          {report.target}
                        </p>

                        <p className="mt-1 text-xs text-zinc-600">
                          Latest scan
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Risk */}
                  <div className="md:col-span-2">
                    <span
                      className={`text-xs font-medium ${riskColor(
                        report.risk,
                      )}`}
                    >
                      {report.risk}
                    </span>
                  </div>

                  {/* Findings */}
                  <div className="text-sm text-zinc-400 md:col-span-2">
                    {report.findings} findings
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-xs text-zinc-600 md:col-span-2">
                    <Calendar size={13} />

                    <span>
                      {report.date}
                    </span>
                  </div>

                  {/* Export */}
                  <div className="flex gap-2 md:col-span-2 md:justify-end">
                    <button
                      onClick={
                        downloadTxtReport
                      }
                      disabled={!scanResult}
                      title="Download TXT report"
                      className="flex items-center gap-2 border border-zinc-800 px-3 py-2 text-xs text-zinc-400 transition hover:border-zinc-700 hover:bg-zinc-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <FileText size={14} />

                      TXT

                      <Download size={13} />
                    </button>

                    <button
                      onClick={
                        downloadJsonReport
                      }
                      disabled={!scanResult}
                      title="Download JSON report"
                      className="flex items-center gap-2 border border-zinc-800 px-3 py-2 text-xs text-zinc-400 transition hover:border-zinc-700 hover:bg-zinc-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <FileJson size={14} />

                      JSON

                      <Download size={13} />
                    </button>
                  </div>
                </div>
              ),
            )}

            {filteredReports.length ===
              0 && (
              <div className="px-5 py-16 text-center">
                <FileText
                  size={28}
                  className="mx-auto text-zinc-700"
                />

                <p className="mt-4 text-sm font-medium">
                  No reports found
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  Run a scan or search for a different target.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Report formats */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="border border-zinc-800 bg-zinc-900/20 p-5">
            <div className="flex items-center gap-3">
              <FileText
                size={19}
                className="text-zinc-500"
              />

              <h3 className="text-sm font-semibold">
                TXT Report
              </h3>
            </div>

            <p className="mt-3 text-xs leading-5 text-zinc-600">
              Human-readable report containing the target, risk summary,
              detected findings, evidence, and recommendations.
            </p>

            {scanResult && (
              <button
                onClick={downloadTxtReport}
                className="mt-4 text-xs font-medium text-blue-500 hover:text-blue-400"
              >
                Download TXT →
              </button>
            )}
          </div>

          <div className="border border-zinc-800 bg-zinc-900/20 p-5">
            <div className="flex items-center gap-3">
              <FileJson
                size={19}
                className="text-zinc-500"
              />

              <h3 className="text-sm font-semibold">
                JSON Report
              </h3>
            </div>

            <p className="mt-3 text-xs leading-5 text-zinc-600">
              Structured scan output containing risk results and individual
              scanner module results for further processing.
            </p>

            {scanResult && (
              <button
                onClick={downloadJsonReport}
                className="mt-4 text-xs font-medium text-blue-500 hover:text-blue-400"
              >
                Download JSON →
              </button>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Reports;