import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Download,
  FileJson,
  FileText,
  Globe,
  Search,
  ShieldAlert,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

type Report = {
  id: number;
  target: string;
  date: string;
  risk: "Critical" | "High" | "Medium" | "Low";
  findings: number;
};

const Reports = () => {
  const [search, setSearch] = useState("");

  const reports: Report[] = [
    {
      id: 1,
      target: "example.com",
      date: "August 25, 2026 • 06:42 PM",
      risk: "High",
      findings: 12,
    },
    {
      id: 2,
      target: "api.example.com",
      date: "August 25, 2026 • 04:18 PM",
      risk: "Medium",
      findings: 5,
    },
    {
      id: 3,
      target: "demo-site.com",
      date: "August 24, 2026 • 09:31 PM",
      risk: "Low",
      findings: 2,
    },
    {
      id: 4,
      target: "test-api.com",
      date: "August 24, 2026 • 07:14 PM",
      risk: "Critical",
      findings: 18,
    },
  ];

  const filteredReports = reports.filter((report) =>
    report.target.toLowerCase().includes(search.toLowerCase())
  );

  const riskColor = (risk: Report["risk"]) => {
    switch (risk) {
      case "Critical":
        return "text-red-400";
      case "High":
        return "text-orange-400";
      case "Medium":
        return "text-yellow-400";
      case "Low":
        return "text-blue-400";
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

          <h1 className="text-sm font-semibold">Reports</h1>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-600">
          <span className="h-2 w-2 bg-green-500" />
          Report system ready
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
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
        </section>

        {/* Summary */}
        <section className="mt-7 grid grid-cols-2 border border-zinc-800 bg-zinc-800 sm:grid-cols-3">
          <div className="border-b border-r border-zinc-800 bg-[#09090B] px-5 py-4 sm:border-b-0">
            <div className="flex items-center gap-2">
              <FileText size={15} className="text-zinc-600" />
              <p className="text-xs text-zinc-600">Total Reports</p>
            </div>

            <p className="mt-2 text-2xl font-semibold">24</p>
          </div>

          <div className="border-b border-zinc-800 bg-[#09090B] px-5 py-4 sm:border-b-0 sm:border-r">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-green-500" />
              <p className="text-xs text-zinc-600">Completed Scans</p>
            </div>

            <p className="mt-2 text-2xl font-semibold">24</p>
          </div>

          <div className="bg-[#09090B] px-5 py-4">
            <div className="flex items-center gap-2">
              <ShieldAlert size={15} className="text-zinc-600" />
              <p className="text-xs text-zinc-600">Latest Findings</p>
            </div>

            <p className="mt-2 text-2xl font-semibold">12</p>
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
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reports by target..."
              className="h-10 w-full border border-zinc-800 bg-[#09090B] pl-9 pr-3 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-blue-500"
            />
          </div>
        </section>

        {/* Reports */}
        <section className="mt-6 border border-zinc-800">
          {/* Desktop table header */}
          <div className="hidden grid-cols-12 border-b border-zinc-800 px-5 py-3 text-[11px] uppercase tracking-wider text-zinc-600 md:grid">
            <span className="col-span-4">Target</span>
            <span className="col-span-2">Risk</span>
            <span className="col-span-2">Findings</span>
            <span className="col-span-2">Generated</span>
            <span className="col-span-2 text-right">Export</span>
          </div>

          <div className="divide-y divide-zinc-800">
            {filteredReports.map((report) => (
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
                        Scan #{report.id.toString().padStart(4, "0")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Risk */}
                <div className="md:col-span-2">
                  <span
                    className={`text-xs font-medium ${riskColor(
                      report.risk
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
                  <span>{report.date}</span>
                </div>

                {/* Export */}
                <div className="flex gap-2 md:col-span-2 md:justify-end">
                  <button
                    title="Download TXT report"
                    className="flex items-center gap-2 border border-zinc-800 px-3 py-2 text-xs text-zinc-400 transition hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
                  >
                    <FileText size={14} />
                    TXT
                    <Download size={13} />
                  </button>

                  <button
                    title="Download JSON report"
                    className="flex items-center gap-2 border border-zinc-800 px-3 py-2 text-xs text-zinc-400 transition hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
                  >
                    <FileJson size={14} />
                    JSON
                    <Download size={13} />
                  </button>
                </div>
              </div>
            ))}

            {filteredReports.length === 0 && (
              <div className="px-5 py-16 text-center">
                <FileText
                  size={28}
                  className="mx-auto text-zinc-700"
                />

                <p className="mt-4 text-sm font-medium">
                  No reports found
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  Try searching for a different target.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Format information */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="border border-zinc-800 bg-zinc-900/20 p-5">
            <div className="flex items-center gap-3">
              <FileText size={19} className="text-zinc-500" />

              <h3 className="text-sm font-semibold">
                TXT Report
              </h3>
            </div>

            <p className="mt-3 text-xs leading-5 text-zinc-600">
              Human-readable report containing the target, risk summary,
              detected findings, evidence, and recommendations.
            </p>
          </div>

          <div className="border border-zinc-800 bg-zinc-900/20 p-5">
            <div className="flex items-center gap-3">
              <FileJson size={19} className="text-zinc-500" />

              <h3 className="text-sm font-semibold">
                JSON Report
              </h3>
            </div>

            <p className="mt-3 text-xs leading-5 text-zinc-600">
              Structured scan output containing risk results and individual
              scanner module results for further processing.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Reports;