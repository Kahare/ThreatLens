import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  FileText,
  Globe,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  ScanLine,
  Settings,
  ShieldAlert,
  ShieldCheck,
  X,
  XCircle,
} from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const recentScans = [
    {
      target: "example.com",
      date: "Today, 06:42 PM",
      findings: 12,
      risk: "High",
      status: "Completed",
    },
    {
      target: "api.example.com",
      date: "Today, 04:18 PM",
      findings: 5,
      risk: "Medium",
      status: "Completed",
    },
    {
      target: "demo-site.com",
      date: "Yesterday, 09:31 PM",
      findings: 2,
      risk: "Low",
      status: "Completed",
    },
    {
      target: "test-api.com",
      date: "Yesterday, 07:14 PM",
      findings: 18,
      risk: "Critical",
      status: "Completed",
    },
  ];

  const vulnerabilities = [
    {
      name: "SQL Injection",
      target: "example.com",
      severity: "Critical",
      count: 3,
    },
    {
      name: "Cross-Site Scripting",
      target: "example.com",
      severity: "High",
      count: 5,
    },
    {
      name: "Missing Security Headers",
      target: "api.example.com",
      severity: "Medium",
      count: 8,
    },
    {
      name: "Insecure HTTP Configuration",
      target: "demo-site.com",
      severity: "Low",
      count: 6,
    },
  ];

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-zinc-800 bg-[#09090B] transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-zinc-800 px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <ShieldCheck size={18} />
            </div>

            <span className="text-lg font-semibold tracking-tight">
              Threat<span className="text-blue-500">Lens</span>
            </span>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-zinc-500 hover:text-white lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5">
          <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-wider text-zinc-600">
            Workspace
          </p>

          <button className="mb-1 flex w-full items-center gap-3 border-l-2 border-blue-500 bg-blue-500/5 px-3 py-2.5 text-sm font-medium text-blue-400">
            <LayoutDashboard size={17} />
            Overview
          </button>

          <button className="mb-1 flex w-full items-center gap-3 border-l-2 border-transparent px-3 py-2.5 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-200">
            <ScanLine size={17} />
            Scans
          </button>

          <button className="mb-1 flex w-full items-center gap-3 border-l-2 border-transparent px-3 py-2.5 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-200">
            <ShieldAlert size={17} />
            Findings
          </button>

          <button className="mb-1 flex w-full items-center gap-3 border-l-2 border-transparent px-3 py-2.5 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-200">
            <FileText size={17} />
            Reports
          </button>

          <p className="mb-2 mt-8 px-3 text-[11px] font-medium uppercase tracking-wider text-zinc-600">
            System
          </p>

          <button className="flex w-full items-center gap-3 border-l-2 border-transparent px-3 py-2.5 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-200">
            <Settings size={17} />
            Settings
          </button>
        </nav>

        {/* User */}
        <div className="border-t border-zinc-800 p-3">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-xs font-semibold text-zinc-300">
              TL
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                ThreatLens User
              </p>
              <p className="truncate text-xs text-zinc-600">
                Security Analyst
              </p>
            </div>

            <button className="text-zinc-600 transition hover:text-zinc-300">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="lg:ml-60">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-zinc-800 px-5 sm:px-7">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-zinc-400 hover:text-white lg:hidden"
            >
              <Menu size={21} />
            </button>

            <div>
              <h1 className="text-base font-semibold sm:text-lg">
                Security Overview
              </h1>
            </div>
          </div>

          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium transition hover:bg-blue-700">
            <Plus size={16} />
            New Scan
          </button>
        </header>

        {/* Content */}
        <div className="mx-auto max-w-[1500px] space-y-6 p-5 sm:p-7">
          {/* Page intro */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              Security Overview
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Monitor vulnerabilities and security activity across your
              targets.
            </p>
          </section>

          {/* Security posture */}
          <section className="grid gap-px overflow-hidden border border-zinc-800 bg-zinc-800 lg:grid-cols-3">
            {/* Score */}
            <div className="bg-[#09090B] p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">
                Security Posture
              </p>

              <div className="mt-5 flex items-end gap-3">
                <span className="text-5xl font-semibold tracking-tight">
                  78
                </span>

                <span className="mb-1 text-sm text-zinc-600">/ 100</span>
              </div>

              <div className="mt-4 h-1.5 w-full bg-zinc-800">
                <div className="h-full w-[78%] bg-blue-600" />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-blue-400">Moderate Risk</span>
                <span className="text-zinc-600">+6 from last scan</span>
              </div>
            </div>

            {/* Vulnerability counts */}
            <div className="bg-[#09090B] p-5 lg:col-span-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">
                  Vulnerability Summary
                </p>

                <ShieldAlert size={17} className="text-zinc-600" />
              </div>

              <div className="mt-5 grid grid-cols-2 divide-x divide-zinc-800 sm:grid-cols-4">
                <div className="px-4 first:pl-0">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-red-500" />
                    <span className="text-xs text-zinc-500">Critical</span>
                  </div>

                  <p className="mt-2 text-2xl font-semibold text-red-400">
                    03
                  </p>
                </div>

                <div className="px-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-orange-500" />
                    <span className="text-xs text-zinc-500">High</span>
                  </div>

                  <p className="mt-2 text-2xl font-semibold text-orange-400">
                    08
                  </p>
                </div>

                <div className="px-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-yellow-500" />
                    <span className="text-xs text-zinc-500">Medium</span>
                  </div>

                  <p className="mt-2 text-2xl font-semibold text-yellow-400">
                    12
                  </p>
                </div>

                <div className="px-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-blue-500" />
                    <span className="text-xs text-zinc-500">Low</span>
                  </div>

                  <p className="mt-2 text-2xl font-semibold text-blue-400">
                    06
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Quick scan */}
          <section className="border border-zinc-800 bg-zinc-900/20 p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <ScanLine size={17} className="text-blue-500" />

                  <h3 className="text-sm font-semibold">
                    Start a vulnerability scan
                  </h3>
                </div>

                <p className="mt-1 text-xs text-zinc-600">
                  Enter a target URL to begin security analysis.
                </p>
              </div>

              <div className="flex w-full gap-2 lg:w-auto lg:min-w-[500px]">
                <div className="relative flex-1">
                  <Globe
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                  />

                  <input
                    type="url"
                    placeholder="https://target.example"
                    className="h-10 w-full border border-zinc-800 bg-[#09090B] pl-9 pr-3 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-blue-500"
                  />
                </div>

                <button className="flex h-10 items-center gap-2 bg-blue-600 px-4 text-sm font-medium transition hover:bg-blue-700">
                  <ScanLine size={16} />
                  Scan
                </button>
              </div>
            </div>
          </section>

          {/* Main grid */}
          <section className="grid gap-6 xl:grid-cols-3">
            {/* Recent scans */}
            <div className="border border-zinc-800 xl:col-span-2">
              <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                <div>
                  <h3 className="text-sm font-semibold">Recent Scans</h3>
                  <p className="mt-1 text-xs text-zinc-600">
                    Latest vulnerability assessments
                  </p>
                </div>

                <button className="text-xs text-blue-500 hover:text-blue-400">
                  View all
                </button>
              </div>

              {/* Table header */}
              <div className="hidden grid-cols-12 border-b border-zinc-800 px-5 py-3 text-[11px] uppercase tracking-wider text-zinc-600 sm:grid">
                <span className="col-span-4">Target</span>
                <span className="col-span-2">Findings</span>
                <span className="col-span-2">Risk</span>
                <span className="col-span-2">Status</span>
                <span className="col-span-2 text-right">Scanned</span>
              </div>

              <div className="divide-y divide-zinc-800">
                {recentScans.map((scan) => (
                  <div
                    key={scan.target}
                    className="grid gap-3 px-5 py-4 transition hover:bg-zinc-900/50 sm:grid-cols-12 sm:items-center"
                  >
                    <div className="sm:col-span-4">
                      <div className="flex items-center gap-3">
                        <Globe size={16} className="text-zinc-600" />

                        <div>
                          <p className="text-sm font-medium">
                            {scan.target}
                          </p>

                          <p className="mt-1 flex items-center gap-1 text-[11px] text-zinc-600 sm:hidden">
                            <Clock3 size={11} />
                            {scan.date}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-zinc-400 sm:col-span-2">
                      <span className="sm:hidden">Findings: </span>
                      {scan.findings}
                    </div>

                    <div className="sm:col-span-2">
                      <span
                        className={`text-xs font-medium ${
                          scan.risk === "Critical"
                            ? "text-red-400"
                            : scan.risk === "High"
                              ? "text-orange-400"
                              : scan.risk === "Medium"
                                ? "text-yellow-400"
                                : "text-blue-400"
                        }`}
                      >
                        {scan.risk}
                      </span>
                    </div>

                    <div className="sm:col-span-2">
                      <span className="inline-flex items-center gap-1.5 text-xs text-green-400">
                        <CheckCircle2 size={13} />
                        {scan.status}
                      </span>
                    </div>

                    <div className="hidden text-right text-xs text-zinc-600 sm:col-span-2 sm:block">
                      {scan.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vulnerabilities */}
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

                <AlertTriangle size={17} className="text-zinc-600" />
              </div>

              <div className="divide-y divide-zinc-800">
                {vulnerabilities.map((vulnerability) => (
                  <div key={vulnerability.name} className="px-5 py-4">
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
                        className={`shrink-0 text-[11px] font-medium ${
                          vulnerability.severity === "Critical"
                            ? "text-red-400"
                            : vulnerability.severity === "High"
                              ? "text-orange-400"
                              : vulnerability.severity === "Medium"
                                ? "text-yellow-400"
                                : "text-blue-400"
                        }`}
                      >
                        {vulnerability.severity}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="h-1 flex-1 bg-zinc-800">
                        <div
                          className={`h-full ${
                            vulnerability.severity === "Critical"
                              ? "w-[85%] bg-red-500"
                              : vulnerability.severity === "High"
                                ? "w-[65%] bg-orange-500"
                                : vulnerability.severity === "Medium"
                                  ? "w-[50%] bg-yellow-500"
                                  : "w-[30%] bg-blue-500"
                          }`}
                        />
                      </div>

                      <span className="ml-3 text-xs text-zinc-500">
                        {vulnerability.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-800 px-5 py-4">
                <button className="flex w-full items-center justify-center gap-2 text-xs font-medium text-blue-500 hover:text-blue-400">
                  View all findings
                </button>
              </div>
            </div>
          </section>

          {/* Bottom status */}
          <section className="flex flex-col gap-3 border border-zinc-800 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-green-500" />

              <span className="text-xs text-zinc-500">
                Scanner service operational
              </span>
            </div>

            <div className="flex items-center gap-5 text-xs text-zinc-600">
              <span>24 total scans</span>
              <span>29 vulnerabilities</span>
              <span>Last scan 2m ago</span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;